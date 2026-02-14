import { useState, useEffect } from 'react';
import {
  useResetPassword,
  useAuthStore,
} from '@imphnen-frontend-service/service';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Icon } from '@iconify/react';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { clearSession } = useAuthStore();
  const resetPasswordMutation = useResetPassword();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // Get the access_token from URL hash (Supabase sends it as hash fragment)
    // or from query params (when redirected from callback page)
    const hashParams = new URLSearchParams(
      globalThis.location.hash.substring(1)
    );
    const queryParams = new URLSearchParams(globalThis.location.search);
    const token =
      hashParams.get('access_token') || queryParams.get('access_token');

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
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Set New Password
          </h2>
          <p className="text-gray-600">Enter your new password below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={resetPasswordMutation.isPending}
                className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed bg-white text-gray-900"
                required
                minLength={6}
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
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                disabled={resetPasswordMutation.isPending}
                className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed bg-white text-gray-900"
                required
                minLength={6}
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
          </div>

          <button
            type="submit"
            disabled={resetPasswordMutation.isPending}
            className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {resetPasswordMutation.isPending
              ? 'Updating...'
              : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
