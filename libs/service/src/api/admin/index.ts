import { api } from '../index';
import type {
  TAdminUsersResponse,
  TAdminTeamsResponse,
  TAdminSubmissionsResponse,
} from '../../types/admin';

const ADMIN_BASE_URL = '/admin';

// Admin Users
export const getAdminUsers = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  city?: string;
}) => {
  const response = await api.get<TAdminUsersResponse>(
    `${ADMIN_BASE_URL}/users`,
    { params }
  );
  return response.data;
};

// Admin Teams
export const getAdminTeams = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  city?: string;
  visibility?: string;
}) => {
  const response = await api.get<TAdminTeamsResponse>(
    `${ADMIN_BASE_URL}/teams`,
    { params }
  );
  return response.data;
};

// Admin Submissions
export const getAdminSubmissions = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) => {
  const response = await api.get<TAdminSubmissionsResponse>(
    `${ADMIN_BASE_URL}/submissions`,
    { params }
  );
  return response.data;
};
