import { FC } from 'react';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { EditOutlined, CameraOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

export const ProfileHeader: FC = () => {
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
              src="/image/testimonial.webp"
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
                Muhammad Firdaus Oi Oi Oi
              </h1>
              <p className="text-neutral-600 mb-1">UI/UX Designer</p>
              <p className="text-sm text-neutral-500">Jakarta, Indonesia</p>
              <p className="text-sm text-neutral-500 mt-2">
                Bergabung sejak April 2024
              </p>
            </div>

            <Button
              variant="secondary"
              size="sm"
              className="flex items-center gap-2 self-start"
            >
              <EditOutlined className="text-sm" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-around md:justify-start md:gap-12 mt-6 pt-6 border-t border-neutral-100">
        <div className="text-center md:text-left">
          <p className="text-lg md:text-xl font-semibold text-primary-500">15</p>
          <p className="text-xs md:text-sm text-neutral-600">Mentoring Sessions</p>
        </div>
        <div className="text-center md:text-left">
          <p className="text-lg md:text-xl font-semibold text-primary-500">4.8</p>
          <p className="text-xs md:text-sm text-neutral-600">Rating</p>
        </div>
        <div className="text-center md:text-left">
          <p className="text-lg md:text-xl font-semibold text-primary-500">8</p>
          <p className="text-xs md:text-sm text-neutral-600">Certificates</p>
        </div>
      </div>
    </motion.div>
  );
};
