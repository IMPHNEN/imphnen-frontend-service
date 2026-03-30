import { useMutation } from '@tanstack/react-query';
import { hackathonApi, HackathonApiResponse } from '../../api/hackathon';
import { useAuthStore } from '../auth';

interface UploadResponse {
  url: string;
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const useUploadFile = () => {
  const { session } = useAuthStore();

  return useMutation({
    mutationKey: ['upload-file'],
    mutationFn: async (file: File) => {
      if (!session?.user?.id) {
        throw new Error('You must be logged in to upload files');
      }

      const base64Data = await fileToBase64(file);

      const response = await hackathonApi.post<HackathonApiResponse<UploadResponse>>(
        '/upload/team',
        {
          filename: file.name,
          content_type: file.type,
          data: base64Data,
        }
      );

      return { data: { url: response.data.data.url } };
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

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Allowed types: JPEG, PNG, WebP, GIF');
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error('File too large. Maximum size: 5MB');
      }

      const base64Data = await fileToBase64(file);

      const response = await hackathonApi.post<HackathonApiResponse<UploadResponse>>(
        '/upload/avatar',
        {
          filename: file.name,
          content_type: file.type,
          data: base64Data,
        }
      );

      return { data: { url: response.data.data.url } };
    },
  });
};

export const useUploadTeamFile = () => {
  const { session } = useAuthStore();

  return useMutation({
    mutationKey: ['upload-team-file'],
    mutationFn: async (file: File) => {
      if (!session?.user?.id) {
        throw new Error('You must be logged in to upload files');
      }

      const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
        'image/gif',
        'application/pdf',
      ];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Allowed types: JPEG, PNG, WebP, GIF, PDF');
      }

      const maxSize = 20 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error('File too large. Maximum size: 20MB');
      }

      const base64Data = await fileToBase64(file);

      const response = await hackathonApi.post<HackathonApiResponse<UploadResponse>>(
        '/upload/team',
        {
          filename: file.name,
          content_type: file.type,
          data: base64Data,
        }
      );

      return { data: { url: response.data.data.url } };
    },
  });
};

export const useUploadSubmission = () => {
  const { session } = useAuthStore();

  return useMutation({
    mutationKey: ['upload-submission'],
    mutationFn: async (file: File) => {
      if (!session?.user?.id) {
        throw new Error('You must be logged in to upload submissions');
      }

      const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
        'image/gif',
        'application/pdf',
        'application/zip',
        'application/x-zip-compressed',
        'video/mp4',
        'video/webm',
      ];
      if (!allowedTypes.includes(file.type)) {
        throw new Error(
          'Invalid file type. Allowed types: Images, PDF, ZIP, MP4, WebM'
        );
      }

      const maxSize = 50 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error('File too large. Maximum size: 50MB');
      }

      const base64Data = await fileToBase64(file);

      const response = await hackathonApi.post<HackathonApiResponse<UploadResponse>>(
        '/upload/submission',
        {
          filename: file.name,
          content_type: file.type,
          data: base64Data,
        }
      );

      return { data: { url: response.data.data.url } };
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

      if (file.type !== 'application/pdf') {
        throw new Error('CV must be a PDF file');
      }

      const maxSize = 20 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error('File too large. Maximum size: 20MB');
      }

      const base64Data = await fileToBase64(file);

      const response = await hackathonApi.post<HackathonApiResponse<UploadResponse>>(
        '/upload/team',
        {
          filename: file.name,
          content_type: file.type,
          data: base64Data,
        }
      );

      return { data: { url: response.data.data.url } };
    },
  });
};
