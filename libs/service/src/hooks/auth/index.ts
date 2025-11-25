import { supabase } from '../../supabase';
import { useMutation } from '@tanstack/react-query';
import * as authApi from '../../api/auth';

export * from './use-auth-store';

// React Query hooks for auth API
export const usePostLogin = () => {
  return useMutation({
    mutationFn: authApi.postLogin,
  });
};

export const usePostRegister = () => {
  return useMutation({
    mutationFn: authApi.postRegister,
  });
};

export const usePostVerifyEmail = () => {
  return useMutation({
    mutationFn: authApi.postVerifyEmail,
  });
};

export const usePostSendOtp = () => {
  return useMutation({
    mutationFn: authApi.postSendOtp,
  });
};

export const useGoogleCallback = () => {
  return useMutation({
    mutationFn: ({ code, state }: { code: string; state: string }) =>
      authApi.postGoogleCallback(code, state),
  });
};

// Supabase GitHub OAuth hook
export const useGitHubAuth = () => {
  const signInWithGitHub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${globalThis.location.origin}/auth/callback`,
      },
    });

    if (error) {
      throw error;
    }

    // Return the OAuth URL for debugging
    return data;
  };

  return {
    signInWithGitHub,
  };
};

// Supabase Email/Password authentication hook
export const useEmailAuth = () => {
  const signInWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  };

  const signUpWithEmail = async (email: string, password: string, fullname: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullname,
        },
      },
    });

    if (error) {
      throw error;
    }

    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  };

  return {
    signInWithEmail,
    signUpWithEmail,
    signOut,
  };
};
