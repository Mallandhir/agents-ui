import ServerWebsocket from "@/services/ServerWebsocket";
import { ISocketServerMsg } from "@/types/ServerWebsocket.types";
import { IBaseAgentEvent } from "@/types/ai/base.types";
import { IAIChatMessage } from "@/types/ai/chat.types";
import { convertSnakeCaseToTitleCase } from "@/utils/textUtils";
import { makeAutoObservable } from "mobx";

interface IHandoffEvent extends ISocketServerMsg<"AGENT_RUN"> {
  data: IBaseAgentEvent<"handoff">;
}

type ITeamData = {
  id: string;
  name: string;
  agentIds: string[];
  handoffEvents: IHandoffEvent[];
};

type IAgentData = {
  id: string;
  name: string;
  events: ISocketServerMsg<"AGENT_RUN">[];
};

interface IKickoffTeamConfig {
  teamId: string;
  message: IAIChatMessage;
  callbacks?: {
    onHandoff?: (event: IHandoffEvent) => void;
  };
}

class GroupChat {
  constructor() {
    makeAutoObservable(this);
  }

  public teams: Record<string, ITeamData> = {};
  public agents: Record<string, IAgentData> = {};
  public activeTeamId?: string;
  public activeAgentId?: string;
  private _callbacks: IKickoffTeamConfig["callbacks"] = {};

  public metadataEvents: ISocketServerMsg<"TEAM_METADATA">[] = [];
  public allEvents: ISocketServerMsg<"AGENT_RUN">[] = [];

  public setActiveTeamId(teamId: string) {
    this.activeTeamId = teamId;
  }

  public setActiveAgentId(agentId: string) {
    this.activeAgentId = agentId;
  }

  public kickoffTeam(config: IKickoffTeamConfig) {
    this._callbacks = config.callbacks ?? {};
    ServerWebsocket.connect("/websocket", {
      open: () => {
        // register callbacks
        ServerWebsocket.on("AGENT_RUN", this._handleEvent);
        ServerWebsocket.on("TEAM_METADATA", this._handleTeamMetadata);
        // send request
        ServerWebsocket.send({
          topic: "AGENT_RUN",
          data: {
            body: {
              message: config.message,
              team_id: config.teamId
            }
          }
        });
      },
      close: () => {
        ServerWebsocket.removeListener("AGENT_RUN", this._handleEvent);
      }
    });
  }

  public _handleTeamMetadata = (event: ISocketServerMsg<"TEAM_METADATA">) => {
    this.metadataEvents = [...this.metadataEvents, event];
    for (const team of event.data.team) {
      this.teams[team.id] = {
        ...(this.teams[team.id] ?? {}),
        ...team
      };
    }

    for (const agent of event.data.agents) {
      this.agents[agent.id] = {
        ...(this.agents[agent.id] ?? {}),
        ...agent,
        events: []
      };
    }
  };

  private _handleEvent = (event: ISocketServerMsg<"AGENT_RUN">) => {
    this.allEvents = [...this.allEvents, event];
    if (event.data.team_id) {
      this.setActiveTeamId(event.data.team_id);
      if (!this.teams[event.data.team_id]) {
        this.teams[event.data.team_id] = {
          id: event.data.team_id,
          name: convertSnakeCaseToTitleCase(event.data.team_id),
          agentIds: [],
          handoffEvents: []
        };
      }

      const team = this.teams[event.data.team_id];

      if (event.data.agent_id) {
        this.setActiveAgentId(event.data.agent_id);
        if (!team.agentIds.includes(event.data.agent_id)) {
          team.agentIds = [...team.agentIds, event.data.agent_id];
        }

        if (!this.agents[event.data.agent_id]) {
          this.agents[event.data.agent_id] = {
            id: event.data.agent_id,
            name: convertSnakeCaseToTitleCase(event.data.agent_id),
            events: []
          };
        }

        const agent = this.agents[event.data.agent_id];
        agent.events = [...agent.events, event];

        if (event.data.type === "handoff") {
          const handoffEvent = event as IHandoffEvent;
          team.handoffEvents = [...team.handoffEvents, handoffEvent];
          this._callbacks?.onHandoff?.(handoffEvent);
          this.setActiveAgentId(handoffEvent.data.handoffTo.agent_id!);
          this.setActiveTeamId(handoffEvent.data.handoffTo.team_id!);
        }
      }
    }
  };

  // public loadTestData = async (events = testEvents2) => {
  //   for (const event of events) {
  //     if (event.data?.type === "stream_event") continue;
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     this._handleEvent(event);
  //   }
  // };
}

export default GroupChat;
