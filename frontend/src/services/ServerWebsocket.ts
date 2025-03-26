import {
  IShortClientMsg,
  ISocketClientMsg,
  ISocketClientMsgTopic,
  ISocketConnectionState,
  ISocketServerMsg,
  ISocketServerMsgTopic,
  ISocketTopicSubscriptionCb,
  ISocketTopicSubscriptionRecord
} from "@/types/ServerWebsocket.types";
import { v4 as uuid } from "uuid";

import Logger from "@/services/Logger";

const logger = new Logger("ServerWebsocket");

const baseUrl = import.meta.env.VITE_APP_BACKEND_URI;

function getFullWsUrl(url: string): string {
  if (url[0] === "/") {
    return `${baseUrl?.startsWith("https:") ? "wss" : "ws"}://${baseUrl
      ?.replace(/(^\w+:|^)\/\//, "")
      .replace(/\/$/, "")}${url}`;
  }
  return url;
}

interface ISocketConnectionCallbacks {
  open?: (ws: WebSocket) => void;
  close?: () => void;
}

type IPendingRequest = {
  id: string;
  topic: ISocketServerMsgTopic;
  reject: (error: any) => void;
  responseMsgListener: ISocketTopicSubscriptionCb;
};

/**
 * Websocket communication between the server and the app
 */
class ServerWebsocket {
  private static subscriptions: ISocketTopicSubscriptionRecord = {
    AGENT_RUN: [],
    AGENT_USER_INPUT: [],
    TEAM_METADATA: []
  };
  private static connectionCallbacks?: ISocketConnectionCallbacks;
  private static socket: WebSocket | null = null;
  private static reconnectAttempts = 0;
  private static pendingRequests: IPendingRequest[] = [];

  public static connect(path: string, callbacks?: ISocketConnectionCallbacks): WebSocket {
    // If the socket is already open, return
    if (ServerWebsocket.socket?.readyState === WebSocket.OPEN) {
      return ServerWebsocket.socket;
    }
    // Set the connection callbacks
    this.connectionCallbacks = callbacks;
    // Create a new socket
    ServerWebsocket.socket = new WebSocket(getFullWsUrl(path));
    // On connection open
    ServerWebsocket.socket.onopen = ServerWebsocket._handleOpenConnection;
    // Handle incoming messages
    ServerWebsocket.socket.onmessage = ServerWebsocket._handleMessage;
    // Handle connection close
    ServerWebsocket.socket.onclose = ServerWebsocket._handleCloseConnection;

    return ServerWebsocket.socket;
  }

  public static get state(): ISocketConnectionState {
    switch (ServerWebsocket.socket?.readyState) {
      case WebSocket.OPEN:
        return "OPEN";
      case WebSocket.CLOSED:
        return "CLOSED";
      case WebSocket.CONNECTING:
        return "CONNECTING";
      case WebSocket.CLOSING:
        return "CLOSING";
      default:
        return "UNKNOWN";
    }
  }

  private static _handleOpenConnection = () => {
    this.connectionCallbacks?.open?.(ServerWebsocket.socket!);
    // Reset reconnect attempts on successful connection
    ServerWebsocket.reconnectAttempts = 0;
  };

  private static _handleCloseConnection = (event: CloseEvent) => {
    logger.info(`Connection closed with code: ${event.code}`);
    this.connectionCallbacks?.close?.();
    const url = ServerWebsocket.socket?.url;
    // Reset the socket
    ServerWebsocket.socket = null;
    // Reset pending requests
    ServerWebsocket._resetPendingRequests();
    // Reconnect to the server if the connection was not closed due to 1008
    // if (event.code !== 1008 && url) {
    //   ServerWebsocket._reconnect(url);
    // }
  };

  private static _reconnect = (url: string) => {
    setTimeout(
      () => ServerWebsocket.connect(url, this.connectionCallbacks),
      1000 * ServerWebsocket.reconnectAttempts++
    );
  };

