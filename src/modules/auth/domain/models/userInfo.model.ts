export interface AuthResult {
  status: boolean;
  message: string;
  data?: AuthData;
}

export interface AuthData {
  userInfo: UserInfo;
  token: string;
}

export interface UserInfo {
  idUser: number;
  fullName: string;
}
