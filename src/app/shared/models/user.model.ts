import { RoleModel } from "./Role.model";

export interface UserModel {
  id?: number;
  firstName?: string;
  lastName?: string;
  country?: string;
  phoneNumber?: string;
  birthdate?: string; 
  roleId?: number | null;
  roleName?: string; 
  role?: {
    id?: number;
    roleName?: string;
  };
}

