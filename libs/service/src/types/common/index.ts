import { AxiosError } from 'axios';

export type TResponse<T = unknown> = {
  data: T;
};

export type TResponseMessage = {
  message: string;
};

export type TResponseError = AxiosError<TResponseMessage>;
