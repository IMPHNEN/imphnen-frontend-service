import { SessionUser } from '@imphnen-frontend-service/service';
import { hackathonApi, SessionToken } from '@imphnen-frontend-service/service';
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

const onboardingCache = new Map<string, { hasLocation: boolean; timestamp: number }>();
const CACHE_DURATION = 5000;

export const middleware = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  const tokenData = SessionToken.get();
  const user = SessionUser.get();
  const isAuthenticated = !!tokenData?.token?.access_token;

  if (mappingPublicPrefixRoutes.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  if (mappingPublicRoutes.includes(pathname)) {
    return null;
  }

  if (pathname === '/auth/callback') {
    return null;
  }

  if (pathname.startsWith('/auth')) {
    if (isAuthenticated) return redirect('/dashboard');
    return null;
  }

  if (!isAuthenticated) {
    return redirect('/auth/login');
  }

  if (!mappingOnboardingRoutes.includes(pathname)) {
    try {
      const userId = user?.id;
      if (!userId) {
        return redirect('/auth/login');
      }

      const now = Date.now();

      const cached = onboardingCache.get(userId);
      let hasLocation = false;

      if (cached && (now - cached.timestamp) < CACHE_DURATION) {
        hasLocation = cached.hasLocation;
      } else {
        if (user?.location) {
          hasLocation = true;
        } else {
          try {
            const response = await hackathonApi.get('/users/me');
            hasLocation = !!response.data?.data?.location;
          } catch {
            hasLocation = !!user?.location;
          }
        }

        onboardingCache.set(userId, { hasLocation, timestamp: now });
      }

      if (!hasLocation) {
        return redirect('/onboarding/user');
      }
    } catch (error) {
      console.error('[Middleware] Unexpected error checking onboarding:', error);
      return null;
    }
  }

  const userPermissions =
    user?.role?.permissions?.map?.((perm) => perm?.name) ?? [];

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
