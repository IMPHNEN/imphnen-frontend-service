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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {}
      <button
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={handleCancel}
        type="button"
        aria-label="Close modal"
      />

      {}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-5xl mx-auto max-h-[95vh] overflow-hidden">
        {}
        <div className="p-6 pb-4 border-b border-gray-200">
          <div className="flex">
            <h2 className="text-xl font-semibold text-gray-900 px-3 py-1 bg-[#23A1EB]/10 rounded-md flex-1">Edit Languages</h2>
          </div>
        </div>

        {}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
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
        <div className="flex gap-3 p-6 pt-4">
          <ModalButton
            variant="secondary"
            onClick={handleCancel}
            className="flex-1 bg-white shadow-md"
            disabled={isLoading}
          >
            Cancel
          </ModalButton>
          <ModalButton
            variant="primary"
            onClick={handleSave}
            className="flex-1"
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


