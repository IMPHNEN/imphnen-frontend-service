import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getEventList,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../../api/events';
import type { TEventCreateRequest, TEventUpdateRequest } from '../../types/events';
import type { TPaginationParams } from '../../types/common';

export const eventKeys = {
  all: ['events'] as const,
  lists: () => [...eventKeys.all, 'list'] as const,
  list: (params?: TPaginationParams) => [...eventKeys.lists(), params] as const,
  detail: (id: string) => [...eventKeys.all, 'detail', id] as const,
};

export const useEventList = (params?: TPaginationParams) => {
  return useQuery({
    queryKey: eventKeys.list(params),
    queryFn: () => getEventList(params),
  });
};

export const useEventById = (id: string) => {
  return useQuery({
    queryKey: eventKeys.detail(id),
    queryFn: () => getEventById(id),
    enabled: !!id,
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TEventCreateRequest) => createEvent(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: eventKeys.lists() }),
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TEventUpdateRequest }) => updateEvent(id, data),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
      queryClient.invalidateQueries({ queryKey: eventKeys.detail(vars.id) });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteEvent(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: eventKeys.lists() }),
  });
};
