import React from "react";
import { Badge } from "../../../components/agent-circle/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/agent-chat/ui/card";
import { Separator } from "../../../components/agent-chat/ui/separator";
import { CARD_STYLES } from "../constants";
import { OutputDataProps } from "../types";

export const OutputDataCard: React.FC<OutputDataProps> = ({
  title,
  label,
  industries,
}) => {
  return (
    <Card className={CARD_STYLES.common}>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-base font-normal text-[#292929]">
          {title}
        </CardTitle>
        <Separator className="mt-2" />
      </CardHeader>
      <CardContent className="p-4 pt-3">
        <div className="flex flex-col items-start gap-3">
          <div className="text-xs text-[#353535] font-medium">{label}</div>
          <div className="flex items-center gap-3 flex-wrap">
            {industries.map((industry, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-2 py-1 bg-white rounded-3xl border border-solid border-[#00000014] shadow-sm"
              >
                <span className="text-xs font-medium text-[#353535]">
                  {industry}
                </span>
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
