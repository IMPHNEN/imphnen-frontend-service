import { api } from '../';
import {
  TLoginRequest,
  TLoginResponse,
  TRegisterRequest,
  TSendOTPRequest,
  TVerifyEmailRequest,
  TGoogleCallbackResponse,
} from '../../types/auth';
import { TResponseMessage } from '../../types/common';

export const postLogin = async (
  payload: TLoginRequest
): Promise<TLoginResponse> => {
  const { data } = await api({
    method: 'POST',
    url: '/auth/login',
    data: payload,
  });
  return data;
};

export const postRegister = async (
  payload: TRegisterRequest
): Promise<TResponseMessage> => {
  const { data } = await api({
    method: 'POST',
    url: '/auth/register',
    data: payload,
  });
  return data;
};

export const postVerifyEmail = async (
  payload: TVerifyEmailRequest
): Promise<TResponseMessage> => {
  const { data } = await api({
    method: 'POST',
    url: '/auth/verify-email',
    data: {otp: parseInt(payload.otp), email: payload.email},
  });
  return data;
};

export const postSendOtp = async (
  payload: TSendOTPRequest
): Promise<TResponseMessage> => {
  const { data } = await api({
    method: 'POST',
    url: '/auth/send-otp',
    data: payload,
  });
  return data;
};

export const getGoogleAuthUrl = async (): Promise<string> => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  return `${baseUrl}/auth/google/login`;
};

export const postGoogleCallback = async (code: string, state: string): Promise<TGoogleCallbackResponse> => {
  const { data } = await api({
    method: 'GET',
    url: `/auth/google/callback?code=${code}&state=${state}`,
  });
  return data;
};

export const getGitHubAuthUrl = async (): Promise<string> => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  return `${baseUrl}/auth/github/login`;
};

export const postGitHubCallback = async (code: string, state: string): Promise<TGoogleCallbackResponse> => {
  const { data } = await api({
    method: 'GET',
    url: `/auth/github/callback?code=${code}&state=${state}`,
  });
  return data;
};
