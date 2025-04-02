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
      role: {
        id: string;
        name: string;
        permission: [
          {
            id: string;
            name: string;
            created_at: string;
            updated_at: string;
          }
        ]
        created_at: string;
        updated_at: string;
      };
      fullname: string;
      email: string;
      avatar: string;
      phone_number: string;
      is_active: boolean;
      gender: string;
      birthdate: string;
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
