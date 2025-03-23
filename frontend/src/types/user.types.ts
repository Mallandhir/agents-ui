export type IWebAppMsg = "LOGIN_SUCCESS";

export type IUserRole = "SalesRep" | "Manager" | "SuperAdmin" | "Developer";

export interface IUserTrialStatus {
  enforceTrialLimits: boolean;
  numberOfDaysLeft: number;
}

export interface IUser {
  _id: string;
  orgId: string;
  orgName: string;
  mail: string;
  name: string;
  roles: IUserRole[];
  verified: boolean;
  isLandingPageSetup: boolean;
  createdAt: string;
  orgLeadStatus: string;
  integrationToken: string;
  trialStatus: IUserTrialStatus;
  linkedInUserInfo?: ILinkedInGetUserResponseData;
}

export interface ILinkedInGetUserResponseData {
  id: string;
  localizedFirstName: string;
  localizedLastName: string;
  localizedHeadline: string;
}

export type ISubscriptionData = {
  userId: string;
  cusId: string;
  willRenew: boolean;
  subStatus: "active" | "inactive";
  productId: string;
  currentSubId: string;
  subscriptionStart: Date;
  subscriptionEnd: Date;
};
