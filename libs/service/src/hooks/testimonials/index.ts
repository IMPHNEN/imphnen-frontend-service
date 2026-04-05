import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getTestimonialList,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../../api/testimonials';
import type { TTestimonialCreateRequest, TTestimonialUpdateRequest } from '../../types/testimonials';
import type { TPaginationParams } from '../../types/common';

export const testimonialKeys = {
  all: ['testimonials'] as const,
  lists: () => [...testimonialKeys.all, 'list'] as const,
  list: (params?: TPaginationParams) => [...testimonialKeys.lists(), params] as const,
  detail: (id: string) => [...testimonialKeys.all, 'detail', id] as const,
};

export const useTestimonialList = (params?: TPaginationParams) => {
  return useQuery({
    queryKey: testimonialKeys.list(params),
    queryFn: () => getTestimonialList(params),
  });
};

export const useTestimonialById = (id: string) => {
  return useQuery({
    queryKey: testimonialKeys.detail(id),
    queryFn: () => getTestimonialById(id),
    enabled: !!id,
  });
};

export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TTestimonialCreateRequest) => createTestimonial(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: testimonialKeys.lists() }),
  });
};

export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TTestimonialUpdateRequest }) => updateTestimonial(id, data),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: testimonialKeys.lists() });
      queryClient.invalidateQueries({ queryKey: testimonialKeys.detail(vars.id) });
    },
  });
};

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTestimonial(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: testimonialKeys.lists() }),
  });
};
