import React from "react";
import { Message } from "../data";

interface UserMessageProps {
  message: Message;
}

export const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  return (
    <div className="inline-flex max-w-[85%] items-center justify-end gap-3 px-4 py-2 rounded-3xl border border-solid border-[#0000000d] [background:linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_100%),linear-gradient(0deg,rgba(239,239,239,1)_0%,rgba(239,239,239,1)_100%),linear-gradient(0deg,rgba(124,167,212,0.12)_0%,rgba(124,167,212,0.12)_100%)]">
      <div className="break-words [font-family:'PP_Neue_Montreal-Medium',Helvetica] font-medium text-basegraphite text-xs text-right tracking-[0] leading-4">
        {message.content}
      </div>
    </div>
  );
};