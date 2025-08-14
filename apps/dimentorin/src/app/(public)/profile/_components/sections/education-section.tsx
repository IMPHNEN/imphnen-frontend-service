import { FC, useState, useEffect } from 'react';
import { EducationModal } from '../modals';
import { SectionWrapper } from '../shared/section-wrapper';
import { NotificationType } from '../modals/notification-modal';
import { EditSectionButton } from '../buttons/edit-section-button';

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
}

interface EducationSectionProps {
  initialEducation: Education[];
  onSave: (newEducation: Education[]) => Promise<void>;
  showNotification: (type: NotificationType['type'], title: string, message?: string) => void;
  isLoading?: boolean;
}

export const EducationSection: FC<EducationSectionProps> = ({
  initialEducation,
  onSave,
  showNotification,
  isLoading = false,
}) => {
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [education, setEducation] = useState<Education[]>(initialEducation);

  // Sync local state with props when initialEducation changes
  useEffect(() => {
    setEducation(initialEducation);
  }, [initialEducation]);

  const handleSave = async (newEducation: Education[]) => {
    // Only call backend update, don't update local state
    // Local state will be updated through useEffect when backend responds
    // Don't show notification here - ProfileForm will handle it after backend success
    await onSave(newEducation);
  };

  return (
    <SectionWrapper
      title="Education"
      editButton={
        <div className="flex gap-2">
          <EditSectionButton
            onClick={() => setIsEducationModalOpen(true)}
            disabled={isLoading}
          />
        </div>
      }
      delay={0.5}
    >
      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{edu.institution}</h4>
              <p className="text-gray-700">{edu.degree}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span>{edu.field}</span>
                <span>•</span>
                <span>{edu.period}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <EducationModal
        isOpen={isEducationModalOpen}
        onClose={() => setIsEducationModalOpen(false)}
        initialValue={education}
        onSave={handleSave}
        isLoading={isLoading}
        showNotification={showNotification}
      />
    </SectionWrapper>
  );
};


