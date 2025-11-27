import { useState } from 'react';
import {
  useGitHubAuth,
  useEmailAuth,
  supabase,
  useAuthStore,
} from '@imphnen-frontend-service/service';
import { GithubOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Icon } from '@iconify/react';
import { ThemeToggle } from '../../../components/theme-toggle';

export default function SignupPage() {
  const navigate = useNavigate();
  const { setSession } = useAuthStore();
  const { signInWithGitHub } = useGitHubAuth();
  const { signUpWithEmail } = useEmailAuth();
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullname || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      setIsEmailLoading(true);
      // console.log('[Signup] Attempting email signup...');

      const result = await signUpWithEmail(email, password, fullname);
      // console.log('[Signup] Email signup successful:', result);

      if (!result.user) {
        throw new Error('Signup failed - no user returned');
      }

      // Create user record in database
      const { error: upsertError } = await supabase.from('users').upsert(
        {
          id: result.user.id,
          email: result.user.email || '',
          fullname: fullname,
          is_active: true,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'id',
        }
      );

      if (upsertError) {
        console.warn('[Signup] Failed to create user record');
      }

      // If session is available (email confirmation disabled), store it
      if (result.session) {
        setSession({
          token: {
            access_token: result.session.access_token,
            refresh_token: result.session.refresh_token || '',
          },
          user: {
            id: result.user.id,
            email: result.user.email || '',
            fullname: fullname,
            phone_number: '',
            avatar: '',
            birthdate: '',
            gender: '',
            is_active: true,
            role: {
              id: '',
              name: 'user',
              permissions: [],
              created_at: '',
              updated_at: '',
            },
          },
        });

        toast.success('Account created successfully!');
        navigate('/onboarding/user');
      } else {
        // Email confirmation is enabled
        toast.success(
          'Account created! Please check your email to verify your account.'
        );
        setTimeout(() => {
          navigate('/auth/login');
        }, 2000);
      }
    } catch (err) {
      // console.error('[Signup] Email signup failed:', err);
      setError((err as Error).message || 'Signup failed');
      setIsEmailLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    try {
      setIsGithubLoading(true);
      // console.log('[Signup] Initiating GitHub OAuth...');

      const result = await signInWithGitHub();
      // console.log('[Signup] OAuth result:', result);

      if (result?.url) {
        // console.log('[Signup] Redirecting to GitHub OAuth:', result.url);
        globalThis.location.href = result.url;
      } else {
        // console.error('[Signup] No OAuth URL returned');
        setIsGithubLoading(false);
      }
    } catch (error) {
      // console.error('[Signup] GitHub login failed:', error);
      setIsGithubLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="cursor-pointer text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 text-base font-sans flex items-center"
          >
            <Icon icon="ic:baseline-chevron-left" width="24" height="24" />
            Back to Homepage
          </button>
          <ThemeToggle />
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create Account
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Join the hackathon community
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleEmailSignup} className="space-y-4">
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Full Name
            </label>
            <input
              id="fullname"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="John Doe"
              disabled={isEmailLoading}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={isEmailLoading}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isEmailLoading}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isEmailLoading}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isEmailLoading}
            className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {isEmailLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          <span className="px-4 text-sm text-gray-500 dark:text-gray-400">
            OR
          </span>
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        <button
          onClick={handleGithubLogin}
          disabled={isGithubLoading}
          type="button"
          className="w-full py-3 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <GithubOutlined className="text-xl" />
          <span>
            {isGithubLoading ? 'Connecting...' : 'Sign up with GitHub'}
          </span>
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Already have an account?{' '}
            <a
              href="/auth/login"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold"
            >
              Sign in
            </a>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 dark:text-gray-500 text-xs">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
