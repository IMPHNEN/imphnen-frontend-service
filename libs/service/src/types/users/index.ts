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
  location?: string;
  bio?: string;
  skills?: string[];
};

// Re-export types from API for convenience
export type { UserDetailResponseDto, UserUpdateRequestDto } from '../../api/users';
