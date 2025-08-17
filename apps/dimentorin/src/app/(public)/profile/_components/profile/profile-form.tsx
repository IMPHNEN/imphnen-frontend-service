import { FC, useState, useEffect } from 'react';
import { NotificationModal } from '../modals';
import { ExperiencesSection } from '../sections/experiences-section';
import { CvResumeSection } from '../sections/cv-resume-section';
import { DescriptionSection } from '../sections/description-section';
import { EducationSection } from '../sections/education-section';
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

interface ProfileFormProps {
  showNotification: (type: 'success' | 'error', title: string, message?: string) => void;
  isViewOnly?: boolean; // Add isViewOnly prop
}

export const ProfileForm: FC<ProfileFormProps> = ({ showNotification, isViewOnly = false }) => {
  const { profileData, updateProfile, isUpdating } = useProfile();

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

  
  useEffect(() => {
    if (profileData) {
      const experiences = 'experience' in profileData ? profileData.experience || [] : [];
      setExperiences(experiences);
    }
  }, [profileData]);

  
  useEffect(() => {
    if (profileData) {
      const education = 'education' in profileData ? profileData.education || [] : [];
      setEducation(education);
    }
  }, [profileData]);

  
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

  
  useEffect(() => {
    if (profileData) {
      const cvUrl = 'cv_url' in profileData ? profileData.cv_url || '' : '';

      setCvResume({
        cvUrl,
        resumeUrl: ''
      });
    }
  }, [profileData]);

  
  
  function isErrorWithResponse(err: unknown): err is { response: { data: { message: string } } } {
    return (
      typeof err === 'object' &&
      err !== null &&
      
      typeof (err as { response?: { data?: { message?: unknown } } }).response?.data?.message === 'string'
    );
  }

  function isErrorWithMessage(err: unknown): err is { message: string } {
    return (
      typeof err === 'object' &&
      err !== null &&
      'message' in err &&
      typeof (err as { message?: unknown }).message === 'string'
    );
  }

  function tryParseJsonMessage(msg: string): string {
    const trimmed = msg.trim();
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
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
  }

  function extractApiMessage(err: unknown): string {
    if (isErrorWithResponse(err)) {
      return err.response.data.message;
    }
    if (isErrorWithMessage(err)) {
      const msg = err.message || '';
      return tryParseJsonMessage(msg);
    }
    return '';
  }

  const handleProfileUpdate = async (updates: Partial<MentorUpdateRequestDto | UserUpdateRequestDto>) => {
    if (isViewOnly) { // Prevent updates if in view-only mode
      showNotification('error', 'Akses Ditolak', 'Anda tidak memiliki izin untuk mengedit profil ini.');
      return;
    }
    try {
      const result = await updateProfile(updates);
      showNotification('success', 'Perubahan Berhasil Disimpan');
      return result;
    } catch (err: unknown) {
      console.error('Profile update error:', err);
      const apiMessage = extractApiMessage(err);
      showNotification('error', 'Gagal menyimpan perubahan', apiMessage || 'Silakan coba lagi');
      throw err;
    }
  };

  return (
    <div className="space-y-6">
      {}
      <DescriptionSection
        initialDescription={personalInfo.bio}
        onSave={async (newDescription) => {
          await handleProfileUpdate({
            bio: newDescription || null
          });
        }}
        showNotification={showNotification}
        isLoading={isUpdating}
        isViewOnly={isViewOnly} // Pass isViewOnly
      />
      {}
      <CvResumeSection
        initialFileName={cvResume.cvUrl}
        fullname={personalInfo.fullname}
        onSave={async (cvData) => {
          await handleProfileUpdate({
            cv_url: cvData.fileUrl || null
          });
        }}
        showNotification={showNotification}
        isLoading={isUpdating}
        isViewOnly={isViewOnly} // Pass isViewOnly
      />
      {}
      <ExperiencesSection
        initialExperiences={experiences}
        onSave={async (newExperiences) => {
          try {
            await handleProfileUpdate({
              experience: newExperiences
            });
          } catch (error) {
            console.error('Experience update error:', error);
          }
        }}
        showNotification={showNotification}
        isLoading={isUpdating}
        isViewOnly={isViewOnly} // Pass isViewOnly
      />

      {}
      <EducationSection
        initialEducation={education}
        onSave={async (newEducations) => {
          try {
            await handleProfileUpdate({
              education: newEducations
            });
          } catch (error) {
            console.error('Education update error:', error);
          }
        }}
        showNotification={showNotification}
        isLoading={isUpdating}
        isViewOnly={isViewOnly} // Pass isViewOnly
      />

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