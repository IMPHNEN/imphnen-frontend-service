import { api } from '../index';
import type {
  TCreateTeamRequest,
  TUpdateTeamRequest,
  TInviteMemberRequest,
  TJoinTeamRequest,
  TManageMemberRequest,
  TSubmitProjectRequest,
  TTeamListResponse,
  TTeamDetailResponse,
  TTeamMembersResponse,
  TTeamInvitationsResponse,
  TTeamJoinRequestsResponse,
  TProjectSubmissionResponse,
} from '../../types/teams';

const TEAMS_BASE_URL = '/teams';

export const getTeams = async (params?: {
  page?: number;
  limit?: number;
  city?: string;
  visibility?: string;
  search?: string;
}) => {
  const response = await api.get<TTeamListResponse>(TEAMS_BASE_URL, { params });
  return response.data;
};

export const getTeamById = async (teamId: string) => {
  const response = await api.get<TTeamDetailResponse>(`${TEAMS_BASE_URL}/${teamId}`);
  return response.data;
};

export const createTeam = async (data: TCreateTeamRequest) => {
  const response = await api.post<TTeamDetailResponse>(TEAMS_BASE_URL, data);
  return response.data;
};

export const updateTeam = async (teamId: string, data: TUpdateTeamRequest) => {
  const response = await api.put<TTeamDetailResponse>(`${TEAMS_BASE_URL}/${teamId}`, data);
  return response.data;
};

export const getTeamMembers = async (teamId: string) => {
  const response = await api.get<TTeamMembersResponse>(`${TEAMS_BASE_URL}/${teamId}/members`);
  return response.data;
};

export const inviteMember = async (teamId: string, data: TInviteMemberRequest) => {
  const response = await api.post(`${TEAMS_BASE_URL}/${teamId}/invite`, data);
  return response.data;
};

export const manageMember = async (teamId: string, userId: string, data: TManageMemberRequest) => {
  const response = await api.put(`${TEAMS_BASE_URL}/${teamId}/members/${userId}`, data);
  return response.data;
};

export const removeMember = async (teamId: string, userId: string) => {
  const response = await api.delete(`${TEAMS_BASE_URL}/${teamId}/members/${userId}`);
  return response.data;
};

export const joinTeam = async (teamId: string, data: TJoinTeamRequest) => {
  const response = await api.post(`${TEAMS_BASE_URL}/${teamId}/join-request`, data);
  return response.data;
};

export const getTeamJoinRequests = async (teamId: string) => {
  const response = await api.get<TTeamJoinRequestsResponse>(`${TEAMS_BASE_URL}/${teamId}/join-requests`);
  return response.data;
};

export const respondToJoinRequest = async (teamId: string, requestId: string, action: 'approve' | 'reject') => {
  const response = await api.put(`${TEAMS_BASE_URL}/${teamId}/join-requests/${requestId}`, { action });
  return response.data;
};

export const getMyInvitations = async () => {
  const response = await api.get<TTeamInvitationsResponse>(`${TEAMS_BASE_URL}/invitations/me`);
  return response.data;
};

export const respondToInvitation = async (invitationId: string, action: 'accept' | 'reject') => {
  const response = await api.put(`${TEAMS_BASE_URL}/invitations/${invitationId}`, { action });
  return response.data;
};

export const getMyTeams = async () => {
  const response = await api.get<TTeamListResponse>(`${TEAMS_BASE_URL}/me`);
  return response.data;
};

export const submitProject = async (teamId: string, data: TSubmitProjectRequest) => {
  const response = await api.post<TProjectSubmissionResponse>(`${TEAMS_BASE_URL}/${teamId}/submission`, data);
  return response.data;
};

export const getTeamSubmission = async (teamId: string) => {
  const response = await api.get<TProjectSubmissionResponse>(`${TEAMS_BASE_URL}/${teamId}/submission`);
  return response.data;
};

export const leaveTeam = async (teamId: string) => {
  const response = await api.post(`${TEAMS_BASE_URL}/${teamId}/leave`);
  return response.data;
};
