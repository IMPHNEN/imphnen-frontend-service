import { z } from 'zod';
import { ETeamVisibility } from '../../types/teams';

export const teamCreateSchema = z.object({
  name: z
    .string()
    .min(3, 'Nama tim minimal 3 karakter')
    .max(50, 'Nama tim maksimal 50 karakter'),
  logo: z.string().url('Logo harus berupa URL yang valid').nullable(),
  banner: z.string().url('Banner harus berupa URL yang valid').nullable(),
  description: z
    .string()
    .min(10, 'Deskripsi minimal 10 karakter')
    .max(500, 'Deskripsi maksimal 500 karakter'),
  city: z.string().min(1, 'Kota harus diisi'),
  visibility: z.nativeEnum(ETeamVisibility, {
    errorMap: () => ({ message: 'Visibilitas tidak valid' }),
  }),
});

export const teamUpdateSchema = z.object({
  name: z
    .string()
    .min(3, 'Nama tim minimal 3 karakter')
    .max(50, 'Nama tim maksimal 50 karakter')
    .optional(),
  logo: z.string().url('Logo harus berupa URL yang valid').nullable().optional(),
  banner: z.string().url('Banner harus berupa URL yang valid').nullable().optional(),
  description: z
    .string()
    .min(10, 'Deskripsi minimal 10 karakter')
    .max(500, 'Deskripsi maksimal 500 karakter')
    .optional(),
  city: z.string().min(1, 'Kota harus diisi').optional(),
  visibility: z
    .nativeEnum(ETeamVisibility, {
      errorMap: () => ({ message: 'Visibilitas tidak valid' }),
    })
    .optional(),
});

export const inviteMemberSchema = z.object({
  email: z.string().email('Email tidak valid'),
});

export const joinTeamSchema = z.object({
  message: z
    .string()
    .min(10, 'Pesan minimal 10 karakter')
    .max(200, 'Pesan maksimal 200 karakter'),
});

export const projectSubmissionSchema = z.object({
  project_name: z
    .string()
    .min(3, 'Nama project minimal 3 karakter')
    .max(100, 'Nama project maksimal 100 karakter'),
  description: z
    .string()
    .min(20, 'Deskripsi minimal 20 karakter')
    .max(1000, 'Deskripsi maksimal 1000 karakter'),
  repository_url: z.string().url('URL repository tidak valid'),
  demo_url: z.string().url('URL demo tidak valid').optional().or(z.literal('')),
  presentation_url: z.string().url('URL presentasi tidak valid').optional().or(z.literal('')),
  screenshots: z.array(z.string().url('URL screenshot tidak valid')).optional(),
});

export const userOnboardingSchema = z.object({
  fullname: z.string().min(3, 'Nama lengkap minimal 3 karakter').optional(),
  avatar: z.string().url('Avatar harus berupa URL yang valid').nullable().optional(),
  location: z.string().min(1, 'Domisili harus diisi'),
  bio: z.string().max(500, 'Bio maksimal 500 karakter').optional(),
  skills: z.array(z.string()).optional(),
});

export const userEditProfileSchema = z.object({
  fullname: z.string().min(3, 'Nama lengkap minimal 3 karakter'),
  avatar: z.string().url('Avatar harus berupa URL yang valid').nullable().optional(),
});

export type TTeamCreateForm = z.infer<typeof teamCreateSchema>;
export type TTeamUpdateForm = z.infer<typeof teamUpdateSchema>;
export type TInviteMemberForm = z.infer<typeof inviteMemberSchema>;
export type TJoinTeamForm = z.infer<typeof joinTeamSchema>;
export type TProjectSubmissionForm = z.infer<typeof projectSubmissionSchema>;
export type TUserOnboardingForm = z.infer<typeof userOnboardingSchema>;
export type TUserEditProfileForm = z.infer<typeof userEditProfileSchema>;
