import { FC, useState } from 'react';
import { Button } from '@imphnen-frontend-service/ui/atoms';

interface DescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValue: string;
  onSave: (value: string) => void;
}

export const DescriptionModal: FC<DescriptionModalProps> = ({
  isOpen,
  onClose,
  initialValue,
  onSave,
}) => {
  const [description, setDescription] = useState(initialValue);

  const handleSave = () => {
    onSave(description);
    onClose();
  };

  const handleCancel = () => {
    setDescription(initialValue); // Reset to initial value
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={handleCancel}
        aria-label="Close modal"
        type="button"
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-gray-200">
          <div className="flex">
            <h2 className="text-xl font-semibold text-gray-900 px-3 py-1 bg-blue-50 rounded-md flex-1">Edit Description</h2>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <div>
            <label htmlFor="description-textarea" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
              placeholder="Write your description here..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 pt-4">
          <Button
            variant="text"
            onClick={handleCancel}
            className="flex-1 bg-white shadow-md"
          >
            Batal
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            className="flex-1"
          >
            Simpan
          </Button>
        </div>
      </div>
    </div>
  );
};
