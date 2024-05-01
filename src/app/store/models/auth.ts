export interface RegisterBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginResponseData {
  email: string;
  token: string;
}
