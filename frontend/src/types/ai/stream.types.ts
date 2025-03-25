import { ITextBlock } from "./ai.types";

import { IToolUseBlock } from "./ai.types";
import { IAIChatMessage } from "./chat.types";

export interface ITextDelta {
  text: string;
  type: "text_delta";
}

export interface IInputJSONDelta {
  partial_json: string;

  type: "input_json_delta";
}

export interface IRawContentBlockDeltaEvent {
  delta: ITextDelta | IInputJSONDelta;
  index: number;
  type: "content_block_delta";
}

export interface IRawContentBlockStartEvent {
  content_block: ITextBlock | IToolUseBlock;

  index: number;

  type: "content_block_start";
}

export interface IRawContentBlockStopEvent {
  index: number;

  type: "content_block_stop";
}

export interface IMessageDeltaUsage {
  output_tokens: number;
}

export interface IRawMessageDeltaEvent {
  delta: Delta;
  type: "message_delta";
  usage: IMessageDeltaUsage;
}

interface Delta {
  stop_reason: "end_turn" | "max_tokens" | "stop_sequence" | "tool_use" | null;
  stop_sequence: string | null;
}

export interface IRawMessageStartEvent {
  message: IAIChatMessage;
  type: "message_start";
}

export interface IRawMessageStopEvent {
  type: "message_stop";
}

export type IRawMessageStreamEvent =
  | IRawMessageStartEvent
  | IRawMessageDeltaEvent
  | IRawMessageStopEvent
  | IRawContentBlockStartEvent
  | IRawContentBlockDeltaEvent
  | IRawContentBlockStopEvent;
