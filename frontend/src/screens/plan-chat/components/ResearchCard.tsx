import React from "react";
import { Button } from "../../../components/plan-chat/ui/button";
import { Card, CardContent } from "../../../components/plan-chat/ui/card";
import { AIResponse } from "../data";

interface ResearchCardProps {
  response: AIResponse;
}

export const ResearchCard: React.FC<ResearchCardProps> = ({ response }) => {
  return (
    <div className="w-full p-[2px] rounded-xl bg-gradient-to-r from-[#BB90F2] to-[#E392E3]">
      <Card className="border-none w-full h-full shadow-none rounded-[calc(0.75rem-2px)] bg-white">
        <CardContent className="flex w-full flex-col sm:flex-row px-4 py-2 items-start sm:items-center gap-3">
          <div className="gap-0.5 flex-1 grow flex flex-col items-start">
            <div
              className="w-fit -mt-px [font-family:'PP_Neue_Montreal-Medium',Helvetica] font-medium text-xs tracking-wider leading-4 whitespace-nowrap"
              style={{
                background:
                  "linear-gradient(173deg, rgba(187,144,242,1) 0%, rgba(227,146,227,1) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {response.title}
            </div>
            <div className="self-stretch break-words [font-family:'PP_Neue_Montreal-Medium',Helvetica] font-medium text-basegraphite text-xs tracking-[0] leading-4">
              {response.content}
            </div>
          </div>
          <Button
            variant="outline"
            className="px-2 py-1 h-auto rounded-lg border border-solid border-[#00000008] shadow-[inset_0px_4px_8.9px_#ffffff40] [background:linear-gradient(0deg,rgba(218,203,225,0.13)_0%,rgba(218,203,225,0.13)_100%)]"
          >
            <span className="[font-family:'PP_Neue_Montreal-Medium',Helvetica] font-medium text-[#c072ca] text-xs tracking-[0] leading-4 whitespace-nowrap">
              DETAILS
            </span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
