import { TUserItem } from '../users';

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
    user: TUserItem;
  };
};

export type TRegisterRequest = {
  email: string;
  fullname: string;
  password: string;
  phone_number: string;
  referral_code?: string;
  referred_by?: string;
  student_type: string;
  confirm_password: string;
};

export type TVerifyEmailRequest = {
  email: string;
  otp: number;
};
