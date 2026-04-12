import { FC, useState, useEffect, useCallback } from 'react';
import { NativeSelect as Select } from '@imphnen-frontend-service/ui/atoms';
import { SectionWrapper } from '../shared/section-wrapper';
import { NotificationType } from '../modals/notification-modal';
import { PersonalInfoSection } from '../sections/personal-info-section';
import { SkillsSection } from '../sections/skills-section';
import type { MentorUpdateRequestDto, UserUpdateRequestDto } from '@imphnen-frontend-service/service';
import { useProfile } from '../contexts/profile-context';

interface ProfileSidebarProps {
  showNotification: (type: NotificationType['type'], title: string, message?: string) => void;
  isViewOnly?: boolean;
}

export const ProfileSidebar: FC<ProfileSidebarProps> = ({ showNotification, isViewOnly = false }) => {
  const { profileData, updateProfile, profileType, isLoading, isUpdating } = useProfile();

  const getCareerStatus = useCallback(() => {
    if (!profileData) {
      return 'Career Status';
    }

    if (profileType === 'user' && 'career_status' in profileData) {
      const status = profileData.career_status;
      if (status && typeof status === 'string' && status.trim() !== '') {
        return status;
      }
    }

    if (profileType === 'mentor' && 'availability_commitment' in profileData) {
      const commitment = profileData.availability_commitment;
      if (commitment && typeof commitment === 'string' && commitment.trim() !== '') {
        return commitment;
      }
    }

    return 'Career Status';
  }, [profileType, profileData]);

  const getEmail = useCallback(() => {
    if (profileData && 'email' in profileData) {
      return profileData.email || 'email@example.com';
    }
    return 'email@example.com';
  }, [profileData]);

  const getPhone = useCallback(() => {
    if (profileData && 'phone_for_verification' in profileData && profileData.phone_for_verification) {
      return profileData.phone_for_verification;
    }
    if (profileType === 'user' && profileData && 'phone_number' in profileData && profileData.phone_number) {
      return profileData.phone_number;
    }
    return '+62 (88) 8888 8888';
  }, [profileType, profileData]);

  const getLocation = useCallback(() => {
    if (profileData && 'domicile' in profileData && profileData.domicile) {
      return profileData.domicile;
    }
    if (profileType === 'user' && profileData && 'location' in profileData && profileData.location) {
      return profileData.location;
    }
    return 'Location';
  }, [profileType, profileData]);

  const getSkills = useCallback(() => {
    if (profileType === 'mentor' && profileData && 'expertise' in profileData && profileData.expertise) {
      return Array.isArray(profileData.expertise) ? profileData.expertise : [];
    }
    if (profileType === 'user' && profileData && 'skills' in profileData && profileData.skills) {
      return Array.isArray(profileData.skills) ? profileData.skills : [];
    }
    return [''];
  }, [profileType, profileData]);

  const [careerStatus, setCareerStatus] = useState<string>('Career Status');
  const [isUpdatingCareerStatus, setIsUpdatingCareerStatus] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    email: 'email@example.com',
    phone: '+62 (88) 8888 8888',
    location: 'Location'
  });

  const [skills, setSkills] = useState<string[]>(['']);

  useEffect(() => {
    if (profileData && !isLoading && careerStatus === 'Career Status') {
      const initialCareerStatus = getCareerStatus();

      setCareerStatus(initialCareerStatus);
      setIsInitialized(true);
    }
  }, [profileData, isLoading, careerStatus, getCareerStatus]);

  useEffect(() => {
    if (profileData && !isLoading) {
      if (!isUpdatingCareerStatus && isInitialized) {
        const newCareerStatus = getCareerStatus();
        console.log('ProfileSidebar: Updating career status from API:', newCareerStatus);
        setCareerStatus(newCareerStatus);
      }

      setPersonalInfo({
        email: getEmail(),
        phone: getPhone(),
        location: getLocation()
      });

      setSkills(getSkills());
    }
  }, [profileData, profileType, isLoading, isInitialized, getCareerStatus, getEmail, getPhone, getLocation, getSkills, isUpdatingCareerStatus]);

  const tryParseJsonMessage = (msg: string): string => {
    if (msg.trim().startsWith('{') && msg.trim().endsWith('}')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (parsed && typeof parsed.message === 'string') {
          return parsed.message;
        }
      } catch {
        return msg;
      }
    }
    return msg;
  };

  const extractApiMessage = (err: unknown): string => {
    if (typeof err !== 'object' || err === null) return '';

    const maybeAxiosError = err as { response?: { data?: { message?: string } } };
    if (maybeAxiosError.response?.data?.message) {
      return maybeAxiosError.response.data.message;
    }

    if ('message' in err && typeof (err as { message?: string }).message === 'string') {
      const msg = (err as { message?: string }).message || '';
      return tryParseJsonMessage(msg);
    }

    return '';
  };

  const handleProfileUpdate = async (updates: Partial<MentorUpdateRequestDto | UserUpdateRequestDto>) => {
    if (isViewOnly) {
      showNotification('error', 'Akses Ditolak', 'Anda tidak memiliki izin untuk mengedit profil ini.');
      return;
    }
    try {
      await updateProfile(updates);
      showNotification('success', 'Perubahan Berhasil Disimpan');
    } catch (err) {
      console.error('Profile update error:', err);
      const apiMessage = extractApiMessage(err);
      showNotification('error', 'Gagal menyimpan perubahan', apiMessage || 'Silakan coba lagi');
    }
  };

  return (
    <div className="space-y-6">
      <SectionWrapper title="Career Status">
        <Select
          value={careerStatus}
          onChange={async (e) => {
            if (isUpdatingCareerStatus) return;
            const newStatus = e.target.value;
            console.log('ProfileSidebar: User selected career status:', newStatus);
            setCareerStatus(newStatus);
            setIsUpdatingCareerStatus(true);
            try {
              console.log('ProfileSidebar: Updating career status on backend...');

              const updates: Partial<MentorUpdateRequestDto | UserUpdateRequestDto> = {};
              if (profileType === 'mentor') {
                (updates as MentorUpdateRequestDto).availability_commitment = newStatus;
              } else {
                (updates as UserUpdateRequestDto).career_status = newStatus;
              }

              await handleProfileUpdate(updates);
            } catch (error) {
              console.error('ProfileSidebar: Career status update failed:', error);
            } finally {
              setIsUpdatingCareerStatus(false);
            }
          }}
          className="w-full min-w-[200px]"
          disabled={isUpdatingCareerStatus || isViewOnly}
        >
          <option value="Career Status">Career Status</option>
          <option value="Student">Student</option>
          <option value="Fresh Graduate">Fresh Graduate</option>
          <option value="Junior Developer">Junior Developer</option>
          <option value="Senior Developer">Senior Developer</option>
          <option value="Team Lead">Team Lead</option>
          <option value="Freelancer">Freelancer</option>
        </Select>
      </SectionWrapper>

      <PersonalInfoSection
        initialContactInfo={personalInfo}
        onSave={async (newPersonalInfo) => {
          setPersonalInfo(newPersonalInfo);
          const updates: Partial<MentorUpdateRequestDto | UserUpdateRequestDto> = {
            phone_for_verification: newPersonalInfo.phone || null,
            domicile: newPersonalInfo.location || null
          };
          await handleProfileUpdate(updates);
        }}
        showNotification={showNotification}
        isLoading={isUpdating}
        isViewOnly={isViewOnly}
      />

      <SkillsSection
        initialSkills={skills}
        onSave={async (newSkills) => {
          setSkills(newSkills);

          const updates: Partial<MentorUpdateRequestDto | UserUpdateRequestDto> = {};
          if (profileType === 'mentor') {
            (updates as MentorUpdateRequestDto).expertise = newSkills;
          } else if (profileType === 'user') {
            (updates as UserUpdateRequestDto).skills = newSkills;
          }
          await handleProfileUpdate(updates);
        }}
        showNotification={showNotification}
        isLoading={isUpdating}
        isViewOnly={isViewOnly}
      />
    </div>
  );
};
