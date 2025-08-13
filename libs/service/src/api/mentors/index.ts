import { api, ApiResponse } from '../index';
import type {
  MentorDetailResponseDto,
  MentorUpdateRequestDto
} from '../../types/mentors';

export interface MentorService {
  getMentorMe(): Promise<MentorDetailResponseDto>;
  getMentorById(id: string): Promise<MentorDetailResponseDto>;
  updateMentorMe(data: MentorUpdateRequestDto): Promise<MentorDetailResponseDto>;
  updateMentorById(id: string, data: MentorUpdateRequestDto): Promise<MentorDetailResponseDto>;
}

export const mentorService: MentorService = {
  async getMentorMe() {
    const response = await api.get<ApiResponse<MentorDetailResponseDto>>('/mentors/me');
    return response.data.data;
  },

  async getMentorById(id: string) {
    const response = await api.get<ApiResponse<MentorDetailResponseDto>>(`/mentors/detail/${id}`);
    return response.data.data;
  },

  async updateMentorMe(data: MentorUpdateRequestDto) {
    const response = await api.put<ApiResponse<MentorDetailResponseDto>>('/mentors/update/me', data);
    return response.data.data;
  },

  async updateMentorById(id: string, data: MentorUpdateRequestDto) {
    const response = await api.put<ApiResponse<MentorDetailResponseDto>>(`/mentors/update/${id}`, data);
    return response.data.data;
  },
};
