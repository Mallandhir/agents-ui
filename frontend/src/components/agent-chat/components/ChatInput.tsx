import { Input } from "@/components/agent-chat/ui/input";
import { ArrowUp, AudioLines } from "lucide-react";
import React, { useState } from "react";
import { ChatInputProps } from "../types";

export const ChatInput: React.FC<ChatInputProps> = ({ placeholder, onSend, onVoice }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="w-full px-6 py-4">
      <div className="relative w-full h-12 rounded-lg">
        <Input
          className="h-12 pl-4 pr-16 text-sm text-[#292929] border border-gray-300 focus:border-gray-300"
          placeholder={placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <div className="absolute right-4 top-3">
          <div className="flex gap-2">
            <button
              className="flex w-6 h-6 items-center justify-center p-1.5 rounded-full overflow-hidden shadow-[inset_0px_4px_8.9px_#ffffff40] [background:linear-gradient(175deg,rgba(187,144,242,1)_0%,rgba(227,146,227,1)_100%)] hover:opacity-90 hover:scale-105 transition-all duration-200 cursor-pointer"
              onClick={onVoice}
            >
              <AudioLines className="w-3 h-3 text-white" />
            </button>
            <button
              className="flex w-6 h-6 items-center justify-center p-1.5 rounded-full overflow-hidden shadow-[inset_0px_4px_8.9px_#ffffff40] [background:linear-gradient(175deg,rgba(187,144,242,1)_0%,rgba(227,146,227,1)_100%)] hover:opacity-90 hover:scale-105 transition-all duration-200 cursor-pointer"
              onClick={handleSend}
            >
              <ArrowUp className="w-3 h-3 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
