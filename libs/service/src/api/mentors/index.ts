import { api, ApiResponse } from '../index';
import type { MentorDetailResponseDto, MentorUpdateRequestDto } from '../../types/mentors';
import type { TApiPaginated, TPaginationParams } from '../../types/common';

export type MentorRegisterRequest = MentorUpdateRequestDto & {
  email: string;
  password: string;
};

export const registerMentor = async (data: MentorRegisterRequest): Promise<MentorDetailResponseDto> => {
  const response = await api.post<ApiResponse<MentorDetailResponseDto>>('/v1/dimentorin/mentors/create', data);
  return response.data.data;
};

export const getMentorList = async (params?: TPaginationParams): Promise<TApiPaginated<MentorDetailResponseDto>> => {
  const response = await api.get<TApiPaginated<MentorDetailResponseDto>>('/v1/dimentorin/mentors', { params });
  return response.data;
};

export const getMentorMe = async (): Promise<MentorDetailResponseDto> => {
  const response = await api.get<ApiResponse<MentorDetailResponseDto>>('/v1/dimentorin/mentors/me');
  return response.data.data;
};

export const getMentorStatus = async (): Promise<{ status: string }> => {
  const response = await api.get<ApiResponse<{ status: string }>>('/v1/dimentorin/mentors/me/status');
  return response.data.data;
};

export const getMentorById = async (id: string): Promise<MentorDetailResponseDto> => {
  const response = await api.get<ApiResponse<MentorDetailResponseDto>>(`/v1/dimentorin/mentors/detail/${id}`);
  return response.data.data;
};

export const updateMentorMe = async (data: MentorUpdateRequestDto): Promise<MentorDetailResponseDto> => {
  const response = await api.put<ApiResponse<MentorDetailResponseDto>>('/v1/dimentorin/mentors/me/update', data);
  return response.data.data;
};

export const updateMentorById = async (id: string, data: MentorUpdateRequestDto): Promise<MentorDetailResponseDto> => {
  const response = await api.put<ApiResponse<MentorDetailResponseDto>>(`/v1/dimentorin/mentors/update/${id}`, data);
  return response.data.data;
};

export const deleteMentor = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/v1/dimentorin/mentors/delete/${id}`);
  return response.data;
};

export const verifyMentor = async (id: string): Promise<{ message: string }> => {
  const response = await api.put<{ message: string }>(`/v1/dimentorin/mentors/verify/${id}`);
  return response.data;
};

// Legacy service object for backward compatibility
export const mentorService = {
  getMentorMe,
  getMentorById,
  updateMentorMe,
  updateMentorById: (id: string, data: MentorUpdateRequestDto) => updateMentorById(id, data),
};
