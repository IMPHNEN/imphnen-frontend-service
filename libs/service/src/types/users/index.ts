import { TRoleItem } from '../roles';

export type TUserItem = {
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
