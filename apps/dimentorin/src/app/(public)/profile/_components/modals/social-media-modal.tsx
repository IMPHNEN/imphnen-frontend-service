import { FC, useState } from 'react';
import { Button } from '@imphnen-frontend-service/ui/atoms';

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

  const handleSave = () => {
    onSave(socialLinks);
    onClose();
  };

  const handleCancel = () => {
    setSocialLinks(initialValue); // Reset to initial value
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
            <h2 className="text-xl font-semibold text-gray-900 px-3 py-1 bg-blue-50 rounded-md flex-1">Edit Social Media</h2>
          </div>
        </div>

        {/* Content */}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 pt-4">
          <Button
            variant="text"
            onClick={handleCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            className="flex-1"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
