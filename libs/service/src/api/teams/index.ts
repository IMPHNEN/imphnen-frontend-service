import { api } from '../index';
import type {
  TCreateTeamRequest,
  TUpdateTeamRequest,
  TInviteMemberRequest,
  TJoinTeamRequest,
  TSubmitProjectRequest,
  TTeamListResponse,
  TTeamDetailResponse,
  TTeamMembersResponse,
  TTeamInvitationsResponse,
  TTeamJoinRequestsResponse,
  TProjectSubmissionResponse,
} from '../../types/teams';

export const getTeams = async (params?: {
  page?: number;
  limit?: number;
  city?: string;
  visibility?: string;
  search?: string;
}) => {
  const response = await api.get<TTeamListResponse>('/v1/hackathon/teams/browse', { params });
  return response.data;
};

export const getTeamById = async (teamId: string) => {
  const response = await api.get<TTeamDetailResponse>(`/v1/hackathon/teams/${teamId}`);
  return response.data;
};

export const createTeam = async (data: TCreateTeamRequest) => {
  const response = await api.post<TTeamDetailResponse>('/v1/hackathon/teams', data);
  return response.data;
};

export const updateTeam = async (teamId: string, data: TUpdateTeamRequest) => {
  const response = await api.put<TTeamDetailResponse>(`/v1/hackathon/teams/${teamId}`, data);
  return response.data;
};

export const deleteTeam = async (teamId: string) => {
  const response = await api.delete(`/v1/hackathon/teams/${teamId}`);
  return response.data;
};

export const getTeamMembers = async (teamId: string) => {
  const response = await api.get<TTeamMembersResponse>(`/v1/hackathon/teams/${teamId}`);
  return response.data;
};

export const inviteMember = async (teamId: string, data: TInviteMemberRequest) => {
  const response = await api.post(`/v1/hackathon/invitations/teams/${teamId}/invite`, data);
  return response.data;
};

export const removeMember = async (teamId: string, userId: string) => {
  const response = await api.delete(`/v1/hackathon/teams/${teamId}/members/${userId}`);
  return response.data;
};

export const joinTeam = async (teamId: string, data: TJoinTeamRequest) => {
  const response = await api.post(`/v1/hackathon/join-requests/teams/${teamId}`, data);
  return response.data;
};

export const getTeamJoinRequests = async (teamId: string) => {
  const response = await api.get<TTeamJoinRequestsResponse>(
    `/v1/hackathon/join-requests/teams/${teamId}/pending`
  );
  return response.data;
};

export const respondToJoinRequest = async (requestId: string, action: 'accept' | 'reject') => {
  const response = await api.post(`/v1/hackathon/join-requests/${requestId}/respond`, { action });
  return response.data;
};

export const getMyInvitations = async () => {
  const response = await api.get<TTeamInvitationsResponse>('/v1/hackathon/invitations/my');
  return response.data;
};

export const respondToInvitation = async (invitationId: string, action: 'accept' | 'reject') => {
  const response = await api.post(`/v1/hackathon/invitations/${invitationId}/respond`, { action });
  return response.data;
};

export const getMyTeams = async () => {
  const response = await api.get('/v1/hackathon/teams/my');
  return response.data;
};

export const leaveTeam = async (teamId: string) => {
  const response = await api.post(`/v1/hackathon/teams/${teamId}/leave`);
  return response.data;
};

export const submitProject = async (teamId: string, data: TSubmitProjectRequest) => {
  const response = await api.post<TProjectSubmissionResponse>(
    `/v1/hackathon/submissions/teams/${teamId}`,
    data
  );
  return response.data;
};

export const getTeamSubmission = async (teamId: string) => {
  const response = await api.get<TProjectSubmissionResponse>(
    `/v1/hackathon/submissions/teams/${teamId}`
  );
  return response.data;
};
