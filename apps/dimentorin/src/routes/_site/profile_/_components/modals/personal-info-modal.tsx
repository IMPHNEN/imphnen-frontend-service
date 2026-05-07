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

  
  useEffect(() => {
    setPersonalInfo(initialValue);
  }, [initialValue]);

  const handleSave = async () => {
    try {
      await onSave(personalInfo);
      
      onClose();
    } catch (error) {
      console.error('Save failed:', error);
      
    }
  };

  const handleCancel = () => {
    setPersonalInfo(initialValue);
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
          <h2 className="text-2xl font-semibold leading-8 text-[#4B4B4B]">Personal Informations</h2>
        </div>

        <div className="space-y-5 pt-8">
          <div>
            <label htmlFor="personal-email" className="mb-2 block text-lg font-medium leading-7 text-[#4B4B4B]">
              Alamat Email
            </label>
            <input
              id="personal-email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
              placeholder="Enter your email"
              className="h-12 w-full rounded-[6px] border border-[#D9D9D9] bg-[#F6F6F6] px-4 text-base leading-6 text-[#4B4B4B] placeholder:text-[#B8B8B8] focus:border-[#23A1EB] focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="personal-phone" className="mb-2 block text-lg font-medium leading-7 text-[#4B4B4B]">
              Nomor Telepon
            </label>
            <input
              id="personal-phone"
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
              placeholder="Enter your phone number"
              className="h-12 w-full rounded-[6px] border border-[#D9D9D9] bg-[#F6F6F6] px-4 text-base leading-6 text-[#4B4B4B] placeholder:text-[#B8B8B8] focus:border-[#23A1EB] focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="personal-location" className="mb-2 block text-lg font-medium leading-7 text-[#4B4B4B]">
              Lokasi
            </label>
            <input
              id="personal-location"
              type="text"
              value={personalInfo.location}
              onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
              placeholder="Enter your location"
              className="h-12 w-full rounded-[6px] border border-[#D9D9D9] bg-[#F6F6F6] px-4 text-base leading-6 text-[#4B4B4B] placeholder:text-[#B8B8B8] focus:border-[#23A1EB] focus:outline-none"
            />
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


