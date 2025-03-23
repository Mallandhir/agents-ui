import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import User from "./User";

export class RootStore {
  // auth
  isAuthenticated = true;

  // stores/models
  user!: User;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  public init() {
    this.user = new User();
  }
}

export const store = new RootStore();
export const StoreContext = createContext(store);
