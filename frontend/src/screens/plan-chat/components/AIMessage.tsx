import React from "react";
import { Message } from "../data";

interface AIMessageProps {
  message: Message;
}

export const AIMessage: React.FC<AIMessageProps> = ({ message }) => {
  return (
    <div className="self-stretch max-w-[85%] break-words [font-family:'PP_Neue_Montreal-Medium',Helvetica] font-medium text-[#353535] text-xs tracking-[0] leading-4">
      {message.content}
    </div>
  );
};
