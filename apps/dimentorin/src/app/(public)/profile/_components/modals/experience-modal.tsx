import { FC, useState } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button } from '@imphnen-frontend-service/ui/atoms';
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
  onSave: (value: Experience[]) => void;
}

export const ExperienceModal: FC<ExperienceModalProps> = ({
  isOpen,
  onClose,
  initialValue,
  onSave,
}) => {
  const [experiences, setExperiences] = useState<Experience[]>(initialValue);

  const handleSave = () => {
    onSave(experiences);
    onClose();
  };

  const handleCancel = () => {
    setExperiences(initialValue); // Reset to initial value
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
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={handleCancel}
        aria-label="Close modal"
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex">
            <h2 className="text-xl font-semibold text-gray-900 px-3 py-1 bg-blue-50 rounded-md flex-1">Edit Experience</h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-6">
            {experiences.map((experience, index) => (
              <div key={experience.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Experience {index + 1}</h3>
                  <button
                    onClick={() => removeExperience(experience.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <DeleteOutlined />
                  </button>
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

            <button
              onClick={addExperience}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
            >
              <PlusOutlined />
              Add Experience
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <Button
            variant="secondary"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};
