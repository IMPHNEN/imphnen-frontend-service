import { useMutation, useQuery } from '@tanstack/react-query';
import { hackathonApi, HackathonApiResponse } from '../../api/hackathon';
import { useAuthStore } from './use-auth-store';

export * from './use-auth-store';

// Types matching backend response
interface TokenInfo {
  access_token: string;
  refresh_token: string;
}

interface User {
  id: string;
  email: string;
  fullname: string;
  phone_number?: string;
  avatar?: string;
  birthdate?: string;
  gender?: string;
  is_active: boolean;
  location?: string;
  bio?: string;
  skills?: string[];
  role_id?: string;
  created_at: string;
  updated_at?: string;
}

interface AuthResponse {
  token: TokenInfo;
  user: User;
}

interface SessionResponse {
  user: User;
}

interface MessageResponse {
  message: string;
}

// Login request type
interface LoginRequest {
  email: string;
  password: string;
}

// Signup request type
interface SignupRequest {
  email: string;
  password: string;
  fullname: string;
}

// GitHub auth request type
interface GitHubAuthRequest {
  code: string;
}

// Forgot password request type
interface ForgotPasswordRequest {
  email: string;
}

// Reset password request type
interface ResetPasswordRequest {
  access_token: string;
  new_password: string;
}

// Backend API-based auth hooks

// Email/Password Login
export const useLogin = () => {
  const { setSession } = useAuthStore();

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await hackathonApi.post<HackathonApiResponse<AuthResponse>>(
        '/auth/login',
        data
      );
      return response.data.data;
    },
    onSuccess: (data) => {
      setSession({
        token: data.token,
        user: {
          id: data.user.id,
          email: data.user.email,
          fullname: data.user.fullname,
          phone_number: data.user.phone_number || '',
          avatar: data.user.avatar || '',
          birthdate: data.user.birthdate || '',
          gender: data.user.gender || '',
          is_active: data.user.is_active,
          location: data.user.location,
          bio: data.user.bio,
          skills: data.user.skills,
          role: {
            id: '',
            name: 'user',
            permissions: [],
            created_at: '',
            updated_at: '',
          },
        },
      });
    },
  });
};

// Email/Password Signup - returns message only (user needs to activate via email)
export const useSignup = () => {
  return useMutation({
    mutationFn: async (data: SignupRequest) => {
      const response = await hackathonApi.post<HackathonApiResponse<MessageResponse>>(
        '/auth/signup',
        data
      );
      return response.data.data;
    },
  });
};

// GitHub OAuth - exchange code for token
export const useGitHubCallback = () => {
  const { setSession } = useAuthStore();

  return useMutation({
    mutationFn: async (data: GitHubAuthRequest) => {
      const response = await hackathonApi.post<HackathonApiResponse<AuthResponse>>(
        '/auth/github',
        data
      );
      return response.data.data;
    },
    onSuccess: (data) => {
      setSession({
        token: data.token,
        user: {
          id: data.user.id,
          email: data.user.email,
          fullname: data.user.fullname,
          phone_number: data.user.phone_number || '',
          avatar: data.user.avatar || '',
          birthdate: data.user.birthdate || '',
          gender: data.user.gender || '',
          is_active: data.user.is_active,
          location: data.user.location,
          bio: data.user.bio,
          skills: data.user.skills,
          role: {
            id: '',
            name: 'user',
            permissions: [],
            created_at: '',
            updated_at: '',
          },
        },
      });
    },
  });
};

// Get current session (protected)
export const useSession = () => {
  const { session } = useAuthStore();

  return useQuery({
    queryKey: ['auth-session'],
    queryFn: async () => {
      const response = await hackathonApi.get<HackathonApiResponse<SessionResponse>>(
        '/auth/session'
      );
      return response.data.data;
    },
    enabled: !!session?.token,
  });
};

// Forgot password
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordRequest) => {
      const response = await hackathonApi.post<HackathonApiResponse<MessageResponse>>(
        '/auth/forgot-password',
        data
      );
      return response.data.data;
    },
  });
};

// Reset password
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (data: ResetPasswordRequest) => {
      const response = await hackathonApi.post<HackathonApiResponse<MessageResponse>>(
        '/auth/reset-password',
        data
      );
      return response.data.data;
    },
  });
};

// Sign out (clears local session)
export const useSignOut = () => {
  const { clearSession } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      // No backend call needed - just clear local session
      clearSession();
      return { success: true };
    },
  });
};

// GitHub OAuth URL helper
// The frontend needs to redirect to GitHub with the client_id
// After GitHub redirects back with a code, use useGitHubCallback
export const getGitHubOAuthUrl = (clientId: string, redirectUri: string) => {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'read:user user:email',
  });
  return `https://github.com/login/oauth/authorize?${params.toString()}`;
};

// Backward compatibility hooks - these wrap the new backend API

// GitHub OAuth hook (backward compatible)
export const useGitHubAuth = () => {
  const signInWithGitHub = async () => {
    // Get GitHub client ID from environment
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID || '';
    if (!clientId) {
      throw new Error('GitHub Client ID not configured. Set VITE_GITHUB_CLIENT_ID environment variable.');
    }

    const redirectUri = `${globalThis.location.origin}/auth/callback`;
    const url = getGitHubOAuthUrl(clientId, redirectUri);

    return { url };
  };

  return {
    signInWithGitHub,
  };
};

// Email/Password auth hook (backward compatible)
export const useEmailAuth = () => {
  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const { clearSession } = useAuthStore();

  const signInWithEmail = async (email: string, password: string) => {
    const result = await loginMutation.mutateAsync({ email, password });
    return {
      user: result.user,
      session: {
        access_token: result.token.access_token,
        refresh_token: result.token.refresh_token,
      },
    };
  };

  const signUpWithEmail = async (email: string, password: string, fullname: string) => {
    const result = await signupMutation.mutateAsync({ email, password, fullname });
    // Signup only returns a message (user needs to verify email first)
    return {
      message: result.message,
    };
  };

  const signOut = async () => {
    clearSession();
  };

  return {
    signInWithEmail,
    signUpWithEmail,
    signOut,
  };
};

// Legacy hooks for old API compatibility (deprecated)

/** @deprecated Use useLogin instead */
export const usePostLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await hackathonApi.post<HackathonApiResponse<AuthResponse>>(
        '/auth/login',
        data
      );
      return { data: response.data.data };
    },
  });
};

/** @deprecated Use useSignup instead */
export const usePostRegister = () => {
  return useMutation({
    mutationFn: async (data: SignupRequest) => {
      const response = await hackathonApi.post<HackathonApiResponse<AuthResponse>>(
        '/auth/signup',
        data
      );
      return { data: response.data.data };
    },
  });
};

/** @deprecated Not needed with new backend */
export const usePostVerifyEmail = () => {
  return useMutation({
    mutationFn: async () => {
      throw new Error('Email verification not required with new backend');
    },
  });
};

/** @deprecated Not needed with new backend */
export const usePostSendOtp = () => {
  return useMutation({
    mutationFn: async () => {
      throw new Error('OTP not required with new backend');
    },
  });
};

/** @deprecated Use useGitHubCallback instead */
export const useGoogleCallback = () => {
  return useMutation({
    mutationFn: async () => {
      throw new Error('Google OAuth not supported. Use GitHub OAuth instead.');
    },
  });
};
