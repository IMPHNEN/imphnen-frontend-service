import { FC, useState } from 'react';
import { ProfileBasicInfoModal } from '../modals';
import { SectionWrapper } from '../shared/section-wrapper';
import { NotificationType } from '../modals/notification-modal';
import { EditSectionButton } from '../buttons/edit-section-button';

interface ProfileBasicInfoSectionProps {
  initialProfileData: { name: string; title: string };
  onSave: (newProfileInfo: { name: string; title: string }) => void;
  showNotification: (type: NotificationType['type'], title: string, message?: string) => void;
}

export const ProfileBasicInfoSection: FC<ProfileBasicInfoSectionProps> = ({
  initialProfileData,
  onSave,
  showNotification,
}) => {
  const [isProfileBasicInfoModalOpen, setIsProfileBasicInfoModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(initialProfileData);

  const handleSave = (newProfileInfo: { name: string; title: string }) => {
    setProfileData(newProfileInfo);
    onSave(newProfileInfo);
    showNotification('success', 'Perubahan Berhasil Disimpan', '');
  };

  return (
    <SectionWrapper
      title="Profile Basic Info"
      editButton={
        <EditSectionButton onClick={() => setIsProfileBasicInfoModalOpen(true)} />
      }
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-2xl font-semibold text-gray-600">RS</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{profileData.name}</h2>
            <p className="text-gray-600">{profileData.title}</p>
          </div>
        </div>
      </div>

      <ProfileBasicInfoModal
        isOpen={isProfileBasicInfoModalOpen}
        onClose={() => setIsProfileBasicInfoModalOpen(false)}
        initialValue={profileData}
        onSave={handleSave}
      />
    </SectionWrapper>
  );
};


