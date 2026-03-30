import { useState } from 'react';
import { useGitHubAuth } from '@imphnen-frontend-service/service';
import { GithubOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router';
import { toast } from 'sonner';
import { Icon } from '@iconify/react';
import { useAuthStore } from '../../features/auth/store/auth.store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const signupSchema = z
  .object({
    fullname: z
      .string()
      .min(1, 'Full name is required')
      .min(2, 'Full name must be at least 2 characters'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const navigate = useNavigate();
  const registerUser = useAuthStore((state) => state.register);

  const { signInWithGitHub } = useGitHubAuth();
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: SignupFormData) => {
    setError(null);
    setIsSubmitting(true);

    try {
      await registerUser(data.fullname, data.email, data.password);
      toast.success('Registration successful! Redirecting...');
      navigate('/');
    } catch (err: any) {
      console.error('[Signup] Email signup failed:', err);
      const errorMessage =
        err.response?.data?.message || err.message || 'Signup failed';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGithubLogin = async () => {
    try {
      setIsGithubLoading(true);

      const result = await signInWithGitHub();

      if (result?.url) {
        globalThis.location.href = result.url;
      } else {
        setIsGithubLoading(false);
        setError('Failed to get GitHub OAuth URL');
      }
    } catch (err) {
      console.error('[Signup] GitHub login failed:', err);
      setError((err as Error).message || 'GitHub login failed');
      setIsGithubLoading(false);
    }
  };

  const inputBaseClass =
    'w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 placeholder:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed';
  const inputErrorClass = 'border-red-500';
  const inputNormalClass = 'border-gray-300';

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="cursor-pointer text-primary-500 hover:text-primary-600 text-base font-sans flex items-center"
          >
            <Icon icon="ic:baseline-chevron-left" width="24" height="24" />
            Back to Homepage
          </button>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h2>
          <p className="text-gray-600">Join IMPHNEN community</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              id="fullname"
              type="text"
              {...register('fullname')}
              placeholder="John Doe"
              disabled={isSubmitting}
              className={`${inputBaseClass} ${
                errors.fullname ? inputErrorClass : inputNormalClass
              }`}
            />
            {errors.fullname && (
              <p className="mt-1 text-sm text-red-500">
                {errors.fullname.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              placeholder="yourname@example.com"
              disabled={isSubmitting}
              className={`${inputBaseClass} ${
                errors.email ? inputErrorClass : inputNormalClass
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="••••••••"
                disabled={isSubmitting}
                className={`${inputBaseClass} pr-12 ${
                  errors.password ? inputErrorClass : inputNormalClass
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <Icon
                  icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'}
                  className="text-xl"
                />
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                placeholder="••••••••"
                disabled={isSubmitting}
                className={`${inputBaseClass} pr-12 ${
                  errors.confirmPassword ? inputErrorClass : inputNormalClass
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <Icon
                  icon={showConfirmPassword ? 'mdi:eye-off' : 'mdi:eye'}
                  className="text-xl"
                />
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <button
          onClick={handleGithubLogin}
          disabled={isGithubLoading}
          type="button"
          className="w-full py-3 flex items-center justify-center gap-2 bg-gray-100 border border-gray-300 rounded-lg font-semibold text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <GithubOutlined className="text-xl" />
          <span>
            {isGithubLoading ? 'Connecting...' : 'Sign up with GitHub'}
          </span>
        </button>

        <p className="mt-3 text-xs text-center text-gray-500">
          Make sure your GitHub email is{' '}
          <a
            href="https://github.com/settings/emails"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:underline"
          >
            set to public
          </a>{' '}
          for GitHub sign up to work.
        </p>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{' '}
            <Link
              to="/auth/login"
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
