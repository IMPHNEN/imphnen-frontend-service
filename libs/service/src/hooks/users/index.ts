import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { hackathonApi, HackathonApiResponse } from '../../api/hackathon';
import { useAuthStore } from '../auth';

interface User {
  id: string;
  email: string;
  fullname: string;
  bio?: string;
  location?: string;
  avatar?: string;
  skills?: string[];
  created_at: string;
  updated_at?: string;
}

interface CertificateUserData {
  id: string;
  fullname: string;
  email: string;
  avatar?: string;
}

interface CertificateTeamData {
  id: string;
  name: string;
  logo?: string;
  is_leader: boolean;
}

interface CertificateSubmissionData {
  id: string;
  title: string;
  description: string;
  repository_url?: string;
  demo_url?: string;
}

interface CertificateWinnerData {
  rank: number;
  prize?: string;
}

export interface CertificatePublicData {
  user: CertificateUserData;
  team?: CertificateTeamData;
  submission?: CertificateSubmissionData;
  winner?: CertificateWinnerData;
}

interface UpdateUserRequest {
  fullname?: string;
  bio?: string;
  location?: string;
  avatar?: string;
  skills?: string[];
}

export const useUserMe = () => {
  const { session } = useAuthStore();

  return useQuery({
    queryKey: ['user-me'],
    queryFn: async () => {
      const response = await hackathonApi.get<HackathonApiResponse<User>>('/users/me');
      return { data: response.data.data };
    },
    enabled: !!session?.user?.id,
  });
};

export const useUserById = (id: string) => {
  return useQuery({
    queryKey: ['user-by-id', id],
    queryFn: async () => {
      const response = await hackathonApi.get<HackathonApiResponse<User>>(`/users/${id}`);
      return { data: response.data.data };
    },
    enabled: !!id,
  });
};

export const useUpdateUserMe = () => {
  const queryClient = useQueryClient();
  const { session, setSession } = useAuthStore();

  return useMutation({
    mutationKey: ['update-user-me'],
    mutationFn: async (data: UpdateUserRequest) => {
      if (!session?.user?.id) {
        throw new Error('You must be logged in to update profile');
      }

      const response = await hackathonApi.put<HackathonApiResponse<User>>('/users/me', {
        fullname: data.fullname,
        bio: data.bio,
        location: data.location,
        avatar: data.avatar,
        skills: data.skills,
      });

      return { data: response.data.data };
    },
    onSuccess: (result) => {
      if (session?.user && result.data) {
        setSession({
          token: session.token,
          user: {
            ...session.user,
            fullname: result.data.fullname || session.user.fullname,
            bio: result.data.bio || '',
            location: result.data.location || '',
            avatar: result.data.avatar || session.user.avatar,
            skills: result.data.skills || [],
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
    mutationFn: async ({ id, data }: { id: string; data: UpdateUserRequest }) => {
      const response = await hackathonApi.put<HackathonApiResponse<User>>(`/users/${id}`, data);
      return { data: response.data.data };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user-by-id', variables.id] });
    },
  });
};

export const useUserDetailsById = (userId: string) => {
  return useQuery({
    queryKey: ['user-details', userId],
    queryFn: async () => {
      const response = await hackathonApi.get<HackathonApiResponse<User>>(`/users/${userId}`);
      return { data: response.data.data };
    },
    enabled: !!userId,
  });
};

export const useCertificatePublicData = (userId: string, enabled = true) => {
  return useQuery({
    queryKey: ['certificate-public-data', userId],
    queryFn: async () => {
      const response = await hackathonApi.get<HackathonApiResponse<CertificatePublicData>>(
        `/certificates/${userId}`
      );
      return { data: response.data.data };
    },
    enabled: enabled && !!userId,
  });
};
