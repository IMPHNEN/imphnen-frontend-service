import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getRoadmapList,
  createRoadmap,
  updateRoadmap,
  deleteRoadmap,
} from '../../api/roadmap';
import type { TRoadmapCreateRequest, TRoadmapUpdateRequest } from '../../types/roadmap';

export const roadmapKeys = {
  all: ['roadmap'] as const,
  list: () => [...roadmapKeys.all, 'list'] as const,
};

export const useRoadmapList = () => {
  return useQuery({
    queryKey: roadmapKeys.list(),
    queryFn: () => getRoadmapList(),
  });
};

export const useCreateRoadmap = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TRoadmapCreateRequest) => createRoadmap(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: roadmapKeys.list() }),
  });
};

export const useUpdateRoadmap = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TRoadmapUpdateRequest }) => updateRoadmap(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: roadmapKeys.list() }),
  });
};

export const useDeleteRoadmap = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteRoadmap(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: roadmapKeys.list() }),
  });
};
