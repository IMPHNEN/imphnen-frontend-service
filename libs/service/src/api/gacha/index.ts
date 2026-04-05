import { api, ApiResponse } from '../index';
import type {
  TGachaItemDto,
  TGachaItemCreateRequest,
  TGachaItemUpdateRequest,
  TGachaRollItemDto,
  TGachaRollCreateRequest,
  TGachaCreditDto,
  TGachaCreditAddRequest,
  TGachaClaimDetailDto,
  TGachaClaimCreateRequest,
} from '../../types/gacha';
import type { TApiPaginated, TPaginationParams } from '../../types/common';

// ----- Credits -----
export const getUserCredits = async (): Promise<TGachaCreditDto> => {
  const response = await api.get<ApiResponse<TGachaCreditDto>>('/v1/gacha/credits/');
  return response.data.data;
};

export const addCredits = async (data: TGachaCreditAddRequest): Promise<TGachaCreditDto> => {
  const response = await api.post<ApiResponse<TGachaCreditDto>>('/v1/gacha/credits/add', data);
  return response.data.data;
};

export const consumeCredit = async (): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>('/v1/gacha/credits/consume');
  return response.data;
};

// ----- Items -----
export const getGachaItemList = async (params?: TPaginationParams): Promise<TApiPaginated<TGachaItemDto>> => {
  const response = await api.get<TApiPaginated<TGachaItemDto>>('/v1/gacha/items/', { params });
  return response.data;
};

export const getGachaItemById = async (id: string): Promise<TGachaItemDto> => {
  const response = await api.get<ApiResponse<TGachaItemDto>>(`/v1/gacha/items/detail/${id}`);
  return response.data.data;
};

export const createGachaItem = async (data: TGachaItemCreateRequest): Promise<TGachaItemDto> => {
  const response = await api.post<ApiResponse<TGachaItemDto>>('/v1/gacha/items/create', data);
  return response.data.data;
};

export const updateGachaItem = async (id: string, data: TGachaItemUpdateRequest): Promise<TGachaItemDto> => {
  const response = await api.put<ApiResponse<TGachaItemDto>>(`/v1/gacha/items/update/${id}`, data);
  return response.data.data;
};

export const deleteGachaItem = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/v1/gacha/items/delete/${id}`);
  return response.data;
};

// ----- Rolls -----
export const getGachaRollById = async (id: string): Promise<TGachaRollItemDto> => {
  const response = await api.get<ApiResponse<TGachaRollItemDto>>(`/v1/gacha/rolls/detail/${id}`);
  return response.data.data;
};

export const createGachaRoll = async (data: TGachaRollCreateRequest): Promise<TGachaRollItemDto> => {
  const response = await api.post<ApiResponse<TGachaRollItemDto>>('/v1/gacha/rolls/create', data);
  return response.data.data;
};

export const executeGachaRoll = async (): Promise<TGachaRollItemDto> => {
  const response = await api.post<ApiResponse<TGachaRollItemDto>>('/v1/gacha/rolls/execute');
  return response.data.data;
};

export const deleteGachaRoll = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/v1/gacha/rolls/delete/${id}`);
  return response.data;
};

// ----- Claims -----
export const getGachaClaimById = async (id: string): Promise<TGachaClaimDetailDto> => {
  const response = await api.get<ApiResponse<TGachaClaimDetailDto>>(`/v1/gacha/claims/detail/${id}`);
  return response.data.data;
};

export const createGachaClaim = async (data: TGachaClaimCreateRequest): Promise<TGachaClaimDetailDto> => {
  const response = await api.post<ApiResponse<TGachaClaimDetailDto>>('/v1/gacha/claims/create', data);
  return response.data.data;
};
