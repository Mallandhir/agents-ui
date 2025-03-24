import novaimage from "@/assets/images/nova.svg";
import React from "react";
import { AgentCircle } from "../agent-circle";
import { ChatInput } from "./components/ChatInput";
import { Header } from "./components/Header";
import { ReportsSnapshot } from "./components/ReportsSnapshot";
import { BADGES, HEADER_INFO, PROGRESS_VALUE, RECOMMENDED_INDUSTRIES, SUMMARY_TEXT, THINKING_STEPS } from "./constants";

export const AgentChat: React.FC = () => {
  const handleSendMessage = (message: string) => {
    console.log("Sending message:", message);
  };

  const handleVoiceInput = () => {
    console.log("Voice input activated");
  };

  return (
    <div className="flex flex-row justify-between gap-2 w-full p-4">
      <div className="rounded-xl bg-white w-full h-full flex flex-col justify-between">
        <div className="flex flex-col w-full items-start gap-3 p-4">
          <Header
            title={HEADER_INFO.title}
            subtitle={HEADER_INFO.subtitle}
            progress={PROGRESS_VALUE}
            avatarUrl={novaimage}
          />
          <ReportsSnapshot
            title="Reports Snapshot"
            dateRange="1 Mar - Today"
            badges={[BADGES.ENTIRE_PERIOD, BADGES.DATE_RANGE]}
            summaryData={{
              text: SUMMARY_TEXT
            }}
            outputData={{
              label: "Recommended Industries",
              industries: RECOMMENDED_INDUSTRIES
            }}
            thinkingProcess={{
              steps: THINKING_STEPS
            }}
          />
        </div>
        <ChatInput placeholder="Chat with Nova" onSend={handleSendMessage} onVoice={handleVoiceInput} />
      </div>
      <div>
        <div className="bg-white rounded-xl">
          <AgentCircle />
        </div>
      </div>
    </div>
  );
};
