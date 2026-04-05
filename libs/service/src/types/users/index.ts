import { TRoleDetailItem } from '../roles';

export type TExperienceDto = {
  id: string;
  company: string;
  position: string;
  duration: string;
  period: string;
};

export type TEducationDto = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
};

export type TUserProfileExtension = {
  phone_number?: string;
  phone_for_verification?: string;
  gender?: string;
  birthdate?: string;
  domicile?: string;
  bio?: string;
  last_education?: string;
  linkedin_url?: string;
  github_url?: string;
  cv_url?: string;
  portfolio_url?: string;
  website_url?: string;
  twitter_url?: string;
  location?: string;
  skills?: string[];
  experience?: TExperienceDto[];
  education?: TEducationDto[];
  career_status?: string;
};

export type TUserItem = {
  id: string;
  avatar?: string;
  birthdate?: string;
  email: string;
  fullname: string;
  gender?: string;
  is_active: boolean;
  phone_number?: string;
  role: TRoleDetailItem;
  location?: string;
  bio?: string;
  skills?: string[];
};

export type TUsersListItem = {
  id: string;
  role: string;
  fullname: string;
  email: string;
  avatar?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type TUsersDetailItem = {
  id: string;
  role: TRoleDetailItem;
  fullname: string;
  legal_name?: string;
  email: string;
  avatar?: string;
  is_active: boolean;
  profile_extension?: TUserProfileExtension;
  created_at: string;
  updated_at: string;
};

export type TUserCreateRequest = {
  email: string;
  password: string;
  fullname: string;
  is_active: boolean;
  role_id: string;
  avatar?: string;
};

export type TUserUpdateRequest = {
  email?: string;
  password?: string;
  fullname?: string;
  legal_name?: string;
  is_active?: boolean;
  avatar?: string;
  role_id?: string;
  profile_extension?: TUserProfileExtension;
};

// Legacy alias
export type { TUsersDetailItem as UserDetailResponseDto };
export type { TUserUpdateRequest as UserUpdateRequestDto };
