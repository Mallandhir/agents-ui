import { IBaseAgentEvent } from "@/types/ai/base.types";
import { IAIChat } from "@/types/ai/chat.types";

// SERVER
export interface ISocketServerMsg<T extends ISocketServerMsgTopic = ISocketServerMsgTopic> {
  topic: T;
  data: ISocketServerMsgRecord[T];
  timestamp: number;
  reqId: string;
}

export interface ITeamMetadata {
  team: {
    id: string;
    name: string;
    agentIds: string[];
  }[];
  agents: {
    id: string;
    name: string;
  }[];
}

export interface ISocketServerMsgRecord {
  AGENT_RUN: IBaseAgentEvent;
  TEAM_METADATA: ITeamMetadata;
  AGENT_USER_INPUT: { type: "error"; message: string; error?: any } | undefined;
}

export type ISocketServerMsgTopic = keyof ISocketServerMsgRecord;

export type ISocketTopicSubscriptionCb<T extends ISocketServerMsgTopic = ISocketServerMsgTopic> = (
  data: ISocketServerMsg<T>
) => void;

export type ISocketTopicSubscriptionRecord = {
  [T in ISocketServerMsgTopic]: ISocketTopicSubscriptionCb<T>[];
};

// CLIENT
export interface ISocketClientMsg<T extends ISocketClientMsgTopic = ISocketClientMsgTopic> {
  topic: T;
  data?: ISocketClientMsgRecord[T];
  timestamp: number;
  reqId: string;
}

export interface ISocketClientMsgRecord {
  AGENT_RUN: {
    body: {
      message: IAIChat["messages"][number];
      team_id?: string;
      agent_id?: string;
    };
  };
  AGENT_USER_INPUT: {
    body: {
      team_id?: string;
      agent_id: string;
      message: IAIChat["messages"][number];
    };
  };
}

export type ISocketClientMsgTopic = keyof ISocketClientMsgRecord;

export type IShortClientMsg<T extends ISocketClientMsgTopic> = Omit<ISocketClientMsg<T>, "timestamp" | "reqId">;

export type ISocketConnectionState = "OPEN" | "CLOSED" | "CONNECTING" | "CLOSING" | "UNKNOWN";
