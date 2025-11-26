import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../../api/users';
import { supabase, getAuthenticatedClient } from '../../supabase';
import { useAuthStore } from '../auth';

// Supabase-based user hooks

export const useUserMe = () => {
  return useQuery({
    queryKey: ['user-me'],
    queryFn: async () => {
      const user = await userService.getUserMe();
      return { data: user };
    },
  });
};

export const useUserById = (id: string) => {
  return useQuery({
    queryKey: ['user-by-id', id],
    queryFn: async () => {
      const user = await userService.getUserById(id);
      return { data: user };
    },
    enabled: !!id,
  });
};

export const useUpdateUserMe = () => {
  const queryClient = useQueryClient();
  const { session, setSession } = useAuthStore();

  return useMutation({
    mutationKey: ['update-user-me'],
    mutationFn: async (data: any) => {
      if (!session?.user?.id) {
        throw new Error('You must be logged in to update profile');
      }

      // Supabase client now has auth context from setSession()
      const { data: updatedUser, error } = await supabase
        .from('users')
        .update({
          fullname: data.fullname,
          bio: data.bio,
          location: data.location,
          avatar: data.avatar,
          skills: data.skills,
          updated_at: new Date().toISOString(),
        })
        .eq('id', session.user.id)
        .select()
        .single();

      if (error) {
        console.error('Failed to update user profile:', error);
        throw new Error(error.message || 'Failed to update profile');
      }
      return { data: updatedUser };
    },
    onSuccess: (result) => {
      // Update Zustand session store with new user data
      if (session && result.data) {
        setSession({
          token: session.token,
          user: {
            ...session.user,
            fullname: result.data.fullname || session.user.fullname,
            bio: result.data.bio || '',
            location: result.data.location || '',
            avatar: result.data.avatar || session.user.avatar,
            skills: result.data.skills || [],
          },
        });
      }
      queryClient.invalidateQueries({ queryKey: ['user-me'] });
    },
  });
};

export const useUpdateUserById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-user-by-id'],
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const updated = await userService.updateUserById(id, data);
      return { data: updated };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user-by-id', variables.id] });
    },
  });
};

export const useUserDetailsById = (userId: string) => {
  return useQuery({
    queryKey: ['user-supabase', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        throw new Error(error.message || 'Failed to fetch user');
      }

      return { data };
    },
    enabled: !!userId,
  });
};
