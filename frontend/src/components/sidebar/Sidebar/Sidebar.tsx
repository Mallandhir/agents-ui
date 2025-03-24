import React from "react";
import { Separator } from "../ui/separator";
import { MissionList } from "./MissionList";
import { NewMissionButton } from "./NewMissionButton";
import { ToggleButton } from "./ToggleButton";

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
  missions: Array<{ name: string; active: boolean }>;
  onMissionClick: (name: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isExpanded, onToggle, missions, onMissionClick }) => {
  return (
    <div className="relative flex">
      <ToggleButton isExpanded={isExpanded} onClick={onToggle} />

      <div
        //  border-r border-[#f1f1f1]
        className={`bg-[#f9f9fb] transition-all duration-300 ease-in-out ${
          isExpanded ? "w-60" : "w-0"
        } overflow-hidden`}
      >
        <div className={`w-60 h-full`}>
          {/* App Logo and Name */}
          <div className="flex justify-center gap-10 pt-5 px-9">
            <div className="relative w-fit font-normal text-[#292929] text-2xl tracking-[-1px] leading-7 whitespace-nowrap">
              <span>Oneshot AI</span>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <div className="flex flex-col items-start gap-4 pt-16 px-9">
            <NewMissionButton />
            <Separator className="relative self-stretch w-full h-px ml-[-2px] mr-[-2px]" />
            <MissionList missions={missions} onMissionClick={onMissionClick} />
          </div>
        </div>
      </div>
    </div>
  );
};
