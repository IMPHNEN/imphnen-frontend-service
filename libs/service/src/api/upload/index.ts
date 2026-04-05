import { api, ApiResponse } from '../index';

export interface UploadResponse {
  filename?: string;
  original_filename?: string;
  uploaded_path?: string;
  url: string;
  size?: number;
  content_type?: string;
  file_type?: string;
  user_id?: string;
  email?: string;
}

const multipartPost = async (url: string, file: File, fieldName = 'file'): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append(fieldName, file);
  const response = await api.post<ApiResponse<UploadResponse>>(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.data;
};

export const uploadUserFile = (file: File) => multipartPost('/v1/iam/users/upload', file);

export const uploadHackathonFile = (file: File) => multipartPost('/v1/hackathon/upload', file);

export const uploadHackathonAvatar = (file: File) => multipartPost('/v1/hackathon/upload/avatar', file);

export const uploadHackathonTeamFile = (file: File) => multipartPost('/v1/hackathon/upload/team', file);

export const uploadHackathonSubmission = (file: File) => multipartPost('/v1/hackathon/upload/submission', file);

// Legacy service object for backward compatibility
export const uploadService = {
  uploadFile: uploadUserFile,
  uploadAvatar: uploadUserFile,
  uploadCV: uploadUserFile,
};
