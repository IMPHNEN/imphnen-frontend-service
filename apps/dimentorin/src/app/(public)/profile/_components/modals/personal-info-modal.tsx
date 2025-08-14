import { FC, useState, useEffect } from 'react';
import { ModalButton } from '../buttons/modal-button';

interface PersonalInfo {
  email: string;
  phone: string;
  location: string;
}

interface PersonalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValue: PersonalInfo;
  onSave: (value: PersonalInfo) => Promise<void>;
  isLoading?: boolean;
}

export const PersonalInfoModal: FC<PersonalInfoModalProps> = ({
  isOpen,
  onClose,
  initialValue,
  onSave,
  isLoading = false,
}) => {
  const [personalInfo, setPersonalInfo] = useState(initialValue);

  // Sync local state with backend data
  useEffect(() => {
    setPersonalInfo(initialValue);
  }, [initialValue]);

  const handleSave = async () => {
    try {
      await onSave(personalInfo);
      // Only close modal after successful backend response
      onClose();
    } catch (error) {
      console.error('Save failed:', error);
      // Modal stays open on error so user can retry
    }
  };

  const handleCancel = () => {
    setPersonalInfo(initialValue);
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
            <h2 className="text-xl font-semibold text-gray-900 px-3 py-1 bg-[#23A1EB]/10 rounded-md flex-1">Edit Personal Information</h2>
          </div>
        </div>


        <div className="px-6 py-4 space-y-4">
          <div>
            <label htmlFor="personal-email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="personal-email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23A1EB] focus:border-[#23A1EB] outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="personal-phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              id="personal-phone"
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
              placeholder="Enter your phone number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23A1EB] focus:border-[#23A1EB] outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="personal-location" className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              id="personal-location"
              type="text"
              value={personalInfo.location}
              onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
              placeholder="Enter your location"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23A1EB] focus:border-[#23A1EB] outline-none transition-colors"
            />
          </div>
        </div>


        <div className="flex gap-3 p-6 pt-4">
          <ModalButton variant="secondary"
            onClick={handleCancel}
            className="flex-1 bg-white shadow-md"
            disabled={isLoading}
          >
            Batal
          </ModalButton>
          <ModalButton variant="primary"
            onClick={handleSave}
            className="flex-1"
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


