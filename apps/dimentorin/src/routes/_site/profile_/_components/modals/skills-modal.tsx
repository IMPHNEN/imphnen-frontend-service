import { FC, useState, useEffect } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { ModalButton } from '../buttons/modal-button';
import { InputField } from '@imphnen-frontend-service/ui/molecules';

interface Skill {
  id: string;
  name: string;
}

interface SkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValue: Skill[];
  onSave: (value: Skill[]) => Promise<void>;
  isLoading?: boolean;
}

export const SkillsModal: FC<SkillsModalProps> = ({
  isOpen,
  onClose,
  initialValue,
  onSave,
  isLoading = false,
}) => {
  const [skills, setSkills] = useState<Skill[]>(initialValue);
  const [newSkill, setNewSkill] = useState({ name: '' });

  
  useEffect(() => {
    setSkills(initialValue);
  }, [initialValue]);

  const handleSave = async () => {
    try {
      await onSave(skills);

      onClose();
    } catch (error) {
      console.error('Save failed:', error);

    }
  };

  const handleCancel = () => {
    setSkills(initialValue);
    setNewSkill({ name: '' });
    onClose();
  };

  const addSkill = () => {
    if (newSkill.name.trim()) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: newSkill.name.trim(),
      };
      setSkills([...skills, skill]);
      setNewSkill({ name: '' });
    }
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">

      <button
        className="absolute inset-0 bg-black/20"
        onClick={handleCancel}
        type="button"
        aria-label="Close modal"
      />

      <div className="relative max-h-[90vh] w-full max-w-[520px] overflow-y-auto rounded-2xl bg-[#F6F6F6] p-5 sm:p-6">

        <div className="rounded-[6px] bg-[#DFECF7] px-4 py-2">
          <h2 className="text-2xl font-semibold leading-8 text-[#4B4B4B]">Skills</h2>
        </div>


        <div className="max-h-[60vh] overflow-y-auto pt-8">

          <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Add New Skill</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <InputField
                  label="Skill Name"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  placeholder="e.g., React, JavaScript, etc."
                />
              </div>
              <div className="flex sm:items-end">
                <ModalButton
                  onClick={addSkill}
                  variant="primary"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <PlusOutlined />
                  <span className="sm:hidden ml-2">Add Skill</span>
                </ModalButton>
              </div>
            </div>
          </div>


          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Current Skills</h3>
            {skills.length === 0 ? (
              <p className="text-gray-500 text-sm py-4">No skills added yet.</p>
            ) : (
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-white"
                  >
                    <div>
                      <span className="font-medium text-gray-900">{skill.name}</span>
                    </div>
                    <ModalButton
                      onClick={() => removeSkill(skill.id)}
                      variant="danger"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                    >
                      <DeleteOutlined />
                    </ModalButton>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>


        <div className="flex justify-end gap-3 pt-8">
          <ModalButton variant="secondary"
            onClick={handleCancel}
            className="w-[110px]"
            disabled={isLoading}
          >
            Batal
          </ModalButton>
          <ModalButton variant="primary"
            onClick={handleSave}
            className="w-[110px]"
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


