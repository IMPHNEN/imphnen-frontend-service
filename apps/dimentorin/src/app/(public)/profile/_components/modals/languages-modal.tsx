import { FC, useState, useEffect } from 'react';
import { Input } from '@imphnen-frontend-service/ui/atoms';
import { Modal } from '@imphnen-frontend-service/ui/molecules';
import { ModalButton } from '../buttons/modal-button';

interface Language {
  name: string;
  level: string;
}

interface LanguagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValue: Language[];
  onSave: (languages: Language[]) => void;
}

export const LanguagesModal: FC<LanguagesModalProps> = ({
  isOpen,
  onClose,
  initialValue,
  onSave,
}) => {
  const [languages, setLanguages] = useState<Language[]>(initialValue);

  useEffect(() => {
    setLanguages(initialValue);
  }, [initialValue]);

  const handleAddLanguage = () => {
    setLanguages([...languages, { name: '', level: '' }]);
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
    onSave(languages);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>Edit Languages</Modal.Title>
      </Modal.Header>
      <Modal.Content>
        <div className="space-y-4">
          {languages.map((language, index) => (
            <div key={index} className="flex items-end gap-2">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Language Name</p>
                <Input
                  value={language.name}
                  onChange={(e) => handleLanguageChange(index, 'name', e.target.value)}
                  placeholder="e.g., English"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Level</p>
                <Input
                  value={language.level}
                  onChange={(e) => handleLanguageChange(index, 'level', e.target.value)}
                  placeholder="e.g., Fluent"
                />
              </div>
              <ModalButton variant="danger" onClick={() => handleRemoveLanguage(index)}>
                Remove
              </ModalButton>
            </div>
          ))}
          <ModalButton variant="secondary" onClick={handleAddLanguage}>
            Add Language
          </ModalButton>
        </div>
      </Modal.Content>
      <Modal.Footer>
        <ModalButton variant="secondary" onClick={onClose}>
          Cancel
        </ModalButton>
        <ModalButton variant="primary" onClick={handleSave}>
          Save
        </ModalButton>
      </Modal.Footer>
    </Modal>
  );
};


