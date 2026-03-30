import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthStore, useUserMe } from '@imphnen-frontend-service/service';

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

      if (pathname.startsWith('/hackathons')) {
        setIsChecking(false);
        return;
      }

      if (pathname === '/auth/callback') {
        setIsChecking(false);
        return;
      }

      if (pathname.startsWith('/auth')) {
        if (session && pathname !== '/auth/reset-password') {
          navigate('/dashboard', { replace: true });
          setIsChecking(false);
          return;
        }
        setIsChecking(false);
        return;
      }

      if (pathname === '/') {
        setIsChecking(false);
        return;
      }

      if (pathname.startsWith('/certificate/')) {
        setIsChecking(false);
        return;
      }

      if (!session) {
        navigate('/auth/login', { replace: true });
        setIsChecking(false);
        return;
      }

      if (isUserLoading) {
        return;
      }

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
