import { IToolResultBlock, IToolUseBlock } from "./ai.types";
import { IAIChatMessage } from "./chat.types";
import { IRawMessageStreamEvent } from "./stream.types";
export interface IHandOffToolInput {
  tool_result_id: string;
  message: string;
  reason: string;
}

export interface IHandoffToolOutput {
  success: boolean;
}

export type IHandOffToolBlock = IToolUseBlock & {
  name: "handoff";
  input: IHandOffToolInput;
};

export type IBaseAgentStreamEvent = {
  type: "stream_event";
  message: IRawMessageStreamEvent;
};

export type IBaseAgentFullAssistantMessageEvent = {
  type: "full_assistant_message";
  message: IAIChatMessage;
};

export type IBaseAgentHandOffEvent = {
  type: "handoff";
  message: IAIChatMessage;
  handoffTo: IHandoffTo;
};

export type IBaseAgentToolResultEvent = {
  type: "tool_result";
  message: IToolResultBlock;
};

export type IBaseAgentErrorEvent = {
  type: "error";
  errorMsg: string;
  error: any;
};

type IBaseAgentEventMessageMap = {
  stream_event: IBaseAgentStreamEvent;
  full_assistant_message: IBaseAgentFullAssistantMessageEvent;
  handoff: IBaseAgentHandOffEvent;
  tool_result: IBaseAgentToolResultEvent;
  error: IBaseAgentErrorEvent;
};

export type IBaseAgentEvent<T extends keyof IBaseAgentEventMessageMap = keyof IBaseAgentEventMessageMap> = {
  agent_id: string;
  team_id?: string;
} & IBaseAgentEventMessageMap[T];

export type IHandoffTo = {
  team_id?: string;
  agent_id?: string;
};
