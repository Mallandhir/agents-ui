import { Separator } from "@/components/plan-chat/ui/separator";
import React from "react";
import { AIResponse } from "../data";

interface FinalResponseProps {
  response: AIResponse;
}

export const FinalResponse: React.FC<FinalResponseProps> = ({ response }) => {
  return (
    <>
      <Separator className="w-full h-px" />
      <div className="self-stretch break-words font-medium text-[#353535] text-xs tracking-[0] leading-4">
        {response.content}
      </div>
    </>
  );
};
