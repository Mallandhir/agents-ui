import React, { useState } from "react";
import { Button } from "../../../components/agent-chat/ui/button";
import { Input } from "../../../components/agent-chat/ui/input";
import { BUTTON_STYLES } from "../constants";
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
      <div className="relative w-full h-12 rounded-lg border border-solid border-[#00000008]">
        <Input
          className="h-12 pl-4 pr-16 text-sm text-[#292929]"
          placeholder={placeholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <div className="absolute right-12 top-3">
          <Button size="icon" className={BUTTON_STYLES.common} onClick={handleSend}>
            <img className="w-3 h-3" alt="Frame" src="/agent-chat/frame-398198.svg" />
          </Button>
        </div>
        <div className="absolute right-4 top-3">
          <Button size="icon" className={BUTTON_STYLES.common} onClick={onVoice}>
            <img className="w-3 h-3" alt="Group" src="/agent-chat/group-398198.png" />
          </Button>
        </div>
      </div>
    </div>
  );
};
