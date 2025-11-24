import { FC, ReactElement, useState, useEffect } from 'react';
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms';
import { Button, Textarea } from '@imphnen-frontend-service/ui/atoms';
import { useNavigate } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { userOnboardingSchema, TUserOnboardingForm, useUpdateUserMe, useUploadAvatar } from '@imphnen-frontend-service/service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserMe } from '@imphnen-frontend-service/service';
import { useAuthStore } from '@imphnen-frontend-service/utils';

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

const INDONESIAN_CITIES = [
  'Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang',
  'Makassar', 'Palembang', 'Tangerang', 'Depok', 'Bekasi',
  'Yogyakarta', 'Malang', 'Bogor', 'Batam', 'Pekanbaru',
];

const UserOnboardingPage: FC = (): ReactElement => {
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  const { data: userData } = useUserMe();
  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUserMe();
  const { mutateAsync: uploadAvatar, isPending: isUploading } = useUploadAvatar();
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
      console.log('[Onboarding] Starting submission...', data);
      let avatarUrl = session?.user?.avatar || null;

      // Upload avatar if a new file was selected
      if (avatarFile) {
        console.log('[Onboarding] Uploading avatar...');
        const uploadResult = await uploadAvatar(avatarFile);
        avatarUrl = uploadResult.data.url;
        console.log('[Onboarding] Avatar uploaded:', avatarUrl);
      }

      // Update user in Supabase
      console.log('[Onboarding] Updating user in Supabase...');
      const result = await updateUser({
        fullname: data.fullname,
        avatar: avatarUrl,
        location: data.location,
        bio: data.bio,
        skills: data.skills,
      });
      console.log('[Onboarding] User updated successfully:', result);

      // Wait a bit for the onSuccess handler to update localStorage
      // The updateUser mutation's onSuccess handler updates the Zustand store and localStorage
      await new Promise(resolve => setTimeout(resolve, 100));

      console.log('[Onboarding] Navigating to dashboard...');
      // Use window.location for a full page reload to ensure middleware sees updated localStorage
      globalThis.location.href = '/dashboard';
    } catch (error) {
      console.error('[Onboarding] Onboarding failed:', error);
      alert(`Onboarding failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4 py-8">
      <div className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-lg">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Profile
          </h1>
          <p className="text-gray-600">
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
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-4xl">👤</span>
                </div>
              )}
            </div>
            <div>
              <label htmlFor="avatar" className="cursor-pointer">
                <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block">
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
              <p className="text-xs text-gray-500 mt-2 text-center">Optional, but highly recommended</p>
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
            <label className="block text-sm font-medium text-gray-700">
              City <span className="text-red-500">*</span>
            </label>
            <Controller
              control={form.control}
              name="location"
              render={({ field, fieldState }) => (
                <div>
                  <select
                    {...field}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your city</option>
                    {INDONESIAN_CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {fieldState.error && (
                    <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Role/Skills */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Role / Skills
            </label>
            <Controller
              control={form.control}
              name="skills"
              render={({ field }) => (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    {ROLE_OPTIONS.map((role) => (
                      <label key={role} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={field.value?.includes(role)}
                          onChange={(e) => {
                            const newValue = e.target.checked
                              ? [...(field.value || []), role]
                              : (field.value || []).filter((v) => v !== role);
                            field.onChange(newValue);
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">{role}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Bio <span className="text-gray-400">(Optional)</span>
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
                    <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
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
