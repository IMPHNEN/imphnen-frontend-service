import type { TRoleDetailItem } from '../types/roles';
import type { THackathonProfile, TQrProfile, TMentorProfile } from '../types/users';

type TUserItem = {
  id: string;
  avatar?: string;
  birthdate?: string;
  email: string;
  fullname: string;
  gender?: string;
  is_active: boolean;
  phone_number?: string;
  role: TRoleDetailItem;
  bio?: string;
  location?: string;
  skills?: string[];
  hackathon?: THackathonProfile;
  qr?: TQrProfile;
  mentor?: TMentorProfile;
};

export const SessionUser = {
  set: (val?: TUserItem) => localStorage.setItem('users', JSON.stringify(val)),
  get: (): TUserItem | undefined => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : undefined;
  },
  remove: () => localStorage.removeItem('users'),
};
