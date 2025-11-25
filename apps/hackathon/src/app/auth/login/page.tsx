import { useState } from 'react';
import {
  useGitHubAuth,
  useEmailAuth,
  supabase,
  useAuthStore,
} from '@imphnen-frontend-service/service';
import { GithubOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router';
import { toast } from 'sonner';
import { Icon } from '@iconify/react';

export default function LoginPage() {
  // console.log('[LoginPage] Rendering...');

  const navigate = useNavigate();
  const { setSession } = useAuthStore();
  const { signInWithGitHub } = useGitHubAuth();
  const { signInWithEmail } = useEmailAuth();
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setIsEmailLoading(true);
      // console.log('[Login] Attempting email login...');

      const result = await signInWithEmail(email, password);
      // console.log('[Login] Email login successful:', result);

      // Get user data from database
      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', result.user.id)
        .single();

      // Store session in Zustand
      setSession({
        token: {
          access_token: result.session.access_token,
          refresh_token: result.session.refresh_token || '',
        },
        user: {
          id: result.user.id,
          email: result.user.email || '',
          fullname:
            userData?.fullname || result.user.user_metadata?.full_name || '',
          phone_number: userData?.phone_number || '',
          avatar: userData?.avatar || '',
          birthdate: userData?.birthdate || '',
          gender: userData?.gender || '',
          is_active: userData?.is_active || true,
          location: userData?.location,
          bio: userData?.bio,
          skills: userData?.skills,
          role: {
            id: '',
            name: 'user',
            permissions: [],
            created_at: '',
            updated_at: '',
          },
        },
      });

      toast.success('Login successful!');

      // Redirect based on onboarding status
      if (userData?.location) {
        navigate('/dashboard');
      } else {
        navigate('/onboarding/user');
      }
    } catch (err) {
      console.error('[Login] Email login failed:', err);
      setError((err as Error).message || 'Login failed');
      setIsEmailLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    try {
      setIsGithubLoading(true);
      // console.log('[Login] Initiating GitHub OAuth...');

      const result = await signInWithGitHub();
      // console.log('[Login] OAuth result:', result);

      // Check if we got a redirect URL
      if (result?.url) {
        // console.log('[Login] Redirecting to GitHub OAuth:', result.url);
        // Manually redirect immediately
        globalThis.location.href = result.url;
      } else {
        // console.error('[Login] No OAuth URL returned');
        setIsGithubLoading(false);
      }
    } catch (error) {
      // console.error('[Login] GitHub login failed');
      setIsGithubLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-200">
        <button
          onClick={() => navigate('/')}
          className="cursor-pointer text-primary-500 hover:text-primary-600 text-base font-sans flex items-center mb-6"
        >
          <Icon icon="ic:baseline-chevron-left" width="24" height="24" />
          Back to Homepage
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 font-sans">
            Sign in to join or create your hackathon team
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={isEmailLoading}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Link
                to="/auth/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isEmailLoading}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isEmailLoading}
            className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {isEmailLoading ? 'Signing in...' : 'Sign in with Email'}
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
          className="w-full py-3 flex items-center justify-center gap-2 bg-gray-100 border border-gray-300 rounded-lg font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <GithubOutlined className="text-xl" />
          <span>
            {isGithubLoading ? 'Connecting...' : 'Sign in with GitHub'}
          </span>
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <a
              href="/auth/signup"
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              Sign up
            </a>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
