import { IContentBlock, ITextBlock, IToolResultBlock, IToolUseBlock } from "@/types/ai/ai.types";
import { IAIChatMessage, IAICheckpoint } from "@/types/ai/chat.types";

export function isToolCall(block: IContentBlock): block is IToolUseBlock {
  return block.type === "tool_use";
}

export function isToolResult(block: IContentBlock): block is IToolResultBlock {
  return block.type === "tool_result";
}

export function isTextBlock(block: IContentBlock): block is ITextBlock {
  return block.type === "text";
}

export function isAIChatMessage(block: IAIChatMessage | IAICheckpoint): block is IAIChatMessage {
  return block.type !== "checkpoint" && block.type !== "temp-dummy-message";
}
