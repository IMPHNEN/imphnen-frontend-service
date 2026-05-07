import { FC, useState, useEffect } from 'react';
import { Input } from '@imphnen-frontend-service/ui/atoms';
import { ModalButton } from '../buttons/modal-button';

interface Language {
  id?: string;
  name: string;
  level: string;
}

interface LanguagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValue: Language[];
  onSave: (languages: Language[]) => void;
  isLoading?: boolean;
}

export const LanguagesModal: FC<LanguagesModalProps> = ({
  isOpen,
  onClose,
  initialValue,
  onSave,
  isLoading = false,
}) => {
  const [languages, setLanguages] = useState<Language[]>(initialValue);

  useEffect(() => {
    const languagesWithIds = initialValue.map(lang => ({
      ...lang,
      id: lang.id || `lang-${Date.now()}-${Math.random()}`
    }));
    setLanguages(languagesWithIds);
  }, [initialValue]);

  const handleAddLanguage = () => {
    setLanguages([...languages, {
      id: `lang-${Date.now()}-${Math.random()}`,
      name: '',
      level: ''
    }]);
  };

  const handleLanguageChange = (index: number, field: keyof Language, value: string) => {
    const newLanguages = [...languages];
    newLanguages[index] = { ...newLanguages[index], [field]: value };
    setLanguages(newLanguages);
  };

  const handleRemoveLanguage = (index: number) => {
    const newLanguages = languages.filter((_, i) => i !== index);
    setLanguages(newLanguages);
  };

  const handleSave = () => {
    
    const languagesToSave = languages.map(({ id, ...lang }) => lang);
    onSave(languagesToSave);
    onClose();
  };

  const handleCancel = () => {
    const languagesWithIds = initialValue.map(lang => ({
      ...lang,
      id: lang.id || `lang-${Date.now()}-${Math.random()}`
    }));
    setLanguages(languagesWithIds);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {}
      <button
        className="absolute inset-0 bg-black/20"
        onClick={handleCancel}
        type="button"
        aria-label="Close modal"
      />

      {}
      <div className="relative max-h-[90vh] w-full max-w-[520px] overflow-y-auto rounded-2xl bg-[#F6F6F6] p-5 sm:p-6">
        {}
        <div className="rounded-[6px] bg-[#DFECF7] px-4 py-2">
          <h2 className="text-2xl font-semibold leading-8 text-[#4B4B4B]">Languages</h2>
        </div>

        {}
        <div className="max-h-[60vh] overflow-y-auto pt-8">
          <div className="space-y-4">
            {languages.map((language, index) => (
              <div key={language.id} className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-2">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700 mb-1">Language Name</p>
                  <Input
                    value={language.name}
                    onChange={(e) => handleLanguageChange(index, 'name', e.target.value)}
                    placeholder="e.g., English"
                    className="w-full"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700 mb-1">Level</p>
                  <Input
                    value={language.level}
                    onChange={(e) => handleLanguageChange(index, 'level', e.target.value)}
                    placeholder="e.g., Fluent"
                    className="w-full"
                  />
                </div>
                <div className="sm:flex-shrink-0">
                  <ModalButton variant="danger" onClick={() => handleRemoveLanguage(index)} className="w-full sm:w-auto">
                    Remove
                  </ModalButton>
                </div>
              </div>
            ))}
            <ModalButton variant="secondary" onClick={handleAddLanguage} className="w-full">
              Add Language
            </ModalButton>
          </div>
        </div>

        {}
        <div className="flex justify-end gap-3 pt-8">
          <ModalButton
            variant="secondary"
            onClick={handleCancel}
            className="w-[110px]"
            disabled={isLoading}
          >
            Cancel
          </ModalButton>
          <ModalButton
            variant="primary"
            onClick={handleSave}
            className="w-[110px]"
            disabled={isLoading}
            loading={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </ModalButton>
        </div>
      </div>
    </div>
  );
};


