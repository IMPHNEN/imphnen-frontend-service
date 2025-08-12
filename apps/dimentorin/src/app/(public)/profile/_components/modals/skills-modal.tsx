import { FC, useState } from 'react';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { InputField } from '@imphnen-frontend-service/ui/molecules';

interface Skill {
  id: string;
  name: string;
  category: string;
}

interface SkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValue: Skill[];
  onSave: (value: Skill[]) => void;
}

export const SkillsModal: FC<SkillsModalProps> = ({
  isOpen,
  onClose,
  initialValue,
  onSave,
}) => {
  const [skills, setSkills] = useState<Skill[]>(initialValue);
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Technical' });

  const handleSave = () => {
    onSave(skills);
    onClose();
  };

  const handleCancel = () => {
    setSkills(initialValue); // Reset to initial value
    setNewSkill({ name: '', category: 'Technical' });
    onClose();
  };

  const addSkill = () => {
    if (newSkill.name.trim()) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: newSkill.name.trim(),
        category: newSkill.category,
      };
      setSkills([...skills, skill]);
      setNewSkill({ name: '', category: 'Technical' });
    }
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={handleCancel}
        type="button"
        aria-label="Close modal"
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-gray-200">
          <div className="flex">
            <h2 className="text-xl font-semibold text-gray-900 px-3 py-1 bg-blue-50 rounded-md flex-1">Edit Skills</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Add New Skill */}
          <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Add New Skill</h3>
            <div className="flex gap-3">
              <div className="flex-1">
                <InputField
                  label="Skill Name"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  placeholder="e.g., React, JavaScript, etc."
                />
              </div>
              <div className="w-32">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Technical">Technical</option>
                  <option value="Soft Skill">Soft Skill</option>
                  <option value="Language">Language</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button
                  onClick={addSkill}
                  variant="primary"
                  size="sm"
                >
                  <PlusOutlined />
                </Button>
              </div>
            </div>
          </div>

          {/* Skills List */}
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
                      <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {skill.category}
                      </span>
                    </div>
                    <Button
                      onClick={() => removeSkill(skill.id)}
                      variant="text"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                    >
                      <DeleteOutlined />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 pt-4">
          <Button
            variant="text"
            onClick={handleCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            className="flex-1"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
