'use client';

import React, { createContext, useContext, useMemo, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@imphnen-frontend-service/utils';
import {
  // User hooks
  useUserMe,
  useUserById,
  useUpdateUserMe,
  useUpdateUserById,
  UserDetailResponseDto,
  UserUpdateRequestDto,
  // Mentor hooks
  useMentorMe,
  useMentorById,
  useUpdateMentorMe,
  useUpdateMentorById,
  MentorDetailResponseDto,
  MentorUpdateRequestDto
} from '@imphnen-frontend-service/service';

// Union types for profile data
type ProfileData = UserDetailResponseDto | MentorDetailResponseDto;
type ProfileUpdateData = UserUpdateRequestDto | MentorUpdateRequestDto;

// Helper function to check if user can access mentor features
const canAccessMentorFeatures = (user: { role?: { name?: string; permissions?: Array<{ name?: string }> } } | null) => {
  if (!user?.role) return false;

  const roleName = user.role.name?.toLowerCase() || '';
  const isMentorRole = roleName.includes('mentor') || roleName.includes('admin');

  if (isMentorRole) return true;

  // Check permissions for mentor access
  const permissions = user.role.permissions || [];
  const hasMentorPermission = permissions.some((permission: { name?: string }) =>
    permission.name?.toLowerCase().includes('mentor')
  );

  return hasMentorPermission;
};

interface ProfileContextType {
  profileData: ProfileData | undefined;
  isLoading: boolean;
  error: unknown;
  isOwnProfile: boolean;
  profileId: string | null;
  profileType: 'user' | 'mentor';
  updateProfile: (data: ProfileUpdateData) => Promise<void>;
  isUpdating: boolean;
  canAccessMentor: boolean;
}const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

interface ProfileProviderProps {
  children: React.ReactNode;
  profileId?: string;
  profileType?: 'user' | 'mentor';
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
  children,
  profileId,
  profileType: forcedProfileType
}) => {
  const params = useParams();
  const { session } = useAuthStore();
  const queryClient = useQueryClient();

  // Check if current user can access mentor features
  const canAccessMentor = useMemo(() => {
    return canAccessMentorFeatures(session?.user || null);
  }, [session?.user]);

  // Check if current user has Mentor role specifically
  const isMentorRole = useMemo(() => {
    const roleName = session?.user?.role?.name?.toLowerCase() || '';
    return roleName === 'mentor';
  }, [session?.user?.role?.name]);

  // Determine profile type based on route or prop, but only allow mentor if user has mentor role
  const profileType: 'user' | 'mentor' = useMemo(() => {
    if (forcedProfileType) {
      // If forced to mentor but user doesn't have mentor role, default to user
      if (forcedProfileType === 'mentor' && !isMentorRole) {
        return 'user';
      }
      return forcedProfileType;
    }

    // Check if route contains 'mentor' AND user has mentor role
    if ((params?.mentor || (typeof window !== 'undefined' && window.location.pathname.includes('/mentor'))) && isMentorRole) {
      return 'mentor';
    }

    return 'user';
  }, [forcedProfileType, params, isMentorRole]);

  // Safely extract id - current structure: /profile (own) or /profile/[id] (other)
  const id = profileId || (params?.id as string) || undefined;
  const isOwnProfile = !id; // If no ID, it's the own profile



  // Conditional hooks based on profile type and access
  const userMeQuery = useUserMe({
    queryKey: ['user-me'],
    enabled: isOwnProfile && profileType === 'user',
  });
  const userByIdQuery = useUserById(id || '', {
    queryKey: ['user-by-id', id],
    enabled: !isOwnProfile && !!id && profileType === 'user',
  });
  const updateUserMeMutation = useUpdateUserMe();
  const updateUserByIdMutation = useUpdateUserById();

  const mentorMeQuery = useMentorMe({
    queryKey: ['mentor-me'],
    enabled: isOwnProfile && profileType === 'mentor' && canAccessMentor,
  });
  const mentorByIdQuery = useMentorById(id || '', {
    queryKey: ['mentor-by-id', id],
    enabled: !isOwnProfile && !!id && profileType === 'mentor' && canAccessMentor,
  });
  const updateMentorMeMutation = useUpdateMentorMe();
  const updateMentorByIdMutation = useUpdateMentorById();

  // Select the appropriate data based on profile type and ownership
  const selectedUserQuery = isOwnProfile ? userMeQuery : userByIdQuery;
  const selectedMentorQuery = isOwnProfile ? mentorMeQuery : mentorByIdQuery;

  const {
    data: profileData,
    isLoading,
    error
  } = useMemo(() => {
    // If the user has mentor access AND profileType is 'mentor', use mentor data
    if (canAccessMentor && profileType === 'mentor') {
      return selectedMentorQuery;
    }
    // Otherwise, use user data (either profileType is 'user', or profileType is 'mentor' but user has no mentor access)
    return selectedUserQuery;
  }, [profileType, canAccessMentor, selectedUserQuery, selectedMentorQuery]);

  // Select the appropriate update mutation
  const selectedUserMutation = isOwnProfile ? updateUserMeMutation : updateUserByIdMutation;
  const selectedMentorMutation = isOwnProfile ? updateMentorMeMutation : updateMentorByIdMutation;

  const updateMutation = useMemo(() => {
    // If the user has mentor access AND profileType is 'mentor', use mentor mutations
    if (canAccessMentor && profileType === 'mentor') {
      return selectedMentorMutation;
    }
    // Otherwise, use user mutations
    return selectedUserMutation;
  }, [profileType, canAccessMentor, selectedUserMutation, selectedMentorMutation]);

  // Update profile function
  const updateProfile = useCallback(async (data: ProfileUpdateData) => {
    try {
      if (canAccessMentor && profileType === 'mentor') {
        // Use mentor API if user has mentor role and profileType is mentor
        if (isOwnProfile) {
          await updateMentorMeMutation.mutateAsync(data as MentorUpdateRequestDto);
          // Invalidate mentor queries - React Query will automatically refetch
          await queryClient.invalidateQueries({ queryKey: ['mentor-me'] });
        } else if (id) {
          await updateMentorByIdMutation.mutateAsync({ id, data: data as MentorUpdateRequestDto });
          // Invalidate mentor by id queries - React Query will automatically refetch
          await queryClient.invalidateQueries({ queryKey: ['mentor-by-id', id] });
        }
      } else if (isOwnProfile) {
        // Use user API for 'user' profile type or if not a mentor
        await updateUserMeMutation.mutateAsync(data as UserUpdateRequestDto);
        // Invalidate user queries - React Query will automatically refetch
        await queryClient.invalidateQueries({ queryKey: ['user-me'] });
      } else if (id) {
        await updateUserByIdMutation.mutateAsync({ id, data: data as UserUpdateRequestDto });
        // Invalidate user by id queries - React Query will automatically refetch
        await queryClient.invalidateQueries({ queryKey: ['user-by-id', id] });
      }
    } catch (error: unknown) {
      console.error('Failed to update profile:', error);
      // Try to extract backend error message if available
      let apiMessage = '';
      if (typeof error === 'object' && error !== null) {
  const errObj = error as { response?: { data?: unknown } };
  const data = errObj.response?.data;
        if (data) {
          try {
            const parsed = typeof data === 'string' ? JSON.parse(data) : data;
            if (parsed && typeof parsed.message === 'string') {
              apiMessage = parsed.message;
            }
          } catch {
            // ignore JSON parse error
          }
        }
      }
      if (apiMessage) {
        throw new Error(apiMessage);
      }
      throw error;
    }
  }, [
    profileType,
    isOwnProfile,
    canAccessMentor,
    id,
    queryClient,
    updateUserMeMutation,
    updateUserByIdMutation,
    updateMentorMeMutation,
    updateMentorByIdMutation
  ]);  const isUpdating = updateMutation.isPending;

  const value: ProfileContextType = useMemo(() => ({
    profileData,
    isLoading,
    error,
    isOwnProfile,
    profileId: isOwnProfile ? null : (id || null),
    profileType,
    updateProfile,
    isUpdating,
    canAccessMentor
  }), [profileData, isLoading, error, isOwnProfile, id, profileType, updateProfile, isUpdating, canAccessMentor]);

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

// Hook to use the profile context
export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

// Export types for external use
export type { ProfileContextType };
export type { ProfileData, ProfileUpdateData };
