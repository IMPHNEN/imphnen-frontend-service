import { useState, FC } from 'react';
import { MailOutlined, PhoneOutlined, LinkedinOutlined, GithubOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { motion } from 'framer-motion';
import { For } from '@imphnen-frontend-service/utils';
import { PersonalInfoSection } from '../sections/personal-info-section';
import { SkillsSection } from '../sections/skills-section';
import { LanguagesSection } from '../sections/languages-section';
import { SocialMediaSection } from '../sections/social-media-section';
import { NotificationType } from '../modals/notification-modal';

interface Language {
  name: string;
  level: string;
}

interface SocialLink { // Define SocialLink interface here if not already defined globally
  platform: string;
  placeholder: string;
  value: string;
}

interface ProfileInfoProps {
  showNotification: (type: NotificationType['type'], title: string, message?: string) => void;
}

export const ProfileInfo: FC<ProfileInfoProps> = ({ showNotification }) => {
  const initialSkills = [
    'UI/UX Design',
    'Figma',
    'Adobe XD',
    'Prototyping',
    'User Research',
    'Design Systems'
  ];

  const initialLanguages = [
    { name: 'Bahasa Indonesia', level: 'Native' },
    { name: 'English', level: 'Fluent' },
    { name: 'Japanese', level: 'Beginner' }
  ];

  const initialSocialLinks = [ // Define initial social links data
    { platform: 'LinkedIn', placeholder: 'https://www.linkedin.com/in/firdaus', value: 'linkedin.com/in/firdaus' },
    { platform: 'GitHub', placeholder: 'https://github.com/firdaus', value: 'github.com/firdaus' },
  ];

  const [contactInfo, setContactInfo] = useState({
    email: 'firdaus@example.com',
    phone: '+62 812-3456-7890',
    location: 'Jakarta, Indonesia'
  });

  const [currentSkills, setCurrentSkills] = useState(initialSkills);
  const [currentLanguages, setCurrentLanguages] = useState(initialLanguages);
  const [currentSocialLinks, setCurrentSocialLinks] = useState<SocialLink[]>(initialSocialLinks); // State for social links

  return (
    <div className="space-y-6">
      <PersonalInfoSection
        initialContactInfo={contactInfo}
        onSave={setContactInfo}
        showNotification={showNotification}
      />

      <SocialMediaSection // Use SocialMediaSection here
        initialSocialLinks={currentSocialLinks}
        onSave={setCurrentSocialLinks}
        showNotification={showNotification}
      />

      <SkillsSection
        initialSkills={currentSkills}
        onSave={setCurrentSkills}
        showNotification={showNotification}
      />

      <LanguagesSection
        initialLanguages={currentLanguages}
        onSave={setCurrentLanguages}
        showNotification={showNotification}
      />
    </div>
  );
};
