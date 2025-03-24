import { AgentCircle } from "@/components/agent-circle";
import { DeployCard } from "@/components/deploy-card";
import ChatTextarea from "@/components/start-mission/components/ChatTextarea";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AIMessage } from "./components/AIMessage";
import { FinalResponse } from "./components/FinalResponse";
import { ResearchCard } from "./components/ResearchCard";
import { UserMessage } from "./components/UserMessage";
import { aiResponses, messages } from "./data";

export const PlanChat: React.FC = () => {
  const navigate = useNavigate();
  const [showAgentCircle, setShowAgentCircle] = useState(false);
  return (
    <div className="min-h-screen max-h-screen flex flex-row justify-center gap-10 w-full py-3 pe-2">
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
                  <ResearchCard response={response} onClickDetails={() => setShowAgentCircle(true)} />
                ) : (
                  <FinalResponse response={response} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-full max-w-lg mx-auto items-end gap-4">
          <ChatTextarea placeholder="Type your instructions here..." value={""} onChange={() => {}} onSend={() => {}} />
        </div>
      </div>
      {showAgentCircle && (
        <div className="bg-white rounded-xl p-3">
          <AgentCircle
            onClickDetails={() => {
              navigate("/agent-view");
            }}
            size={575}
          />
          <div>
            <DeployCard onDeploy={() => navigate("/team-view")} />
          </div>
        </div>
      )}
    </div>
  );
};
