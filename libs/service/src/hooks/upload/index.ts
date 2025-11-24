import { useMutation } from '@tanstack/react-query';
import { supabase, getAuthenticatedClient } from '../../supabase';
import { useAuthStore } from '@imphnen-frontend-service/utils';

// Supabase Storage-based upload hooks

export const useUploadFile = () => {
  const { session } = useAuthStore();

  return useMutation({
    mutationKey: ['upload-file'],
    mutationFn: async (file: File) => {
      if (!session?.user?.id) {
        throw new Error('You must be logged in to upload files');
      }

      // Generate a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${session.user.id}-${Date.now()}.${fileExt}`;
      const filePath = `teams/${fileName}`;

      // Supabase client now has auth context from setSession()
      const { error } = await supabase.storage
        .from('hackathon-uploads')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (error) {
        console.error('Failed to upload file:', error);
        throw new Error(error.message || 'Failed to upload file');
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('hackathon-uploads')
        .getPublicUrl(filePath);

      return { data: { url: publicUrlData.publicUrl } };
    },
  });
};

export const useUploadAvatar = () => {
  const { session } = useAuthStore();

  return useMutation({
    mutationKey: ['upload-avatar'],
    mutationFn: async (file: File) => {
      if (!session?.user?.id) {
        throw new Error('You must be logged in to upload avatar');
      }

      // Generate a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${session.user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Supabase client now has auth context from setSession()
      const { error } = await supabase.storage
        .from('hackathon-uploads')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (error) {
        console.error('Failed to upload avatar:', error);
        throw new Error(error.message || 'Failed to upload avatar');
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('hackathon-uploads')
        .getPublicUrl(filePath);

      return { data: { url: publicUrlData.publicUrl } };
    },
  });
};

export const useUploadCV = () => {
  const { session } = useAuthStore();

  return useMutation({
    mutationKey: ['upload-cv'],
    mutationFn: async (file: File) => {
      if (!session?.user?.id) {
        throw new Error('You must be logged in to upload CV');
      }

      // Generate a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${session.user.id}-${Date.now()}.${fileExt}`;
      const filePath = `cvs/${fileName}`;

      // Supabase client now has auth context from setSession()
      const { error } = await supabase.storage
        .from('hackathon-uploads')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (error) {
        console.error('Failed to upload CV:', error);
        throw new Error(error.message || 'Failed to upload CV');
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('hackathon-uploads')
        .getPublicUrl(filePath);

      return { data: { url: publicUrlData.publicUrl } };
    },
  });
};
