export interface IUserInfo {
  identityId: string;
  userName: string;
  personType: number;
  roles: string;
  firstName: string;
  lastName: string;
  personId: string;
}

export interface IRegistrationModel {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ILoginModel {
  username: string;
  password: string;
  rememberMe: boolean;
}
