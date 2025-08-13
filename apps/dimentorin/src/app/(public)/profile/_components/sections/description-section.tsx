import { FC, useState } from 'react';
import { DescriptionModal } from '../modals';
import { SectionWrapper } from '../shared/section-wrapper';
import { NotificationType } from '../modals/notification-modal';
import { EditSectionButton } from '../buttons/edit-section-button';

interface DescriptionSectionProps {
  initialDescription: string;
  onSave: (newDescription: string) => void;
  showNotification: (type: NotificationType['type'], title: string, message?: string) => void;
}

export const DescriptionSection: FC<DescriptionSectionProps> = ({
  initialDescription,
  onSave,
  showNotification,
}) => {
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [description, setDescription] = useState(initialDescription);

  const handleSave = (newDescription: string) => {
    setDescription(newDescription);
    onSave(newDescription);
    showNotification('success', 'Perubahan Berhasil Disimpan', '');
  };

  return (
    <SectionWrapper
      title="Description"
      editButton={
        <EditSectionButton onClick={() => setIsDescriptionModalOpen(true)} />
      }
      delay={0.2}
    >
      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap min-h-[150px] p-4 border border-gray-200 rounded-md bg-gray-50">
        {description}
      </div>

      <DescriptionModal
        isOpen={isDescriptionModalOpen}
        onClose={() => setIsDescriptionModalOpen(false)}
        initialValue={description}
        onSave={handleSave}
      />
    </SectionWrapper>
  );
};


