import { FC, useState } from 'react';
import { Button } from '@imphnen-frontend-service/ui/atoms';

interface ProfileBasicInfo {
  name: string;
  title: string;
}

interface ProfileBasicInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValue: ProfileBasicInfo;
  onSave: (value: ProfileBasicInfo) => void;
}

export const ProfileBasicInfoModal: FC<ProfileBasicInfoModalProps> = ({
  isOpen,
  onClose,
  initialValue,
  onSave,
}) => {
  const [profileInfo, setProfileInfo] = useState(initialValue);

  const handleSave = () => {
    onSave(profileInfo);
    onClose();
  };

  const handleCancel = () => {
    setProfileInfo(initialValue); // Reset to initial value
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
            <h2 className="text-xl font-semibold text-gray-900 px-3 py-1 bg-blue-50 rounded-md flex-1">Edit Profile</h2>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-4">
          <div>
            <label htmlFor="profile-name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              id="profile-name"
              type="text"
              value={profileInfo.name}
              onChange={(e) => setProfileInfo({ ...profileInfo, name: e.target.value })}
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="profile-title" className="block text-sm font-medium text-gray-700 mb-2">
              Professional Title
            </label>
            <input
              id="profile-title"
              type="text"
              value={profileInfo.title}
              onChange={(e) => setProfileInfo({ ...profileInfo, title: e.target.value })}
              placeholder="Enter your professional title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
        </div>        {/* Footer */}
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
