import { AgentCircle } from "@/components/agent-circle";
import { DeployCard } from "@/components/deploy-card";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatTextarea from "../start-mission/components/ChatTextarea";
import ChatSection from "./components/ChatSection";

export const PlanChat: React.FC = () => {
  const navigate = useNavigate();
  const [showAgentCircle, setShowAgentCircle] = useState(false);
  return (
    <div className="min-h-screen max-h-screen flex flex-row justify-center gap-10 w-full py-3 pe-2">
      <div className="flex flex-col justify-between">
        <ChatSection onClickDetails={() => setShowAgentCircle(true)} />

        <div className="flex flex-col w-full max-w-lg mx-auto items-end">
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
