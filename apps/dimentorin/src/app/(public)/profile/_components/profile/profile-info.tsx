import { useState, FC, useEffect } from 'react';
import { PersonalInfoSection } from '../sections/personal-info-section';
import { SkillsSection } from '../sections/skills-section';
import { LanguagesSection } from '../sections/languages-section';
import { SocialMediaSection } from '../sections/social-media-section';
import { NotificationType } from '../modals/notification-modal';
import { useProfile } from '../contexts/profile-context';
import type { MentorUpdateRequestDto, UserUpdateRequestDto } from '@imphnen-frontend-service/service';

interface Language {
  name: string;
  level: string;
}

interface SocialLink {
  platform: string;
  placeholder: string;
  value: string;
}

interface ProfileInfoProps {
  showNotification: (type: NotificationType['type'], title: string, message?: string) => void;
}

export const ProfileInfo: FC<ProfileInfoProps> = ({ showNotification }) => {
  const { profileData, updateProfile, profileType } = useProfile();

  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    location: ''
  });

  const [currentSkills, setCurrentSkills] = useState<string[]>([]);
  const [currentLanguages, setCurrentLanguages] = useState<Language[]>([]);
  const [currentSocialLinks, setCurrentSocialLinks] = useState<SocialLink[]>([
    { platform: 'LinkedIn', placeholder: 'linkedin.com/in/yourprofile', value: '' },
    { platform: 'Github', placeholder: 'github.com/yourusername', value: '' },
    { platform: 'Portfolio', placeholder: 'yourportfolio.com', value: '' },
    { platform: 'Twitter', placeholder: 'twitter.com/yourusername', value: '' }
  ]);

  
  useEffect(() => {
    if (profileData) {
      const email = 'email' in profileData ? profileData.email || '' : '';
      let phone = '';
      if ('phone_number' in profileData) {
        phone = profileData.phone_number || '';
      } else if ('phone_for_verification' in profileData) {
        phone = profileData.phone_for_verification || '';
      }

      let location = '';
      if ('location' in profileData) {
        location = profileData.location || '';
      } else if ('domicile' in profileData) {
        location = profileData.domicile || '';
      }

      setContactInfo({ email, phone, location });
    }
  }, [profileData]);


  useEffect(() => {
    if (profileData) {
      let skills: string[] = [];
      if ('skills' in profileData) {
        skills = profileData.skills || [];
      } else if ('expertise' in profileData) {
        skills = profileData.expertise || [];
      }
      setCurrentSkills(skills);
    }
  }, [profileData]);


  useEffect(() => {
    if (profileData) {
      const languages: Language[] = 'languages' in profileData
        ? (profileData.languages || []).map(lang => ({ name: lang, level: 'Intermediate' }))
        : [];
      setCurrentLanguages(languages);
    }
  }, [profileData]);


  useEffect(() => {
    if (profileData) {
      const linkedinUrl = 'linkedin_url' in profileData ? profileData.linkedin_url || '' : '';
      const githubUrl = 'github_url' in profileData ? profileData.github_url || '' : '';
      let portfolioUrl = '';
      if (profileType === 'mentor' && 'portfolio_url' in profileData) {
        portfolioUrl = profileData.portfolio_url || '';
      } else if (profileType === 'user' && 'website_url' in profileData) {
        portfolioUrl = profileData.website_url || '';
      }
      const twitterUrl = 'twitter_url' in profileData ? profileData.twitter_url || '' : '';

      setCurrentSocialLinks([
        { platform: 'LinkedIn', placeholder: 'linkedin.com/in/yourprofile', value: linkedinUrl },
        { platform: 'Github', placeholder: 'github.com/yourusername', value: githubUrl },
        { platform: 'Portfolio', placeholder: 'yourportfolio.com', value: portfolioUrl },
        { platform: 'Twitter', placeholder: 'twitter.com/yourusername', value: twitterUrl }
      ]);
    }
  }, [profileData, profileType]);


  const handleProfileUpdate = async (updates: Partial<MentorUpdateRequestDto | UserUpdateRequestDto>) => {
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
      <PersonalInfoSection
        initialContactInfo={contactInfo}
        onSave={async (newContactInfo) => {
          setContactInfo(newContactInfo);
          await handleProfileUpdate({
            phone_for_verification: newContactInfo.phone,
            location: newContactInfo.location
          });
        }}
        showNotification={showNotification}
      />

      <SocialMediaSection
        initialSocialLinks={currentSocialLinks}
        onSave={async (newSocialLinks) => {
          setCurrentSocialLinks(newSocialLinks);
          const linkedIn = newSocialLinks.find(link => link.platform === 'LinkedIn')?.value;
          const github = newSocialLinks.find(link => link.platform === 'Github')?.value;
          const portfolio = newSocialLinks.find(link => link.platform === 'Portfolio')?.value;
          const twitter = newSocialLinks.find(link => link.platform === 'Twitter')?.value;

          const updates: Partial<MentorUpdateRequestDto | UserUpdateRequestDto> = {
            linkedin_url: linkedIn || undefined,
            github_url: github || undefined,
            twitter_url: twitter || undefined,
          };

          if (profileType === 'mentor') {
            (updates as MentorUpdateRequestDto).portfolio_url = portfolio || undefined;
          } else if (profileType === 'user') {
            (updates as UserUpdateRequestDto).website_url = portfolio || undefined;
          }

          await handleProfileUpdate(updates);
        }}
        showNotification={showNotification}
      />

      <SkillsSection
        initialSkills={currentSkills}
        onSave={async (newSkills) => {
          setCurrentSkills(newSkills);
          const updates: Partial<MentorUpdateRequestDto | UserUpdateRequestDto> = {};

          if (profileType === 'user') {
            (updates as UserUpdateRequestDto).skills = newSkills;
          } else if (profileType === 'mentor') {
            (updates as MentorUpdateRequestDto).expertise = newSkills;
          }

          await handleProfileUpdate(updates);
        }}
        showNotification={showNotification}
      />

      <LanguagesSection
        initialLanguages={currentLanguages}
        onSave={async (newLanguages) => {
          setCurrentLanguages(newLanguages);
          await handleProfileUpdate({
            languages: newLanguages.map(lang => lang.name)
          } as MentorUpdateRequestDto | UserUpdateRequestDto);
        }}
        showNotification={showNotification}
      />
    </div>
  );
};
