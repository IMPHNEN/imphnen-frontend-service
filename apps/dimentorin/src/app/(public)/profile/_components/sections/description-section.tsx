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
}

export const DescriptionSection: FC<DescriptionSectionProps> = ({
  initialDescription,
  onSave,
  showNotification,
  isLoading = false,
}) => {
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [description, setDescription] = useState(initialDescription);

  // Sync local state with props when initialDescription changes
  useEffect(() => {
    setDescription(initialDescription);
  }, [initialDescription]);

  const handleSave = async (newDescription: string) => {
    // Only call backend update, don't update local state
    // Local state will be updated through useEffect when backend responds
    // Don't show notification here - ProfileForm will handle it after backend success
    await onSave(newDescription);
  };

  return (
    <SectionWrapper
      title="Description"
      editButton={
        <EditSectionButton
          onClick={() => setIsDescriptionModalOpen(true)}
          disabled={isLoading}
        />
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
        isLoading={isLoading}
      />
    </SectionWrapper>
  );
};


