import { ILayout } from "@/types/layout.types";
import { IRule } from "@/types/routeRules.types";
import React from "react";

const Home = React.lazy(() => import("@/pages/home"));
const TeamView = React.lazy(() => import("@/pages/team-view"));
const AgentView = React.lazy(() => import("@/pages/agent-view"));
const Planner = React.lazy(() => import("@/pages/planner"));

const routes: {
  path: string;
  layout: ILayout;
  component: React.LazyExoticComponent<React.FC>;
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
