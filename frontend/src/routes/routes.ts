import AgentView from "@/pages/agent-view";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Planner from "@/pages/planner";
import TeamView from "@/pages/team-view";
import { ILayout } from "@/types/layout.types";
import { IRule } from "@/types/routeRules.types";
import React from "react";
import ruleEngine from "./rules/RuleEngine";

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
    rules: [ruleEngine.authenticate()]
  },
  {
    path: "/team-view",
    layout: "main",
    component: TeamView,
    rules: [ruleEngine.authenticate()]
  },
  {
    path: "/agent-view",
    layout: "main",
    component: AgentView,
    rules: [ruleEngine.authenticate()]
  },
  {
    path: "/planner",
    layout: "main",
    component: Planner,
    rules: [ruleEngine.authenticate()]
  },
  {
    path: "/login",
    layout: "auth",
    component: Login,
    rules: []
  }
];

export default routes;
