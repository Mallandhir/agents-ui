import ChatTextarea from "@/pages/home/components/ChatTextarea";
import { AIMessage, FinalResponse, ResearchCard, UserMessage } from "@/pages/plan-chat/components";
import { aiResponses, messages } from "@/pages/plan-chat/data";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AgentCircle } from "../agent-circle";
import { DeployCard } from "../deploy-card";

export const PlanChat: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen max-h-screen flex flex-row justify-center gap-10 w-full py-3">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col w-full max-w-lg mx-auto items-end gap-4 p-4 overflow-y-auto">
          {messages.map((message, index) =>
            message.type === "user" ? (
              <UserMessage key={`message-${index}`} message={message} />
            ) : (
              <AIMessage key={`message-${index}`} message={message} />
            )
          )}

          <div className="gap-4 self-stretch w-full flex flex-col items-start">
            {aiResponses.map((response, index) => (
              <React.Fragment key={`response-${index}`}>
                {response.type === "research" ? (
                  <ResearchCard response={response} />
                ) : (
                  <FinalResponse response={response} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-full max-w-lg mx-auto items-end gap-4">
          <ChatTextarea value={""} onChange={() => {}} onSend={() => {}} />
        </div>
      </div>
      <div className="bg-white rounded-xl p-3">
        <AgentCircle />
        <div>
          <DeployCard onDeploy={() => navigate("/agent-chat")} />
        </div>
      </div>
    </div>
  );
};
