import { useQuery, useMutation, UseQueryResult, UseMutationResult, UseQueryOptions } from '@tanstack/react-query';
import { mentorService } from '../../api/mentors';
import { MentorDetailResponseDto, MentorUpdateRequestDto } from '../../types/mentors';
import { TResponseError } from '../../types/common';

export const useMentorMe = (options?: UseQueryOptions<MentorDetailResponseDto, TResponseError>): UseQueryResult<MentorDetailResponseDto, TResponseError> => {
  return useQuery({
    queryKey: ['mentor-me'],
    queryFn: () => mentorService.getMentorMe(),
    ...options,
  });
};

export const useMentorById = (id: string, options?: UseQueryOptions<MentorDetailResponseDto, TResponseError>): UseQueryResult<MentorDetailResponseDto, TResponseError> => {
  return useQuery({
    queryKey: ['mentor-by-id', id],
    queryFn: () => mentorService.getMentorById(id),
    enabled: !!id,
    ...options,
  });
};

export const useUpdateMentorMe = (): UseMutationResult<
  MentorDetailResponseDto,
  TResponseError,
  MentorUpdateRequestDto,
  unknown
> => {
  return useMutation({
    mutationKey: ['update-mentor-me'],
    mutationFn: (data) => mentorService.updateMentorMe(data),
  });
};

export const useUpdateMentorById = (): UseMutationResult<
  MentorDetailResponseDto,
  TResponseError,
  { id: string; data: MentorUpdateRequestDto },
  unknown
> => {
  return useMutation({
    mutationKey: ['update-mentor-by-id'],
    mutationFn: ({ id, data }) => mentorService.updateMentorById(id, data),
  });
};
