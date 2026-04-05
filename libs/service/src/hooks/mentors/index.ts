import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getMentorMe,
  getMentorById,
  getMentorList,
  updateMentorMe,
  updateMentorById,
  verifyMentor,
  deleteMentor,
} from '../../api/mentors';
import type { MentorDetailResponseDto, MentorUpdateRequestDto } from '../../types/mentors';
import type { TPaginationParams } from '../../types/common';

export const useMentorMe = () => {
  return useQuery({
    queryKey: ['mentor-me'],
    queryFn: getMentorMe,
  });
};

export const useMentorById = (id: string) => {
  return useQuery({
    queryKey: ['mentor-by-id', id],
    queryFn: () => getMentorById(id),
    enabled: !!id,
  });
};

export const useMentorList = (params?: TPaginationParams) => {
  return useQuery({
    queryKey: ['mentor-list', params],
    queryFn: () => getMentorList(params),
  });
};

export const useUpdateMentorMe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-mentor-me'],
    mutationFn: (data: MentorUpdateRequestDto) => updateMentorMe(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['mentor-me'] }),
  });
};

export const useUpdateMentorById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-mentor-by-id'],
    mutationFn: ({ id, data }: { id: string; data: MentorUpdateRequestDto }) =>
      updateMentorById(id, data),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ['mentor-by-id', vars.id] });
      queryClient.invalidateQueries({ queryKey: ['mentor-list'] });
    },
  });
};

export const useVerifyMentor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => verifyMentor(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['mentor-list'] }),
  });
};

export const useDeleteMentor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMentor(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['mentor-list'] }),
  });
};
