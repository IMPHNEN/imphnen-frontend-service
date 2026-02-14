import { api } from '../../auth/api/auth.service';

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateUserRoleRequest {
  role: string;
}

interface UsersResponse {
  success: boolean;
  message: string;
  data: User[];
}

interface UserResponse {
  success: boolean;
  message: string;
  data: User;
}

interface DeleteResponse {
  success: boolean;
  message: string;
}

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await api.get<UsersResponse>('/users');
    return response.data.data;
  },

  updateUserRole: async (
    userId: string,
    role: string
  ): Promise<User> => {
    const response = await api.put<UserResponse>(`/users/${userId}/role`, {
      role,
    });
    return response.data.data;
  },

  deleteUser: async (userId: string): Promise<void> => {
    await api.delete<DeleteResponse>(`/users/${userId}`);
  },
};
