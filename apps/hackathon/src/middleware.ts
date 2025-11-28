import { SessionUser } from '@imphnen-frontend-service/utils';
import { hackathonApi } from '@imphnen-frontend-service/service';
import { LoaderFunctionArgs, redirect } from 'react-router';

const mappingPublicRoutes = [
  '/',
];

const mappingOnboardingRoutes = [
  '/onboarding/user',
];

const mappingRoutePermissions = [
  {
    path: '/dashboard',
    permissions: [],
  },
  {
    path: '/teams/browse',
    permissions: [],
  },
  {
    path: '/teams/create',
    permissions: [],
  },
];

const mappingPublicPrefixRoutes = [
  '/hackathons',
];

// Cache to prevent redundant checks (cache for 5 seconds)
const onboardingCache = new Map<string, { hasLocation: boolean; timestamp: number }>();
const CACHE_DURATION = 5000; // 5 seconds

export const middleware = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Get session from local storage (via SessionUser)
  const session = SessionUser.get();
  const isAuthenticated = !!session?.token?.access_token;

  // Allow to access the hackathon pages without authentication
  if (mappingPublicPrefixRoutes.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  // Public routes - allow everyone to view the landing page
  if (mappingPublicRoutes.includes(pathname)) {
    return null;
  }

  // Auth callback - allow without authentication check (for OAuth callback)
  if (pathname === '/auth/callback') {
    return null;
  }

  // Auth routes (all /auth/* paths) - redirect to dashboard if already authenticated
  if (pathname.startsWith('/auth')) {
    if (isAuthenticated) return redirect('/dashboard');
    return null;
  }

  // Require authentication for all other routes
  if (!isAuthenticated) {
    return redirect('/auth/login');
  }

  // Check if user has completed onboarding
  // Skip onboarding check for onboarding routes themselves
  if (!mappingOnboardingRoutes.includes(pathname)) {
    try {
      const userId = session?.user?.id;
      if (!userId) {
        return redirect('/auth/login');
      }

      const now = Date.now();

      // Check cache first
      const cached = onboardingCache.get(userId);
      let hasLocation = false;

      if (cached && (now - cached.timestamp) < CACHE_DURATION) {
        hasLocation = cached.hasLocation;
      } else {
        // First check session data (faster)
        if (session?.user?.location) {
          hasLocation = true;
        } else {
          // Fetch from backend API
          try {
            const response = await hackathonApi.get('/users/me');
            hasLocation = !!response.data?.data?.location;
          } catch {
            // If API fails, check session data as fallback
            hasLocation = !!session?.user?.location;
          }
        }

        // Update cache
        onboardingCache.set(userId, { hasLocation, timestamp: now });
      }

      if (!hasLocation) {
        return redirect('/onboarding/user');
      }
    } catch (error) {
      console.error('[Middleware] Unexpected error checking onboarding:', error);
      // On error, allow access (fail open)
      return null;
    }
  }

  // Check route permissions using user data from session
  const userPermissions =
    session?.user?.role?.permissions?.map?.((perm) => perm?.name) ?? [];

  const matchedRoute = mappingRoutePermissions.find(
    (route) => route.path === pathname
  );

  if (matchedRoute) {
    const hasPermission =
      !matchedRoute.permissions ||
      matchedRoute.permissions.some((perm) => userPermissions.includes(perm));

    if (!hasPermission) {
      return redirect('/dashboard');
    }
  }

  return null;
};
