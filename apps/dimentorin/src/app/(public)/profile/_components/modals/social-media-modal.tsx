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
  onSave: (value: SocialLink[]) => void;
}

export const SocialMediaModal: FC<SocialMediaModalProps> = ({
  isOpen,
  onClose,
  initialValue,
  onSave,
}) => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialValue);

  // Sync local state with backend data
  useEffect(() => {
    setSocialLinks(initialValue);
  }, [initialValue]);

  const handleSave = () => {
    onSave(socialLinks);
    onClose();
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
            <h2 className="text-xl font-semibold text-gray-900 px-3 py-1 bg-[#23A1EB]/10 rounded-md flex-1">Edit Social Media</h2>
          </div>
        </div>


        <div className="px-6 py-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {socialLinks.map((link, index) => (
            <div key={link.platform}>
              <label htmlFor={`social-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                {link.platform}
              </label>
              <input
                id={`social-${index}`}
                type="text"
                placeholder={link.placeholder}
                value={link.value}
                onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23A1EB] focus:border-[#23A1EB] outline-none transition-colors"
              />
            </div>
          ))}
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

