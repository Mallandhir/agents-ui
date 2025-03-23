import { ILayout } from "@/types/layout.types";
import { IRule } from "@/types/routeRules.types";
import React from "react";

const Home = React.lazy(() => import("@/pages/home").then((module) => ({ default: module.Home })));
const AgentCircle = React.lazy(() =>
  import("@/pages/agent-circle").then((module) => ({ default: module.AgentCircle }))
);
const DeployCard = React.lazy(() => import("@/pages/deploy-card").then((module) => ({ default: module.DeployCard })));
const AgentChat = React.lazy(() => import("@/pages/agent-chat").then((module) => ({ default: module.AgentChat })));
const PlanChat = React.lazy(() => import("@/pages/plan-chat").then((module) => ({ default: module.PlanChat })));

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
    path: "/agent-circle",
    layout: "main",
    component: AgentCircle,
    rules: []
  },
  {
    path: "/deploy-card",
    layout: "main",
    component: DeployCard,
    rules: []
  },
  {
    path: "/agent-chat",
    layout: "main",
    component: AgentChat,
    rules: []
  },
  {
    path: "/plan-chat",
    layout: "main",
    component: PlanChat,
    rules: []
  }
];

export default routes;
