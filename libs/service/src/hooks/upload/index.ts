import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { uploadService, UploadResponse } from '../../api/upload';
import { TResponseError } from '../../types/common';

export const useUploadFile = (): UseMutationResult<
  UploadResponse,
  TResponseError,
  File,
  unknown
> => {
  return useMutation({
    mutationKey: ['upload-file'],
    mutationFn: (file) => uploadService.uploadFile(file),
  });
};

export const useUploadAvatar = (): UseMutationResult<
  UploadResponse,
  TResponseError,
  File,
  unknown
> => {
  return useMutation({
    mutationKey: ['upload-avatar'],
    mutationFn: (file) => uploadService.uploadAvatar(file),
  });
};

export const useUploadCV = (): UseMutationResult<
  UploadResponse,
  TResponseError,
  File,
  unknown
> => {
  return useMutation({
    mutationKey: ['upload-cv'],
    mutationFn: (file) => uploadService.uploadCV(file),
  });
};
