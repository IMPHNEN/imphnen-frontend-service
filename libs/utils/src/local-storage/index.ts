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
  is_active: boolean;
  phone_number: string;
  role: TRoleItem;
};

export const SessionUser = {
  set: (val?: TUserItem) => localStorage.setItem('users', JSON.stringify(val)),
  get: (): TUserItem | undefined => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : undefined;
  },
  remove: () => localStorage.removeItem('users'),
};
