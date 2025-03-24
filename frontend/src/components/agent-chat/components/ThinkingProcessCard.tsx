import React from "react";
import { Avatar, AvatarFallback } from "../../../components/agent-chat/ui/avatar";
import { Badge } from "../../../components/agent-chat/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/agent-chat/ui/card";
import { Separator } from "../../../components/agent-chat/ui/separator";
import { BADGES, CARD_STYLES } from "../constants";
import { ThinkingProcessProps } from "../types";

export const ThinkingProcessCard: React.FC<ThinkingProcessProps> = ({ title, steps }) => {
  return (
    <Card className={CARD_STYLES.common}>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-base font-normal text-[#292929]">{title}</CardTitle>
        <Separator className="mt-2" />
      </CardHeader>
      <CardContent className="p-4 pt-3 flex flex-col gap-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6 rounded-xl shadow-[inset_0px_4px_8.9px_#ffffff40]">
                <AvatarFallback className="text-xs text-[#b05cbb]">{index + 1}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start gap-1">
                <div className="text-xs font-medium text-[#353535]">{step}</div>
                <Separator className="w-full" />
              </div>
            </div>
            <Badge variant="outline" className={BADGES.PREVIEW.className}>
              {BADGES.PREVIEW.text}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
