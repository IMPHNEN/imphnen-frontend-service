import { FC, useState, useEffect } from 'react';
import { DescriptionModal } from '../modals';
import { SectionWrapper } from '../shared/section-wrapper';
import { NotificationType } from '../modals/notification-modal';
import { EditSectionButton } from '../buttons/edit-section-button';

interface DescriptionSectionProps {
  initialDescription: string;
  onSave: (newDescription: string) => Promise<void>;
  showNotification: (type: NotificationType['type'], title: string, message?: string) => void;
  isLoading?: boolean;
  isViewOnly?: boolean;
}

export const DescriptionSection: FC<DescriptionSectionProps> = ({
  initialDescription,
  onSave,
  showNotification,
  isLoading = false,
  isViewOnly = false,
}) => {
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [description, setDescription] = useState(initialDescription);

  
  useEffect(() => {
    setDescription(initialDescription);
  }, [initialDescription]);

  const handleSave = async (newDescription: string) => {
    if (isViewOnly) return;
    await onSave(newDescription);
  };

  return (
    <SectionWrapper
      title="Description"
      editButton={
        !isViewOnly ? (
          <EditSectionButton
            onClick={() => setIsDescriptionModalOpen(true)}
            disabled={isLoading}
          />
        ) : null
      }
      delay={0.2}
    >
      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap min-h-[150px] p-4 border border-gray-200 rounded-md bg-gray-50">
        {description}
      </div>

      <DescriptionModal
        isOpen={isDescriptionModalOpen && !isViewOnly}
        onClose={() => setIsDescriptionModalOpen(false)}
        initialValue={description}
        onSave={handleSave}
        isLoading={isLoading}
      />
    </SectionWrapper>
  );
};
