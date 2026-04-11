import { FC } from 'react';
import { TeamOutlined } from '@ant-design/icons';
import { cn } from '@imphnen-frontend-service/utils';

interface TeamBannerPlaceholderProps {
  banner?: string;
  teamName: string;
  className?: string;
  showPlaceholder?: boolean;
}

const TeamBannerPlaceholder: FC<TeamBannerPlaceholderProps> = ({
  banner,
  teamName,
  className = '',
  showPlaceholder = true,
}) => {
  const aspectRatioClass = 'aspect-[3/1]';

  if (!banner && !showPlaceholder) {
    return null;
  }

  if (banner) {
    return (
      <div
        className={cn(
          'w-full bg-gray-100 overflow-hidden relative',
          aspectRatioClass,
          className
        )}
      >
        <img
          src={banner}
          alt={`${teamName} banner`}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const placeholder = target.nextElementSibling as HTMLElement;
            if (placeholder) {
              placeholder.style.display = 'flex';
            }
          }}
        />
        <div
          className={cn(
            'absolute inset-0 bg-linear-to-r from-gray-100 to-gray-200 flex items-center justify-center',
            'hidden'
          )}
        >
          <div className="text-center">
            <TeamOutlined className="text-4xl text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 font-medium">{teamName}</p>
            <p className="text-xs text-gray-400">Team Banner</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'w-full bg-linear-to-r from-gray-100 to-gray-200 flex items-center justify-center',
        aspectRatioClass,
        className
      )}
    >
      <div className="text-center">
        <TeamOutlined className="text-4xl text-gray-400 mb-2" />
        <p className="text-sm text-gray-500 font-medium">{teamName}</p>
        <p className="text-xs text-gray-400">No Banner</p>
      </div>
    </div>
  );
};

export default TeamBannerPlaceholder;
