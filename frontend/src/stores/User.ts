import { IGetUserResponse, ILoginApi } from "@/types/api/userApi.types";
import { makeAutoObservable } from "mobx";
import AppResource from "../lib/AppResource";
import Logger from "../services/Logger";
import httpService from "../services/httpService";
import { IUser } from "../types/user.types";

const logger = new Logger("store: User");

class User {
  model = "user";

  data!: AppResource<IGetUserResponse>;
  loginResource!: AppResource<ILoginApi["response"]>;

  constructor() {
    makeAutoObservable(this);

    this.data = new AppResource<IGetUserResponse>({
      dataGetter: () => this._getUser(),
      callbacks: {
        fulfilled: this._onGetUserFulfilled
      }
    });
  }

  private _onGetUserFulfilled = async (data: IGetUserResponse) => {
    const user = data.loggedInUser;
    logger.info("User", user);
  };

  private _getUser = async () => {
    const data = await httpService.get<{
      user: IUser;
      contextUser: IUser;
    }>(`getuserbasicdata`);
    return {
      contextUser: data.contextUser,
      loggedInUser: data.user
    };
  };

  login(details: ILoginApi["request"]): AppResource<ILoginApi["response"]> {
    this.loginResource = new AppResource<ILoginApi["response"]>({
      dataGetter: async () => {
        const response = await httpService.post("login/standard", details.body);
        const user = response as IUser;
        return {
          success: Boolean(user?._id),
          message: "Login successful",
          user: user
        };
      }
    });

    return this.loginResource;
  }

  public logout = () => {
    const resource = new AppResource<{ success: boolean }>({
      dataGetter: async () => {
        await httpService.get(`user/logout`);
        this.data.setData({
          contextUser: undefined,
          loggedInUser: undefined
        });
        return { success: true };
      }
    });

    return resource;
  };
}

export default User;
