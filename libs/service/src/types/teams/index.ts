import type { TUserItem } from '../users';

export enum ETeamVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export enum ETeamMemberRole {
  LEADER = 'leader',
  MEMBER = 'member',
}

export enum ETeamMemberStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  REQUESTED = 'requested',
}

export enum EInvitationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export enum ESubmissionStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
}

export type TTeamItem = {
  id: string;
  name: string;
  logo: string | null;
  banner: string | null;
  description: string;
  city: string;
  visibility: ETeamVisibility;
  leader_id: string;
  member_count: number;
  created_at: string;
  updated_at: string;
};

export type TTeamDetailItem = TTeamItem & {
  leader: TUserItem;
  members: TTeamMemberItem[];
  has_submission: boolean;
};

export type TTeamMemberItem = {
  id: string;
  team_id: string;
  user_id: string;
  role: ETeamMemberRole;
  status: ETeamMemberStatus;
  joined_at: string;
  user: TUserItem;
};

export type TTeamInvitationItem = {
  id: string;
  team_id: string;
  inviter_id: string;
  invitee_email: string;
  invitee_id: string | null;
  status: EInvitationStatus;
  created_at: string;
  team: TTeamItem;
  inviter: TUserItem;
};

export type TTeamJoinRequestItem = {
  id: string;
  team_id: string;
  user_id: string;
  status: EInvitationStatus;
  message: string;
  created_at: string;
  user: TUserItem;
  team: TTeamItem;
};

export type TProjectSubmissionItem = {
  id: string;
  team_id: string;
  project_name: string;
  description: string;
  repository_url: string;
  demo_url: string | null;
  presentation_url: string | null;
  screenshots: string[];
  status: ESubmissionStatus;
  submitted_at: string | null;
  submitted_by: string;
  created_at: string;
  updated_at: string;
};

// Request/Response DTOs
export type TCreateTeamRequest = {
  name: string;
  logo: string | null;
  banner: string | null;
  description: string;
  city: string;
  visibility: ETeamVisibility;
};

export type TUpdateTeamRequest = Partial<TCreateTeamRequest>;

export type TInviteMemberRequest = {
  email: string;
};

export type TJoinTeamRequest = {
  message: string;
};

export type TManageMemberRequest = {
  action: 'approve' | 'reject' | 'remove';
};

export type TSubmitProjectRequest = {
  project_name: string;
  description: string;
  repository_url: string;
  demo_url?: string;
  video_url?: string;
  presentation_url?: string;
  screenshots?: string[];
};

export type TTeamListResponse = {
  data: TTeamItem[];
  total: number;
  page: number;
  limit: number;
};

export type TTeamDetailResponse = {
  data: TTeamDetailItem;
};

export type TTeamMembersResponse = {
  data: TTeamMemberItem[];
};

export type TTeamInvitationsResponse = {
  data: TTeamInvitationItem[];
};

export type TTeamJoinRequestsResponse = {
  data: TTeamJoinRequestItem[];
};

export type TProjectSubmissionResponse = {
  data: TProjectSubmissionItem;
};
