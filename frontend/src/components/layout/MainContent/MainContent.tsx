import React from "react";

interface MainContentProps {
  children: React.ReactNode;
}

export const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">{children}</div>
    </div>
  );
};
