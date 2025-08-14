'use client';

import React, { createContext, useContext, useMemo, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@imphnen-frontend-service/utils';
import {
  
  useUserMe,
  useUserById,
  useUpdateUserMe,
  useUpdateUserById,
  UserDetailResponseDto,
  UserUpdateRequestDto,
  
  useMentorMe,
  useMentorById,
  useUpdateMentorMe,
  useUpdateMentorById,
  MentorDetailResponseDto,
  MentorUpdateRequestDto
} from '@imphnen-frontend-service/service';


type ProfileData = UserDetailResponseDto | MentorDetailResponseDto;
type ProfileUpdateData = UserUpdateRequestDto | MentorUpdateRequestDto;


const canAccessMentorFeatures = (user: { role?: { name?: string; permissions?: Array<{ name?: string }> } } | null) => {
  if (!user?.role) return false;

  const roleName = user.role.name?.toLowerCase() || '';
  const isMentorRole = roleName.includes('mentor') || roleName.includes('admin');

  if (isMentorRole) return true;

  
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

  
  const canAccessMentor = useMemo(() => {
    return canAccessMentorFeatures(session?.user || null);
  }, [session?.user]);

  
  const isMentorRole = useMemo(() => {
    const roleName = session?.user?.role?.name?.toLowerCase() || '';
    return roleName === 'mentor';
  }, [session?.user?.role?.name]);

  
  const profileType: 'user' | 'mentor' = useMemo(() => {
    if (forcedProfileType) {
      
      if (forcedProfileType === 'mentor' && !isMentorRole) {
        return 'user';
      }
      return forcedProfileType;
    }

    
    if ((params?.mentor || (typeof window !== 'undefined' && window.location.pathname.includes('/mentor'))) && isMentorRole) {
      return 'mentor';
    }

    return 'user';
  }, [forcedProfileType, params, isMentorRole]);

  
  const id = profileId || (params?.id as string) || undefined;
  const isOwnProfile = !id; 



  
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

  
  const selectedUserQuery = isOwnProfile ? userMeQuery : userByIdQuery;
  const selectedMentorQuery = isOwnProfile ? mentorMeQuery : mentorByIdQuery;

  const {
    data: profileData,
    isLoading,
    error
  } = useMemo(() => {
    
    if (canAccessMentor && profileType === 'mentor') {
      return selectedMentorQuery;
    }
    
    return selectedUserQuery;
  }, [profileType, canAccessMentor, selectedUserQuery, selectedMentorQuery]);

  
  const selectedUserMutation = isOwnProfile ? updateUserMeMutation : updateUserByIdMutation;
  const selectedMentorMutation = isOwnProfile ? updateMentorMeMutation : updateMentorByIdMutation;

  const updateMutation = useMemo(() => {
    
    if (canAccessMentor && profileType === 'mentor') {
      return selectedMentorMutation;
    }
    
    return selectedUserMutation;
  }, [profileType, canAccessMentor, selectedUserMutation, selectedMentorMutation]);

  
  const updateProfile = useCallback(async (data: ProfileUpdateData) => {
    try {
      if (canAccessMentor && profileType === 'mentor') {
        
        if (isOwnProfile) {
          await updateMentorMeMutation.mutateAsync(data as MentorUpdateRequestDto);
          
          await queryClient.invalidateQueries({ queryKey: ['mentor-me'] });
        } else if (id) {
          await updateMentorByIdMutation.mutateAsync({ id, data: data as MentorUpdateRequestDto });
          
          await queryClient.invalidateQueries({ queryKey: ['mentor-by-id', id] });
        }
      } else if (isOwnProfile) {
        
        await updateUserMeMutation.mutateAsync(data as UserUpdateRequestDto);
        
        await queryClient.invalidateQueries({ queryKey: ['user-me'] });
      } else if (id) {
        await updateUserByIdMutation.mutateAsync({ id, data: data as UserUpdateRequestDto });
        
        await queryClient.invalidateQueries({ queryKey: ['user-by-id', id] });
      }
    } catch (error: unknown) {
      console.error('Failed to update profile:', error);
      
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
            apiMessage = typeof data === 'string' ? data : '';
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


export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};


export type { ProfileContextType };
export type { ProfileData, ProfileUpdateData };
