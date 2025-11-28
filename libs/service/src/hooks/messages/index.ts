import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { hackathonApi, HackathonApiResponse } from '../../api/hackathon';
import { useAuthStore } from '../auth';

export type Message = {
  id: string;
  team_id: string;
  user_id: string;
  message: string;
  created_at: string;
  updated_at: string;
  user?: {
    id: string;
    fullname: string;
    avatar: string;
    email: string;
  };
};

// Query keys
export const messageKeys = {
  all: ['messages'] as const,
  team: (teamId: string) => [...messageKeys.all, 'team', teamId] as const,
};

// Fetch messages for a team with polling
export const useTeamMessages = (teamId: string) => {
  return useQuery({
    queryKey: messageKeys.team(teamId),
    queryFn: async () => {
      const response = await hackathonApi.get<HackathonApiResponse<Message[]>>(
        `/chat/teams/${teamId}`
      );
      return response.data.data || [];
    },
    enabled: !!teamId,
    // Poll every 3 seconds for new messages
    refetchInterval: 3000,
    // Keep refetching even when window loses focus
    refetchIntervalInBackground: true,
  });
};

// Send a message
export const useSendMessage = (teamId: string) => {
  const queryClient = useQueryClient();
  const { session } = useAuthStore();

  return useMutation({
    mutationFn: async (message: string) => {
      if (!session?.user?.id) {
        throw new Error('You must be logged in to send messages');
      }

      const response = await hackathonApi.post<HackathonApiResponse<Message>>(
        `/chat/teams/${teamId}`,
        { message }
      );

      return response.data.data;
    },
    onSuccess: () => {
      // Invalidate to trigger immediate refetch
      queryClient.invalidateQueries({ queryKey: messageKeys.team(teamId) });
    },
  });
};

// Delete a message
export const useDeleteMessage = (teamId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (messageId: string) => {
      await hackathonApi.delete(`/chat/messages/${messageId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: messageKeys.team(teamId) });
    },
  });
};
