import { api, ApiResponse } from '../index';
import type {
  TBookSessionRequest,
  TBookSessionResponse,
  TUpdateSessionStatusRequest,
  TUpdateSessionStatusResponse,
  TSessionFeedbackRequest,
  TSessionFeedbackResponse,
  TSessionListResponse,
  TMentorAvailability,
} from '../../types/sessions';

export const getMentorAvailability = async (mentorId: string): Promise<TMentorAvailability> => {
  const response = await api.get<ApiResponse<TMentorAvailability>>(
    `/v1/dimentorin/mentors/${mentorId}/availability`
  );
  return response.data.data;
};

export const bookSession = async (mentorId: string, data: TBookSessionRequest): Promise<TBookSessionResponse> => {
  const response = await api.post<ApiResponse<TBookSessionResponse>>(
    `/v1/dimentorin/mentors/${mentorId}/sessions/create`,
    data
  );
  return response.data.data;
};

export const getMentorSessions = async (mentorId: string, params?: { status?: string }): Promise<TSessionListResponse> => {
  const response = await api.get<ApiResponse<TSessionListResponse>>(
    `/v1/dimentorin/mentors/${mentorId}/sessions`,
    { params }
  );
  return response.data.data;
};

export const getMySessions = async (params?: { status?: string }): Promise<TSessionListResponse> => {
  const response = await api.get<ApiResponse<TSessionListResponse>>(
    '/v1/dimentorin/sessions/me',
    { params }
  );
  return response.data.data;
};

export const updateSessionStatus = async (
  id: string,
  data: TUpdateSessionStatusRequest
): Promise<TUpdateSessionStatusResponse> => {
  const response = await api.put<ApiResponse<TUpdateSessionStatusResponse>>(
    `/v1/dimentorin/sessions/update/${id}/status`,
    data
  );
  return response.data.data;
};

export const submitFeedback = async (
  id: string,
  data: TSessionFeedbackRequest
): Promise<TSessionFeedbackResponse> => {
  const response = await api.post<ApiResponse<TSessionFeedbackResponse>>(
    `/v1/dimentorin/sessions/${id}/feedback/create`,
    data
  );
  return response.data.data;
};
