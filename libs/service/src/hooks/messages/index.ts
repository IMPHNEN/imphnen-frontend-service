import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/index';
import { useAuthStore } from '../auth';

export type Message = {
  id: string;
  team_id: string;
  user_id: string;
  message: string;
  created_at: string;
  updated_at: string;
  user?: { id: string; fullname: string; avatar: string; email: string };
};

export const messageKeys = {
  all: ['messages'] as const,
  team: (teamId: string) => [...messageKeys.all, 'team', teamId] as const,
};

interface ApiResp<T> { data: T; message?: string; }

export const useTeamMessages = (teamId: string) => {
  return useQuery({
    queryKey: messageKeys.team(teamId),
    queryFn: async () => {
      const response = await api.get<ApiResp<Message[]>>(`/v1/hackathon/chat/teams/${teamId}`);
      return response.data.data || [];
    },
    enabled: !!teamId,
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
  });
};

export const useSendMessage = (teamId: string) => {
  const queryClient = useQueryClient();
  const { session } = useAuthStore();

  return useMutation({
    mutationFn: async (message: string) => {
      if (!session?.user?.id) throw new Error('You must be logged in to send messages');
      const response = await api.post<ApiResp<Message>>(`/v1/hackathon/chat/teams/${teamId}`, { message });
      return response.data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: messageKeys.team(teamId) }),
  });
};

export const useDeleteMessage = (teamId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (messageId: string) => {
      await api.delete(`/v1/hackathon/chat/messages/${messageId}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: messageKeys.team(teamId) }),
  });
};
