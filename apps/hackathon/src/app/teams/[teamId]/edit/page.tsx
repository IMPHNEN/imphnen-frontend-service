import { FC, ReactElement, useState, useEffect } from 'react';
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms';
import { Button, Textarea } from '@imphnen-frontend-service/ui/atoms';
import { useNavigate, useParams } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import {
  teamUpdateSchema,
  TTeamUpdateForm,
  useUpdateTeam,
  useTeamById,
  ETeamVisibility,
  useUploadFile,
  useAuthStore,
} from '@imphnen-frontend-service/service';
import { zodResolver } from '@hookform/resolvers/zod';

import { CitySelect } from '../../../../components/city-select';
import { Icon } from '@iconify/react';

const EditTeamPage: FC = (): ReactElement => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const { session } = useAuthStore();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string>('');

  const { data: teamData, isLoading: isLoadingTeam } = useTeamById(
    teamId || ''
  );
  const { mutateAsync: updateTeam, isPending: isUpdating } = useUpdateTeam(
    teamId || ''
  );
  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile();

  const team = teamData?.data;
  const currentUserId = session?.user?.id;
  const isLeader = currentUserId === team?.leader_id;

  const form = useForm<TTeamUpdateForm>({
    resolver: zodResolver(teamUpdateSchema),
    mode: 'all',
  });

  useEffect(() => {
    if (team) {
      form.reset({
        name: team.name,
        description: team.description,
        city: team.city,
        visibility: team.visibility,
        logo: team.logo,
        banner: team.banner,
      });
      if (team.logo) setLogoPreview(team.logo);
      if (team.banner) setBannerPreview(team.banner);
    }
  }, [team, form]);

  if (isLoadingTeam) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="text-gray-600 dark:text-gray-400">Loading team...</div>
      </div>
    );
  }

  if (!isLeader) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Access Denied
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Only the team leader can edit team information
        </p>
        <Button onClick={() => navigate(`/teams/${teamId}`)}>
          Back to Team
        </Button>
      </div>
    );
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
      let logoUrl = data.logo;
      let bannerUrl = data.banner;

      if (logoFile) {
        const logoResult = await uploadFile(logoFile);
        logoUrl = logoResult.data.url;
      }

      if (bannerFile) {
        const bannerResult = await uploadFile(bannerFile);
        bannerUrl = bannerResult.data.url;
      }

      await updateTeam({
        ...data,
        logo: logoUrl,
        banner: bannerUrl,
      });

      navigate(`/teams/${teamId}`);
    } catch (error) {
      console.error('Failed to update team:', error);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Edit Team Info
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Update your team details
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md dark:shadow-gray-950/50 p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Banner Upload */}
            <div>
              <label className="block text-label1 font-medium text-gray-700 dark:text-gray-300 mb-2">
                Team Banner
              </label>
              {bannerPreview ? (
                <div
                  className="relative w-full"
                  style={{ aspectRatio: '3 / 1' }}
                >
                  <img
                    src={bannerPreview}
                    alt="Banner preview"
                    className="absolute inset-0 w-full h-full object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setBannerFile(null);
                      setBannerPreview('');
                      form.setValue('banner', null);
                    }}
                    className="absolute top-2 right-2 bg-danger-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-danger-700 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      Click to upload banner
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      1200x400 recommended
                    </p>
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
              <label className="block text-label1 font-medium text-gray-700 dark:text-gray-300 mb-2">
                Team Logo
              </label>
              <div className="flex items-center space-x-4">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400 dark:text-gray-500 text-3xl">
                      <Icon icon="mdi:account-group" />
                    </span>
                  </div>
                )}
                <div className="flex flex-col md:flex-row items-start justify-start gap-1">
                  <label htmlFor="logo" className="cursor-pointer">
                    <span className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 inline-block">
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
                        form.setValue('logo', null);
                      }}
                      className="px-4 py-2 text-sm bg-danger-600 text-white rounded-lg hover:bg-danger-700 cursor-pointer"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Team Name */}
            <ControlledInputField
              control={form.control}
              label="Team Name"
              placeholder="Enter team name"
              name="name"
              size="lg"
              isRequired={true}
            />

            {/* City */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                City
              </label>
              <Controller
                control={form.control}
                name="city"
                render={({ field, fieldState }) => (
                  <CitySelect
                    value={field.value || ''}
                    onChange={field.onChange}
                    error={fieldState.error?.message}
                    placeholder="Search your city..."
                  />
                )}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-label1 font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <Controller
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <div>
                    <Textarea
                      {...field}
                      value={field.value || ''}
                      placeholder="Tell others about your team..."
                      rows={4}
                      className="w-full"
                      size="lg"
                    />
                    {fieldState.error && (
                      <p className="text-sm text-red-500 mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Visibility */}
            <div className="space-y-2">
              <label className="block text-label1 font-medium text-gray-700 dark:text-gray-300">
                Team Visibility
              </label>
              <Controller
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <div className="space-y-3">
                    <label className="flex items-start space-x-3 cursor-pointer border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <input
                        type="radio"
                        {...field}
                        value={ETeamVisibility.PUBLIC}
                        checked={field.value === ETeamVisibility.PUBLIC}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Public
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-sans">
                          Team will be visible in Browse Teams
                        </p>
                      </div>
                    </label>
                    <label className="flex items-start space-x-3 cursor-pointer border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <input
                        type="radio"
                        {...field}
                        value={ETeamVisibility.PRIVATE}
                        checked={field.value === ETeamVisibility.PRIVATE}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Private
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-sans">
                          Team hidden, invite-only
                        </p>
                      </div>
                    </label>
                  </div>
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() => navigate(`/teams/${teamId}`)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isUpdating || isUploading}
              >
                {isUpdating || isUploading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTeamPage;
