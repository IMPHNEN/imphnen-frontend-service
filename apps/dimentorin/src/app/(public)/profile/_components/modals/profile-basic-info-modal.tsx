import { FC, useState } from 'react';
import { ModalButton } from '../buttons/modal-button';

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
    setProfileInfo(initialValue);
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
            <h2 className="text-xl font-semibold text-gray-900 px-3 py-1 bg-[#23A1EB]/10 rounded-md flex-1">Edit Profile</h2>
          </div>
        </div>


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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23A1EB] focus:border-[#23A1EB] outline-none transition-colors"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23A1EB] focus:border-[#23A1EB] outline-none transition-colors"
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

