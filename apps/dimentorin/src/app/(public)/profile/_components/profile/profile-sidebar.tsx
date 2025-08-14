import { FC, useState, useEffect, useCallback } from 'react';
import { Select } from '@imphnen-frontend-service/ui/atoms';
import { SectionWrapper } from '../shared/section-wrapper';
import { NotificationType } from '../modals/notification-modal';
import { PersonalInfoSection } from '../sections/personal-info-section';
import { SkillsSection } from '../sections/skills-section';
import type { MentorUpdateRequestDto, UserUpdateRequestDto } from '@imphnen-frontend-service/service';
import { useProfile } from '../contexts/profile-context';

interface ProfileSidebarProps {
  showNotification: (type: NotificationType['type'], title: string, message?: string) => void;
}

export const ProfileSidebar: FC<ProfileSidebarProps> = ({ showNotification }) => {
  const { profileData, updateProfile, profileType, isLoading, isUpdating } = useProfile();

  console.log('ProfileSidebar: Component render - profileData:', profileData, 'profileType:', profileType, 'isLoading:', isLoading);
  console.log('ProfileSidebar: Should show Career Status?', profileType === 'mentor');

  // Helper functions to safely access profile data
  const getCareerStatus = useCallback(() => {
    if (!profileData) {
      return 'Career Status';
    }

    // For users, check career_status field
    if (profileType === 'user' && 'career_status' in profileData) {
      const status = profileData.career_status;
      if (status && typeof status === 'string' && status.trim() !== '') {
        return status;
      }
    }

    // For mentors, check availability_commitment field (legacy)
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
    // Check phone_for_verification first (available for both user and mentor)
    if (profileData && 'phone_for_verification' in profileData && profileData.phone_for_verification) {
      return profileData.phone_for_verification;
    }
    // Fallback to phone_number for user
    if (profileType === 'user' && profileData && 'phone_number' in profileData && profileData.phone_number) {
      return profileData.phone_number;
    }
    return '+62 (88) 8888 8888';
  }, [profileType, profileData]);

  const getLocation = useCallback(() => {
    // Check domicile first (available for both user and mentor)
    if (profileData && 'domicile' in profileData && profileData.domicile) {
      return profileData.domicile;
    }
    // Fallback to location for user
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
    return ['HTML', 'CSS', 'Javascript', 'Next.Js', 'React', 'TypeScript'];
  }, [profileType, profileData]);

  const [careerStatus, setCareerStatus] = useState<string>('Career Status');
  const [isUpdatingCareerStatus, setIsUpdatingCareerStatus] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    email: 'email@example.com',
    phone: '+62 (88) 8888 8888',
    location: 'Location'
  });

  const [skills, setSkills] = useState<string[]>(['HTML', 'CSS', 'Javascript', 'Next.Js', 'React', 'TypeScript']);

  // Initialize career status when profileData is first loaded
  useEffect(() => {
    if (profileData && !isLoading && careerStatus === 'Career Status') {
      const initialCareerStatus = getCareerStatus();
      console.log('ProfileSidebar: Initial load - setting career status to:', initialCareerStatus);
      setCareerStatus(initialCareerStatus);
      setIsInitialized(true);
    }
  }, [profileData, isLoading, careerStatus, getCareerStatus]);

  // Update data when profileData changes
  useEffect(() => {
    if (profileData && !isLoading) {
      // Only update career status if we're not actively updating it AND it's already been initialized
      if (!isUpdatingCareerStatus && isInitialized) {
        const newCareerStatus = getCareerStatus();
        console.log('ProfileSidebar: Updating career status from API:', newCareerStatus);
        setCareerStatus(newCareerStatus);
      }

      // Update personal info using helper functions
      setPersonalInfo({
        email: getEmail(),
        phone: getPhone(),
        location: getLocation()
      });

      // Update skills using helper function
      setSkills(getSkills());
    }
  }, [profileData, profileType, isLoading, isInitialized, getCareerStatus, getEmail, getPhone, getLocation, getSkills, isUpdatingCareerStatus]);

  // Handle profile updates using the context
  const handleProfileUpdate = async (updates: Partial<MentorUpdateRequestDto | UserUpdateRequestDto>) => {
    try {
      await updateProfile(updates);
      showNotification('success', 'Perubahan Berhasil Disimpan');
    } catch (err) {
      console.error('Profile update error:', err);
      let apiMessage = '';
      if (typeof err === 'object' && err !== null) {
        // @ts-expect-error Error object may have response property from Axios or fetch
        if (err.response?.data?.message) {
          // @ts-expect-error Error object may have response property from Axios or fetch
          apiMessage = err.response.data.message;
        } else if ('message' in err && typeof (err as { message?: string }).message === 'string') {
          const msg = (err as { message?: string }).message || '';
          // Try to parse as JSON if looks like JSON
          if (msg.trim().startsWith('{') && msg.trim().endsWith('}')) {
            try {
              const parsed = JSON.parse(msg);
              if (parsed && typeof parsed.message === 'string') {
                apiMessage = parsed.message;
              } else {
                apiMessage = msg;
              }
            } catch {
              apiMessage = msg;
            }
          } else {
            apiMessage = msg;
          }
        }
      }
      showNotification('error', 'Gagal menyimpan perubahan', apiMessage || 'Silakan coba lagi');
    }
  };

  return (
    <div className="space-y-6">
      {/* Career Status - Available for all users */}
      <SectionWrapper title="Career Status">
        <Select
          value={careerStatus}
          onChange={async (e) => {
            const newStatus = e.target.value;
            console.log('ProfileSidebar: User selected career status:', newStatus);
            setCareerStatus(newStatus);
            setIsUpdatingCareerStatus(true);
            try {
              console.log('ProfileSidebar: Updating career status on backend...');

              // Use different field based on profile type
              const updates: Partial<MentorUpdateRequestDto | UserUpdateRequestDto> = {};
              if (profileType === 'mentor') {
                (updates as MentorUpdateRequestDto).availability_commitment = newStatus;
              } else {
                (updates as UserUpdateRequestDto).career_status = newStatus;
              }

              await handleProfileUpdate(updates);
              console.log('ProfileSidebar: Career status update successful');
            } catch (error) {
              console.error('ProfileSidebar: Career status update failed:', error);
            } finally {
              // Allow useEffect to update the career status again after update is complete
              setTimeout(() => setIsUpdatingCareerStatus(false), 1000);
            }
          }}
          className="w-full min-w-[200px]"
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
          // Use appropriate fields for both user and mentor
          const updates: Partial<MentorUpdateRequestDto | UserUpdateRequestDto> = {
            phone_for_verification: newPersonalInfo.phone || null,
            domicile: newPersonalInfo.location || null
          };
          await handleProfileUpdate(updates);
        }}
        showNotification={showNotification}
        isLoading={isUpdating}
      />

      <SkillsSection
        initialSkills={skills}
        onSave={async (newSkills) => {
          setSkills(newSkills);
          // Use different field based on profile type
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
      />
    </div>
  );
};
