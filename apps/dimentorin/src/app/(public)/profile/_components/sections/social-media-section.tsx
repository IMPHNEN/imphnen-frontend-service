import { FC, useState, useEffect } from 'react';
import { SocialMediaModal } from '../modals';
import { SectionWrapper } from '../shared/section-wrapper';
import { NotificationType } from '../modals/notification-modal';
import { EditSectionButton } from '../buttons/edit-section-button';

interface SocialLink {
  platform: string;
  placeholder: string;
  value: string;
}

interface SocialMediaSectionProps {
  initialSocialLinks: SocialLink[];
  onSave: (newSocialLinks: SocialLink[]) => void;
  showNotification: (type: NotificationType['type'], title: string, message?: string) => void;
}

export const SocialMediaSection: FC<SocialMediaSectionProps> = ({
  initialSocialLinks,
  onSave,
  showNotification,
}) => {
  const [isSocialMediaModalOpen, setIsSocialMediaModalOpen] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialSocialLinks);

  // Sync local state with props when initialSocialLinks changes
  useEffect(() => {
    setSocialLinks(initialSocialLinks);
  }, [initialSocialLinks]);

  const handleSave = (newSocialLinks: SocialLink[]) => {
    // Only call backend update, don't update local state
    // Local state will be updated through useEffect when backend responds
    // Don't show notification here - ProfileForm will handle it after backend success
    onSave(newSocialLinks);
  };

  return (
    <SectionWrapper
      title="Social Media"
      editButton={
        <EditSectionButton onClick={() => setIsSocialMediaModalOpen(true)} />
      }
      delay={0.1}
    >
      <div className="grid grid-cols-2 gap-4">
        {socialLinks.map((link) => (
          <div key={link.platform} className="border border-gray-200 rounded-md p-4 bg-gray-50">
            <div className="text-sm font-medium text-gray-700 mb-2">{link.platform}</div>
            <div className="text-gray-900 text-sm">
              {link.value || <span className="text-gray-400 italic">{link.placeholder}</span>}
            </div>
          </div>
        ))}
      </div>

      <SocialMediaModal
        isOpen={isSocialMediaModalOpen}
        onClose={() => setIsSocialMediaModalOpen(false)}
        initialValue={socialLinks}
        onSave={handleSave}
      />
    </SectionWrapper>
  );
};


