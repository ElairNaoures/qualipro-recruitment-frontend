export interface UserAccountRoleModel {
  userId?: number;
  firstName?: string;
  lastName?: string;
  country?: string;
  phoneNumber?: string;
  birthdate?: Date;
  accountId?: number;
  email?: string;
  password?: string;
  blocked: boolean;
  roleId: number;
}

export interface LoginInputModel {
  email?: string;
  password?: string;
}

export interface LoginResponseModel {
  success: boolean;
  message?: string;
  accessToken?: string;
  userInfo?: UserInfo;
  
}

export interface UserInfo {
  userId?: number;
  firstName?: string;
  lastName?: string;
  country?: string;
  phoneNumber?: string;
  birthdate?: Date;
  email?: string;
  roleName?: string;
  roleId?: number;
}
