import React, { FC, useState, useEffect } from 'react';
import { Modal, InputField } from '@imphnen-frontend-service/ui/molecules';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { useProfile } from '../contexts/profile-context';
import { CameraOutlined } from '@ant-design/icons';
import { useUploadAvatar } from '@imphnen-frontend-service/service';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  showNotification: (type: 'success' | 'error', title: string, message?: string) => void;
}

export const EditProfileModal: FC<EditProfileModalProps> = ({ isOpen, onClose, showNotification }) => {
  const { profileData, profileType, updateProfile } = useProfile();
  const uploadAvatarMutation = useUploadAvatar();
  const [formData, setFormData] = useState({
    fullname: '',
    avatar: ''
  });
  const [previewUrl, setPreviewUrl] = useState<string>('/image/testimonial.webp');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (profileData) {
      const fullname = profileData.fullname ||
        (profileType === 'mentor' && 'legal_name' in profileData ? profileData.legal_name : '') || '';


      const avatar = (profileType === 'user' && 'avatar' in profileData)
        ? profileData.avatar || '/image/testimonial.webp'
        : '/image/testimonial.webp';

      console.log('Modal - Profile data avatar URL:', avatar);
      console.log('Modal - Profile data:', profileData);

      setFormData({
        fullname,
        avatar: (profileType === 'user' && 'avatar' in profileData) ? profileData.avatar || '' : ''
      });


      setPreviewUrl(avatar);
    } else {

      setPreviewUrl('/image/testimonial.webp');
    }
  }, [profileData, profileType]);

  const handleImageError = () => {
    console.log('Image failed to load:', previewUrl);
    setPreviewUrl('/image/testimonial.webp');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, fullname: e.target.value }));
  };

  const handleImageUpload = async (file: File) => {
    try {
      setIsUploading(true);


      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
      };
      reader.readAsDataURL(file);


      const uploadResult = await uploadAvatarMutation.mutateAsync(file);

      console.log('Avatar upload response:', uploadResult);


      interface UploadData {
        url?: string;
      }

      const uploadData = ('data' in uploadResult ? (uploadResult as { data: UploadData }).data : uploadResult as UploadData);


      setFormData(prev => ({ ...prev, avatar: uploadData.url || '' }));


      setPreviewUrl(uploadData.url || '/image/testimonial.webp');

    } catch (error) {
      console.error('Avatar upload error:', error);
      showNotification('error', 'Upload Failed', 'Failed to upload avatar image');

      const originalAvatar = (profileType === 'user' && profileData && 'avatar' in profileData) ? profileData.avatar : '';
      setPreviewUrl(originalAvatar || '/image/testimonial.webp');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const updates: Record<string, string> = {};


      if (formData.fullname.trim() !== '') {
        if (profileType === 'user') {
          updates.fullname = formData.fullname;
        } else if (profileType === 'mentor') {
          updates.legal_name = formData.fullname;
        }
      }


      if (formData.avatar && formData.avatar !== (profileData && 'avatar' in profileData ? profileData.avatar : '')) {
        updates.avatar = formData.avatar;
      }

      if (Object.keys(updates).length > 0) {
        await updateProfile(updates);
        showNotification('success', 'Profile Updated', 'Your profile has been successfully updated.');
      }

      onClose();
    } catch (err: unknown) {
      console.error('Profile update error:', err);
      let apiMessage = '';
      if (typeof err === 'object' && err !== null) {
        const errObj = err as { response?: { data?: { message?: string } } };
        let backendMsg = '';
        if (errObj.response?.data?.message) {
          backendMsg = errObj.response.data.message;
        }
        let msg = '';
        if ('message' in err && typeof (err as { message?: string }).message === 'string') {
          msg = (err as { message?: string }).message || '';

          if (msg.trim().startsWith('{') && msg.trim().endsWith('}')) {
            try {
              const parsed = JSON.parse(msg);
              if (parsed && typeof parsed.message === 'string') {
              msg = parsed.message;
              }
            } catch {
                // Ignore JSON parse errors
            }
          }
        }
        if (backendMsg && msg && backendMsg !== msg) {
          apiMessage = backendMsg + '\n' + msg;
        } else if (backendMsg) {
          apiMessage = backendMsg;
        } else if (msg) {
          apiMessage = msg;
        }
      }
      showNotification('error', 'Failed to save changes', apiMessage || 'Please try again.');
    }
  };  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Content>
        {}
        <div className="flex justify-center pt-6 pb-4">
          <div className="relative">
            {}
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
              className="hidden"
              disabled={isUploading}
            />

            <label htmlFor="avatar-upload" className="cursor-pointer block relative group">
              <img
                src={previewUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow-lg transition-all duration-300 group-hover:border-blue-200"
                onError={handleImageError}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 rounded-full bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Change Photo
                </span>
              </div>
            </label>

            {}
            <label htmlFor="avatar-upload" className="cursor-pointer">
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border-2 border-white">
                {isUploading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <CameraOutlined className="text-xs" />
                )}
              </div>
            </label>
          </div>
        </div>        <div className="px-6 pb-6 space-y-6">
          {}
          <div className="space-y-2">
            <InputField
              label="Full Name"
              name="fullname"
              value={formData.fullname}
              onChange={handleNameChange}
              placeholder="Enter your full name"
              className="w-full"
            />
            <p className="text-xs text-gray-500 pl-1">
              This name will be displayed on your profile
            </p>
          </div>
        </div>
      </Modal.Content>
      <Modal.Footer>
        <div className="flex gap-3 w-full">
          <Button
            variant="secondary"
            onClick={onClose}
            className="flex-1"
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            className="flex-1"
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
