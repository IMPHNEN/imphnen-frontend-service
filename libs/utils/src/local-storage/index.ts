export type TPermissionItem = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

type TRoleItem = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  permissions: TPermissionItem[];
};

type TUserItem = {
  id: string;
  avatar: string;
  birthdate: string;
  email: string;
  fullname: string;
  gender: string;
  identity_number: string;
  is_active: boolean;
  is_profile_completed: boolean;
  phone_number: string;
  referral_code: string;
  referred_by: string;
  religion: string;
  student_type: string;
  role: TRoleItem;
};

export const SessionUser = {
  set: (val: TUserItem) => localStorage.setItem('users', JSON.stringify(val)),
  get: (): TUserItem | undefined => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : undefined;
  },
  remove: () => localStorage.removeItem('users'),
};

export const SessionToken = {
  set: (val: { access_token: string; refresh_token: string }) => {
    localStorage.setItem('access_token', val.access_token);
    localStorage.setItem('refresh_token', val.refresh_token);
  },
  get: ():
    | { access_token?: string | null; refresh_token?: string | null }
    | undefined => {
    return {
      access_token: localStorage.getItem('access_token'),
      refresh_token: localStorage.getItem('refresh_token'),
    };
  },
  remove: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
};
