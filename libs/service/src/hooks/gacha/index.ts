import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getUserCredits,
  addCredits,
  consumeCredit,
  getGachaItemList,
  getGachaItemById,
  createGachaItem,
  updateGachaItem,
  deleteGachaItem,
  executeGachaRoll,
  createGachaClaim,
} from '../../api/gacha';
import type {
  TGachaCreditAddRequest,
  TGachaItemCreateRequest,
  TGachaItemUpdateRequest,
  TGachaClaimCreateRequest,
} from '../../types/gacha';
import type { TPaginationParams } from '../../types/common';

export const gachaKeys = {
  credits: ['gacha-credits'] as const,
  items: (params?: TPaginationParams) => ['gacha-items', params] as const,
  item: (id: string) => ['gacha-item', id] as const,
};

// ----- Credits -----
export const useUserCredits = () => {
  return useQuery({
    queryKey: gachaKeys.credits,
    queryFn: getUserCredits,
  });
};

export const useAddCredits = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TGachaCreditAddRequest) => addCredits(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: gachaKeys.credits }),
  });
};

export const useConsumeCredit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: consumeCredit,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: gachaKeys.credits }),
  });
};

// ----- Items -----
export const useGachaItemList = (params?: TPaginationParams) => {
  return useQuery({
    queryKey: gachaKeys.items(params),
    queryFn: () => getGachaItemList(params),
  });
};

export const useGachaItemById = (id: string) => {
  return useQuery({
    queryKey: gachaKeys.item(id),
    queryFn: () => getGachaItemById(id),
    enabled: !!id,
  });
};

export const useCreateGachaItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TGachaItemCreateRequest) => createGachaItem(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['gacha-items'] }),
  });
};

export const useUpdateGachaItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TGachaItemUpdateRequest }) => updateGachaItem(id, data),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ['gacha-items'] });
      queryClient.invalidateQueries({ queryKey: gachaKeys.item(vars.id) });
    },
  });
};

export const useDeleteGachaItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteGachaItem(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['gacha-items'] }),
  });
};

// ----- Roll -----
export const useExecuteGachaRoll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: executeGachaRoll,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: gachaKeys.credits }),
  });
};

// ----- Claims -----
export const useCreateGachaClaim = () => {
  return useMutation({
    mutationFn: (data: TGachaClaimCreateRequest) => createGachaClaim(data),
  });
};
