import { agent_images } from "@/components/agent-circle/data";
import { EntityData } from "@/components/agent-circle/types";
import ServerWebsocket from "@/services/ServerWebsocket";
import { ISocketServerMsg } from "@/types/ServerWebsocket.types";
import { IToolResultBlock, IToolUseBlock } from "@/types/ai/ai.types";
import { IBaseAgentEvent } from "@/types/ai/base.types";
import { IAIChatMessage } from "@/types/ai/chat.types";
import { convertSnakeCaseToTitleCase } from "@/utils/textUtils";
import { isTextBlock, isToolCall } from "@/utils/typeGuards";
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

export type IAgentThinkingStep = {
  id: string;
  explanation: string;
  toolCall: IToolUseBlock;
  toolResult: IToolResultBlock | null;
};

export type IAgentData = {
  id: string;
  name: string;
  events: ISocketServerMsg<"AGENT_RUN">[];
  report: {
    thinking: {
      steps: IAgentThinkingStep[];
    };
    output: {
      text: string;
    };
  };
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
  public agentsRecord: Record<string, IAgentData> = {};
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

  public get agents(): EntityData[] {
    return Object.values(this.agentsRecord).map((agent, i) => {
      return {
        imageSrc: agent_images[i % agent_images.length],
        role: agent.name,
        status: "Scheduled",
        ...agent
      };
    });
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

  private _createDefaultTeamObj = (team: { id: string; name: string }) => {
    return {
      id: team.id,
      name: team.name,
      agentIds: [],
      handoffEvents: []
    };
  };

  private _createDefaultAgentObj = (agent: { id: string; name: string }) => {
    return {
      id: agent.id,
      name: agent.name,
      events: [],
      report: {
        thinking: {
          steps: []
        },
        output: {
          text: ""
        }
      }
    };
  };

  public _handleTeamMetadata = (event: ISocketServerMsg<"TEAM_METADATA">) => {
    this.metadataEvents = [...this.metadataEvents, event];
    for (const team of event.data.team) {
      this.teams[team.id] = {
        ...(this.teams[team.id] ?? this._createDefaultTeamObj(team)),
        ...team
      };
    }

    for (const agent of event.data.agents) {
      this.agentsRecord[agent.id] = {
        ...(this.agentsRecord[agent.id] ?? this._createDefaultAgentObj(agent)),
        ...agent
      };
    }

    // this._loadTestData();
  };

  private _handleEvent = (event: ISocketServerMsg<"AGENT_RUN">) => {
    this.allEvents = [...this.allEvents, event];
    if (!event.data.team_id) {
      return;
    }

    this.setActiveTeamId(event.data.team_id);
    if (!this.teams[event.data.team_id]) {
      this.teams[event.data.team_id] = this._createDefaultTeamObj({
        id: event.data.team_id,
        name: convertSnakeCaseToTitleCase(event.data.team_id)
      });
    }

    const team = this.teams[event.data.team_id];

    if (event.data.agent_id) {
      this.setActiveAgentId(event.data.agent_id);
      if (!team.agentIds.includes(event.data.agent_id)) {
        team.agentIds = [...team.agentIds, event.data.agent_id];
      }

      if (!this.agentsRecord[event.data.agent_id]) {
        this.agentsRecord[event.data.agent_id] = this._createDefaultAgentObj({
          id: event.data.agent_id,
          name: convertSnakeCaseToTitleCase(event.data.agent_id)
        });
      }

      const agent = this.agentsRecord[event.data.agent_id];
      agent.events = [...agent.events, event];

      switch (event.data.type) {
        case "handoff": {
          const handoffEvent = event as IHandoffEvent;
          team.handoffEvents = [...team.handoffEvents, handoffEvent];
          this._callbacks?.onHandoff?.(handoffEvent);
          this.setActiveTeamId(handoffEvent.data.handoffTo.team_id!);
          this.setActiveAgentId(handoffEvent.data.handoffTo.agent_id!);
          break;
        }
        case "full_assistant_message": {
          const message = event.data.message;
          const toolCallBlock = message.content.find(isToolCall);
          if (toolCallBlock) {
            const textBlock = message.content.find(isTextBlock);
            agent.report.thinking.steps.push({
              id: event.data.message?.id,
              explanation: textBlock?.text ?? "",
              toolCall: toolCallBlock,
              toolResult: null
            });
          }

          message.content.forEach((block) => {
            if (isTextBlock(block) && block.text.includes("TASK COMPLETE")) {
              agent.report.output.text += block.text;
            }
          });
          break;
        }

        case "tool_result": {
          const toolResult = event.data.message;
          agent.report.thinking.steps = agent.report.thinking.steps.map((step) => {
            if (step.toolCall.id === toolResult.tool_use_id) {
              return {
                ...step,
                toolResult: toolResult
              };
            }
            return step;
          });
          break;
        }

        default:
          break;
      }
    }
  };

  // private _loadTestData = async (events = testEvents) => {
  //   for (const event of events) {
  //     if (event.data?.type === "stream_event") continue;
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     this._handleEvent(event);
  //   }
  // };
}

export default GroupChat;
