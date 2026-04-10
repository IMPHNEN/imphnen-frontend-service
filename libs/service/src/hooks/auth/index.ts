import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthStore } from './use-auth-store';
import {
  postLogin,
  postRegister,
  postVerifyEmail,
  postSendOtp,
  postForgotPassword,
  postNewPassword,
} from '../../api/auth';
import { getUserMe, type TUserMeInclude } from '../../api/users';

export * from './use-auth-store';

export const useLogin = () => {
  const { setSession } = useAuthStore();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: (res) => {
      const u = res.data?.user;
      const t = res.data?.token;
      if (!u || !t) return;
      setSession({
        token: t,
        user: {
          id: u.id,
          email: u.email,
          fullname: u.fullname,
          phone_number: u.phone_number,
          avatar: u.avatar,
          is_active: u.is_active,
          location: u.location,
          bio: u.bio,
          skills: u.skills,
          role: u.role ?? { id: '', name: 'user', permissions: [] },
        },
      });
    },
  });
};

export const useBackofficeLogin = () => {
  const { setSession } = useAuthStore();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: (res) => {
      const u = res.data?.user;
      const t = res.data?.token;
      if (!u || !t) return;
      setSession({
        token: t,
        user: {
          id: u.id,
          email: u.email,
          fullname: u.fullname,
          phone_number: u.phone_number,
          avatar: u.avatar,
          is_active: u.is_active,
          location: u.location,
          bio: u.bio,
          skills: u.skills,
          role: u.role ?? { id: '', name: 'admin', permissions: [] },
        },
      });
    },
  });
};

export const useSignup = () => {
  return useMutation({ mutationFn: postRegister });
};

export const usePostLogin = () => {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: (res) => res,
  });
};

export const usePostRegister = () => {
  return useMutation({ mutationFn: postRegister });
};

export const usePostVerifyEmail = () => {
  return useMutation({ mutationFn: postVerifyEmail });
};

export const usePostSendOtp = () => {
  return useMutation({ mutationFn: postSendOtp });
};

export const useForgotPassword = () => {
  return useMutation({ mutationFn: postForgotPassword });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: { token: string; password: string }) => postNewPassword(data),
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

export const useSessionQuery = (include?: TUserMeInclude[]) => {
  const { session } = useAuthStore();
  return useQuery({
    queryKey: ['auth-session', include],
    queryFn: async () => {
      const user = await getUserMe(include);
      return { user };
    },
    enabled: !!session?.token,
  });
};

export const useGoogleCallback = () => {
  return useMutation({
    mutationFn: async () => {
      throw new Error('Google OAuth not supported. Use GitHub OAuth instead.');
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
    if (!clientId) throw new Error('GitHub Client ID not configured.');
    const redirectUri = `${globalThis.location.origin}/auth/callback`;
    return { url: getGitHubOAuthUrl(clientId, redirectUri) };
  };
  return { signInWithGitHub };
};

export const useGitHubCallback = () => {
  const { setSession } = useAuthStore();
  return useMutation({
    mutationFn: async (data: { code: string }) => {
      // GitHub OAuth callback is handled by the backend redirect.
      // This hook exists for compatibility; in practice the backend
      // redirects to the frontend with a token in the URL params.
      throw new Error(`GitHub callback must be handled via backend redirect. Code: ${data.code}`);
    },
  });
};

export const useEmailAuth = () => {
  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const { clearSession } = useAuthStore();

  const signInWithEmail = async (email: string, password: string) => {
    const result = await loginMutation.mutateAsync({ email, password });
    return {
      user: result.data?.user,
      session: {
        access_token: result.data?.token?.access_token,
        refresh_token: result.data?.token?.refresh_token,
      },
    };
  };

  const signUpWithEmail = async (email: string, password: string, fullname: string) => {
    const result = await signupMutation.mutateAsync({ email, password, fullname });
    return { message: result.message };
  };

  const signOut = async () => { clearSession(); };

  return { signInWithEmail, signUpWithEmail, signOut };
};
