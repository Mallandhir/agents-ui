import { IUser } from "../user.types";

export interface IGetUserResponse {
  contextUser: IUser | undefined;
  loggedInUser: IUser | undefined;
}

export interface ILoginApi {
  request: {
    body: {
      username: string;
      password: string;
    };
  };
  response: {
    success: boolean;
    message?: string;
    user?: IUser;
  };
}
