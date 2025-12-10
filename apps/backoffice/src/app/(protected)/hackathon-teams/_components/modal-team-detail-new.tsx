import { FC, useState, useEffect, useMemo, useRef } from 'react';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { CityFilterSelect } from '../../../../components/city-filter-select';
import TeamBannerPlaceholder from './team-banner-placeholder';
import { cn } from '@imphnen-frontend-service/utils';
import { TAdminTeamItem } from '@imphnen-frontend-service/service';
import {
  TeamOutlined,
  CloseOutlined,
  DeleteOutlined,
  SaveOutlined,
  CalendarOutlined,
  CrownOutlined,
  ExclamationOutlined,
  UploadOutlined,
  CameraOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons';

type TeamType = TAdminTeamItem;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: TeamType | null;
}

const ModalTeamDetail: FC<ModalProps> = ({ isOpen, onClose, team }) => {
  const [formData, setFormData] = useState<TeamType | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showLogoMenu, setShowLogoMenu] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  // Initialize form data when modal opens
  useEffect(() => {
    if (isOpen) {
      if (team) {
        setFormData({ ...team });
      } else {
        setFormData({
          id: '',
          name: '',
          description: '',
          city: '',
          banner: null,
          logo: null,
          visibility: 'public',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          leader_id: '',
        });
      }
    }
  }, [isOpen, team]);

  // Check if form has changes
  const hasChanges = useMemo(() => {
    if (!formData || !team) return !!formData;
    return (
      formData.name !== team.name ||
      formData.description !== team.description ||
      formData.city !== team.city ||
      formData.visibility !== team.visibility ||
      formData.logo !== team.logo ||
      formData.banner !== team.banner
    );
  }, [formData, team]);

  // Check if required fields are filled
  const isFormValid = useMemo(() => {
    if (!formData) return false;
    return (
      formData.name.trim() !== '' &&
      formData.city.trim() !== '' &&
      formData.description.trim() !== ''
    );
  }, [formData]);

  const canSave = hasChanges && isFormValid;

  if (!isOpen || !formData) return null;

  const handleInputChange = (field: keyof TeamType, value: string | null) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSave = () => {
    console.log('Saving team:', formData);
    onClose();
  };

  const handleDelete = () => {
    if (!team) return;
    console.log('Deleting team:', team.id);
    setShowDeleteConfirm(false);
    onClose();
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const logoUrl = e.target?.result as string;
      handleInputChange('logo', logoUrl);
      setShowLogoMenu(false);
    };
    reader.readAsDataURL(file);
  };

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const bannerUrl = e.target?.result as string;
      handleInputChange('banner', bannerUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
              <TeamOutlined className="text-primary-600 text-lg" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">
                {team ? 'Team Details' : 'Create New Team'}
              </h2>
              <p className="text-sm text-neutral-500">
                {team
                  ? 'View and manage team information'
                  : 'Add a new team to the hackathon'}
              </p>
            </div>
          </div>
          <button
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
            onClick={() => {
              setShowLogoMenu(false);
              onClose();
            }}
          >
            <CloseOutlined className="text-neutral-400 text-lg" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6" onClick={() => setShowLogoMenu(false)}>
          <input
            type="file"
            ref={logoInputRef}
            onChange={handleLogoUpload}
            accept="image/*"
            className="hidden"
          />
          <input
            type="file"
            ref={bannerInputRef}
            onChange={handleBannerUpload}
            accept="image/*"
            className="hidden"
          />

          {/* Banner Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-700">
              Team Banner{' '}
              <span className="text-xs text-neutral-500">
                (3:1 aspect ratio recommended)
              </span>
            </label>
            <div className="relative group">
              <TeamBannerPlaceholder
                banner={formData.banner || undefined}
                teamName={formData.name || 'Team Name'}
                className="rounded-lg border border-neutral-200 transition-all group-hover:border-primary-300"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    bannerInputRef.current?.click();
                  }}
                  className="bg-white/90 hover:bg-white text-neutral-700 border-transparent shadow-sm gap-2"
                >
                  <UploadOutlined className="text-sm" />
                  {formData.banner ? 'Change Banner' : 'Add Banner'}
                </Button>
                {formData.banner && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInputChange('banner', null);
                    }}
                    className="bg-white/90 hover:bg-white text-red-600 border-transparent shadow-sm hover:text-red-700 gap-2"
                  >
                    <DeleteOutlined className="text-sm" />
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Logo & Name */}
          <div className="grid grid-cols-12 gap-4 items-start">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Logo
              </label>
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden border border-neutral-200 group-hover:border-primary-300 transition-colors">
                  {formData.logo ? (
                    <img
                      src={formData.logo}
                      alt={formData.name || 'Team Logo'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <TeamOutlined className="text-neutral-400 text-xl" />
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowLogoMenu(!showLogoMenu);
                  }}
                  className="absolute inset-0 bg-neutral-300/80 cursor-pointer rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center w-24 h-24"
                >
                  <CameraOutlined className="text-white text-lg" />
                </button>
                {showLogoMenu && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 min-w-[140px] z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        logoInputRef.current?.click();
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2 cursor-pointer"
                    >
                      <UploadOutlined className="text-sm" />
                      {formData.logo ? 'Change Logo' : 'Upload Logo'}
                    </button>
                    {formData.logo && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInputChange('logo', null);
                          setShowLogoMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                      >
                        <DeleteOutlined className="text-sm" />
                        Remove Logo
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-10 space-y-2">
              <label className="block text-sm font-medium text-neutral-700">
                Team Name <span className="text-danger-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
                placeholder="Enter team name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-700">
              Description <span className="text-danger-500">*</span>
            </label>
            <textarea
              className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:border-primary-500 focus:outline-none resize-none"
              placeholder="Enter team description"
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>

          {/* City */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-700">
              City <span className="text-danger-500">*</span>
            </label>
            <CityFilterSelect
              value={formData.city || 'all'}
              onChange={(city) =>
                handleInputChange('city', city === 'all' ? '' : city)
              }
              className="w-full"
              placeholder="Search cities..."
              allOptionLabel="Select a city"
              filterIcon={false}
            />
          </div>

          {/* Visibility */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-700">
              Team Visibility
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={formData.visibility === 'public'}
                  onChange={(e) =>
                    handleInputChange('visibility', e.target.value)
                  }
                  className="text-primary-600"
                />
                <EyeOutlined className="text-info-600" />
                <span className="text-sm">Public</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={formData.visibility === 'private'}
                  onChange={(e) =>
                    handleInputChange('visibility', e.target.value)
                  }
                  className="text-primary-600"
                />
                <EyeInvisibleOutlined className="text-neutral-600" />
                <span className="text-sm">Private</span>
              </label>
            </div>
          </div>

          {/* Team Details */}
          {team && (
            <div className="space-y-4 border-t border-neutral-200 pt-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">
                  Team Leader ID
                </label>
                <div className="p-3 bg-neutral-50 rounded-lg flex items-center gap-3">
                  <CrownOutlined className="text-yellow-600 text-lg" />
                  <span className="text-sm text-neutral-700 font-mono">
                    {team.leader_id}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-700">
                    Created
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-neutral-50 rounded-lg">
                    <CalendarOutlined className="text-neutral-500" />
                    <span className="text-sm text-neutral-700">
                      {new Date(team.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-700">
                    Last Updated
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-neutral-50 rounded-lg">
                    <CalendarOutlined className="text-neutral-500" />
                    <span className="text-sm text-neutral-700">
                      {new Date(team.updated_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-neutral-200">
          <div>
            {team && (
              <Button
                variant="danger"
                size="md"
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-2"
              >
                <DeleteOutlined />
                Delete Team
              </Button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button variant="secondary" size="md" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleSave}
              disabled={!canSave}
              className="flex items-center gap-2"
            >
              <SaveOutlined />
              {team ? 'Save Changes' : 'Create Team'}
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-danger-100 flex items-center justify-center">
                <ExclamationOutlined className="text-danger-600 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">
                  Delete Team
                </h3>
                <p className="text-sm text-neutral-500">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <p className="text-sm text-neutral-700 mb-6">
              Are you sure you want to delete "{team?.name}"? This will
              permanently remove the team and all associated data.
            </p>

            <div className="flex items-center gap-3 justify-end">
              <Button
                variant="secondary"
                size="md"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="md"
                onClick={handleDelete}
                className="flex items-center gap-2"
              >
                <DeleteOutlined />
                Delete Team
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalTeamDetail;
