import novaimage from "@/assets/images/nova.svg";
import { AgentCircle } from "@/components/agent-circle";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { agentCircleVariants, containerVariants } from "./animations";
import { ChatInput } from "./components/ChatInput";
import { Header } from "./components/Header";
import { ReportsSnapshot } from "./components/ReportsSnapshot";
import { BADGES, HEADER_INFO, PROGRESS_VALUE, RECOMMENDED_INDUSTRIES, SUMMARY_TEXT, THINKING_STEPS } from "./constants";

export const AgentChat: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const agentId = searchParams.get("agentId");

  const handleSendMessage = (message: string) => {
    console.log("Sending message:", message);
  };

  const handleVoiceInput = () => {
    console.log("Voice input activated");
  };

  return (
    <motion.div
      layout
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-row justify-between gap-2 w-full p-4"
    >
      {agentId && (
        <motion.div
          id="agent-view"
          className="rounded-xl bg-white w-full h-full flex flex-col justify-between min-w-1/2 max-w-[625px]"
        >
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
        </motion.div>
      )}
      <motion.div
        variants={agentCircleVariants}
        initial="hidden"
        animate="visible"
        id="team-view"
        className={cn("self-center", agentId ? "-mr-48  " : "w-full flex justify-center")}
      >
        <AgentCircle
          onClickEntity={(entity) => {
            setSearchParams({ agentId: entity.id });
          }}
          onClickDetails={(entity) => {
            setSearchParams({ agentId: entity.id });
          }}
          size={650}
        />
      </motion.div>
    </motion.div>
  );
};
