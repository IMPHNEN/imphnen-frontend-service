import { api } from '../index';
import type {
  TAdminUsersResponse,
  TAdminTeamsResponse,
  TAdminSubmissionsResponse,
} from '../../types/admin';

export const getAdminUsers = async (params?: {
  page?: number;
  per_page?: number;
  search?: string;
  is_admin?: boolean;
}) => {
  const response = await api.get<TAdminUsersResponse>('/v1/hackathon/admin/users', { params });
  return response.data;
};

export const getAdminUserById = async (userId: string) => {
  const response = await api.get(`/v1/hackathon/admin/users/${userId}`);
  return response.data;
};

export const deleteAdminUser = async (userId: string) => {
  const response = await api.delete(`/v1/hackathon/admin/users/${userId}`);
  return response.data;
};

export const setAdminUser = async (userId: string, is_admin: boolean) => {
  const response = await api.post(`/v1/hackathon/admin/users/${userId}/set-admin`, { is_admin });
  return response.data;
};

export const getAdminTeams = async (params?: {
  page?: number;
  per_page?: number;
  search?: string;
}) => {
  const response = await api.get<TAdminTeamsResponse>('/v1/hackathon/admin/teams', { params });
  return response.data;
};

export const deleteAdminTeam = async (teamId: string) => {
  const response = await api.delete(`/v1/hackathon/admin/teams/${teamId}`);
  return response.data;
};

export const getAdminSubmissions = async (params?: {
  page?: number;
  per_page?: number;
  search?: string;
  status?: string;
}) => {
  const response = await api.get<TAdminSubmissionsResponse>('/v1/hackathon/admin/submissions', { params });
  return response.data;
};

export const getAdminWinners = async () => {
  const response = await api.get('/v1/hackathon/admin/winners');
  return response.data;
};

export const setWinner = async (data: { team_id: string; rank: number; prize?: string }) => {
  const response = await api.post('/v1/hackathon/admin/winners', data);
  return response.data;
};

export const removeWinner = async (teamId: string) => {
  const response = await api.delete(`/v1/hackathon/admin/winners/${teamId}`);
  return response.data;
};
