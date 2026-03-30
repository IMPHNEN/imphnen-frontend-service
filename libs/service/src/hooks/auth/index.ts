import { useMutation, useQuery } from '@tanstack/react-query';
import { hackathonApi, HackathonApiResponse } from '../../api/hackathon';
import { backofficeApi, BackofficeApiResponse } from '../../api/backoffice';
import { useAuthStore } from './use-auth-store';

export * from './use-auth-store';

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

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  email: string;
  password: string;
  fullname: string;
}

interface GitHubAuthRequest {
  code: string;
}

interface ForgotPasswordRequest {
  email: string;
}

interface ResetPasswordRequest {
  access_token: string;
  new_password: string;
}

export const useLogin = () => {
  const { setSession } = useAuthStore();

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await hackathonApi.post<
        HackathonApiResponse<AuthResponse>
      >('/auth/login', data);
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

export const useSignup = () => {
  return useMutation({
    mutationFn: async (data: SignupRequest) => {
      const response = await hackathonApi.post<
        HackathonApiResponse<MessageResponse>
      >('/auth/signup', data);
      return response.data.data;
    },
  });
};

export const useGitHubCallback = () => {
  const { setSession } = useAuthStore();

  return useMutation({
    mutationFn: async (data: GitHubAuthRequest) => {
      const response = await hackathonApi.post<
        HackathonApiResponse<AuthResponse>
      >('/auth/github', data);
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

export const useSessionQuery = () => {
  const { session } = useAuthStore();

  return useQuery({
    queryKey: ['auth-session'],
    queryFn: async () => {
      const response = await hackathonApi.get<
        HackathonApiResponse<SessionResponse>
      >('/auth/session');
      return response.data.data;
    },
    enabled: !!session?.token,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordRequest) => {
      const response = await hackathonApi.post<
        HackathonApiResponse<MessageResponse>
      >('/auth/forgot-password', data);
      return response.data.data;
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (data: ResetPasswordRequest) => {
      const response = await hackathonApi.post<
        HackathonApiResponse<MessageResponse>
      >('/auth/reset-password', data);
      return response.data.data;
    },
  });
};

export const useSignOut = () => {
  const { clearSession } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      clearSession();
      return { success: true };
    },
  });
};

export const useBackofficeLogin = () => {
  const { setSession } = useAuthStore();

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await backofficeApi.post<
        BackofficeApiResponse<AuthResponse>
      >('/auth/login', data);
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
            id: data.user.role_id || '',
            name: 'admin',
            permissions: [],
            created_at: '',
            updated_at: '',
          },
        },
      });
    },
  });
};

export const getGitHubOAuthUrl = (clientId: string, redirectUri: string) => {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'read:user user:email',
  });
  return `https://github.com/login/oauth/authorize?${params.toString()}`;
};

export const useGitHubAuth = () => {
  const signInWithGitHub = async () => {
    let clientId = '';
    if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID) {
      clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    } else {
      try {
        const meta = import.meta as unknown as Record<string, Record<string, string>>;
        if (meta.env?.VITE_GITHUB_CLIENT_ID) clientId = meta.env.VITE_GITHUB_CLIENT_ID;
      } catch { /* not in Vite context */ }
    }
    if (!clientId) {
      throw new Error(
        'GitHub Client ID not configured.'
      );
    }

    const redirectUri = `${globalThis.location.origin}/auth/callback`;
    const url = getGitHubOAuthUrl(clientId, redirectUri);

    return { url };
  };

  return {
    signInWithGitHub,
  };
};

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

  const signUpWithEmail = async (
    email: string,
    password: string,
    fullname: string
  ) => {
    const result = await signupMutation.mutateAsync({
      email,
      password,
      fullname,
    });
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

export const usePostLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await hackathonApi.post<
        HackathonApiResponse<AuthResponse>
      >('/auth/login', data);
      return { data: response.data.data };
    },
  });
};

export const usePostRegister = () => {
  return useMutation({
    mutationFn: async (data: SignupRequest) => {
      const response = await hackathonApi.post<
        HackathonApiResponse<AuthResponse>
      >('/auth/signup', data);
      return { data: response.data.data };
    },
  });
};

export const usePostVerifyEmail = () => {
  return useMutation({
    mutationFn: async () => {
      throw new Error('Email verification not required with new backend');
    },
  });
};

export const usePostSendOtp = () => {
  return useMutation({
    mutationFn: async () => {
      throw new Error('OTP not required with new backend');
    },
  });
};

export const useGoogleCallback = () => {
  return useMutation({
    mutationFn: async () => {
      throw new Error('Google OAuth not supported. Use GitHub OAuth instead.');
    },
  });
};
