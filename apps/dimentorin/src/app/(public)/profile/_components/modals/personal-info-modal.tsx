import { FC, useState } from 'react';
import { Button } from '@imphnen-frontend-service/ui/atoms';

interface PersonalInfo {
  email: string;
  phone: string;
  location: string;
}

interface PersonalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValue: PersonalInfo;
  onSave: (value: PersonalInfo) => void;
}

export const PersonalInfoModal: FC<PersonalInfoModalProps> = ({
  isOpen,
  onClose,
  initialValue,
  onSave,
}) => {
  const [personalInfo, setPersonalInfo] = useState(initialValue);

  const handleSave = () => {
    onSave(personalInfo);
    onClose();
  };

  const handleCancel = () => {
    setPersonalInfo(initialValue); // Reset to initial value
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
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-gray-200">
          <div className="flex">
            <h2 className="text-xl font-semibold text-gray-900 px-3 py-1 bg-blue-50 rounded-md flex-1">Edit Personal Information</h2>
          </div>
        </div>

        {/* Content */}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
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
