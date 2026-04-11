import { api } from '../index';
import type { TLoginRequest, TLoginResponse, TRegisterRequest, TSendOTPRequest, TVerifyEmailRequest } from '../../types/auth';
import type { TResponseMessage } from '../../types/common';

export type TForgotPasswordRequest = {
  email: string;
};

export type TNewPasswordRequest = {
  token: string;
  password: string;
};

export type TRefreshTokenRequest = {
  refresh_token: string;
};

export const postLogin = async (payload: TLoginRequest): Promise<TLoginResponse> => {
  const { data } = await api({ method: 'POST', url: '/v1/iam/auth/login', data: payload });
  return data;
};

export const postLoginMentor = async (payload: TLoginRequest): Promise<TLoginResponse> => {
  const { data } = await api({ method: 'POST', url: '/v1/iam/auth/login-mentor', data: payload });
  return data;
};

export const postRegister = async (payload: TRegisterRequest): Promise<TResponseMessage> => {
  const { data } = await api({ method: 'POST', url: '/v1/iam/auth/register', data: payload });
  return data;
};

export const postVerifyEmail = async (payload: TVerifyEmailRequest): Promise<TResponseMessage> => {
  const { data } = await api({
    method: 'POST',
    url: '/v1/iam/auth/verify-email',
    data: { otp: parseInt(payload.otp), email: payload.email },
  });
  return data;
};

export const postSendOtp = async (payload: TSendOTPRequest): Promise<TResponseMessage> => {
  const { data } = await api({ method: 'POST', url: '/v1/iam/auth/send-otp', data: payload });
  return data;
};

export const postForgotPassword = async (payload: TForgotPasswordRequest): Promise<TResponseMessage> => {
  const { data } = await api({ method: 'POST', url: '/v1/iam/auth/forgot', data: payload });
  return data;
};

export const postNewPassword = async (payload: TNewPasswordRequest): Promise<TResponseMessage> => {
  const { data } = await api({ method: 'POST', url: '/v1/iam/auth/new-password', data: payload });
  return data;
};

export const postRefreshToken = async (payload: TRefreshTokenRequest): Promise<{ access_token: string; refresh_token: string }> => {
  const { data } = await api({ method: 'POST', url: '/v1/iam/auth/refresh', data: payload });
  return data;
};
