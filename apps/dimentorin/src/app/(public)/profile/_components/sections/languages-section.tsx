import { FC, useState } from 'react';
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
}

export const LanguagesSection: FC<LanguagesSectionProps> = ({
  initialLanguages,
  onSave,
  showNotification,
}) => {
  const [isLanguagesModalOpen, setIsLanguagesModalOpen] = useState(false);
  const [languages, setLanguages] = useState<Language[]>(initialLanguages);

  const handleSave = (newLanguages: Language[]) => {
    setLanguages(newLanguages);
    onSave(newLanguages);
    showNotification('success', 'Perubahan Berhasil Disimpan', '');
  };

  return (
    <SectionWrapper
      title="Languages"
      editButton={
        <EditSectionButton onClick={() => setIsLanguagesModalOpen(true)} />
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
      />
    </SectionWrapper>
  );
};


