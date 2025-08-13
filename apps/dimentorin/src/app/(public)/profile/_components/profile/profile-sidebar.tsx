import { FC, useState, useEffect } from 'react';
import { Select } from '@imphnen-frontend-service/ui/atoms';
import { SectionWrapper } from '../shared/section-wrapper';
import { NotificationType } from '../modals/notification-modal';
import { PersonalInfoSection } from '../sections/personal-info-section';
import { SkillsSection } from '../sections/skills-section';
import type { MentorUpdateRequestDto } from '@imphnen-frontend-service/service';
import { useProfile } from '../contexts/profile-context';

interface ProfileSidebarProps {
  showNotification: (type: NotificationType['type'], title: string, message?: string) => void;
}

export const ProfileSidebar: FC<ProfileSidebarProps> = ({ showNotification }) => {
  const { profileData, updateProfile, profileType } = useProfile();

  // Helper functions to safely access profile data
  const getAvailabilityCommitment = () => {
    if (profileType === 'mentor' && profileData && 'availability_commitment' in profileData) {
      return profileData.availability_commitment || 'Career Status';
    }
    return 'Career Status';
  };

  const getEmail = () => {
    if (profileData && 'email' in profileData) {
      return profileData.email || 'email@example.com';
    }
    return 'email@example.com';
  };

  const getPhone = () => {
    if (profileType === 'user' && profileData && 'phone_number' in profileData) {
      return profileData.phone_number || '+62 (88) 8888 8888';
    }
    if (profileType === 'mentor' && profileData && 'phone_for_verification' in profileData) {
      return profileData.phone_for_verification || '+62 (88) 8888 8888';
    }
    return '+62 (88) 8888 8888';
  };

  const getLocation = () => {
    if (profileType === 'mentor' && profileData && 'domicile' in profileData) {
      return profileData.domicile || 'Location';
    }
    if (profileType === 'user' && profileData && 'location' in profileData) {
      return profileData.location || 'Location';
    }
    return 'Location';
  };

  const [careerStatus, setCareerStatus] = useState(() => getAvailabilityCommitment());

  const [personalInfo, setPersonalInfo] = useState(() => ({
    email: getEmail(),
    phone: getPhone(),
    location: getLocation()
  }));

  const getSkills = () => {
    if (profileType === 'mentor' && profileData && 'expertise' in profileData && profileData.expertise) {
      return Array.isArray(profileData.expertise) ? profileData.expertise : [];
    }
    if (profileType === 'user' && profileData && 'skills' in profileData && profileData.skills) {
      return Array.isArray(profileData.skills) ? profileData.skills : [];
    }
    return ['HTML', 'CSS', 'Javascript', 'Next.Js', 'React', 'TypeScript'];
  };

  const [skills, setSkills] = useState<string[]>(() => getSkills());

  // Update data when profileData changes
  useEffect(() => {
    if (profileData) {
      // Update career status
      const availability = profileType === 'mentor' && 'availability_commitment' in profileData
        ? profileData.availability_commitment || 'Career Status'
        : 'Career Status';
      setCareerStatus(availability);

      // Update personal info
      const email = 'email' in profileData ? profileData.email || 'email@example.com' : 'email@example.com';
      const phone = profileType === 'user' && 'phone_number' in profileData
        ? profileData.phone_number || '+62 (88) 8888 8888'
        : profileType === 'mentor' && 'phone_for_verification' in profileData
        ? profileData.phone_for_verification || '+62 (88) 8888 8888'
        : '+62 (88) 8888 8888';
      const location = profileType === 'mentor' && 'domicile' in profileData
        ? profileData.domicile || 'Location'
        : profileType === 'user' && 'location' in profileData
        ? profileData.location || 'Location'
        : 'Location';

      setPersonalInfo({ email, phone, location });

      // Update skills
      const skills = profileType === 'mentor' && 'expertise' in profileData && profileData.expertise
        ? Array.isArray(profileData.expertise) ? profileData.expertise : []
        : profileType === 'user' && 'skills' in profileData && profileData.skills
        ? Array.isArray(profileData.skills) ? profileData.skills : []
        : ['HTML', 'CSS', 'Javascript', 'Next.Js', 'React', 'TypeScript'];

      setSkills(skills);
    }
  }, [profileData, profileType]);

  // Handle profile updates using the context
  const handleProfileUpdate = async (updates: Partial<MentorUpdateRequestDto>) => {
    try {
      await updateProfile(updates);
      showNotification('success', 'Perubahan Berhasil Disimpan');
    } catch (err) {
      console.error('Profile update error:', err);
      showNotification('error', 'Gagal menyimpan perubahan', 'Silakan coba lagi');
    }
  };

  return (
    <div className="space-y-6">
      <SectionWrapper title="Career Status">
        <Select
          value={careerStatus}
          onChange={async (e) => {
            const newStatus = e.target.value;
            setCareerStatus(newStatus);
            await handleProfileUpdate({
              availability_commitment: newStatus
            });
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
          await handleProfileUpdate({
            phone_for_verification: newPersonalInfo.phone || null,
            domicile: newPersonalInfo.location || null
          });
        }}
        showNotification={showNotification}
      />

      <SkillsSection
        initialSkills={skills}
        onSave={async (newSkills) => {
          setSkills(newSkills);
          await handleProfileUpdate({
            expertise: newSkills
          });
        }}
        showNotification={showNotification}
      />
    </div>
  );
};
