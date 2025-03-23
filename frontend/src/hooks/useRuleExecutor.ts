import { IRule, IRuleKey, IRuleStatus } from "@/types/routeRules.types";
import React, { useRef, useState } from "react";

type IRuleStatusMetadata = { fallback: React.ReactNode; redirectTo?: string };
type IRuleMetadata = Record<IRuleStatus, IRuleStatusMetadata>;

const statusMetadata: Record<IRuleKey, IRuleMetadata> = {
  authenticate: {
    validating: {
      fallback: "Authenticating..."
    },
    valid: {
      fallback: "Authenticated"
    },
    invalid: {
      fallback: "Authentication Failed",
      redirectTo: "/login"
    }
  },

  checkTrialExpiry: {
    validating: {
      fallback: "Checking Trial Expiry..."
    },
    valid: {
      fallback: "Trial Active"
    },
    invalid: {
      fallback: "Trial Expired",
      redirectTo: "/trial_expired"
    }
  }
};

function useRuleExecutor(rules: IRule[]): {
  isAuthorized: boolean | undefined;
  fallback?: React.ReactNode;
  redirectTo?: string;
} {
  const noRules = rules.length === 0;

  const [isAuthorized, setIsAuthorized] = useState<boolean | undefined>(noRules ? true : undefined);
  const [metadata, setMetadata] = useState<IRuleStatusMetadata | undefined>();

  const isInit = useRef<boolean | undefined>();

  const runRules = async () => {
    isInit.current = true;
    for (const rule of rules) {
      setMetadata(statusMetadata[rule.key].validating);
      const result = await rule.run();
      setMetadata(statusMetadata[rule.key][result.status]);
      if (result.status === "invalid") {
        setIsAuthorized(false);
        return;
      }
    }
    setIsAuthorized(true);
  };

  if (isInit.current === undefined && !noRules) {
    runRules();
  }

  return {
    isAuthorized,
    fallback: metadata?.fallback,
    redirectTo: metadata?.redirectTo
  };
}

export default useRuleExecutor;
