import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthStore, useUserMe } from '@imphnen-frontend-service/service';

// Define onboarding routes
const ONBOARDING_ROUTES = new Set(['/onboarding/user']);

export default function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { session } = useAuthStore();
  const { data: userData, isLoading: isUserLoading } = useUserMe();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const pathname = location.pathname;

      // Allow hackathon pages without checks
      if (pathname.startsWith('/hackathons')) {
        setIsChecking(false);
        return;
      }

      // Allow auth callback without checks
      if (pathname === '/auth/callback') {
        setIsChecking(false);
        return;
      }

      // Public auth pages - allow unauthenticated access
      if (pathname.startsWith('/auth')) {
        // If already authenticated and not on password reset pages, redirect to dashboard
        if (session && pathname !== '/auth/reset-password') {
          navigate('/dashboard', { replace: true });
          setIsChecking(false);
          return;
        }
        // Allow unauthenticated access to auth pages
        setIsChecking(false);
        return;
      }

      // Home page - allow everyone to view the landing page
      if (pathname === '/') {
        setIsChecking(false);
        return;
      }

      // Require authentication for all other routes
      if (!session) {
        navigate('/auth/login', { replace: true });
        setIsChecking(false);
        return;
      }

      // Wait for user data to load before checking onboarding
      if (isUserLoading) {
        return;
      }

      // Check if user has completed onboarding (skip for onboarding routes)
      if (!ONBOARDING_ROUTES.has(pathname)) {
        const hasLocation = !!userData?.data?.location || !!session?.user?.location;

        if (!hasLocation) {
          navigate('/onboarding/user', { replace: true });
          setIsChecking(false);
          return;
        }
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [location.pathname, navigate, session, userData, isUserLoading]);

  // Show loading state while checking auth
  if (isChecking) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-neutral-950">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600 dark:text-neutral-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}
