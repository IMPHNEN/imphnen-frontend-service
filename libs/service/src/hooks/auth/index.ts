import { supabase } from '../../supabase';

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
