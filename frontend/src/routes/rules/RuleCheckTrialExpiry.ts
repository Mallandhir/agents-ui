import { RootStore } from "@/stores/Root";
import { IRule, IRuleKey, IRuleStatus } from "@/types/routeRules.types";
import { makeAutoObservable } from "mobx";

class RuleCheckTrialExpiry implements IRule {
  store: RootStore;

  key: IRuleKey = "checkTrialExpiry";

  constructor({ store }: { store: RootStore }) {
    makeAutoObservable(this);

    this.store = store;
  }

  public async run(): Promise<{ status: IRuleStatus }> {
    let status: IRuleStatus = "validating";
    try {
      const user = (await this.store.user.data)!.contextUser;
      const { enforceTrialLimits, numberOfDaysLeft } = user.trialStatus;

      if (enforceTrialLimits && numberOfDaysLeft <= 0) {
        status = "invalid";
      } else {
        status = "valid";
      }
    } catch (error) {
      status = "invalid";
    }

    return { status };
  }
}

export default RuleCheckTrialExpiry;
