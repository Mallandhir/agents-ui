import { Sidebar } from "@/components/sidebar/Sidebar/Sidebar";
import { useState } from "react";

export const LeftSideBar = (): JSX.Element => {
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
    <>
      <Sidebar
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        missions={missions}
        onMissionClick={handleMissionClick}
      />
    </>
  );
};
