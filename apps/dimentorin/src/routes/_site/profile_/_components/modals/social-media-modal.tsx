import { FC, useState, useEffect } from 'react';
import { ModalButton } from '../buttons/modal-button';

interface SocialLink {
  platform: string;
  placeholder: string;
  value: string;
}

interface SocialMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValue: SocialLink[];
  onSave: (value: SocialLink[]) => Promise<void>;
  isLoading?: boolean;
}

export const SocialMediaModal: FC<SocialMediaModalProps> = ({
  isOpen,
  onClose,
  initialValue,
  onSave,
  isLoading = false,
}) => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialValue);

  
  useEffect(() => {
    setSocialLinks(initialValue);
  }, [initialValue]);

  const handleSave = async () => {
    try {
      await onSave(socialLinks);

      onClose();
    } catch (error) {
      console.error('Save failed:', error);

    }
  };

  const handleCancel = () => {
    setSocialLinks(initialValue);
    onClose();
  };

  const handleSocialLinkChange = (index: number, value: string) => {
    const updated = [...socialLinks];
    updated[index].value = value;
    setSocialLinks(updated);
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
          <h2 className="text-2xl font-semibold leading-8 text-[#4B4B4B]">Social Media</h2>
        </div>

        <div className="max-h-[60vh] space-y-4 overflow-y-auto pt-8">
          {socialLinks.map((link, index) => (
            <div key={link.platform}>
              <label htmlFor={`social-${index}`} className="mb-2 block text-lg font-medium leading-7 text-[#4B4B4B]">
                {link.platform}
              </label>
              <input
                id={`social-${index}`}
                type="text"
                placeholder={link.placeholder}
                value={link.value}
                onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                className="h-12 w-full rounded-[6px] border border-[#D9D9D9] bg-[#F6F6F6] px-4 text-base leading-6 text-[#4B4B4B] placeholder:text-[#B8B8B8] focus:border-[#23A1EB] focus:outline-none"
              />
            </div>
          ))}
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

