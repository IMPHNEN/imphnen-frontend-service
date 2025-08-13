import React, { FC, useState, useEffect, useRef } from 'react';
import { Modal, InputField } from '@imphnen-frontend-service/ui/molecules';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { useProfile } from '../contexts/profile-context';
import { CameraOutlined } from '@ant-design/icons';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  showNotification: (type: 'success' | 'error', title: string, message?: string) => void;
}

export const EditProfileModal: FC<EditProfileModalProps> = ({ isOpen, onClose, showNotification }) => {
  const { profileData, profileType, updateProfile } = useProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    fullname: '',
    avatar: ''
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (profileData) {
      const fullname = profileData.fullname ||
        (profileType === 'mentor' && 'legal_name' in profileData ? profileData.legal_name : '') || '';

      const avatar = (profileType === 'user' && 'avatar' in profileData) ? profileData.avatar || '' : '';

      setFormData({
        fullname,
        avatar
      });

      setPreviewUrl(avatar || '/image/testimonial.webp');
    }
  }, [profileData, profileType]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, fullname: e.target.value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    try {
      const updates: Record<string, string> = {};

      // Only update fullname/legal_name and avatar
      if (formData.fullname.trim() !== '') {
        if (profileType === 'user') {
          updates.fullname = formData.fullname;
        } else if (profileType === 'mentor') {
          updates.legal_name = formData.fullname;
        }
      }

      // Handle avatar upload if new image is selected
      if (selectedImage) {
        // Avatar upload will be implemented when backend endpoint is ready
        // For now, we'll just store the preview URL
        // updates.avatar = await uploadAvatarToBackend(selectedImage);
        console.log('Avatar upload would happen here with file:', selectedImage.name);
      }

      if (Object.keys(updates).length > 0) {
        await updateProfile(updates);
        showNotification('success', 'Profile Updated', 'Your name has been successfully updated.');
      }

      onClose();
    } catch (err) {
      console.error('Profile update error:', err);
      showNotification('error', 'Failed to save changes', 'Please try again.');
    }
  };  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Content>
        <div className="p-4 space-y-6">
          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200">
                <img
                  src={previewUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={triggerFileInput}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <CameraOutlined className="text-sm" />
              </button>
            </div>
            <p className="text-sm text-gray-600 text-center">
              Click the camera icon to change your profile picture
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Name Field */}
          <InputField
            label="Full Name"
            name="fullname"
            value={formData.fullname}
            onChange={handleNameChange}
            placeholder="Enter your full name"
          />
        </div>
      </Modal.Content>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};
