import { api, ApiResponse } from '../index';
import type { TPermissionItem, TPermissionCreateRequest, TPermissionUpdateRequest } from '../../types/permissions';
import type { TApiPaginated, TPaginationParams } from '../../types/common';

export const getPermissionList = async (params?: TPaginationParams): Promise<TApiPaginated<TPermissionItem>> => {
  const response = await api.get<TApiPaginated<TPermissionItem>>('/v1/iam/permissions', { params });
  return response.data;
};

export const getPermissionById = async (id: string): Promise<TPermissionItem> => {
  const response = await api.get<ApiResponse<TPermissionItem>>(`/v1/iam/permissions/detail/${id}`);
  return response.data.data;
};

export const createPermission = async (data: TPermissionCreateRequest): Promise<TPermissionItem> => {
  const response = await api.post<ApiResponse<TPermissionItem>>('/v1/iam/permissions/create', data);
  return response.data.data;
};

export const updatePermission = async (id: string, data: TPermissionUpdateRequest): Promise<TPermissionItem> => {
  const response = await api.put<ApiResponse<TPermissionItem>>(`/v1/iam/permissions/update/${id}`, data);
  return response.data.data;
};

export const deletePermission = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/v1/iam/permissions/delete/${id}`);
  return response.data;
};
