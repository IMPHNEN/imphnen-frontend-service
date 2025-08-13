import { useQuery, useMutation, UseQueryResult, UseMutationResult, UseQueryOptions } from '@tanstack/react-query';
import { userService, UserDetailResponseDto, UserUpdateRequestDto } from '../../api/users';
import { TResponseError } from '../../types/common';

export const useUserMe = (options?: UseQueryOptions<UserDetailResponseDto, TResponseError>): UseQueryResult<UserDetailResponseDto, TResponseError> => {
  return useQuery({
    queryKey: ['user-me'],
    queryFn: () => userService.getUserMe(),
    ...options,
  });
};

export const useUserById = (id: string, options?: UseQueryOptions<UserDetailResponseDto, TResponseError>): UseQueryResult<UserDetailResponseDto, TResponseError> => {
  return useQuery({
    queryKey: ['user-by-id', id],
    queryFn: () => userService.getUserById(id),
    enabled: !!id,
    ...options,
  });
};

export const useUpdateUserMe = (): UseMutationResult<
  UserDetailResponseDto,
  TResponseError,
  UserUpdateRequestDto,
  unknown
> => {
  return useMutation({
    mutationKey: ['update-user-me'],
    mutationFn: (data) => userService.updateUserMe(data),
  });
};

export const useUpdateUserById = (): UseMutationResult<
  UserDetailResponseDto,
  TResponseError,
  { id: string; data: UserUpdateRequestDto },
  unknown
> => {
  return useMutation({
    mutationKey: ['update-user-by-id'],
    mutationFn: ({ id, data }) => userService.updateUserById(id, data),
  });
};
