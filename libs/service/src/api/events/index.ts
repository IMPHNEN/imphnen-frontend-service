import { api, ApiResponse } from '../index';
import type { TEventsListItem, TEventsDetailItem, TEventCreateRequest, TEventUpdateRequest } from '../../types/events';
import type { TApiPaginated, TPaginationParams } from '../../types/common';

export const getEventList = async (params?: TPaginationParams): Promise<TApiPaginated<TEventsListItem>> => {
  const response = await api.get<TApiPaginated<TEventsListItem>>('/v1/landing/cms/events', { params });
  return response.data;
};

export const getEventById = async (id: string): Promise<TEventsDetailItem> => {
  const response = await api.get<ApiResponse<TEventsDetailItem>>(`/v1/landing/cms/events/detail/${id}`);
  return response.data.data;
};

export const createEvent = async (data: TEventCreateRequest): Promise<TEventsDetailItem> => {
  const response = await api.post<ApiResponse<TEventsDetailItem>>('/v1/landing/cms/events/create', data);
  return response.data.data;
};

export const updateEvent = async (id: string, data: TEventUpdateRequest): Promise<TEventsDetailItem> => {
  const response = await api.patch<ApiResponse<TEventsDetailItem>>(`/v1/landing/cms/events/update/${id}`, data);
  return response.data.data;
};

export const deleteEvent = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/v1/landing/cms/events/delete/${id}`);
  return response.data;
};
