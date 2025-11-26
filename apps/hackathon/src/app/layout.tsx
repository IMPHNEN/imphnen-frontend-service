import { Outlet, ScrollRestoration, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@imphnen-frontend-service/service';

// Define onboarding routes
const ONBOARDING_ROUTES = new Set(['/onboarding/user']);

export default function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const pathname = location.pathname;

      console.log('[Layout] Checking auth for route:', pathname);

      // Allow hackathon pages without checks
      if (pathname.startsWith('/hackathons')) {
        console.log('[Layout] Public route, allowing access');
        setIsChecking(false);
        return;
      }

      // Allow auth callback without checks
      if (pathname === '/auth/callback') {
        console.log('[Layout] Auth callback, allowing access');
        setIsChecking(false);
        return;
      }

      // Check Supabase session
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('[Layout] Session error:', error);
      }

      // Public auth pages (login, signup, forgot-password, reset-password) - allow unauthenticated access
      const isPublicAuthPage = pathname === '/auth/login' || pathname === '/auth/signup' || pathname === '/auth/forgot-password' || pathname === '/auth/reset-password';

      if (isPublicAuthPage) {
        // If already authenticated and not on password reset pages, redirect to dashboard
        if (session && pathname !== '/auth/reset-password') {
          console.log('[Layout] Already authenticated, redirecting to dashboard');
          navigate('/dashboard', { replace: true });
          setIsChecking(false);
          return;
        }
        // Allow unauthenticated access
        console.log('[Layout] Public auth page, allowing access');
        setIsChecking(false);
        return;
      }

      // Home page - allow everyone to view the landing page
      if (pathname === '/') {
        console.log('[Layout] Landing page, allowing access');
        setIsChecking(false);
        return;
      }

      // Require authentication for all other routes
      if (!session) {
        console.log('[Layout] No session, redirecting to login');
        navigate('/auth/login', { replace: true });
        setIsChecking(false);
        return;
      }

      // Check if user has completed onboarding (skip for onboarding routes)
      if (!ONBOARDING_ROUTES.has(pathname)) {
        try {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('location')
            .eq('id', session.user.id)
            .single();

          if (userError) {
            console.error('[Layout] Failed to fetch user data:', userError);
            setIsChecking(false);
            return;
          }

          const hasLocation = !!userData?.location;

          if (!hasLocation) {
            console.log('[Layout] User needs onboarding, redirecting');
            navigate('/onboarding/user', { replace: true });
            setIsChecking(false);
            return;
          }
        } catch (error) {
          console.error('[Layout] Unexpected error checking onboarding:', error);
        }
      }

      console.log('[Layout] Auth check passed');
      setIsChecking(false);
    };

    checkAuth();
  }, [location.pathname, navigate]);

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
