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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">

      <button
        className="absolute inset-0 bg-black/20"
        onClick={handleCancel}
        aria-label="Close modal"
        type="button"
      />


      <div className="relative max-h-[90vh] w-full max-w-[520px] overflow-y-auto rounded-2xl bg-[#F6F6F6] p-5 sm:p-6">

        <div className="rounded-[6px] bg-[#DFECF7] px-4 py-2">
          <h2 className="text-2xl font-semibold leading-8 text-[#4B4B4B]">Introduction</h2>
        </div>


        <div className="space-y-5 pt-8">
          <div>
            <label htmlFor="profile-name" className="mb-2 block text-lg font-medium leading-7 text-[#4B4B4B]">
              Full Name
            </label>
            <input
              id="profile-name"
              type="text"
              value={profileInfo.name}
              onChange={(e) => setProfileInfo({ ...profileInfo, name: e.target.value })}
              placeholder="Enter your full name"
              className="h-12 w-full rounded-[6px] border border-[#D9D9D9] bg-[#F6F6F6] px-4 text-base leading-6 text-[#4B4B4B] placeholder:text-[#B8B8B8] focus:border-[#23A1EB] focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="profile-title" className="mb-2 block text-lg font-medium leading-7 text-[#4B4B4B]">
              Professional Title
            </label>
            <input
              id="profile-title"
              type="text"
              value={profileInfo.title}
              onChange={(e) => setProfileInfo({ ...profileInfo, title: e.target.value })}
              placeholder="Enter your professional title"
              className="h-12 w-full rounded-[6px] border border-[#D9D9D9] bg-[#F6F6F6] px-4 text-base leading-6 text-[#4B4B4B] placeholder:text-[#B8B8B8] focus:border-[#23A1EB] focus:outline-none"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-8">
          <ModalButton
            variant="secondary"
            onClick={handleCancel}
            className="w-[110px]"
          >
            Batal
          </ModalButton>
          <ModalButton
            variant="primary"
            onClick={handleSave}
            className="w-[110px]"
          >
            Simpan
          </ModalButton>
        </div>
      </div>
    </div>
  );
};

