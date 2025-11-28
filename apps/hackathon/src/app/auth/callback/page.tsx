import { FC, ReactElement, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useGitHubCallback } from '@imphnen-frontend-service/service';
import { toast } from 'sonner';

const CallbackPage: FC = (): ReactElement => {
  const navigate = useNavigate();
  const { mutateAsync: exchangeGitHubCode } = useGitHubCallback();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasRunRef = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      if (hasRunRef.current) {
        return;
      }
      hasRunRef.current = true;

      try {
        // Check URL hash for Supabase email confirmation callback
        const hashParams = new URLSearchParams(globalThis.location.hash.substring(1));
        const urlParams = new URLSearchParams(globalThis.location.search);

        const type = hashParams.get('type') || urlParams.get('type');
        const accessToken = hashParams.get('access_token') || urlParams.get('access_token');

        // Handle email confirmation callback from Supabase
        if (type === 'signup' || type === 'email_confirmation' || type === 'recovery') {
          // Don't auto sign in - redirect to login with success message
          setIsProcessing(false);

          if (type === 'recovery') {
            // Password reset - redirect to reset password page
            toast.success('Email verified! Please set your new password.');
            navigate('/auth/reset-password' + (accessToken ? `?access_token=${accessToken}` : ''));
          } else {
            // Email confirmation for signup
            toast.success('Email verified successfully! Please log in to continue.');
            navigate('/auth/login');
          }
          return;
        }

        // Get the code from URL query params (GitHub OAuth)
        const code = urlParams.get('code');

        if (!code) {
          throw new Error('No authorization code received');
        }

        // Exchange the code for tokens using backend API (GitHub OAuth)
        const result = await exchangeGitHubCode({ code });

        toast.success('Login successful!');
        setIsProcessing(false);

        // Check if user has completed onboarding (has location)
        if (result.user.location) {
          globalThis.location.replace('/dashboard');
        } else {
          globalThis.location.replace('/onboarding/user');
        }
      } catch (err) {
        console.error('[Callback] Error:', err);
        setError((err as Error).message);
        setIsProcessing(false);
        toast.error('An error occurred during login');

        setTimeout(() => {
          navigate('/auth/login');
        }, 3000);
      }
    };

    handleCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-950 px-4">
        <div className="bg-white dark:bg-gray-900 w-full max-w-2xl p-8 rounded-2xl shadow-lg border border-red-200 dark:border-red-800">
          <div className="text-center mb-6">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              GitHub Login Failed
            </h2>
            <p className="text-red-600 dark:text-red-400 mb-4 whitespace-pre-line">{error}</p>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm mt-6 text-center">
            Redirecting to login page in 3 seconds...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Completing login...
        </h2>
        <p className="text-gray-600 dark:text-gray-400">Please wait</p>
      </div>
    </div>
  );
};

export default CallbackPage;
