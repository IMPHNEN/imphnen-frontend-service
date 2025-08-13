import React, { FC, useState, useEffect } from 'react'; // Corrected import statement
import { Modal } from '@imphnen-frontend-service/ui/molecules';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { InputField } from '@imphnen-frontend-service/ui/molecules';
import { useProfile } from '../contexts/profile-context';
import { UserDetailResponseDto, MentorDetailResponseDto } from '@imphnen-frontend-service/service';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  showNotification: (type: 'success' | 'error', title: string, message?: string) => void;
}

export const EditProfileModal: FC<EditProfileModalProps> = ({ isOpen, onClose, showNotification }) => {
  const { profileData, profileType, updateProfile } = useProfile();
  const [formData, setFormData] = useState({
    fullname: '',
    current_role: '',
    location: '',
    domicile: '',
    bio: '',
    linkedin_url: '',
    github_url: '',
    portfolio_url: '',
    website_url: '',
  });

  useEffect(() => {
    if (profileData) {
      setFormData({
        fullname: profileData.fullname || '',
        current_role: (profileType === 'mentor' && 'current_role' in profileData) ? (profileData as MentorDetailResponseDto).current_role || '' : '',
        location: (profileType === 'user' && 'location' in profileData) ? (profileData as UserDetailResponseDto).location || '' : '',
        domicile: (profileType === 'mentor' && 'domicile' in profileData) ? (profileData as MentorDetailResponseDto).domicile || '' : '',
        bio: profileData.bio || '',
        linkedin_url: profileData.linkedin_url || '',
        github_url: profileData.github_url || '',
        portfolio_url: (profileType === 'mentor' && 'portfolio_url' in profileData) ? (profileData as MentorDetailResponseDto).portfolio_url || '' : '',
        website_url: (profileType === 'user' && 'website_url' in profileData) ? (profileData as UserDetailResponseDto).website_url || '' : '',
      });
    }
  }, [profileData, profileType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const updates: any = {};
      if (profileType === 'user') {
        if (formData.fullname !== '') updates.fullname = formData.fullname;
        if (formData.location !== '') updates.location = formData.location;
        if (formData.bio !== '') if (formData.bio !== '') updates.bio = formData.bio;
        if (formData.website_url !== '') updates.website_url = formData.website_url;
        if (formData.linkedin_url !== '') if (formData.linkedin_url !== '') updates.linkedin_url = formData.linkedin_url;
        if (formData.github_url !== '') if (formData.github_url !== '') updates.github_url = formData.github_url;
      } else if (profileType === 'mentor') {
        if (formData.fullname !== '') updates.legal_name = formData.fullname;
        if (formData.current_role !== '') updates.current_role = formData.current_role;
        if (formData.domicile !== '') updates.domicile = formData.domicile;
        if (formData.bio !== '') if (formData.bio !== '') updates.bio = formData.bio;
        if (formData.portfolio_url !== '') updates.portfolio_url = formData.portfolio_url;
        if (formData.linkedin_url !== '') if (formData.linkedin_url !== '') updates.linkedin_url = formData.linkedin_url;
        if (formData.github_url !== '') if (formData.github_url !== '') updates.github_url = formData.github_url;
      }

      await updateProfile(updates);
      showNotification('success', 'Profile Updated', 'Your profile has been successfully updated.');
      onClose();
    } catch (err) {
      console.error('Profile update error:', err);
      showNotification('error', 'Failed to save changes', 'Please try again.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Content>
        <div className="p-4 space-y-4">
          <InputField
            label="Full Name"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
          {profileType === 'mentor' && (
            <InputField
              label="Current Role"
              name="current_role"
              value={formData.current_role}
              onChange={handleChange}
              placeholder="e.g., Software Engineer"
            />
          )}
          <InputField
            label="Location"
            name="location"
            value={profileType === 'user' ? formData.location : formData.domicile}
            onChange={handleChange}
            placeholder="e.g., Jakarta, Indonesia"
          />
          <div className="flex flex-col">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23A1EB] focus:border-[#23A1EB] outline-none transition-colors"
            />
          </div>
          <InputField
            label="LinkedIn URL"
            name="linkedin_url"
            value={formData.linkedin_url}
            onChange={handleChange}
            placeholder="e.g., linkedin.com/in/yourprofile"
          />
          <InputField
            label="Github URL"
            name="github_url"
            value={formData.github_url}
            onChange={handleChange}
            placeholder="e.g., github.com/yourusername"
          />
          {profileType === 'mentor' ? (
            <InputField
              label="Portfolio URL"
              name="portfolio_url"
              value={formData.portfolio_url}
              onChange={handleChange}
              placeholder="e.g., yourportfolio.com"
            />
          ) : (
            <InputField
              label="Website URL"
              name="website_url"
              value={formData.website_url}
              onChange={handleChange}
              placeholder="e.g., yourwebsite.com"
            />
          )}
        </div>
      </Modal.Content>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};
