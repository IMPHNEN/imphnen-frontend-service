export type TLoginRequest = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  data: {
    token: {
      access_token: string;
      refresh_token: string;
    };
    user: {
      fullname: string;
      email: string;
      is_active: boolean;
    };
  };
};

export type TRegisterRequest = {
  fullname: string;
  email: string;
  password: string;
};

export type TVerifyEmailRequest = {
  email: string;
  otp: number;
};
