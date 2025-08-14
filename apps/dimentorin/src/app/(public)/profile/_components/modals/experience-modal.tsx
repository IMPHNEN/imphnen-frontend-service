import { FC, useState, useEffect } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { ModalButton } from '../buttons/modal-button';
import { InputField } from '@imphnen-frontend-service/ui/molecules';


interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  period: string;
}

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValue: Experience[];
  onSave: (value: Experience[]) => Promise<void>;
  isLoading?: boolean;
  showNotification?: (type: 'success' | 'error', title: string, message?: string) => void;
}

export const ExperienceModal: FC<ExperienceModalProps> = ({
  isOpen,
  onClose,
  initialValue,
  onSave,
  isLoading = false,
  showNotification,
}) => {
  const [experiences, setExperiences] = useState<Experience[]>(initialValue);

  // Sync local state with backend data
  useEffect(() => {
    setExperiences(initialValue);
  }, [initialValue]);

  const handleSave = async () => {
    // Validation: all fields must be filled
    const hasEmpty = experiences.some(exp =>
      !exp.company.trim() || !exp.position.trim() || !exp.duration.trim() || !exp.period.trim()
    );
    if (hasEmpty) {
      if (showNotification) {
        showNotification('error', 'Data Tidak Lengkap', 'Semua field harus diisi pada setiap pengalaman kerja.');
      } else {
        alert('Semua field harus diisi pada setiap pengalaman kerja.');
      }
      return;
    }
    try {
      await onSave(experiences);
      onClose();
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  const handleCancel = () => {
    setExperiences(initialValue);
    onClose();
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      duration: '',
      period: '',
    };
    setExperiences([...experiences, newExperience]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={handleCancel}
        aria-label="Close modal"
      />

      <div className="relative bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[95vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex">
            <h2 className="text-xl font-semibold text-gray-900 px-3 py-1 bg-[#23A1EB]/10 rounded-md flex-1">Edit Experience</h2>
          </div>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-6">
            {experiences.map((experience, index) => (
              <div key={experience.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Experience {index + 1}</h3>
                  <ModalButton
                    variant="danger"
                    size="sm"
                    onClick={() => removeExperience(experience.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <DeleteOutlined />
                  </ModalButton>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Company"
                    value={experience.company}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateExperience(experience.id, 'company', e.target.value)}
                    placeholder="Enter company name"
                  />
                  <InputField
                    label="Position"
                    value={experience.position}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateExperience(experience.id, 'position', e.target.value)}
                    placeholder="Enter position"
                  />
                  <InputField
                    label="Duration"
                    value={experience.duration}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateExperience(experience.id, 'duration', e.target.value)}
                    placeholder="e.g., 7 Months"
                  />
                  <InputField
                    label="Period"
                    value={experience.period}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateExperience(experience.id, 'period', e.target.value)}
                    placeholder="e.g., Jan 2024 - Present"
                  />
                </div>
              </div>
            ))}

            <ModalButton
              variant="secondary"
              onClick={addExperience}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-[#23A1EB] hover:text-[#23A1EB] transition-colors flex items-center justify-center gap-2"
            >
              <PlusOutlined />
              Add Experience
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


