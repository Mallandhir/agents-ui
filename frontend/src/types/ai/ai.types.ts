import { IAIChatMessage } from "./chat.types";

export interface ICacheControlEphemeral {
  type: "ephemeral";
}
export interface ITextBlock {
  text: string;
  type: "text";
  cache_control?: ICacheControlEphemeral | null;
}

export interface IToolUseBlock<TInput = unknown> {
  id: string;
  input: TInput;
  name: string;
  type: "tool_use";
  cache_control?: ICacheControlEphemeral | null;
}
export interface IToolResultBlock {
  tool_use_id: string;
  type: "tool_result";
  content?: ITextBlock[];
  is_error?: boolean;
  cache_control?: ICacheControlEphemeral | null;
}

export type IContentBlock = ITextBlock | IToolUseBlock | IToolResultBlock;

export interface IAICreateMessageBase {
  max_tokens: number;
  messages: Array<IAIChatMessage>;
  model: string;
  // metadata?: Metadata;
  stop_sequences?: Array<string>;
  stream?: boolean;
  system?: string | Array<ITextBlock>;
  temperature?: number;
  tool_choice?: IToolChoice;
  tools?: Array<IToolDefinition>;
  top_k?: number;
  top_p?: number;
}

export interface IAICreateMessageNonStreaming extends IAICreateMessageBase {
  stream?: false;
}

export interface IAICreateMessageStreaming extends IAICreateMessageBase {
  stream: true;
}

export interface IInputSchema {
  type: "object";
  required?: Array<string>;
  properties?: unknown | null;
  [k: string]: unknown;
}

export interface IToolDefinition {
  name: string;
  description?: string;
  input_schema: IInputSchema;
}

export type IToolChoice = IToolChoiceAuto | IToolChoiceAny | IToolChoiceTool;

// The model will use any available tools.
export interface IToolChoiceAny {
  type: "any";
  disable_parallel_tool_use?: boolean;
}

// The model will automatically decide whether to use tools.
export interface IToolChoiceAuto {
  type: "auto";
  disable_parallel_tool_use?: boolean;
}

// The model will use the specified tool with `tool_choice.name`.
export interface IToolChoiceTool {
  name: string;
  type: "tool";
  disable_parallel_tool_use?: boolean;
}
