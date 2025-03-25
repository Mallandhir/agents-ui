import { Badge } from "@/components/sidebar/ui/badge";
import { Button } from "@/components/sidebar/ui/button";
import { Card, CardContent } from "@/components/sidebar/ui/card";
import { Plus } from "lucide-react";
import React from "react";
import { EntityData } from "../types";

interface EntityCardProps {
  entity: EntityData;
  onEntityClick: (entity: EntityData) => void;
  onClickDetails: (entity: EntityData) => void;
}

export const CenterCard: React.FC<EntityCardProps> = ({ entity, onEntityClick, onClickDetails }) => {
  return (
    <Card
      className="flex flex-col w-full max-w-[246px] min-h-[232px] items-center justify-center gap-6 cursor-pointer border-none shadow-none pointer-events-auto"
      onClick={() => onEntityClick(entity)}
    >
      <CardContent className="p-0 w-full">
        <div className="flex flex-col items-center gap-4 relative w-full">
          <div className="inline-flex items-center gap-6">
            {/* Center icon */}
            <img src={entity.imageSrc} alt={entity.name} className="w-10 h-10" />

            {/* Center Nova info */}
            <div className="flex flex-col w-24 items-start justify-center gap-2">
              <div className="w-fit text-gray-800 whitespace-nowrap relative mt-[-1px] text-base tracking-normal leading-normal font-medium">
                {entity.name}
              </div>

              <div className="flex flex-col items-start justify-center gap-1.5 relative self-stretch w-full">
                <div className="relative w-fit mt-[-1px] text-gray-400 text-xs tracking-normal leading-snug whitespace-nowrap">
                  {entity.role}
                </div>
              </div>

              <Badge className="flex items-center gap-1 p-1.5 rounded border border-solid border-gray-100 bg-white">
                <div className="relative w-1.5 h-1.5 rounded-full shadow-[inset_0px_1px_2px_#ffffff40] bg-green-500" />
                <div className="mt-[-1px] relative w-fit text-gray-800 text-xs tracking-normal leading-tight whitespace-nowrap">
                  {entity.status}
                </div>
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 relative self-stretch w-full mt-6">
          <div className="flex flex-col items-center gap-4 relative self-stretch w-full">
            {/* Results text */}
            <div className="relative self-stretch mt-[-1px] text-sm text-center tracking-normal leading-relaxed font-medium">
              <span className="text-gray-700">Found </span>
              <span className="text-purple-400 underline">
                {entity.results?.count} {entity.results?.type}
              </span>
              <span className="text-gray-700">{entity.results?.description}</span>
            </div>

            {/* Details button */}
            <Button
              variant="outline"
              className="inline-flex items-center gap-3 px-1.5 pr-4 py-1.5 rounded-lg border border-solid border-[#00000008] shadow-[inset_0px_4px_8px_#ffffff40] bg-[rgba(218,203,225,0.13)]"
              onClick={(e) => {
                e.stopPropagation();
                onClickDetails(entity);
              }}
            >
              <div className="flex w-4 h-4 min-w-5 min-h-5 items-center justify-center rounded-full overflow-hidden shadow-[inset_0px_4px_8px_#ffffff40] [background:linear-gradient(175deg,rgba(187,144,242,1)_0%,rgba(227,146,227,1)_100%)]">
                <Plus className="w-3 h-3 text-white" />
              </div>
              <div className="relative w-fit text-gray-800 text-sm tracking-normal leading-relaxed whitespace-nowrap font-medium">
                DETAILS
              </div>
            </Button>
          </div>

          {/* Timestamp info */}
          {entity.timestamp && (
            <div className="inline-flex flex-col items-center gap-1.5 relative opacity-50">
              <div className="relative w-fit mt-[-1px] text-xs tracking-normal leading-snug whitespace-nowrap">
                <span className="text-gray-400">Last Run: </span>
                <span className="text-gray-600">{entity.timestamp.lastRun}</span>
              </div>
              <div className="relative w-fit text-xs tracking-normal leading-snug whitespace-nowrap">
                <span className="text-gray-400">Time Taken: </span>
                <span className="text-gray-600">{entity.timestamp.timeTaken}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
