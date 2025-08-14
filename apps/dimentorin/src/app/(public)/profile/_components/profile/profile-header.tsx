import { FC } from 'react';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { EditOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useProfile } from '../contexts/profile-context';

interface ProfileHeaderProps {
  onEditProfileClick: () => void;
}

export const ProfileHeader: FC<ProfileHeaderProps> = ({ onEditProfileClick }) => {
  const { profileData, profileType } = useProfile();

  // Determine the avatar source
  const avatarSrc = (profileType === 'user' && profileData && 'avatar' in profileData)
    ? profileData.avatar || "/image/testimonial.webp"
    : "/image/testimonial.webp";

  // Determine fullname with fallback
  const displayFullname = profileData?.fullname ||
    (profileType === 'mentor' && profileData && 'legal_name' in profileData
      ? profileData.legal_name
      : 'User Name');  // Determine current job/role
  let displayJob = 'Role';
  if (profileData) {
    if (profileType === 'mentor' && 'current_role' in profileData) {
      displayJob = profileData.current_role || 'Mentor';
    } else if (profileType === 'user' && 'role' in profileData && profileData.role) {
      displayJob = profileData.role.name || 'User';
    } else if ('current_role' in profileData) {
      // Fallback to current_role if available regardless of profileType
      displayJob = profileData.current_role || 'Role';
    }
  }

  // Determine join date
  const joinDate = profileData && 'created_at' in profileData
    ? new Date(profileData.created_at).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long'
      })
    : 'April 2024';

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
              src={avatarSrc}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-neutral-800 mb-2">
                {displayFullname}
              </h1>
              <p className="text-neutral-600 mb-1">{displayJob}</p>
              {/* <p className="text-sm text-neutral-500">{displayLocation}</p> */}
              <p className="text-sm text-neutral-500 mt-2">
                Bergabung sejak {joinDate}
              </p>
            </div>

            <Button
              variant="secondary"
              size="sm"
              className="flex items-center gap-2 self-start"
              onClick={onEditProfileClick}
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
              {profileData && 'mentoring_sessions' in profileData ? profileData.mentoring_sessions || 'N/A' : 'N/A'}
            </p>
            <p className="text-xs md:text-sm text-neutral-600">Mentoring Sessions</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-lg md:text-xl font-semibold text-primary-500">
              {profileData && 'rating' in profileData ? profileData.rating || 'N/A' : 'N/A'}
            </p>
            <p className="text-xs md:text-sm text-neutral-600">Rating</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-lg md:text-xl font-semibold text-primary-500">
              0
            </p>
            <p className="text-xs md:text-sm text-neutral-600">Certificates</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};
