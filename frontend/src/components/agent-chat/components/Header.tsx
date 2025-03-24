import React from "react";
import { Progress } from "../../../components/agent-chat/ui/progress";
import { Separator } from "../../../components/agent-chat/ui/separator";
import { HeaderProps } from "../types";

export const Header: React.FC<HeaderProps> = ({ title, subtitle, progress, avatarUrl }) => {
  return (
    <div className="flex flex-col w-full items-start gap-3">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <img src={avatarUrl} alt="Avatar" className="w-6 h-6 rounded-full" />
            <div className="flex flex-col items-start justify-center gap-1.5">
              <div className="font-medium text-[#292929] text-base">{title}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-[#a5a5a5] text-xs font-medium">{subtitle}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-[#3c3c3c] text-sm tracking-tight">{progress}%</div>

          <div className="relative w-4 h-4">
            <div className="relative w-5 h-5 -top-0.5 -left-px">
              <div className="absolute w-5 h-5 top-0 left-0 rounded-full border-2 border-solid border-[#0000000a]" />
              <Progress className="absolute w-5 h-5 top-0 left-px" value={progress} />
            </div>
          </div>
        </div>
      </div>
      <Separator className="w-full" />
    </div>
  );
};
