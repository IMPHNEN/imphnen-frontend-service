import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../auth';
import {
  getUserMe,
  getUserById,
  getUserList,
  updateUserMe,
  updateUserById,
} from '../../api/users';
import { api } from '../../api/index';
import type { TApiPaginated, TPaginationParams } from '../../types/common';
import type { TUsersDetailItem, TUserUpdateRequest } from '../../types/users';

export interface CertificatePublicData {
  user: { id: string; fullname: string; email: string; avatar?: string };
  team?: { id: string; name: string; logo?: string; is_leader: boolean };
  submission?: { id: string; title: string; description: string; repository_url?: string; demo_url?: string };
  winner?: { rank: number; prize?: string };
}

export const useUserMe = () => {
  const { session } = useAuthStore();
  return useQuery({
    queryKey: ['user-me'],
    queryFn: async () => {
      const data = await getUserMe();
      return { data };
    },
    enabled: !!session?.user?.id,
  });
};

export const useUserById = (id: string) => {
  return useQuery({
    queryKey: ['user-by-id', id],
    queryFn: async () => {
      const data = await getUserById(id);
      return { data };
    },
    enabled: !!id,
  });
};

export const useUserDetailsById = (userId: string) => {
  return useQuery({
    queryKey: ['user-details', userId],
    queryFn: async () => {
      const data = await getUserById(userId);
      return { data };
    },
    enabled: !!userId,
  });
};

export const useUserList = (params?: TPaginationParams) => {
  return useQuery({
    queryKey: ['user-list', params],
    queryFn: () => getUserList(params),
  });
};

export const useUpdateUserMe = () => {
  const queryClient = useQueryClient();
  const { session, setSession } = useAuthStore();

  return useMutation({
    mutationKey: ['update-user-me'],
    mutationFn: (data: TUserUpdateRequest) => {
      if (!session?.user?.id) throw new Error('You must be logged in to update profile');
      return updateUserMe(data);
    },
    onSuccess: (result) => {
      if (session?.user && result) {
        setSession({
          token: session.token,
          user: {
            ...session.user,
            fullname: result.fullname || session.user.fullname,
            bio: result.profile_extension?.bio || '',
            location: result.profile_extension?.location || '',
            avatar: result.avatar || session.user.avatar,
            skills: result.profile_extension?.skills || [],
          },
        });
      }
      queryClient.invalidateQueries({ queryKey: ['user-me'] });
    },
  });
};

export const useUpdateUserById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-user-by-id'],
    mutationFn: ({ id, data }: { id: string; data: TUserUpdateRequest }) => updateUserById(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user-by-id', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['user-list'] });
    },
  });
};

export const useCertificatePublicData = (userId: string, enabled = true) => {
  return useQuery({
    queryKey: ['certificate-public-data', userId],
    queryFn: async () => {
      const response = await api.get<{ data: CertificatePublicData }>(
        `/v1/hackathon/certificates/${userId}`
      );
      return { data: response.data.data };
    },
    enabled: enabled && !!userId,
  });
};
