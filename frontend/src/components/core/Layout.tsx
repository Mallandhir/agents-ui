import React from "react";
import { ILayout } from "../../types/layout.types";
import { MainContent } from "../layout/MainContent/MainContent";
import { LeftSideBar } from "../layout/sidebar";
import { TopBar } from "../layout/topbar";

function Layout({ children, type = "main" }: { children: React.ReactNode; type?: ILayout }) {
  if (type === "auth") {
    return <>{children}</>;
  }
  if (type === "main") {
    return (
      <div className="bg-[#f9f9fb] flex flex-row justify-start w-full min-h-screen">
        <TopBar />
        <LeftSideBar />
        <MainContent>{children}</MainContent>
      </div>
    );
  }

  return <>{children}</>;
}

export default Layout;