  private static _resetPendingRequests = () => {
    try {
      // Reject all pending requests
      ServerWebsocket.pendingRequests.forEach((req) => {
        req.reject(new WebsocketConnectionClosedError());
      });
      // Clear the pending requests
      ServerWebsocket.pendingRequests = [];
    } catch (error) {
      logger.error(`ServerWebsocket._resetPendingRequests failed`);
      logger.error(error);
    }
  };

  public static on<T extends ISocketServerMsgTopic>(topic: T, callback: ISocketTopicSubscriptionCb<T>): void {
    if (!(topic in ServerWebsocket.subscriptions)) {
      ServerWebsocket.subscriptions[topic] = [];
    }
    // Add the callback to the list of subscribers for the message type
    if (!ServerWebsocket.subscriptions[topic]!.includes(callback)) {
      ServerWebsocket.subscriptions[topic]!.push(callback);
    }
  }

  public static removeListener<T extends ISocketServerMsgTopic>(
    topic: T,
    callback: ISocketTopicSubscriptionCb<T>
  ): void {
    let topicSubscriptions = ServerWebsocket.subscriptions[topic];
    if (!topicSubscriptions) return;

    topicSubscriptions = topicSubscriptions.filter((cb: any) => cb !== callback) as ISocketTopicSubscriptionRecord[T];

    ServerWebsocket.subscriptions[topic] = topicSubscriptions;
  }

  private static _runCallback = (cb: ISocketTopicSubscriptionCb, data: ISocketServerMsg) => {
    try {
      logger.info(`Running callback: ${cb.name}`);
      cb(data);
    } catch (error) {
      logger.error(`ServerWebsocket._runCallback failed: ${cb.name}`);
      logger.error(error);
    }
  };

  private static _handleMessage = (event: MessageEvent<string>): void => {
    const data = JSON.parse(event.data) as ISocketServerMsg;
    if (data.topic in ServerWebsocket.subscriptions) {
      const callbacks = ServerWebsocket.subscriptions[data.topic];
      callbacks.forEach((cb: any) => {
        ServerWebsocket._runCallback(cb, data);
      });
    } else {
      logger.info(`No subscribers for message type: ${data.topic}`);
    }
  };

  public static async send<T extends ISocketClientMsgTopic>(
    data: IShortClientMsg<T>
  ): Promise<ISocketServerMsg<T> | undefined> {
    try {
      if (ServerWebsocket.socket?.readyState !== WebSocket.OPEN) {
        return;
      }

      const reqId = uuid();
      const msgPayload: ISocketClientMsg<T> = {
        ...data,
        timestamp: Date.now(),
        reqId: reqId
      };

      // A promise that resolves when the response is received
      const response = await new Promise<ISocketServerMsg<T>>((resolve, reject) => {
        // Listener for the response
        const responseMsgListener: ISocketTopicSubscriptionCb<T> = (response: ISocketServerMsg<T>) => {
          // Check if the response is for the current reqId and resolve the promise. Also remove the listener
          if (response.reqId === reqId) {
            ServerWebsocket.removeListener(data.topic, responseMsgListener);
            resolve(response);
          }
        };
        // Register the listener
        ServerWebsocket.on(data.topic, responseMsgListener);
        // Add the request to the pending requests, so that it can be rejected on demand later. (if the connection is closed to avoid hanging promises)
        ServerWebsocket.pendingRequests.push({
          id: reqId,
          topic: data.topic,
          reject: (err) => {
            ServerWebsocket.removeListener(data.topic, responseMsgListener);
            reject(err);
          },
          responseMsgListener: responseMsgListener as ISocketTopicSubscriptionCb
        });
        // Send the message
        ServerWebsocket.socket!.send(JSON.stringify(msgPayload));
      });
      // Remove the request from the pending requests
      ServerWebsocket.pendingRequests = ServerWebsocket.pendingRequests.filter((req) => req.id !== reqId);
      return response;
    } catch (error) {
      logger.error(`ServerWebsocket.send failed`);
      logger.error(error);
      throw error;
    }
  }
}

// create new error that is thrown when the websocket connection is closed
export class WebsocketConnectionClosedError extends Error {
  constructor() {
    super("Websocket connection is closed");
    this.name = this.constructor.name;
  }
}

export default ServerWebsocket;
