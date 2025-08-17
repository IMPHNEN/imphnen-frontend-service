import { api, ApiResponse } from '../index';

export interface UploadResponse {
  filename: string;
  original_filename: string;
  uploaded_path: string;
  url: string;
  size: number;
  content_type: string;
  file_type: string;
  user_id: string;
  email: string;
}

export interface UploadService {
  uploadFile(file: File): Promise<UploadResponse>;
  uploadAvatar(file: File): Promise<UploadResponse>;
  uploadCV(file: File): Promise<UploadResponse>;
}

export const uploadService: UploadService = {
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<ApiResponse<UploadResponse>>('/users/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  async uploadAvatar(file: File) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('File harus berupa gambar');
    }

    // Validate file size (max 5MB for images)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error('Ukuran file maksimal 5MB');
    }

    return this.uploadFile(file);
  },

  async uploadCV(file: File) {
    // Validate file type
    if (file.type !== 'application/pdf') {
      throw new Error('CV harus berupa file PDF');
    }

    // Validate file size (max 10MB for PDFs)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new Error('Ukuran file maksimal 10MB');
    }

    return this.uploadFile(file);
  },
};
