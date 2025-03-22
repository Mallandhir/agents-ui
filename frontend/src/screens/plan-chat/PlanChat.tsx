import React from "react";
import ChatTextarea from "../home/components/ChatTextarea";
import { AIMessage, FinalResponse, ResearchCard, UserMessage } from "./components";
import { aiResponses, messages } from "./data";

export const PlanChat = (): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
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
                <ResearchCard response={response} />
              ) : (
                <FinalResponse response={response} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full max-w-lg mx-auto items-end gap-4 p-4">
        <ChatTextarea value={""} onChange={() => {}} />
      </div>
    </div>
  );
};
