import { SessionUser } from '@imphnen-frontend-service/utils';
import { supabase } from '@imphnen-frontend-service/service';
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

  console.log('[Middleware] Checking route:', pathname);

  // Get session from Supabase (authoritative source)
  const { data: { session: supabaseSession }, error: sessionError } = await supabase.auth.getSession();

  // Handle session errors
  if (sessionError) {
    console.error('[Middleware] Session error:', sessionError);
    // Don't redirect on session errors, let the app handle it
  }

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
    if (supabaseSession) return redirect('/dashboard');
    return null;
  }

  // Require authentication for all other routes - ONLY check Supabase session
  if (!supabaseSession) {
    return redirect('/auth/login');
  }

  // Check if user has completed onboarding by querying database (not localStorage!)
  // Skip onboarding check for onboarding routes themselves
  if (!mappingOnboardingRoutes.includes(pathname)) {
    try {
      const userId = supabaseSession.user.id;
      const now = Date.now();

      // Check cache first
      const cached = onboardingCache.get(userId);
      let hasLocation = false;

      if (cached && (now - cached.timestamp) < CACHE_DURATION) {
        console.log('[Middleware] Using cached onboarding status');
        hasLocation = cached.hasLocation;
      } else {
        console.log('[Middleware] Fetching fresh onboarding status');
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('location')
          .eq('id', userId)
          .single();

        if (userError) {
          console.error('[Middleware] Failed to fetch user data:', userError);
          // If we can't fetch user data, allow access (don't break the app)
          return null;
        }

        hasLocation = !!userData?.location;

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

  // Check route permissions using fresh user data from Zustand (for UI metadata)
  const session = SessionUser.get();
  const userPermissions =
    session?.role?.permissions?.map?.((perm) => perm?.name) ?? [];

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
