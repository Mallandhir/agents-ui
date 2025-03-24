import React from "react";
import { aiResponses, messages } from "../data";
import { AIMessage } from "./AIMessage";
import { FinalResponse } from "./FinalResponse";
import { ResearchCard } from "./ResearchCard";
import { UserMessage } from "./UserMessage";

interface ChatSectionProps {
  onClickDetails: () => void;
}

const ChatSection: React.FC<ChatSectionProps> = ({ onClickDetails }) => {
  return (
    <>
      <div className="flex flex-col w-full max-w-lg mx-auto items-end gap-4 p-4 overflow-y-auto">
        {messages.map((message, index) =>
          message.type === "user" ? (
            <UserMessage key={`message-${index}`} message={message} />
          ) : (
            <AIMessage key={`message-${index}`} message={message} />
          )
        )}

        <div className="gap-4 self-stretch w-full flex flex-col items-start">
          {aiResponses.map((response, index) => (
            <React.Fragment key={`response-${index}`}>
              {response.type === "research" ? (
                <ResearchCard response={response} onClickDetails={onClickDetails} />
              ) : (
                <FinalResponse response={response} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatSection;
