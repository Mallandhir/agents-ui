import React from "react";
import { Badge } from "../../../components/agent-chat/ui/badge";
import { SECTIONS } from "../constants";
import { ReportsSnapshotProps } from "../types";
import { OutputDataCard } from "./OutputDataCard";
import { SummaryCard } from "./SummaryCard";
import { ThinkingProcessCard } from "./ThinkingProcessCard";

export const ReportsSnapshot: React.FC<ReportsSnapshotProps> = ({
  title,
  dateRange,
  badges,
  summaryData,
  outputData,
  thinkingProcess,
}) => {
  return (
    <div className="flex flex-col w-full items-start gap-3">
      <div className="flex w-full items-center justify-between">
        <div className="text-[#292929] text-sm">{title}</div>

        <div className="flex items-center">
          {badges.map((badge, index) => (
            <Badge key={index} variant="outline" className={badge.className}>
              {badge.text}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start gap-4 w-full">
        <SummaryCard title={SECTIONS.SUMMARY} text={summaryData.text} />
        <OutputDataCard
          title={SECTIONS.OUTPUT_DATA}
          label={outputData.label}
          industries={outputData.industries}
        />
        <ThinkingProcessCard
          title={SECTIONS.THINKING_PROCESS}
          steps={thinkingProcess.steps}
        />
      </div>
    </div>
  );
};
