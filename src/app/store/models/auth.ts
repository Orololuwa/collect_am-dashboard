export interface RegisterBody {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  user_type: "biller";
  account_type: "main";
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginResponseData {
  data: {
    user: {
      id: 2;
      user_type: string;
      account_type: string;
      firstname: string;
      lastname: string;
      email: string;
      phone: string;
      status: string;
      email_verified_at: null;
      created_at: string;
      updated_at: string;
      dob: string;
      address: string;
    };
    token: string;
  };
}
