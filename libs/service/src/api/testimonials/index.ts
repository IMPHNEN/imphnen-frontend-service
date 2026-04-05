import { api, ApiResponse } from '../index';
import type {
  TTestimonialsListItem,
  TTestimonialsDetailItem,
  TTestimonialCreateRequest,
  TTestimonialUpdateRequest,
} from '../../types/testimonials';
import type { TApiPaginated, TPaginationParams } from '../../types/common';

export const getTestimonialList = async (params?: TPaginationParams): Promise<TApiPaginated<TTestimonialsListItem>> => {
  const response = await api.get<TApiPaginated<TTestimonialsListItem>>('/v1/landing/cms/testimonials', { params });
  return response.data;
};

export const getTestimonialById = async (id: string): Promise<TTestimonialsDetailItem> => {
  const response = await api.get<ApiResponse<TTestimonialsDetailItem>>(`/v1/landing/cms/testimonials/detail/${id}`);
  return response.data.data;
};

export const createTestimonial = async (data: TTestimonialCreateRequest): Promise<TTestimonialsDetailItem> => {
  const response = await api.post<ApiResponse<TTestimonialsDetailItem>>('/v1/landing/cms/testimonials/create', data);
  return response.data.data;
};

export const updateTestimonial = async (id: string, data: TTestimonialUpdateRequest): Promise<TTestimonialsDetailItem> => {
  const response = await api.patch<ApiResponse<TTestimonialsDetailItem>>(`/v1/landing/cms/testimonials/update/${id}`, data);
  return response.data.data;
};

export const deleteTestimonial = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/v1/landing/cms/testimonials/delete/${id}`);
  return response.data;
};
