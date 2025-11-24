import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../supabase';
import { useAuthStore } from '@imphnen-frontend-service/utils';
import { useEffect } from 'react';

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

// Fetch messages for a team
export const useTeamMessages = (teamId: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: messageKeys.team(teamId),
    queryFn: async () => {
      const { data: messages, error } = await supabase
        .from('team_messages')
        .select(`
          id,
          team_id,
          user_id,
          message,
          created_at,
          updated_at,
          user:users(id, fullname, avatar, email)
        `)
        .eq('team_id', teamId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Failed to fetch messages:', error);
        throw new Error(error.message || 'Failed to fetch messages');
      }

      return messages as Message[];
    },
    enabled: !!teamId,
  });

  // Subscribe to realtime updates
  useEffect(() => {
    if (!teamId) return;

    const channel = supabase
      .channel(`team_messages:${teamId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'team_messages',
          filter: `team_id=eq.${teamId}`,
        },
        async (payload) => {
          console.log('[Realtime] New message:', payload);

          // Fetch the full message with user data
          const { data: newMessage } = await supabase
            .from('team_messages')
            .select(`
              id,
              team_id,
              user_id,
              message,
              created_at,
              updated_at,
              user:users(id, fullname, avatar, email)
            `)
            .eq('id', payload.new.id)
            .single();

          if (newMessage) {
            queryClient.setQueryData<Message[]>(
              messageKeys.team(teamId),
              (old) => [...(old || []), newMessage as Message]
            );
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'team_messages',
          filter: `team_id=eq.${teamId}`,
        },
        (payload) => {
          console.log('[Realtime] Message deleted:', payload);
          queryClient.setQueryData<Message[]>(
            messageKeys.team(teamId),
            (old) => old?.filter((msg) => msg.id !== payload.old.id) || []
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [teamId, queryClient]);

  return query;
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

      const { data, error } = await supabase
        .from('team_messages')
        .insert({
          team_id: teamId,
          user_id: session.user.id,
          message,
        })
        .select()
        .single();

      if (error) {
        console.error('Failed to send message:', error);
        throw new Error(error.message || 'Failed to send message');
      }

      return data;
    },
    onSuccess: () => {
      // Realtime will handle adding the message to the list
      // But we can invalidate to ensure consistency
      queryClient.invalidateQueries({ queryKey: messageKeys.team(teamId) });
    },
  });
};

// Delete a message
export const useDeleteMessage = (teamId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (messageId: string) => {
      const { error } = await supabase
        .from('team_messages')
        .delete()
        .eq('id', messageId);

      if (error) {
        console.error('Failed to delete message:', error);
        throw new Error(error.message || 'Failed to delete message');
      }
    },
    onSuccess: () => {
      // Realtime will handle removing the message from the list
      queryClient.invalidateQueries({ queryKey: messageKeys.team(teamId) });
    },
  });
};
