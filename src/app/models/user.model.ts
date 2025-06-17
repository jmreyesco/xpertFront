export interface User {
  _id?: string;
  name: string;
  email: string;
  role?: string;
  active?: boolean;
}

export interface LoginResponse {
  success: boolean;
  user: User;
  token: string;
  message?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: User;
}