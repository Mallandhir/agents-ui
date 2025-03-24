import AgentView from "@/pages/agent-view";
import Home from "@/pages/home";
import Planner from "@/pages/planner";
import TeamView from "@/pages/team-view";
import { ILayout } from "@/types/layout.types";
import { IRule } from "@/types/routeRules.types";
import React from "react";

const routes: {
  path: string;
  layout: ILayout;
  component: React.FC;
  rules: IRule[];
}[] = [
  {
    path: "/",
    layout: "main",
    component: Home,
    rules: []
  },
  {
    path: "/team-view",
    layout: "main",
    component: TeamView,
    rules: []
  },
  {
    path: "/agent-view",
    layout: "main",
    component: AgentView,
    rules: []
  },
  {
    path: "/planner",
    layout: "main",
    component: Planner,
    rules: []
  }
];

export default routes;
