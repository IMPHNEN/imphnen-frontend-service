import { FC, useState } from 'react';
import { EditOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { NotificationModal } from '../modals';
import { ExperiencesSection } from '../sections/experiences-section';
import { CvResumeSection } from '../sections/cv-resume-section';
import { SocialMediaSection } from '../sections/social-media-section';
import { ProfileBasicInfoSection } from '../sections/profile-basic-info-section';
import { DescriptionSection } from '../sections/description-section';
import { EducationSection } from '../sections/education-section';
import { SectionWrapper } from '../shared/section-wrapper';

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

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isOpen: false }));
  };
  const [profileData, setProfileData] = useState({
    name: 'Rizal Syaepulloh',
    title: 'Mentor | Roadmap Front-End',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Praesent varius ultrices lorem, ut vulputate felis varius vitae. Ut in dictum ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec sit amet ante in magna cursus iaculis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi. Sed dignissim lorem sit amet eros scelerisque, eu vehicula mauris consectetur.',
  });

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { platform: 'LinkedIn', placeholder: 'https://www.linkedin.com/in/username', value: '' },
    { platform: 'Github', placeholder: 'https://github.com/username', value: '' },
    { platform: 'Stackoverflow', placeholder: 'https://stackoverflow.com/users/userid/username', value: '' },
    { platform: 'Facebook(Opsional)', placeholder: 'https://www.facebook.com/username', value: '' },
  ]);

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      company: 'Sunday.com',
      position: 'Intern Front-End',
      duration: '7 Months',
      period: 'Jan 2024 - Present'
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
      field: 'S.Teknik',
      period: 'May 2020 - Dec 2020'
    }
  ]);

  return (
    <div className="space-y-6">
      <ProfileBasicInfoSection
        initialProfileData={{ name: profileData.name, title: profileData.title }}
        onSave={(newProfileInfo) => setProfileData({ ...profileData, name: newProfileInfo.name, title: newProfileInfo.title })}
        showNotification={showNotification}
      />

      <SocialMediaSection
        initialSocialLinks={socialLinks}
        onSave={setSocialLinks}
        showNotification={showNotification}
      />

      <DescriptionSection
        initialDescription={profileData.description}
        onSave={(newDescription) => setProfileData({ ...profileData, description: newDescription })}
        showNotification={showNotification}
      />

      <CvResumeSection
        initialFileName={'Resume_RizalSyaepulloh.pdf'}
        onSave={(cvData) => console.log('CV updated:', cvData)}
        showNotification={showNotification}
      />

      <ExperiencesSection
        initialExperiences={experiences}
        onSave={setExperiences}
        showNotification={showNotification}
      />

      <EducationSection
        initialEducation={education}
        onSave={setEducation}
        showNotification={showNotification}
      />

      <NotificationModal
        isOpen={notification.isOpen}
        onClose={hideNotification}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        header="Profile Update"
      />
    </div>
  );
};
