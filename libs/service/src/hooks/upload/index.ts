import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../auth';
import {
  uploadHackathonAvatar,
  uploadHackathonTeamFile,
  uploadHackathonSubmission,
  uploadHackathonFile,
  uploadUserFile,
} from '../../api/upload';

export const useUploadFile = () => {
  const { session } = useAuthStore();
  return useMutation({
    mutationKey: ['upload-file'],
    mutationFn: async (file: File) => {
      if (!session?.user?.id) throw new Error('You must be logged in to upload files');
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) throw new Error('Invalid file type. Allowed: JPEG, PNG, WebP, GIF');
      if (file.size > 5 * 1024 * 1024) throw new Error('File too large. Maximum size: 5MB');
      const data = await uploadHackathonTeamFile(file);
      return { data };
    },
  });
};

export const useUploadAvatar = () => {
  const { session } = useAuthStore();
  return useMutation({
    mutationKey: ['upload-avatar'],
    mutationFn: async (file: File) => {
      if (!session?.user?.id) throw new Error('You must be logged in to upload avatar');
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) throw new Error('Invalid file type. Allowed: JPEG, PNG, WebP, GIF');
      if (file.size > 2 * 1024 * 1024) throw new Error('File too large. Maximum size: 2MB');
      const data = await uploadHackathonAvatar(file);
      return { data };
    },
  });
};

export const useUploadTeamFile = () => {
  const { session } = useAuthStore();
  return useMutation({
    mutationKey: ['upload-team-file'],
    mutationFn: async (file: File) => {
      if (!session?.user?.id) throw new Error('You must be logged in to upload files');
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) throw new Error('Invalid file type. Allowed: JPEG, PNG, WebP, GIF, PDF');
      if (file.size > 20 * 1024 * 1024) throw new Error('File too large. Maximum size: 20MB');
      const data = await uploadHackathonTeamFile(file);
      return { data };
    },
  });
};

export const useUploadSubmission = () => {
  const { session } = useAuthStore();
  return useMutation({
    mutationKey: ['upload-submission'],
    mutationFn: async (file: File) => {
      if (!session?.user?.id) throw new Error('You must be logged in to upload submissions');
      const allowedTypes = [
        'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif',
        'application/pdf', 'application/zip', 'application/x-zip-compressed',
        'video/mp4', 'video/webm',
      ];
      if (!allowedTypes.includes(file.type)) throw new Error('Invalid file type. Allowed: Images, PDF, ZIP, MP4, WebM');
      if (file.size > 50 * 1024 * 1024) throw new Error('File too large. Maximum size: 50MB');
      const data = await uploadHackathonSubmission(file);
      return { data };
    },
  });
};

export const useUploadCV = () => {
  const { session } = useAuthStore();
  return useMutation({
    mutationKey: ['upload-cv'],
    mutationFn: async (file: File) => {
      if (!session?.user?.id) throw new Error('You must be logged in to upload CV');
      if (file.type !== 'application/pdf') throw new Error('CV must be a PDF file');
      if (file.size > 20 * 1024 * 1024) throw new Error('File too large. Maximum size: 20MB');
      const data = await uploadUserFile(file);
      return { data };
    },
  });
};
