import { useState, useEffect } from 'react';
import { useProfile } from '../contexts/profile-context';
import type {
  SocialLink,
  Experience,
  Education,
  Language,
  PersonalInfo,
  ContactInfo,
  CvResume,
  NotificationState
} from './profile-form-types';

export const useProfileFormState = () => {
  const { profileData, profileType } = useProfile();

  const [notification, setNotification] = useState<NotificationState>({
    isOpen: false,
    type: 'success',
    title: '',
    message: ''
  });

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    {
      platform: 'LinkedIn',
      placeholder: 'linkedin.com/in/yourprofile',
      value: ''
    },
    {
      platform: 'Github',
      placeholder: 'github.com/yourusername',
      value: ''
    },
    {
      platform: 'Portfolio',
      placeholder: 'yourportfolio.com',
      value: ''
    },
    {
      platform: 'Twitter',
      placeholder: 'twitter.com/yourusername',
      value: ''
    }
  ]);

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullname: '',
    title: '',
    bio: '',
    birthdate: '',
    gender: ''
  });

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: '',
    phone: '',
    location: ''
  });

  const [cvResume, setCvResume] = useState<CvResume>({
    cvUrl: '',
    resumeUrl: ''
  });

  return {
    profileData,
    profileType,
    notification,
    setNotification,
    socialLinks,
    setSocialLinks,
    experiences,
    setExperiences,
    education,
    setEducation,
    skills,
    setSkills,
    languages,
    setLanguages,
    personalInfo,
    setPersonalInfo,
    contactInfo,
    setContactInfo,
    cvResume,
    setCvResume
  };
};

export const useProfileDataSync = (state: ReturnType<typeof useProfileFormState>) => {
  const {
    profileData,
    profileType,
    setSocialLinks,
    setExperiences,
    setEducation,
    setSkills,
    setLanguages,
    setPersonalInfo,
    setContactInfo,
    setCvResume
  } = state;


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
        },
        {
          platform: 'Twitter',
          placeholder: 'twitter.com/yourusername',
          value: twitterUrl
        }
      ]);
    }
  }, [profileData, profileType, setSocialLinks]);


  useEffect(() => {
    if (profileData) {
      const experiences = 'experience' in profileData ? profileData.experience || [] : [];
      setExperiences(experiences);
    }
  }, [profileData, setExperiences]);


  useEffect(() => {
    if (profileData) {
      const education = 'education' in profileData ? profileData.education || [] : [];
      setEducation(education);
    }
  }, [profileData, setEducation]);


  useEffect(() => {
    if (profileData) {
      let skills: string[] = [];
      if ('skills' in profileData) {
        skills = profileData.skills || [];
      } else if ('expertise' in profileData) {
        skills = profileData.expertise || [];
      }
      setSkills(skills);
    }
  }, [profileData, setSkills]);


  useEffect(() => {
    if (profileData) {
      const languages: Language[] = 'languages' in profileData
        ? (profileData.languages || []).map(lang => ({ name: lang, level: 'Intermediate' }))
        : [];
      setLanguages(languages);
    }
  }, [profileData, setLanguages]);


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
  }, [profileData, setPersonalInfo]);


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

      setContactInfo({
        email,
        phone,
        location
      });
    }
  }, [profileData, setContactInfo]);


  useEffect(() => {
    if (profileData) {
      const cvUrl = profileType === 'mentor' && 'cv_url' in profileData ? profileData.cv_url || '' : '';

      setCvResume({
        cvUrl,
        resumeUrl: ''
      });
    }
  }, [profileData, profileType, setCvResume]);
};
