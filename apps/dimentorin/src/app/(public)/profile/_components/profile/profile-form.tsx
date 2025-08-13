import { FC, useState, useEffect } from 'react';
import { NotificationModal } from '../modals';
import { ExperiencesSection } from '../sections/experiences-section';
import { CvResumeSection } from '../sections/cv-resume-section';
import { SocialMediaSection } from '../sections/social-media-section';
import { DescriptionSection } from '../sections/description-section';
import { EducationSection } from '../sections/education-section';
import type { MentorUpdateRequestDto } from '@imphnen-frontend-service/service';
import { useProfile } from '../contexts/profile-context';

interface SocialLink {
  platform: string;
  placeholder: string;
  value: string;
}

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
}

export const ProfileForm: FC<ProfileFormProps> = ({ showNotification }) => {
  const { profileData, updateProfile, profileType } = useProfile();

  // Helper functions to safely access profile data based on type
  const getProfileName = () => {
    if (!profileData) return '';
    if (profileType === 'user' && 'fullname' in profileData) return profileData.fullname || '';
    if (profileType === 'mentor' && 'legal_name' in profileData) return profileData.legal_name || '';
    return '';
  };

  const getProfileTitle = () => {
    if (!profileData) return '';
    if (profileType === 'mentor' && 'current_role' in profileData) return profileData.current_role || '';
    return '';
  };

  const getLinkedInUrl = () => {
    if (!profileData || !('linkedin_url' in profileData)) return '';
    return profileData.linkedin_url || '';
  };

  const getGithubUrl = () => {
    if (!profileData || !('github_url' in profileData)) return '';
    return profileData.github_url || '';
  };

  const getPortfolioUrl = () => {
    if (!profileData) return '';
    if (profileType === 'mentor' && 'portfolio_url' in profileData) return profileData.portfolio_url || '';
    if (profileType === 'user' && 'website_url' in profileData) return profileData.website_url || '';
    return '';
  };

  const getBio = () => {
    if (!profileData || !('bio' in profileData)) return '';
    return profileData.bio || '';
  };

  const getCvUrl = () => {
    if (!profileData) return '';
    if (profileType === 'mentor' && 'cv_url' in profileData) return profileData.cv_url || '';
    return '';
  };

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

  const [profileLocalData, setProfileLocalData] = useState(() => ({
    name: getProfileName(),
    title: getProfileTitle()
  }));

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => [
    {
      platform: 'LinkedIn',
      placeholder: 'linkedin.com/in/yourprofile',
      value: getLinkedInUrl()
    },
    {
      platform: 'Github',
      placeholder: 'github.com/yourusername',
      value: getGithubUrl()
    },
    {
      platform: 'Portfolio',
      placeholder: 'yourportfolio.com',
      value: getPortfolioUrl()
    }
  ]);

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      company: 'Adonis Tech',
      position: 'Fullstack Developer',
      duration: '1 Years',
      period: 'Jan 2023 - Current'
    },
    {
      id: '2',
      company: 'CodeX Digital',
      position: 'Intern Front-End',
      duration: '6 Months',
      period: 'July 2024 - Dec 2024'
    }
  ]);

  const [education, setEducation] = useState<Education[]>([
    {
      id: '1',
      institution: 'Universitas Widjyabakti',
      degree: 'Inform Front-End',
      field: 'S.Teknik',
      period: 'Sep 2022 - Current'
    },
    {
      id: '2',
      institution: 'SMKN 5B Banjaran',
      degree: 'Rekayasa Perangkat Lunak',
      field: 'Vocational High School',
      period: 'Aug 2019 - May 2022'
    }
  ]);

  // Update data when mentorData changes
  useEffect(() => {
    if (profileData) {
      const profileName = profileType === 'user' && 'fullname' in profileData
        ? profileData.fullname || ''
        : profileType === 'mentor' && 'legal_name' in profileData
        ? profileData.legal_name || ''
        : '';

      const profileTitle = profileType === 'mentor' && 'current_role' in profileData
        ? profileData.current_role || ''
        : '';

      const linkedinUrl = 'linkedin_url' in profileData ? profileData.linkedin_url || '' : '';
      const githubUrl = 'github_url' in profileData ? profileData.github_url || '' : '';
      const portfolioUrl = profileType === 'mentor' && 'portfolio_url' in profileData
        ? profileData.portfolio_url || ''
        : profileType === 'user' && 'website_url' in profileData
        ? profileData.website_url || ''
        : '';

      setProfileLocalData({
        name: profileName,
        title: profileTitle
      });

      setSocialLinks([
        {
          platform: 'LinkedIn',
          placeholder: 'linkedin.com/in/yourprofile',
          value: linkedinUrl
        },
        {
          platform: 'Github',
          placeholder: 'github.com/yourusername',
          value: githubUrl
        },
        {
          platform: 'Portfolio',
          placeholder: 'yourportfolio.com',
          value: portfolioUrl
        }
      ]);
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
      <SocialMediaSection
        initialSocialLinks={socialLinks}
        onSave={async (newSocialLinks) => {
          setSocialLinks(newSocialLinks);
          const linkedIn = newSocialLinks.find(link => link.platform === 'LinkedIn')?.value;
          const github = newSocialLinks.find(link => link.platform === 'Github')?.value;
          const portfolio = newSocialLinks.find(link => link.platform === 'Portfolio')?.value;

          await handleProfileUpdate({
            linkedin_url: linkedIn || null,
            github_url: github || null,
            portfolio_url: portfolio || null,
          });
        }}
        showNotification={showNotification}
      />

      <DescriptionSection
        initialDescription={getBio()}
        onSave={async (newDescription) => {
          await handleProfileUpdate({
            bio: newDescription || null
          });
        }}
        showNotification={showNotification}
      />

      <ExperiencesSection
        initialExperiences={experiences}
        onSave={async (newExperiences) => {
          setExperiences(newExperiences);
          // Note: experiences field needs to be checked in the API types
          // await handleProfileUpdate({
          //   experiences: newExperiences.map(exp => ({
          //     company: exp.company,
          //     position: exp.position,
          //     duration: exp.duration,
          //     period: exp.period
          //   }))
          // });
        }}
        showNotification={showNotification}
      />

      <EducationSection
        initialEducation={education}
        onSave={async (newEducations) => {
          setEducation(newEducations);
          // Note: educations field needs to be checked in the API types
          // await handleProfileUpdate({
          //   educations: newEducations.map(edu => ({
          //     institution: edu.institution,
          //     degree: edu.degree,
          //     field: edu.field,
          //     period: edu.period
          //   }))
          // });
        }}
        showNotification={showNotification}
      />

      <CvResumeSection
        initialFileName={getCvUrl()}
        onSave={async (cvData) => {
          await handleProfileUpdate({
            cv_url: cvData.fileName || null
          });
        }}
        showNotification={showNotification}
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
