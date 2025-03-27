import { IAIChatMessage } from "@/types/ai/chat.types";
import React from "react";
import MessageContentUi from "./MessageContentUi";

interface AIMessageProps {
  message: IAIChatMessage;
}

export const AIMessage: React.FC<AIMessageProps> = ({ message }) => {
  return (
    <div className="self-stretch max-w-[85%] break-words font-medium text-[#353535] text-xs tracking-[0] leading-4">
      <MessageContentUi message={message} />
    </div>
  );
};
