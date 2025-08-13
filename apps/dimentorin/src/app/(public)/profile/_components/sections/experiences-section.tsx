import { FC, useState } from 'react';
import { ExperienceModal } from '../modals';
import { SectionWrapper } from '../shared/section-wrapper';
import { NotificationType } from '../modals/notification-modal';
import { EditSectionButton } from '../buttons/edit-section-button';

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  period: string;
}

interface ExperiencesSectionProps {
  initialExperiences: Experience[];
  onSave: (newExperiences: Experience[]) => void;
  showNotification: (type: NotificationType['type'], title: string, message?: string) => void;
}

export const ExperiencesSection: FC<ExperiencesSectionProps> = ({
  initialExperiences,
  onSave,
  showNotification,
}) => {
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);

  const handleSave = (newExperiences: Experience[]) => {
    setExperiences(newExperiences);
    onSave(newExperiences);
    showNotification('success', 'Perubahan Berhasil Disimpan', '');
  };

  return (
    <SectionWrapper
      title="Experiences"
      editButton={
        <div className="flex gap-2">
          <EditSectionButton onClick={() => setIsExperienceModalOpen(true)} />
        </div>
      }
      delay={0.4}
    >
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{exp.company}</h4>
              <p className="text-gray-700">{exp.position}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span>{exp.duration}</span>
                <span>•</span>
                <span>{exp.period}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ExperienceModal
        isOpen={isExperienceModalOpen}
        onClose={() => setIsExperienceModalOpen(false)}
        initialValue={experiences}
        onSave={handleSave}
      />
    </SectionWrapper>
  );
};


