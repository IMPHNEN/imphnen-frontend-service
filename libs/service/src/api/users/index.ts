import { api, ApiResponse } from '../index';
import type {
  TUsersListItem,
  TUsersDetailItem,
  TUserCreateRequest,
  TUserUpdateRequest,
  TUsersMeResponse,
} from '../../types/users';
import type { TApiPaginated, TPaginationParams } from '../../types/common';


export type TUserMeInclude = 'hackathon' | 'qr' | 'mentor' | 'sessions';

export const getUserList = async (params?: TPaginationParams): Promise<TApiPaginated<TUsersListItem>> => {
  const response = await api.get<TApiPaginated<TUsersListItem>>('/v1/iam/users', { params });
  return response.data;
};

export const getUserMe = async (include?: TUserMeInclude[]): Promise<TUsersMeResponse> => {
  const params = include?.length ? { include: include.join(',') } : undefined;
  const response = await api.get<ApiResponse<TUsersMeResponse>>('/v1/iam/users/me', { params });
  return response.data.data;
};

export const getUserById = async (id: string): Promise<TUsersDetailItem> => {
  const response = await api.get<ApiResponse<TUsersDetailItem>>(`/v1/iam/users/detail/${id}`);
  return response.data.data;
};

export const createUser = async (data: TUserCreateRequest): Promise<TUsersDetailItem> => {
  const response = await api.post<ApiResponse<TUsersDetailItem>>('/v1/iam/users/create', data);
  return response.data.data;
};

export const updateUserMe = async (data: TUserUpdateRequest): Promise<TUsersDetailItem> => {
  const response = await api.put<ApiResponse<TUsersDetailItem>>('/v1/iam/users/update/me', data);
  return response.data.data;
};

export const updateUserById = async (id: string, data: TUserUpdateRequest): Promise<TUsersDetailItem> => {
  const response = await api.put<ApiResponse<TUsersDetailItem>>(`/v1/iam/users/update/${id}`, data);
  return response.data.data;
};

export const activateUser = async (id: string, is_active: boolean): Promise<{ message: string }> => {
  const response = await api.put<{ message: string }>(`/v1/iam/users/activate/${id}`, { is_active });
  return response.data;
};

export const deleteUser = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/v1/iam/users/delete/${id}`);
  return response.data;
};

export const uploadUserFile = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post<ApiResponse<{ url: string }>>('/v1/iam/users/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data;
};

// Legacy service object for backward compatibility
export const userService = {
  getUserMe,
  getUserById,
  updateUserMe,
  updateUserById: (id: string, data: TUserUpdateRequest) => updateUserById(id, data),
};
