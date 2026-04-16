import { FC, useState, useEffect } from 'react';
import { ModalButton } from '../buttons/modal-button';

interface DescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValue: string;
  onSave: (value: string) => Promise<void>;
  isLoading?: boolean;
}

export const DescriptionModal: FC<DescriptionModalProps> = ({
  isOpen,
  onClose,
  initialValue,
  onSave,
  isLoading = false,
}) => {
  const [description, setDescription] = useState(initialValue);

  
  useEffect(() => {
    setDescription(initialValue);
  }, [initialValue]);

  const handleSave = async () => {
    try {
      await onSave(description);

      onClose();
    } catch (error) {
      console.error('Save failed:', error);

    }
  };

  const handleCancel = () => {
    setDescription(initialValue);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <button
        className="absolute inset-0 bg-black/20"
        onClick={handleCancel}
        aria-label="Close modal"
        type="button"
      />

      <div className="relative max-h-[90vh] w-full max-w-[520px] overflow-y-auto rounded-2xl bg-[#F6F6F6] p-5 sm:p-6">
        <div className="rounded-[6px] bg-[#DFECF7] px-4 py-2">
          <h2 className="text-2xl font-semibold leading-8 text-[#4B4B4B]">Description</h2>
        </div>

        <div className="pt-8">
          <div>
            <label htmlFor="description-textarea" className="mb-2 block text-lg font-medium leading-7 text-[#4B4B4B]">
              Deskripsi
            </label>
            <textarea
              id="description-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
              className="w-full resize-none rounded-[6px] border border-[#D9D9D9] bg-[#F6F6F6] px-5 py-4 text-base leading-6 text-[#4B4B4B] placeholder:text-[#B8B8B8] focus:border-[#23A1EB] focus:outline-none"
              placeholder="Tulis deskripsi kamu..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-8">
          <ModalButton
            variant="secondary"
            onClick={handleCancel}
            className="w-[110px]"
            disabled={isLoading}
          >
            Batal
          </ModalButton>
          <ModalButton
            variant="primary"
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

