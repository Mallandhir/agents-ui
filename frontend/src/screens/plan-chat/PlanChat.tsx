import React from "react";
import { messages, aiResponses } from "./data";
import { AIMessage, UserMessage, ResearchCard, FinalResponse } from "./components";

export const PlanChat = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-appbg">
      <div className="flex flex-col w-full max-w-lg mx-auto items-end gap-4 p-4">
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
    </div>
  );
};
