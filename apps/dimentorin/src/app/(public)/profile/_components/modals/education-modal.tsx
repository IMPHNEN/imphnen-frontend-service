import { FC, useState, useEffect } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { ModalButton } from '../buttons/modal-button';
import { InputField } from '@imphnen-frontend-service/ui/molecules';

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
}

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValue: Education[];
  onSave: (value: Education[]) => Promise<void>;
  isLoading?: boolean;
}

export const EducationModal: FC<EducationModalProps> = ({
  isOpen,
  onClose,
  initialValue,
  onSave,
  isLoading = false,
}) => {
  const [educations, setEducations] = useState<Education[]>(initialValue);

  // Sync local state with backend data
  useEffect(() => {
    setEducations(initialValue);
  }, [initialValue]);

  const handleSave = async () => {
    try {
      await onSave(educations);
      // Only close modal after successful backend response
      onClose();
    } catch (error) {
      console.error('Save failed:', error);
      // Modal stays open on error so user can retry
    }
  };

  const handleCancel = () => {
    setEducations(initialValue);
    onClose();
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      period: '',
    };
    setEducations([...educations, newEducation]);
  };

  const removeEducation = (id: string) => {
    setEducations(educations.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducations(educations.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={handleCancel}
        aria-label="Close modal"
      ></button>

      <div className="relative bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[95vh] overflow-hidden">

        <div className="p-6 border-b border-gray-200">
          <div className="flex">
            <h2 className="text-xl font-semibold text-gray-900 px-3 py-1 bg-[#23A1EB]/10 rounded-md flex-1">Edit Education</h2>
          </div>
        </div>


        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-6">
            {educations.map((education, index) => (
              <div key={education.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Education {index + 1}</h3>
                  <ModalButton
                    variant="danger"
                    size="sm"
                    onClick={() => removeEducation(education.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <DeleteOutlined />
                  </ModalButton>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Institution"
                    value={education.institution}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateEducation(education.id, 'institution', e.target.value)}
                    placeholder="Enter institution name"
                  />
                  <InputField
                    label="Degree"
                    value={education.degree}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateEducation(education.id, 'degree', e.target.value)}
                    placeholder="Enter degree"
                  />
                  <InputField
                    label="Field"
                    value={education.field}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateEducation(education.id, 'field', e.target.value)}
                    placeholder="Enter field of study"
                  />
                  <InputField
                    label="Period"
                    value={education.period}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateEducation(education.id, 'period', e.target.value)}
                    placeholder="e.g., Sep 2022 - Current"
                  />
                </div>
              </div>
            ))}

            <ModalButton
              variant="secondary"
              onClick={addEducation}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-[#23A1EB] hover:text-[#23A1EB] transition-colors flex items-center justify-center gap-2"
            >
              <PlusOutlined />
              Add Education
            </ModalButton>
          </div>
        </div>


        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <ModalButton
            variant="secondary"
            className="bg-white shadow-md"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Batal
          </ModalButton>
          <ModalButton
            variant="primary"
            onClick={handleSave}
            disabled={isLoading}
            loading={isLoading}
          >
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </ModalButton>
        </div>
      </div>
    </div>
  );
};


