import { TRoleDetailItem } from '../roles';

export type TUserItem = {
  id: string;
  avatar: string;
  birthdate: string;
  email: string;
  fullname: string;
  gender: string;
  is_active: boolean;
  phone_number: string;
  role: TRoleDetailItem;
};
