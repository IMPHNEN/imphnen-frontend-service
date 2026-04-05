import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPermissionList,
  getPermissionById,
  createPermission,
  updatePermission,
  deletePermission,
} from '../../api/permissions';
import type { TPermissionCreateRequest, TPermissionUpdateRequest } from '../../types/permissions';
import type { TPaginationParams } from '../../types/common';

export const permissionKeys = {
  all: ['permissions'] as const,
  lists: () => [...permissionKeys.all, 'list'] as const,
  list: (params?: TPaginationParams) => [...permissionKeys.lists(), params] as const,
  detail: (id: string) => [...permissionKeys.all, 'detail', id] as const,
};

export const usePermissionList = (params?: TPaginationParams) => {
  return useQuery({
    queryKey: permissionKeys.list(params),
    queryFn: () => getPermissionList(params),
  });
};

export const usePermissionById = (id: string) => {
  return useQuery({
    queryKey: permissionKeys.detail(id),
    queryFn: () => getPermissionById(id),
    enabled: !!id,
  });
};

export const useCreatePermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TPermissionCreateRequest) => createPermission(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: permissionKeys.lists() }),
  });
};

export const useUpdatePermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TPermissionUpdateRequest }) => updatePermission(id, data),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: permissionKeys.lists() });
      queryClient.invalidateQueries({ queryKey: permissionKeys.detail(vars.id) });
    },
  });
};

export const useDeletePermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePermission(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: permissionKeys.lists() }),
  });
};
