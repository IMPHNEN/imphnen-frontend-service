import { api } from '@imphnen-frontend-service/utils';
import {
  TLoginRequest,
  TLoginResponse,
  TRegisterRequest,
  TVerifyEmailRequest,
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
    url: '/auth/verify',
    data: payload,
  });
  return data;
};
