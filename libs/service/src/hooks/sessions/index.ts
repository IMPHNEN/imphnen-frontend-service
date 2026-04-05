import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getMentorAvailability,
  bookSession,
  getMentorSessions,
  getMySessions,
  updateSessionStatus,
  submitFeedback,
} from '../../api/sessions';
import type {
  TBookSessionRequest,
  TUpdateSessionStatusRequest,
  TSessionFeedbackRequest,
} from '../../types/sessions';

export const sessionKeys = {
  all: ['sessions'] as const,
  mine: (params?: Record<string, unknown>) => [...sessionKeys.all, 'mine', params] as const,
  mentor: (id: string) => [...sessionKeys.all, 'mentor', id] as const,
  availability: (id: string) => [...sessionKeys.all, 'availability', id] as const,
};

export const useMentorAvailability = (mentorId: string) => {
  return useQuery({
    queryKey: sessionKeys.availability(mentorId),
    queryFn: () => getMentorAvailability(mentorId),
    enabled: !!mentorId,
  });
};

export const useBookSession = (mentorId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TBookSessionRequest) => bookSession(mentorId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.mentor(mentorId) });
      queryClient.invalidateQueries({ queryKey: sessionKeys.all });
    },
  });
};

export const useMentorSessions = (mentorId: string, params?: { status?: string }) => {
  return useQuery({
    queryKey: sessionKeys.mentor(mentorId),
    queryFn: () => getMentorSessions(mentorId, params),
    enabled: !!mentorId,
  });
};

export const useMySessions = (params?: { status?: string }) => {
  return useQuery({
    queryKey: sessionKeys.mine(params as Record<string, unknown>),
    queryFn: () => getMySessions(params),
  });
};

export const useUpdateSessionStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TUpdateSessionStatusRequest }) =>
      updateSessionStatus(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: sessionKeys.all }),
  });
};

export const useSubmitFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TSessionFeedbackRequest }) =>
      submitFeedback(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: sessionKeys.all }),
  });
};
