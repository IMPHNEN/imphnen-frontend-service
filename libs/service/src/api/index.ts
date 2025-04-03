import axios, { AxiosRequestConfig } from 'axios';

export * from './auth';
export * from './gacha';
export * from './users';

const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL,
};

export const api = axios.create(config);
