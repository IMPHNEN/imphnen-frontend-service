import { FC, useState } from 'react';
import { ModalButton } from '../buttons/modal-button';

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
    setDescription(initialValue);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={handleCancel}
        aria-label="Close modal"
        type="button"
      />

      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-5xl mx-auto">
        <div className="p-6 pb-4 border-b border-gray-200">
          <div className="flex">
            <h2 className="text-xl font-semibold text-gray-900 px-3 py-1 bg-[#23A1EB]/10 rounded-md flex-1">Edit Description</h2>
          </div>
        </div>

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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23A1EB] focus:border-[#23A1EB] outline-none transition-colors resize-none"
              placeholder="Write your description here..."
            />
          </div>
        </div>

        <div className="flex gap-3 p-6 pt-4">
          <ModalButton
            variant="secondary"
            onClick={handleCancel}
            className="flex-1"
          >
            Batal
          </ModalButton>
          <ModalButton
            variant="primary"
            onClick={handleSave}
            className="flex-1"
          >
            Simpan
          </ModalButton>
        </div>
      </div>
    </div>
  );
};

