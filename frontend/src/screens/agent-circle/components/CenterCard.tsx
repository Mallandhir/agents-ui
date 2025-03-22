import React from "react";
import { Badge } from "../../../components/sidebar/ui/badge";
import { Button } from "../../../components/sidebar/ui/button";
import { Card, CardContent } from "../../../components/sidebar/ui/card";
import { EntityCardProps } from "../types";
import { Plus } from "lucide-react";

export const CenterCard: React.FC<EntityCardProps> = ({ entity, onEntityClick }) => {
  return (
    <Card
      className="flex flex-col w-[246px] h-[232px] items-center justify-center gap-[26.59px] cursor-pointer border-none shadow-none"
      onClick={() => onEntityClick(entity)}
    >
      <CardContent className="p-0 w-full">
        <div className="flex flex-col items-center gap-[17.73px] relative self-stretch w-full flex-[0_0_auto] mt-[-0.95px]">
          <div className="inline-flex items-center gap-[26.59px] relative flex-[0_0_auto]">
            {/* Center icon */}
            <div className="relative w-[46.54px] h-[46.54px] bg-[url(/ellipse-131.svg)] bg-cover bg-[50%_50%]">
              <div className="relative w-[29px] h-[29px] top-[9px] left-[9px] rounded-[14.54px] border-[1.94px] border-solid border-white">
                <div className="relative h-3.5 top-1.5 -left-0.5 rounded-[14.54px/6.79px] border-[1.94px] border-solid border-white" />
              </div>
            </div>

            {/* Center Nova info */}
            <div className="flex flex-col w-[93.08px] items-start justify-center gap-[8.86px] relative">
              <div
                className="w-fit text-[#292929] whitespace-nowrap relative mt-[-1.11px] text-[15.5px] tracking-[0] leading-[15.5px] font-medium"
                style={{ fontFamily: "'PP_Neue_Montreal-Medium', Helvetica" }}
              >
                {entity.name}
              </div>

              <div className="flex flex-col items-start justify-center gap-[6.65px] relative self-stretch w-full flex-[0_0_auto]">
                <div
                  className="relative w-fit mt-[-1.11px] mr-[-0.92px] text-[#a5a5a5] text-[11.1px] tracking-[0] leading-[13.3px] whitespace-nowrap"
                  style={{
                    fontFamily: "'PP_Neue_Montreal_Mono-Medium', Helvetica"
                  }}
                >
                  {entity.role}
                </div>
              </div>

              <Badge className="flex items-center gap-[4.43px] p-[6.65px] rounded-[4.43px] border-[1.11px] border-solid border-[#eaeaea] bg-white">
                <div className="relative w-[6.65px] h-[6.65px] rounded-[12.41px] shadow-[inset_0px_1.29px_2.88px_#ffffff40] bg-[#6FCB5C]" />
                <div
                  className="mt-[-1.11px] relative w-fit text-[#2a2a2a] text-[10px] tracking-[0] leading-[12.0px] whitespace-nowrap"
                  style={{
                    fontFamily: "'PP_Neue_Montreal_Mono-Medium', Helvetica"
                  }}
                >
                  {entity.status}
                </div>
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-[26.59px] relative self-stretch w-full flex-[0_0_auto] mb-[-0.95px] mt-[26.59px]">
          <div className="flex flex-col items-center gap-[17.73px] relative self-stretch w-full flex-[0_0_auto]">
            {/* Results text */}
            <div
              className="relative self-stretch mt-[-1.69px] ml-[-0.58px] text-[13.3px] text-center tracking-[0] leading-[18.6px] font-medium"
              style={{ fontFamily: "'PP_Neue_Montreal-Medium', Helvetica" }}
            >
              <span className="text-[#353535]">Found </span>
              <span className="text-[#c072ca] underline">
                {entity.results?.count} {entity.results?.type}
              </span>
              <span className="text-[#353535]">{entity.results?.description}</span>
            </div>

            {/* Details button */}
            <Button
              variant="outline"
              className="inline-flex items-center gap-[12.01px] pl-[6.65px] pr-[17.73px] py-[6.65px] rounded-[8.86px] border-[1.11px] border-solid border-[#00000008] shadow-[inset_0px_4.43px_9.86px_#ffffff40] bg-[rgba(218,203,225,0.13)]"
            >
              <button className="flex w-4 h-4 min-w-[20px] min-h-[20px] items-center justify-center rounded-full overflow-hidden shadow-[inset_0px_4px_8.9px_#ffffff40] [background:linear-gradient(175deg,rgba(187,144,242,1)_0%,rgba(227,146,227,1)_100%)]">
                <Plus className="text-white" />
              </button>
              <div
                className="relative w-fit text-[#292929] text-[13.3px] tracking-[0] leading-[18.6px] whitespace-nowrap font-medium"
                style={{ fontFamily: "'PP_Neue_Montreal-Medium', Helvetica" }}
              >
                DETAILS
              </div>
            </Button>
          </div>

          {/* Timestamp info */}
          {entity.timestamp && (
            <div className="inline-flex flex-col items-center gap-[6.65px] relative flex-[0_0_auto] opacity-50">
              <div
                className="relative w-fit mt-[-1.11px] text-[11.1px] tracking-[0] leading-[13.3px] whitespace-nowrap"
                style={{
                  fontFamily: "'PP_Neue_Montreal_Mono-Medium', Helvetica"
                }}
              >
                <span className="text-[#a5a5a5]">Last Run: </span>
                <span className="text-[#646464]">{entity.timestamp.lastRun}</span>
              </div>
              <div
                className="relative w-fit text-[11.1px] tracking-[0] leading-[13.3px] whitespace-nowrap"
                style={{
                  fontFamily: "'PP_Neue_Montreal_Mono-Medium', Helvetica"
                }}
              >
                <span className="text-[#a5a5a5]">Time Taken: </span>
                <span className="text-[#646464]">{entity.timestamp.timeTaken}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
