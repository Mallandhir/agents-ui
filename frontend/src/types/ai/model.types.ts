export type IAIModelId =
  | "us.anthropic.claude-3-7-sonnet-20250219-v1:0"
  | "us.anthropic.claude-3-5-sonnet-20241022-v2:0"
  | "us.anthropic.claude-3-5-haiku-20241022-v1:0";

export type IAIModelConfig = {
  model: IAIModelId;
  max_tokens: number;
  temperature?: number;
  top_p?: number;
};
