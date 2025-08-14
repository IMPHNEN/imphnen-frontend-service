import { FC, useState, useEffect } from 'react';
import { LanguagesModal } from '../modals';
import { SectionWrapper } from '../shared/section-wrapper';
import { NotificationType } from '../modals/notification-modal';
import { EditSectionButton } from '../buttons/edit-section-button';

interface Language {
  name: string;
  level: string;
}

interface LanguagesSectionProps {
  initialLanguages: Language[];
  onSave: (newLanguages: Language[]) => void;
  showNotification: (type: NotificationType['type'], title: string, message?: string) => void;
  isLoading?: boolean;
}

export const LanguagesSection: FC<LanguagesSectionProps> = ({
  initialLanguages,
  onSave,
  showNotification,
  isLoading = false,
}) => {
  const [isLanguagesModalOpen, setIsLanguagesModalOpen] = useState(false);
  const [languages, setLanguages] = useState<Language[]>(initialLanguages);


  useEffect(() => {
    setLanguages(initialLanguages);
  }, [initialLanguages]);

  const handleSave = (newLanguages: Language[]) => {


    onSave(newLanguages);
  };

  return (
    <SectionWrapper
      title="Languages"
      editButton={
        <EditSectionButton
          onClick={() => setIsLanguagesModalOpen(true)}
          disabled={isLoading}
        />
      }
      delay={0.4}
    >
      <div className="space-y-3">
        {languages.map((language) => (
          <div key={language.name} className="flex justify-between items-center">
            <span className="text-sm font-medium text-neutral-800">{language.name}</span>
            <span className="text-xs text-neutral-600 bg-neutral-100 px-2 py-1 rounded">
              {language.level}
            </span>
          </div>
        ))}
      </div>

      <LanguagesModal
        isOpen={isLanguagesModalOpen}
        onClose={() => setIsLanguagesModalOpen(false)}
        initialValue={languages}
        onSave={handleSave}
        isLoading={isLoading}
      />
    </SectionWrapper>
  );
};


