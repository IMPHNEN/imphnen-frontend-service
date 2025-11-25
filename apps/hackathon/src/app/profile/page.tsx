import { FC, ReactElement, useState, useEffect } from 'react';
import { ControlledInputField } from '@imphnen-frontend-service/ui/organisms';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { useNavigate, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import {
  userEditProfileSchema,
  TUserEditProfileForm,
  useUpdateUserMe,
  useUploadAvatar,
  useAuthStore,
} from '@imphnen-frontend-service/service';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

const ProfilePage: FC = (): ReactElement => {
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUserMe();
  const { mutateAsync: uploadAvatar, isPending: isUploading } = useUploadAvatar();
  const { session } = useAuthStore();

  const form = useForm<TUserEditProfileForm>({
    resolver: zodResolver(userEditProfileSchema),
    mode: 'all',
    defaultValues: {
      fullname: session?.user?.fullname || '',
      avatar: session?.user?.avatar || null,
    },
  });

  // Set initial avatar preview from current user avatar
  useEffect(() => {
    if (session?.user?.avatar && !avatarPreview) {
      setAvatarPreview(session.user.avatar);
    }
    if (session?.user?.fullname) {
      form.setValue('fullname', session.user.fullname);
    }
  }, [session?.user?.avatar, session?.user?.fullname, avatarPreview, form]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('The file is too large. Maximum 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('The file must be an image');
        return;
      }

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

      // Update user profile
      await updateUser({
        fullname: data.fullname,
        avatar: avatarUrl,
      });

      toast.success('Profile updated successfully!');

      // Wait a bit for the onSuccess handler to update localStorage
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Navigate back to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Profile update failed:', error);
      toast.error(
        `Failed to update profile: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  });

  const isLoading = isUpdating || isUploading;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4 py-8">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
            <Link
              to="/dashboard"
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Link>
          </div>
          <p className="text-gray-600">Update your photo and name</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 group-hover:border-blue-400 transition-colors"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center group-hover:bg-gray-300 transition-colors">
                  <span className="text-gray-400 text-4xl">👤</span>
                </div>
              )}
              {/* Camera overlay */}
              <label
                htmlFor="avatar"
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors shadow-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                  disabled={isLoading}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Click the camera icon to change your photo
              <br />
              Format: JPG, PNG. Max 5MB
            </p>
          </div>

          {/* Full Name */}
          <ControlledInputField
            control={form.control}
            label="Full Name"
            placeholder="Enter your full name"
            name="fullname"
          />

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={() => navigate('/dashboard')}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading || !form.formState.isValid}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
