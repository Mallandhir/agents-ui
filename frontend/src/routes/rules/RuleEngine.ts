import { RootStore, store } from "@/stores/Root";
import { makeAutoObservable } from "mobx";
import RuleAuthenticate from "./RuleAuthenticate";
import RuleCheckTrialExpiry from "./RuleCheckTrialExpiry";

class RuleEngine {
  store: RootStore;

  constructor(store: RootStore) {
    makeAutoObservable(this);

    this.store = store;
  }

  public authenticate(roles?: string[]) {
    const authenticator = new RuleAuthenticate({ roles, store: this.store });
    return authenticator;
  }

  public trialExpiryCheck() {
    const trialExpiryChecker = new RuleCheckTrialExpiry({
      store: this.store
    });
    return trialExpiryChecker;
  }
}

const ruleEngine = new RuleEngine(store);

export default ruleEngine;
