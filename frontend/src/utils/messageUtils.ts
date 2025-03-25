import { IAIChatMessage } from "@/types/ai/chat.types";
import { v4 as uuidv4 } from "uuid";

export const createTextMessageObj = (message: string): IAIChatMessage => {
  return {
    id: uuidv4(),
    role: "user",
    content: [
      {
        type: "text",
        text: message
      }
    ]
  };
};
