import React, { useState } from "react";
import { Sidebar } from "../../components/sidebar/Sidebar/Sidebar";
import { MainContent } from "../../components/sidebar/MainContent/MainContent";
import SelectedMission from "./SelectedMission";
import { Home } from "../home";
import { AgentCircle } from "../agent-circle";
import { AgentChat } from "../agent-chat";
import DeployCard from "../deploy-card/DeployCard";
import { PlanChat } from "../plan-chat";

export const StartMission = (): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedMission, setSelectedMission] = useState<string | null>(null);
  const [missions, setMissions] = useState([
    { name: "Lead Generation", active: true },
    { name: "Mission Zeta", active: false },
    { name: "Mission Gaia", active: false }
  ]);

  const handleMissionClick = (name: string) => {
    setSelectedMission(name);
    setMissions(
      missions.map((mission) => ({
        ...mission,
        active: mission.name === name
      }))
    );
  };

  return (
    <div className="bg-[#f9f9fb] flex flex-row justify-start w-full min-h-screen">
      <Sidebar
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        missions={missions}
        onMissionClick={handleMissionClick}
      />
      <MainContent>
        <div className="flex flex-col">
          <Home />
          <AgentChat />
          <AgentCircle />
          <DeployCard />
          <PlanChat />
        </div>
      </MainContent>
    </div>
  );
};
