import { makeAutoObservable } from "mobx";
import AppResource from "../lib/AppResource";
import Logger from "../services/Logger";
import httpService from "../services/httpService";
import { IUser } from "../types/user.types";

const logger = new Logger("store: User");

interface IGetUserResponse {
  contextUser: IUser;
  loggedInUser: IUser;
}

interface IUpdateUserRequest {
  params: {
    _id: string;
  };
  body: Partial<Pick<IUser, "name" | "mail" | "linkedInUserInfo">>;
}

export interface IUpdateUserResponse {
  status: boolean;
  message?: string;
  user?: IUser;
}

class User {
  model = "user";

  data!: AppResource<IGetUserResponse>;

  constructor() {
    makeAutoObservable(this);

    this.data = new AppResource<{
      contextUser: IUser;
      loggedInUser: IUser;
    }>({
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

  public updateUser = (request: IUpdateUserRequest) => {
    const resource = new AppResource<IUpdateUserResponse>({
      dataGetter: () => this._updateUser(request)
    });

    return resource;
  };

  private _updateUser = async (request: IUpdateUserRequest) => {
    const response = await httpService.patch<IUpdateUserRequest["body"], IUpdateUserResponse>(
      `user/${request.params._id}/updateDetails`,
      request.body
    );

    this.data.setData((prev) => {
      return {
        ...prev,
        contextUser: {
          ...prev.contextUser,
          ...request.body
        }
      };
    });

    return response;
  };

  public logout = async () => {
    await httpService.get(`user/logout`);
  };
}

export default User;
