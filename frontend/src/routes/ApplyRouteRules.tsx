import useRuleExecutor from "@/hooks/useRuleExecutor";
import { IRule } from "@/types/routeRules.types";
import { observer } from "mobx-react-lite";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface IApplyRouteRulesProps {
  rules: IRule[];
  children: React.ReactNode;
}

const ApplyRouteRules: React.FC<IApplyRouteRulesProps> = ({ rules, children }) => {
  const location = useLocation();
  const result = useRuleExecutor(rules);

  if (result.isAuthorized === undefined) {
    return <div className="p-2">{result.fallback}</div>;
  }

  if (result.isAuthorized) {
    return <>{children}</>;
  }

  const redirectTo = result.redirectTo;
  const fallback = result.fallback;

  if (redirectTo && location.pathname !== redirectTo) {
    return <Navigate to={redirectTo} replace />;
  } else if (fallback) {
    return fallback;
  }
};

export default observer(ApplyRouteRules);
