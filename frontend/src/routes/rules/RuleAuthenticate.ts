import { makeAutoObservable } from "mobx";
import { RootStore } from "../../stores/Root";
import { IRule, IRuleKey, IRuleStatus } from "../../types/routeRules.types";

class RuleAuthenticate implements IRule {
  roles?: string[];
  store: RootStore;

  key: IRuleKey = "authenticate";

  constructor({ roles, store }: { roles?: string[]; store: RootStore }) {
    makeAutoObservable(this);

    this.roles = roles;
    this.store = store;
  }

  public async run(): Promise<{ status: IRuleStatus }> {
    let status: IRuleStatus = "validating";
    try {
      const isAuthenticated = this.store.isAuthenticated;
      const data = await this.store.user.data;

      if (isAuthenticated) {
        const hasRequiredRole = this.checkRoles(this.roles, data?.contextUser?.roles);
        if (!hasRequiredRole) {
          status = "invalid";
        }
        status = "valid";
      } else {
        status = "invalid";
      }
    } catch (error) {
      status = "invalid";
    }

    return { status };
  }

  private checkRoles(roles: string[] | undefined, userRoles: string[] = []): boolean {
    if (!roles?.length) {
      return true;
    }

    return roles.some((role) => userRoles.includes(role));
  }
}

export default RuleAuthenticate;
