import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { postLogin, postRegister, postSendOtp, postVerifyEmail, getGoogleAuthUrl, postGoogleCallback } from '../../api/auth';
import {
  TLoginRequest,
  TLoginResponse,
  TRegisterRequest,
  TSendOTPRequest,
  TVerifyEmailRequest,
  TGoogleCallbackResponse,
} from '../../types/auth';

import { TResponseError, TResponseMessage } from '../../types/common';

export const usePostLogin = (): UseMutationResult<
  TLoginResponse,
  TResponseError,
  TLoginRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ['post-login'],
    mutationFn: async (payload) => await postLogin(payload),
  });
};

export const usePostRegister = (): UseMutationResult<
  TResponseMessage,
  TResponseError,
  TRegisterRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ['post-register'],
    mutationFn: async (payload) => await postRegister(payload),
  });
};

export const usePostVerifyEmail = (): UseMutationResult<
  TResponseMessage,
  TResponseError,
  TVerifyEmailRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ['post-verify-email'],
    mutationFn: async (payload) => await postVerifyEmail(payload),
  });
};

export const usePostSendOTP = (): UseMutationResult<
  TResponseMessage,
  TResponseError,
  TSendOTPRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ['post-send-otp'],
    mutationFn: async (payload) => await postSendOtp(payload),
  });
};

export const useGoogleAuth = () => {
  const redirectToGoogle = async (): Promise<string> => {
    return await getGoogleAuthUrl();
  };

  return {
    redirectToGoogle,
  };
};

export const useGoogleCallback = (): UseMutationResult<
  TGoogleCallbackResponse,
  TResponseError,
  { code: string; state: string },
  unknown
> => {
  return useMutation({
    mutationKey: ['google-callback'],
    mutationFn: async ({ code, state }) => await postGoogleCallback(code, state),
  });
};

