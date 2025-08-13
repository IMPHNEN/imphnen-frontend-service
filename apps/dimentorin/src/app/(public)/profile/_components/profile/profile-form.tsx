import { FC, useState, useEffect } from 'react';
import { NotificationModal } from '../modals';
import { ExperiencesSection } from '../sections/experiences-section';
import { CvResumeSection } from '../sections/cv-resume-section';
import { DescriptionSection } from '../sections/description-section';
import { EducationSection } from '../sections/education-section';
import { LanguagesSection } from '../sections/languages-section';
import type { MentorUpdateRequestDto, UserUpdateRequestDto } from '@imphnen-frontend-service/service';
import { useProfile } from '../contexts/profile-context';

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  period: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
}

interface Language {
  name: string;
  level: string;
}

interface ProfileFormProps {
  showNotification: (type: 'success' | 'error', title: string, message?: string) => void;
}

export const ProfileForm: FC<ProfileFormProps> = ({ showNotification }) => {
  const { profileData, updateProfile, profileType } = useProfile();

  const [notification, setNotification] = useState<{
    isOpen: boolean;
    type: 'success' | 'error';
    title: string;
    message?: string;
  }>({
    isOpen: false,
    type: 'success',
    title: '',
    message: ''
  });

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);

  // Additional states for profile data
  const [personalInfo, setPersonalInfo] = useState({
    fullname: '',
    title: '',
    bio: '',
    birthdate: '',
    gender: ''
  });

  const [cvResume, setCvResume] = useState({
    cvUrl: '',
    resumeUrl: ''
  });

  // Update experiences when profileData changes
  useEffect(() => {
    if (profileData) {
      const experiences = 'experience' in profileData ? profileData.experience || [] : [];
      setExperiences(experiences);
    }
  }, [profileData]);

  // Update education when profileData changes
  useEffect(() => {
    if (profileData) {
      const education = 'education' in profileData ? profileData.education || [] : [];
      setEducation(education);
    }
  }, [profileData]);

  // Update languages when profileData changes
  useEffect(() => {
    if (profileData) {
      const languages: Language[] = 'languages' in profileData
        ? (profileData.languages || []).map(lang => ({ name: lang, level: 'Intermediate' }))
        : [];
      setLanguages(languages);
    }
  }, [profileData]);

  // Update personal info when profileData changes
  useEffect(() => {
    if (profileData) {
      const bio = 'bio' in profileData ? profileData.bio || '' : '';

      let fullname = '';
      if ('fullname' in profileData) {
        fullname = profileData.fullname || '';
      } else if ('legal_name' in profileData) {
        fullname = profileData.legal_name || '';
      }

      const title = 'current_role' in profileData ? profileData.current_role || '' : '';
      const birthdate = 'birthdate' in profileData ? profileData.birthdate || '' : '';
      const gender = 'gender' in profileData ? profileData.gender || '' : '';

      setPersonalInfo({
        fullname,
        title,
        bio,
        birthdate,
        gender
      });
    }
  }, [profileData]);

  // Update CV/Resume info when profileData changes
  useEffect(() => {
    if (profileData) {
      const cvUrl = profileType === 'mentor' && 'cv_url' in profileData ? profileData.cv_url || '' : '';

      setCvResume({
        cvUrl,
        resumeUrl: ''
      });
    }
  }, [profileData, profileType]);

  // Handle profile updates using the context
  const handleProfileUpdate = async (updates: Partial<MentorUpdateRequestDto | UserUpdateRequestDto>) => {
    try {
      // Wait for the backend update to complete
      const result = await updateProfile(updates);

      // Only show success notification if the backend update was successful
      // The updateProfile function should throw an error if the backend update fails
      showNotification('success', 'Perubahan Berhasil Disimpan');

      return result;
    } catch (err) {
      console.error('Profile update error:', err);
      showNotification('error', 'Gagal menyimpan perubahan', 'Silakan coba lagi');
      throw err; // Re-throw the error so calling functions can handle it if needed
    }
  };

  return (
    <div className="space-y-6">
      {/* Description/Bio Section */}
      <DescriptionSection
        initialDescription={personalInfo.bio}
        onSave={async (newDescription) => {
          await handleProfileUpdate({
            bio: newDescription || null
          });
        }}
        showNotification={showNotification}
      />

      {/* Languages Section */}
      <LanguagesSection
        initialLanguages={languages}
        onSave={async (newLanguages) => {
          setLanguages(newLanguages);
          await handleProfileUpdate({
            languages: newLanguages.map(lang => lang.name)
          } as MentorUpdateRequestDto | UserUpdateRequestDto);
        }}
        showNotification={showNotification}
      />

      {/* Experience Section */}
      <ExperiencesSection
        initialExperiences={experiences}
        onSave={async (newExperiences) => {
          setExperiences(newExperiences);
          try {
            // Update backend with new experience data
            await handleProfileUpdate({
              experience: newExperiences
            });
          } catch (error) {
            console.error('Experience update error:', error);
            // Error notification is already handled in handleProfileUpdate
          }
        }}
        showNotification={showNotification}
      />

      {/* Education Section */}
      <EducationSection
        initialEducation={education}
        onSave={async (newEducations) => {
          setEducation(newEducations);
          try {
            // Update backend with new education data
            await handleProfileUpdate({
              education: newEducations
            });
          } catch (error) {
            console.error('Education update error:', error);
            // Error notification is already handled in handleProfileUpdate
          }
        }}
        showNotification={showNotification}
      />

      {/* CV/Resume Section - Only for mentors */}
      {profileType === 'mentor' && (
        <CvResumeSection
          initialFileName={cvResume.cvUrl}
          onSave={async (cvData) => {
            await handleProfileUpdate({
              cv_url: cvData.fileName || null
            });
          }}
          showNotification={showNotification}
        />
      )}

      <NotificationModal
        isOpen={notification.isOpen}
        onClose={() => setNotification(prev => ({ ...prev, isOpen: false }))}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        header="Profile"
      />
    </div>
  );
};
