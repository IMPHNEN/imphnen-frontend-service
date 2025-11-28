import { useState, useEffect } from 'react';
import { useResetPassword, useAuthStore } from '@imphnen-frontend-service/service';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { clearSession } = useAuthStore();
  const resetPasswordMutation = useResetPassword();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // Get the access_token from URL hash (Supabase sends it as hash fragment)
    const hashParams = new URLSearchParams(globalThis.location.hash.substring(1));
    const token = hashParams.get('access_token');

    if (token) {
      setAccessToken(token);
    } else {
      toast.error('Invalid or expired reset link');
      setTimeout(() => navigate('/auth/forgot-password'), 2000);
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (!accessToken) {
      toast.error('Invalid reset token');
      return;
    }

    try {
      await resetPasswordMutation.mutateAsync({
        access_token: accessToken,
        new_password: password,
      });

      toast.success('Password updated successfully!');

      // Clear session and redirect to login
      clearSession();
      navigate('/auth/login');
    } catch (err) {
      toast.error((err as Error).message || 'Failed to reset password');
    }
  };

  if (!accessToken) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Verifying reset link...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Set New Password
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              New Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={resetPasswordMutation.isPending}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
              minLength={6}
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              disabled={resetPasswordMutation.isPending}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={resetPasswordMutation.isPending}
            className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {resetPasswordMutation.isPending ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
