export type IRuleKey = "authenticate" | "checkTrialExpiry";

export interface IRule {
  key: IRuleKey;
  run: () => Promise<{ status: IRuleStatus }>;
}

export type IRuleStatus = "validating" | "valid" | "invalid";
