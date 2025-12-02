import { FC, ReactElement, useState } from 'react';
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms';
import { Button, Textarea } from '@imphnen-frontend-service/ui/atoms';
import { useNavigate } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { teamCreateSchema, TTeamCreateForm, useCreateTeam, ETeamVisibility, useUploadFile } from '@imphnen-frontend-service/service';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Icon } from '@iconify/react';

import { CitySelect } from '../../../components/city-select';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

// Team features deadline: 2025-11-30 23:59:00 WIB (UTC+7)
const TEAM_FEATURES_DEADLINE = new Date('2025-11-30T16:59:00Z');

const CreateTeamPage: FC = (): ReactElement => {
  const navigate = useNavigate();

  // Check if team features are closed
  const isTeamFeaturesClosed = new Date() >= TEAM_FEATURES_DEADLINE;

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string>('');

  const form = useForm<TTeamCreateForm>({
    resolver: zodResolver(teamCreateSchema),
    mode: 'all',
    defaultValues: {
      visibility: ETeamVisibility.PUBLIC,
      logo: null,
      banner: null,
    },
  });

  const { mutateAsync: createTeam, isPending: isCreating } = useCreateTeam();
  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile();

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error('Logo image is too large. Maximum size is 2MB.');
        e.target.value = '';
        return;
      }
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error('Banner image is too large. Maximum size is 2MB.');
        e.target.value = '';
        return;
      }
      setBannerFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      let logoUrl = null;
      let bannerUrl = null;

      if (logoFile) {
        const logoResult = await uploadFile(logoFile);
        logoUrl = logoResult.data.url;
      }

      if (bannerFile) {
        const bannerResult = await uploadFile(bannerFile);
        bannerUrl = bannerResult.data.url;
      }

      const result = await createTeam({
        ...data,
        logo: logoUrl,
        banner: bannerUrl,
      });

      toast.success('Team created successfully!');
      navigate(`/teams/${result.data.id}`);
    } catch (error: any) {
      console.error('Failed to create team:', error);

      // Handle specific error messages
      const message = error?.message || '';
      if (message.includes('413') || message.includes('length limit') || message.includes('too large')) {
        toast.error('Image file is too large. Please use smaller images (max 2MB each).');
      } else if (message.includes('already a member')) {
        toast.error(message);
      } else {
        toast.error(message || 'Failed to create team. Please try again.');
      }
    }
  });

  // Show closed screen if team features are closed
  if (isTeamFeaturesClosed) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
        <div className="bg-white dark:bg-gray-900 w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
              <Icon
                icon="mdi:clock-alert"
                className="text-3xl text-red-600 dark:text-red-400"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Team Features Closed
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Team creation is no longer available.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The deadline for team features was November 30, 2025 at 23:59 WIB.
            </p>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors cursor-pointer"
            >
              Back to Dashboard
            </button>

            <button
              onClick={() => navigate('/teams/browse')}
              className="w-full py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Browse Teams
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-900 border-b dark:border-neutral-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Your Team</h1>
          <p className="text-gray-600 dark:text-neutral-400 mt-1">Build your hackathon dream team</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md dark:shadow-neutral-900/50 p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Banner Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                Team Banner <span className="text-gray-400 dark:text-neutral-500">(Optional)</span>
              </label>
              {bannerPreview ? (
                <div className="relative">
                  <img
                    src={bannerPreview}
                    alt="Banner preview"
                    className="w-full h-48 object-cover rounded-lg border-2 border-gray-200 dark:border-neutral-700"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setBannerFile(null);
                      setBannerPreview('');
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-neutral-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-800">
                  <div className="text-center">
                    <p className="text-gray-500 dark:text-neutral-400">Click to upload banner</p>
                    <p className="text-xs text-gray-400 dark:text-neutral-500 mt-1">1200x400 recommended. Max 2MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleBannerChange}
                  />
                </label>
              )}
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                Team Logo <span className="text-gray-400 dark:text-neutral-500">(Optional, but highly recommended)</span>
              </label>
              <div className="flex items-center space-x-4">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 dark:border-neutral-700"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center">
                    <span className="text-gray-400 dark:text-neutral-500 text-3xl">👥</span>
                  </div>
                )}
                <div>
                  <div>
                    <label htmlFor="logo" className="cursor-pointer">
                      <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block">
                        {logoPreview ? 'Change Logo' : 'Upload Logo'}
                      </span>
                      <input
                        id="logo"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoChange}
                      />
                    </label>
                    {logoPreview && (
                      <button
                        type="button"
                        onClick={() => {
                          setLogoFile(null);
                          setLogoPreview('');
                        }}
                        className="ml-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 dark:text-neutral-500 mt-2">Max 2MB</p>
                </div>
              </div>
            </div>

            {/* Team Name */}
            <ControlledInputField
              control={form.control}
              label="Team Name"
              placeholder="Enter your team name"
              name="name"
            />

            {/* City */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">
                City <span className="text-red-500">*</span>
              </label>
              <Controller
                control={form.control}
                name="city"
                render={({ field, fieldState }) => (
                  <CitySelect
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState.error?.message}
                    placeholder="Search your city..."
                  />
                )}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">
                Description <span className="text-red-500">*</span>
              </label>
              <Controller
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <div>
                    <Textarea
                      {...field}
                      placeholder="Tell others about your team, what you're looking for, your goals..."
                      rows={4}
                      className="w-full"
                    />
                    {fieldState.error && (
                      <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Visibility */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">
                Team Visibility <span className="text-red-500">*</span>
              </label>
              <Controller
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <div className="space-y-3">
                    <label className="flex items-start space-x-3 cursor-pointer border dark:border-neutral-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-neutral-800">
                      <input
                        type="radio"
                        {...field}
                        value={ETeamVisibility.PUBLIC}
                        checked={field.value === ETeamVisibility.PUBLIC}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Public</p>
                        <p className="text-sm text-gray-600 dark:text-neutral-400">
                          Team will be visible in Browse Teams. Anyone can request to join.
                        </p>
                      </div>
                    </label>
                    <label className="flex items-start space-x-3 cursor-pointer border dark:border-neutral-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-neutral-800">
                      <input
                        type="radio"
                        {...field}
                        value={ETeamVisibility.PRIVATE}
                        checked={field.value === ETeamVisibility.PRIVATE}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Private</p>
                        <p className="text-sm text-gray-600 dark:text-neutral-400">
                          Team is hidden from Browse Teams. Members can only join via invitation.
                        </p>
                      </div>
                    </label>
                  </div>
                )}
              />
            </div>

            {/* Warning */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> As team leader, you cannot leave or join another team after creating this team.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={!form.formState.isValid || isCreating || isUploading}
              >
                {isCreating || isUploading ? 'Creating Team...' : 'Create Team'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTeamPage;
