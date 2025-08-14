import type { MentorUpdateRequestDto, UserUpdateRequestDto } from '@imphnen-frontend-service/service';
import { useProfile } from '../contexts/profile-context';
import type { SocialLink, ProfileUpdateData, Experience, Education } from './profile-form-types';

export const useProfileHandlers = (
  showNotification: (type: 'success' | 'error', title: string, message?: string) => void
) => {
  const { updateProfile, profileType } = useProfile();

  const handleProfileUpdate = async (updates: ProfileUpdateData) => {
    try {
      const result = await updateProfile(updates);
      showNotification('success', 'Perubahan Berhasil Disimpan');
      return result;
    } catch (err) {
      console.error('Profile update error:', err);
      showNotification('error', 'Gagal menyimpan perubahan', 'Silakan coba lagi');
      throw err;
    }
  };

  const handlePersonalInfoSave = async (personalData: { phone: string; location: string }) => {
    await handleProfileUpdate({
      phone_for_verification: personalData.phone,
      location: personalData.location
    });
  };

  const handleContactInfoSave = async (contactData: { phone: string; location: string }) => {
    await handleProfileUpdate({
      phone_for_verification: contactData.phone,
      location: contactData.location
    });
  };

  const handleSocialMediaSave = async (newSocialLinks: SocialLink[]) => {
    const linkedIn = newSocialLinks.find(link => link.platform === 'LinkedIn')?.value;
    const github = newSocialLinks.find(link => link.platform === 'Github')?.value;
    const portfolio = newSocialLinks.find(link => link.platform === 'Portfolio')?.value;
    const twitter = newSocialLinks.find(link => link.platform === 'Twitter')?.value;

    const updates: ProfileUpdateData = {
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
  };

  const handleDescriptionSave = async (newDescription: string) => {
    await handleProfileUpdate({
      bio: newDescription || null
    });
  };

  const handleSkillsSave = async (newSkills: string[]) => {
    const updates: ProfileUpdateData = {};

    if (profileType === 'user') {
      (updates as UserUpdateRequestDto).skills = newSkills;
    } else if (profileType === 'mentor') {
      (updates as MentorUpdateRequestDto).expertise = newSkills;
    }

    await handleProfileUpdate(updates);
  };

  const handleLanguagesSave = async (newLanguages: Array<{ name: string; level: string }>) => {
    await handleProfileUpdate({
      languages: newLanguages.map(lang => lang.name)
    } as MentorUpdateRequestDto | UserUpdateRequestDto);
  };

  const handleExperiencesSave = async (newExperiences: Experience[]) => {
    try {
      await handleProfileUpdate({
        experience: newExperiences
      });
    } catch (error) {
      console.error('Experience update error:', error);
      // Error notification is already handled in handleProfileUpdate
    }
  };

  const handleEducationSave = async (newEducations: Education[]) => {
    try {
      await handleProfileUpdate({
        education: newEducations
      });
    } catch (error) {
      console.error('Education update error:', error);
      // Error notification is already handled in handleProfileUpdate
    }
  };

  const handleCvResumeSave = async (cvData: { fileName?: string; fileUrl?: string }) => {
    await handleProfileUpdate({
      cv_url: cvData.fileUrl || cvData.fileName || null
    });
  };

  return {
    handlePersonalInfoSave,
    handleContactInfoSave,
    handleSocialMediaSave,
    handleDescriptionSave,
    handleSkillsSave,
    handleLanguagesSave,
    handleExperiencesSave,
    handleEducationSave,
    handleCvResumeSave
  };
};
