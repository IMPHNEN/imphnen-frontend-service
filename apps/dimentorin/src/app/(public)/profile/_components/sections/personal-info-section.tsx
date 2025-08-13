import { FC, useState, useEffect } from 'react';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { PersonalInfoModal } from '../modals';
import { SectionWrapper } from '../shared/section-wrapper';
import { NotificationType } from '../modals/notification-modal';
import { EditSectionButton } from '../buttons/edit-section-button';

interface PersonalInfo {
  email: string;
  phone: string;
  location: string;
}

interface PersonalInfoSectionProps {
  initialContactInfo: PersonalInfo;
  onSave: (newContactInfo: PersonalInfo) => void;
  showNotification: (type: NotificationType['type'], title: string, message?: string) => void;
}

export const PersonalInfoSection: FC<PersonalInfoSectionProps> = ({
  initialContactInfo,
  onSave,
  showNotification,
}) => {
  const [isPersonalInfoModalOpen, setIsPersonalInfoModalOpen] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(initialContactInfo);

  // Sync local state with props when initialContactInfo changes
  useEffect(() => {
    setPersonalInfo(initialContactInfo);
  }, [initialContactInfo]);

  const handleSave = (newInfo: { email: string; phone: string; location: string }) => {
    const newPersonalInfo = { email: newInfo.email, phone: newInfo.phone, location: newInfo.location };
    // Only call backend update, don't update local state
    // Local state will be updated through useEffect when backend responds
    // Don't show notification here - ProfileForm will handle it after backend success
    onSave(newPersonalInfo);
  };

  return (
    <SectionWrapper
      title="Personal Informations"
      editButton={
        <EditSectionButton onClick={() => setIsPersonalInfoModalOpen(true)} />
      }
      delay={0.1}
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-[#23A1EB]/10 rounded-lg flex items-center justify-center mt-0.5">
            <MailOutlined className="text-[#23A1EB] text-sm" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{personalInfo.email}</p>
            <p className="text-sm text-gray-600">Email Address</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-[#23A1EB]/10 rounded-lg flex items-center justify-center mt-0.5">
            <PhoneOutlined className="text-[#23A1EB] text-sm" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{personalInfo.phone}</p>
            <p className="text-sm text-gray-600">Phone Number</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-[#23A1EB]/10 rounded-lg flex items-center justify-center mt-0.5">
            <EnvironmentOutlined className="text-[#23A1EB] text-sm" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{personalInfo.location}</p>
            <p className="text-sm text-gray-600">Location</p>
          </div>
        </div>
      </div>

      <PersonalInfoModal
        isOpen={isPersonalInfoModalOpen}
        onClose={() => setIsPersonalInfoModalOpen(false)}
        initialValue={personalInfo}
        onSave={handleSave}
      />
    </SectionWrapper>
  );
};


