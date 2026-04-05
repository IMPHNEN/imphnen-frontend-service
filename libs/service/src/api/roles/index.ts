import { api, ApiResponse } from '../index';
import type { TRolesListItem, TRoleDetailItem, TRoleCreateRequest, TRoleUpdateRequest } from '../../types/roles';
import type { TApiPaginated, TPaginationParams } from '../../types/common';

export const getRoleList = async (params?: TPaginationParams): Promise<TApiPaginated<TRolesListItem>> => {
  const response = await api.get<TApiPaginated<TRolesListItem>>('/v1/iam/roles', { params });
  return response.data;
};

export const getRoleById = async (id: string): Promise<TRoleDetailItem> => {
  const response = await api.get<ApiResponse<TRoleDetailItem>>(`/v1/iam/roles/detail/${id}`);
  return response.data.data;
};

export const createRole = async (data: TRoleCreateRequest): Promise<TRoleDetailItem> => {
  const response = await api.post<ApiResponse<TRoleDetailItem>>('/v1/iam/roles/create', data);
  return response.data.data;
};

export const updateRole = async (id: string, data: TRoleUpdateRequest): Promise<TRoleDetailItem> => {
  const response = await api.put<ApiResponse<TRoleDetailItem>>(`/v1/iam/roles/update/${id}`, data);
  return response.data.data;
};

export const deleteRole = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/v1/iam/roles/delete/${id}`);
  return response.data;
};
