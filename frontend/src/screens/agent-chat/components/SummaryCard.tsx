import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/agent-chat/ui/card";
import { Separator } from "../../../components/agent-chat/ui/separator";
import { CARD_STYLES } from "../constants";
import { SummaryCardProps } from "../types";

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, text }) => {
  return (
    <Card className={CARD_STYLES.common}>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-base font-normal text-[#292929]">
          {title}
        </CardTitle>
        <Separator className="mt-2" />
      </CardHeader>
      <CardContent className="p-4 pt-3">
        <p className="text-xs text-[#353535]">
          <span>{text.prefix}</span>
          <span className="text-[#c072ca] underline">{text.highlight}</span>
          <span>{text.suffix}</span>
        </p>
      </CardContent>
    </Card>
  );
};
