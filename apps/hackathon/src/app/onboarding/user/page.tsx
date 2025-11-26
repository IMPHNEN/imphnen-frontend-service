import { FC, ReactElement, useState, useEffect } from 'react';
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms';
import { Button, Textarea } from '@imphnen-frontend-service/ui/atoms';
import { useNavigate } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import {
  userOnboardingSchema,
  TUserOnboardingForm,
  useUpdateUserMe,
  useUploadAvatar,
  useUserMe,
  useAuthStore,
} from '@imphnen-frontend-service/service';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { CitySelect } from '../../../components/city-select';

const ROLE_OPTIONS = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'UI/UX Designer',
  'Product Manager',
  'Data Scientist',
  'Mobile Developer',
];

const UserOnboardingPage: FC = (): ReactElement => {
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  const { data: userData } = useUserMe();
  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUserMe();
  const { mutateAsync: uploadAvatar, isPending: isUploading } =
    useUploadAvatar();
  const { session } = useAuthStore();

  const form = useForm<TUserOnboardingForm>({
    resolver: zodResolver(userOnboardingSchema),
    mode: 'all',
    defaultValues: {
      fullname: session?.user?.fullname || userData?.data?.fullname || '',
      location: session?.user?.location || '',
      bio: session?.user?.bio || '',
      skills: session?.user?.skills || [],
    },
  });

  // Set initial avatar preview from GitHub avatar if available
  useEffect(() => {
    if (session?.user?.avatar && !avatarPreview) {
      setAvatarPreview(session.user.avatar);
    }
  }, [session?.user?.avatar, avatarPreview]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      let avatarUrl = session?.user?.avatar || null;

      // Upload avatar if a new file was selected
      if (avatarFile) {
        const uploadResult = await uploadAvatar(avatarFile);
        avatarUrl = uploadResult.data.url;
      }

      // Update user in Supabase
      await updateUser({
        fullname: data.fullname,
        avatar: avatarUrl,
        location: data.location,
        bio: data.bio,
        skills: data.skills,
      });

      // Wait a bit for the onSuccess handler to update localStorage
      // The updateUser mutation's onSuccess handler updates the Zustand store and localStorage
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Use window.location for a full page reload to ensure middleware sees updated localStorage
      globalThis.location.href = '/dashboard';
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Onboarding failed. Please try again.'
      );
    }
  });

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 dark:bg-neutral-950 px-4 py-8">
      <div className="bg-white dark:bg-neutral-900 w-full max-w-2xl p-8 rounded-xl shadow-lg dark:shadow-neutral-950/50">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Complete Your Profile
          </h1>
          <p className="text-gray-600 dark:text-neutral-400">
            Tell us more about yourself to get started
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-neutral-700"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center">
                  <span className="text-gray-400 dark:text-neutral-500 text-4xl">👤</span>
                </div>
              )}
            </div>
            <div>
              <label htmlFor="avatar" className="cursor-pointer">
                <span className="px-4 py-2 bg-blue-600 dark:bg-primary-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-primary-700 inline-block">
                  {avatarPreview ? 'Change Photo' : 'Upload Photo'}
                </span>
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
              <p className="text-xs text-gray-500 dark:text-neutral-500 mt-2 text-center">
                Optional, but highly recommended
              </p>
            </div>
          </div>

          {/* Full Name */}
          <ControlledInputField
            control={form.control}
            label="Full Name"
            placeholder="Enter your full name"
            name="fullname"
          />

          {/* City */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">
              City <span className="text-red-500">*</span>
            </label>
            <Controller
              control={form.control}
              name="location"
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

          {/* Role/Skills */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">
              Role / Skills
            </label>
            <Controller
              control={form.control}
              name="skills"
              render={({ field }) => (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    {ROLE_OPTIONS.map((role) => (
                      <label
                        key={role}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={field.value?.includes(role)}
                          onChange={(e) => {
                            const newValue = e.target.checked
                              ? [...(field.value || []), role]
                              : (field.value || []).filter((v) => v !== role);
                            field.onChange(newValue);
                          }}
                          className="rounded border-gray-300 dark:border-neutral-600 text-blue-600 dark:text-primary-500 focus:ring-blue-500 dark:focus:ring-primary-500 dark:bg-neutral-800"
                        />
                        <span className="text-sm dark:text-neutral-300">{role}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">
              Bio <span className="text-gray-400 dark:text-neutral-500">(Optional)</span>
            </label>
            <Controller
              control={form.control}
              name="bio"
              render={({ field, fieldState }) => (
                <div>
                  <Textarea
                    {...field}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    className="w-full"
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

          <Button
            className="w-full"
            type="submit"
            disabled={!form.formState.isValid || isUpdating || isUploading}
          >
            {isUpdating || isUploading ? 'Saving...' : 'Complete Setup'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserOnboardingPage;
