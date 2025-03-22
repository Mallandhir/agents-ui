import React from "react";
import { Button } from "../ui/button";

interface Mission {
  name: string;
  active: boolean;
}

interface MissionListProps {
  missions: Mission[];
  onMissionClick: (name: string) => void;
}

export const MissionList: React.FC<MissionListProps> = ({ missions, onMissionClick }) => {
  return (
    <div className="flex flex-col w-full gap-1">
      {missions.map((mission, index) => (
        <Button
          key={index}
          variant={mission.active ? "secondary" : "ghost"}
          className={`w-full px-3 py-2 h-10 flex items-center justify-start rounded-lg text-sm ${
            mission.active
              ? "bg-gray-100 text-gray-900 font-medium"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
          onClick={() => onMissionClick(mission.name)}
        >
          {mission.name}
        </Button>
      ))}
    </div>
  );
};