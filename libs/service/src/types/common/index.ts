import { AxiosError } from 'axios';

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
