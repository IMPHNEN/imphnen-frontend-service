import { AxiosError } from 'axios';

export type TPaginationMeta = {
  page: number;
  per_page: number;
  total?: number;
  total_pages?: number;
  has_next: boolean;
  has_prev: boolean;
  next_cursor?: string;
  prev_cursor?: string;
};

export type TPaginationParams = {
  page?: number;
  per_page?: number;
  search?: string;
  sort_by?: string;
  order?: string;
  filter?: string;
  filter_by?: string;
};

export type TApiSuccess<T> = {
  data: T;
  version: string;
};

export type TApiPaginated<T> = {
  data: T[];
  meta: TPaginationMeta;
  version: string;
};

export type TApiMessage = {
  message: string;
  version: string;
};

// Legacy aliases kept for backward compatibility
export type TMetaResponse = {
  page: number;
  per_page: number;
  total: number;
};

export type TResponseDetail<T = unknown> = {
  data: T;
  message: string;
};

export type TResponseList<T = unknown> = {
  data: T[];
  meta: TMetaResponse;
};

export type TResponseMessage = {
  message: string;
};

export type TResponseError = AxiosError<TResponseMessage>;
