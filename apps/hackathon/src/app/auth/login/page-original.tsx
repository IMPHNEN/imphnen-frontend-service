import { FC, ReactElement, useEffect, useState } from 'react';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { useNavigate } from 'react-router';
import { useGitHubAuth } from '@imphnen-frontend-service/service';
import { useSession } from '@imphnen-frontend-service/utils';
import { GithubOutlined } from '@ant-design/icons';

const LoginPage: FC = (): ReactElement => {
  console.log('[LoginPage] Rendering...');

  const navigate = useNavigate();
  const { signInWithGitHub } = useGitHubAuth();
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const { isAuthenticated } = useSession();

  console.log('[LoginPage] isAuthenticated:', isAuthenticated);

  useEffect(() => {
    console.log('[LoginPage] useEffect - isAuthenticated:', isAuthenticated);
    if (isAuthenticated) {
      console.log('[LoginPage] Redirecting to dashboard...');
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleGithubLogin = async () => {
    try {
      setIsGithubLoading(true);
      console.log('[Login] Initiating GitHub OAuth...');

      const result = await signInWithGitHub();
      console.log('[Login] OAuth result:', result);

      // Check if we got a redirect URL
      if (result?.url) {
        console.log('[Login] Redirecting to GitHub OAuth:', result.url);
        // Supabase should handle the redirect automatically
        // If we're still here after 2 seconds, manually redirect
        setTimeout(() => {
          if (result.url) {
            globalThis.location.href = result.url;
          }
        }, 2000);
      } else {
        console.error('[Login] No OAuth URL returned');
        setIsGithubLoading(false);
      }
    } catch (error) {
      console.error('[Login] GitHub login failed:', error);
      setIsGithubLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Hackathon
          </h2>
          <p className="text-gray-600">
            Sign in with your GitHub account to join or create your hackathon team
          </p>
        </div>

        <Button
          className="w-full gap-2 py-3"
          variant="secondary"
          onClick={handleGithubLogin}
          disabled={isGithubLoading}
          type="button"
        >
          <GithubOutlined className="text-xl" />
          <span className="font-semibold">
            {isGithubLoading ? 'Connecting...' : 'Sign in with GitHub'}
          </span>
        </Button>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
