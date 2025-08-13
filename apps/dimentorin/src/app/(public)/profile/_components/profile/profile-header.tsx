import { FC } from 'react';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { EditOutlined, CameraOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useProfile } from '../contexts/profile-context'; // Import useProfile hook
import { UserDetailResponseDto, MentorDetailResponseDto } from '@imphnen-frontend-service/service'; // Import DTOs

interface ProfileHeaderProps {
  onEditProfileClick: () => void;
}

export const ProfileHeader: FC<ProfileHeaderProps> = ({ onEditProfileClick }) => {
  const { profileData, profileType } = useProfile(); // Use the profileData and profileType from context

  // Determine the avatar source
  const avatarSrc = (profileType === 'user' && profileData && 'avatar' in profileData)
    ? (profileData as UserDetailResponseDto).avatar
    : "/image/testimonial.webp"; // Fallback to default image

  // Determine fullname
  const displayFullname = profileData?.fullname || 'Muhammad Firdaus Oi Oi Oi';

  // Determine current job/role
  let displayJob = 'UI/UX Designer';
  if (profileType === 'mentor' && profileData && 'current_role' in profileData) {
    displayJob = (profileData as MentorDetailResponseDto).current_role || 'UI/UX Designer';
  }

  // Determine location
  let displayLocation = 'Jakarta, Indonesia';
  if (profileType === 'user' && profileData && 'location' in profileData) {
    displayLocation = (profileData as UserDetailResponseDto).location || 'Jakarta, Indonesia';
  } else if (profileType === 'mentor' && profileData && 'domicile' in profileData) {
    displayLocation = (profileData as MentorDetailResponseDto).domicile || 'Jakarta, Indonesia';
  }

  return (
    <motion.div
      className="bg-white rounded-lg p-6 md:p-8 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="relative flex-shrink-0">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-primary-100 flex items-center justify-center">
            <img
              src={avatarSrc} // Use dynamic avatar source
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            variant="primary"
            size="sm"
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full p-0 min-w-0"
          >
            <CameraOutlined className="text-sm" />
          </Button>
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-neutral-800 mb-2">
                {displayFullname}
              </h1>
              <p className="text-neutral-600 mb-1">{displayJob}</p>
              <p className="text-sm text-neutral-500">{displayLocation}</p>
              <p className="text-sm text-neutral-500 mt-2">
                Bergabung sejak April 2024
              </p>
            </div>

            <Button
              variant="secondary"
              size="sm"
              className="flex items-center gap-2 self-start"
              onClick={onEditProfileClick} // Add onClick handler
            >
              <EditOutlined className="text-sm" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {profileType === 'mentor' && (
        <div className="flex justify-around md:justify-start md:gap-12 mt-6 pt-6 border-t border-neutral-100">
          <div className="text-center md:text-left">
            <p className="text-lg md:text-xl font-semibold text-primary-500">
              {(profileData as MentorDetailResponseDto)?.mentoring_sessions || 'N/A'}
            </p>
            <p className="text-xs md:text-sm text-neutral-600">Mentoring Sessions</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-lg md:text-xl font-semibold text-primary-500">
              {(profileData as MentorDetailResponseDto)?.rating || 'N/A'}
            </p>
            <p className="text-xs md:text-sm text-neutral-600">Rating</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-lg md:text-xl font-semibold text-primary-500">8</p>
            <p className="text-xs md:text-sm text-neutral-600">Certificates</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};
