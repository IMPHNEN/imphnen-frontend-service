import { api, ApiResponse } from '../index';
import { TUserItem } from '../../types/users';

export interface UserDetailResponseDto extends TUserItem {
  bio?: string;
  location?: string;
  website_url?: string;
  linkedin_url?: string;
  github_url?: string;
  twitter_url?: string;
  skills?: string[];
  experience?: Array<{
    id: string;
    company: string;
    position: string;
    duration: string;
    period: string;
  }>;
  education?: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    period: string;
  }>;
}

export interface UserUpdateRequestDto {
  fullname?: string;
  bio?: string;
  location?: string;
  website_url?: string;
  linkedin_url?: string;
  github_url?: string;
  twitter_url?: string;
  skills?: string[];
  phone_number?: string;
  birthdate?: string;
  gender?: string;
}

export interface UserService {
  getUserMe(): Promise<UserDetailResponseDto>;
  getUserById(id: string): Promise<UserDetailResponseDto>;
  updateUserMe(data: UserUpdateRequestDto): Promise<UserDetailResponseDto>;
  updateUserById(id: string, data: UserUpdateRequestDto): Promise<UserDetailResponseDto>;
}

export const userService: UserService = {
  async getUserMe() {
    const response = await api.get<ApiResponse<UserDetailResponseDto>>('/users/me');
    return response.data.data;
  },

  async getUserById(id: string) {
    const response = await api.get<ApiResponse<UserDetailResponseDto>>(`/users/${id}`);
    return response.data.data;
  },

  async updateUserMe(data: UserUpdateRequestDto) {
    const response = await api.put<ApiResponse<UserDetailResponseDto>>('/users/update/me', data);
    return response.data.data;
  },

  async updateUserById(id: string, data: UserUpdateRequestDto) {
    const response = await api.put<ApiResponse<UserDetailResponseDto>>(`/users/${id}`, data);
    return response.data.data;
  },
};
