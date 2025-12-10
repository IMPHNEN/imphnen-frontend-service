export type TAdminMetaResponse = {
  page: number;
  per_page: number;
  total_data: number;
  total_page: number;
};

export type TAdminListResponse<T = unknown> = {
  data: T[];
  meta: TAdminMetaResponse;
};

// Admin Users
export type TAdminUserItem = {
  id: string;
  email: string;
  fullname: string;
  avatar: string | null;
  phone_number: string | null;
  location: string | null;
  bio: string;
  skills: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type TAdminUsersResponse = TAdminListResponse<TAdminUserItem>;

// Admin Teams
export type TAdminTeamItem = {
  id: string;
  name: string;
  description: string;
  city: string;
  visibility: string;
  logo: string | null;
  banner: string | null;
  leader_id: string;
  created_at: string;
  updated_at: string;
};

export type TAdminTeamsResponse = TAdminListResponse<TAdminTeamItem>;

// Admin Submissions
export type TAdminSubmissionItem = {
  id: string;
  team_id: string;
  project_name: string;
  description: string;
  repository_url: string;
  demo_url: string | null;
  presentation_url: string | null;
  screenshots: string[];
  status: string;
  submitted_at: string;
  submitted_by: string;
  created_at: string;
  updated_at: string;
};

export type TAdminSubmissionsResponse =
  TAdminListResponse<TAdminSubmissionItem>;
