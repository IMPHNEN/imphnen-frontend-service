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
  per_page?: number;
  search?: string;
  is_admin?: boolean;
}) => {
  const response = await api.get<TAdminUsersResponse>(
    `${ADMIN_BASE_URL}/users`,
    {
      params: {
        ...params,
        is_admin: params?.is_admin ?? false,
      },
    }
  );
  return response.data;
};

// Admin Teams
export const getAdminTeams = async (params?: {
  page?: number;
  per_page?: number;
  search?: string;
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
  per_page?: number;
  search?: string;
  status?: string;
}) => {
  const response = await api.get<TAdminSubmissionsResponse>(
    `${ADMIN_BASE_URL}/submissions`,
    { params }
  );
  return response.data;
};
