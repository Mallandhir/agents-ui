import { motion } from "framer-motion";
import React from "react";
import { Avatar, AvatarFallback } from "../../../components/agent-chat/ui/avatar";
import { Badge } from "../../../components/agent-chat/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/agent-chat/ui/card";
import { Separator } from "../../../components/agent-chat/ui/separator";
import { BADGES, CARD_STYLES } from "../constants";
import { IThinkingProcessCard } from "../types";

export const ThinkingProcessCard: React.FC<IThinkingProcessCard> = ({ title, steps, onClickPreview }) => {
  return (
    <Card className={CARD_STYLES.common}>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-base font-[400] text-[#2A2A2A]">{title}</CardTitle>
        <Separator className="mt-2" />
      </CardHeader>
      <CardContent className="p-4 pt-3 flex flex-col gap-4">
        {steps.map((step, index) => {
          return (
            <motion.div
              key={index}
              className="flex gap-4 items-center justify-between w-full font-light"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex gap-2 w-full">
                <Avatar className="w-6 h-6 rounded-xl shadow-[inset_0px_4px_8.9px_#ffffff40]">
                  <AvatarFallback className="text-xs bg-[#DB91E530] text-[#b05cbb]">{index + 1}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start gap-1 w-full">
                  <div className="text-xs text-[#4b5563] break-words whitespace-pre-wrap">
                    {step.explanation.trim()}
                  </div>
                  <Separator className="w-full my-1" />
                </div>
              </div>
              <Badge variant="outline" className={BADGES.PREVIEW.className} onClick={() => onClickPreview(step)}>
                {BADGES.PREVIEW.text}
              </Badge>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
};
