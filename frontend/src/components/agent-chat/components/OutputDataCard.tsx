import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/agent-chat/ui/card";
import { Separator } from "../../../components/agent-chat/ui/separator";
import { CARD_STYLES } from "../constants";
import { OutputDataProps } from "../types";

export const OutputDataCard: React.FC<OutputDataProps> = ({ title, output }) => {
  return (
    <Card className={CARD_STYLES.common}>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-base font-normal text-[#292929]">{title}</CardTitle>
        <Separator className="mt-2" />
      </CardHeader>
      <CardContent className="p-4 pt-3">
        <div className="font-light text-xs break-words whitespace-pre-wrap">
          {output.text.trim().replace(/<TASK COMPLETE>/, "")}
        </div>
      </CardContent>
    </Card>
  );
};
