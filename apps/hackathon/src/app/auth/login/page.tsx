import { useState } from 'react';
import {
  useGitHubAuth,
  useLogin,
} from '@imphnen-frontend-service/service';
import { GithubOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router';
import { toast } from 'sonner';
import { Icon } from '@iconify/react';
import { ThemeToggle } from '../../../components/theme-toggle';

export default function LoginPage() {
  const navigate = useNavigate();
  const { signInWithGitHub } = useGitHubAuth();
  const loginMutation = useLogin();
  const [isGithubLoading, setIsGithubLoading] = useState(false);
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
      const result = await loginMutation.mutateAsync({ email, password });

      toast.success('Login successful!');

      // Redirect based on onboarding status
      if (result.user.location) {
        navigate('/dashboard');
      } else {
        navigate('/onboarding/user');
      }
    } catch (err) {
      console.error('[Login] Email login failed:', err);
      setError((err as Error).message || 'Login failed');
    }
  };

  const handleGithubLogin = async () => {
    try {
      setIsGithubLoading(true);

      const result = await signInWithGitHub();

      // Check if we got a redirect URL
      if (result?.url) {
        globalThis.location.href = result.url;
      } else {
        setIsGithubLoading(false);
        setError('Failed to get GitHub OAuth URL');
      }
    } catch (err) {
      console.error('[Login] GitHub login failed:', err);
      setError((err as Error).message || 'GitHub login failed');
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
            Welcome Back
          </h2>
          <p className="text-gray-600 dark:text-gray-400 font-sans">
            Sign in to join or create your hackathon team
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4">
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
              disabled={loginMutation.isPending}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <Link
                to="/auth/forgot-password"
                className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
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
              disabled={loginMutation.isPending}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {loginMutation.isPending ? 'Signing in...' : 'Sign in with Email'}
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
            {isGithubLoading ? 'Connecting...' : 'Sign in with GitHub'}
          </span>
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Don't have an account?{' '}
            <a
              href="/auth/signup"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold"
            >
              Sign up
            </a>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 dark:text-gray-500 text-xs">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
