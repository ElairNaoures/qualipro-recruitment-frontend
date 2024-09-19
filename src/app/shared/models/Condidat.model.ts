export interface CondidatModel {
    id?: number;
    summary?: string;
    firstName?: string;
    lastName?: string;
    country?: string;
    phoneNumber?: string;
    birthdate?: Date;
    imageFileName?: string;

    cvFileName?: string;

  }
  export interface LoginInputModelCondidat {
    email?: string;
    password?: string;
  }
  export interface LoginResponseModelCondidat {
    success: boolean;
    message?: string;
    accessToken?: string;
    condidatInfo?: CondidatInfo;
  }
  
  export interface CondidatInfo {
    condidatId?: number;
    summary?: string;
    firstName?: string;
    lastName?: string;
    country?: string;
    phoneNumber?: string;
    birthdate?: Date;
    email?: string;
    roleName?: string;
  }