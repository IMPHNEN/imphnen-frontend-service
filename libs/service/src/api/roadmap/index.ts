import { api, ApiResponse } from '../index';
import type { TRoadmapListItem, TRoadmapDetailItem, TRoadmapCreateRequest, TRoadmapUpdateRequest } from '../../types/roadmap';

export const getRoadmapList = async (): Promise<TRoadmapListItem[]> => {
  const response = await api.get<ApiResponse<TRoadmapListItem[]>>('/v1/landing/cms/roadmap');
  return response.data.data;
};

export const createRoadmap = async (data: TRoadmapCreateRequest): Promise<TRoadmapDetailItem> => {
  const response = await api.post<ApiResponse<TRoadmapDetailItem>>('/v1/landing/cms/roadmap/create', data);
  return response.data.data;
};

export const updateRoadmap = async (id: string, data: TRoadmapUpdateRequest): Promise<TRoadmapDetailItem> => {
  const response = await api.patch<ApiResponse<TRoadmapDetailItem>>(`/v1/landing/cms/roadmap/update/${id}`, data);
  return response.data.data;
};

export const deleteRoadmap = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/v1/landing/cms/roadmap/delete/${id}`);
  return response.data;
};
