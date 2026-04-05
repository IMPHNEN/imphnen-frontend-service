import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRoleList, getRoleById, createRole, updateRole, deleteRole } from '../../api/roles';
import type { TRoleCreateRequest, TRoleUpdateRequest } from '../../types/roles';
import type { TPaginationParams } from '../../types/common';

export const roleKeys = {
  all: ['roles'] as const,
  lists: () => [...roleKeys.all, 'list'] as const,
  list: (params?: TPaginationParams) => [...roleKeys.lists(), params] as const,
  detail: (id: string) => [...roleKeys.all, 'detail', id] as const,
};

export const useRoleList = (params?: TPaginationParams) => {
  return useQuery({
    queryKey: roleKeys.list(params),
    queryFn: () => getRoleList(params),
  });
};

export const useRoleById = (id: string) => {
  return useQuery({
    queryKey: roleKeys.detail(id),
    queryFn: () => getRoleById(id),
    enabled: !!id,
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TRoleCreateRequest) => createRole(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: roleKeys.lists() }),
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TRoleUpdateRequest }) => updateRole(id, data),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
      queryClient.invalidateQueries({ queryKey: roleKeys.detail(vars.id) });
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteRole(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: roleKeys.lists() }),
  });
};
