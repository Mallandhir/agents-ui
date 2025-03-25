import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import GroupChat from "./GroupChat";
import User from "./User";

export class RootStore {
  // auth
  isAuthenticated = true;

  // stores/models
  user!: User;
  groupChat!: GroupChat;

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  public init() {
    this.user = new User();
    this.groupChat = new GroupChat();
  }
}

export const store = new RootStore();
export const StoreContext = createContext(store);
