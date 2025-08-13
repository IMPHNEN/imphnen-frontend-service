import { FC, useState } from 'react';
import { EditOutlined, PlusOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Button, Select } from '@imphnen-frontend-service/ui/atoms';
import { SectionWrapper } from '../shared/section-wrapper';
import { NotificationType } from '../modals/notification-modal';
import { PersonalInfoSection } from '../sections/personal-info-section';
import { SkillsSection } from '../sections/skills-section';

interface Skill {
  id: string;
  name: string;
  category: string;
}

interface ProfileSidebarProps {
  showNotification: (type: NotificationType['type'], title: string, message?: string) => void;
}

export const ProfileSidebar: FC<ProfileSidebarProps> = ({ showNotification }) => {
  const [careerStatus, setCareerStatus] = useState('Career Status');
  const [personalInfo, setPersonalInfo] = useState({
    email: 'rizalwis26@gmail.com',
    phone: '+62 (88) 8888 8888',
    location: 'Jl. Margaasih, Kec. Suryaleksana, Bojongasih'
  });

  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: 'HTML', category: 'frontend' },
    { id: '2', name: 'CSS', category: 'frontend' },
    { id: '3', name: 'Javascript', category: 'frontend' },
    { id: '4', 'name': 'Next.Js', category: 'frontend' },
    { id: '5', name: 'React', category: 'frontend' },
    { id: '6', name: 'TypeScript', category: 'frontend' },
  ]);

  return (
    <div className="space-y-6">
      <SectionWrapper title="Career Status">
        <Select
          value={careerStatus}
          onChange={(e) => setCareerStatus(e.target.value)}
          className="w-full"
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
        initialContactInfo={{ email: personalInfo.email, phone: personalInfo.phone, location: personalInfo.location || '' }}
        onSave={(newPersonalInfo: { email: string; phone: string; location: string }) => setPersonalInfo(prev => ({ ...prev, ...newPersonalInfo }))}
        showNotification={showNotification}
      />

      <SkillsSection
        initialSkills={skills.map(skill => skill.name)}
        onSave={(newSkills) => setSkills(newSkills.map(name => ({ id: name, name, category: 'unknown' })))}
        showNotification={showNotification}
      />
    </div>
  );
};
