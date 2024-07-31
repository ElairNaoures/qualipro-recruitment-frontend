import { UserAccountRoleModel } from "./user-account-role.model";

export interface AuthModel {
    success: boolean;
    message: string;
    accessToken?: string;
    userInfo?: UserAccountRoleModel;
  }
  