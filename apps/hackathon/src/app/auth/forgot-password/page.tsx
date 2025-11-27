import { useState } from 'react';
import { supabase } from '@imphnen-frontend-service/service';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Icon } from '@iconify/react';
import ThemeToggle from '../../../components/theme-toggle';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    try {
      setIsLoading(true);

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        throw error;
      }

      setEmailSent(true);
      toast.success('Password reset email sent! Check your inbox.');
    } catch (err) {
      // console.error('Failed to send reset email:', err);
      toast.error((err as Error).message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-200 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">✓</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Check Your Email
            </h2>
            <p className="text-gray-600">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Click the link in the email to reset your password. The link will
              expire in 1 hour.
            </p>

            <Link to="/auth/login">
              <button className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                Back to Login
              </button>
            </Link>

            <button
              onClick={() => setEmailSent(false)}
              className="w-full py-3 text-gray-600 hover:text-gray-900 transition-colors"
            >
              Send another email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/auth/login')}
            className="cursor-pointer text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 text-base font-sans flex items-center"
          >
            <Icon icon="ic:baseline-chevron-left" width="24" height="24" />
            Back to Login
          </button>
          <ThemeToggle />
        </div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Forgot Password?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            No worries, we'll send you reset instructions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={isLoading}
              className="bg-white dark:bg-gray-800 w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
}
