import {
  PERMISSIONS,
  SessionToken,
  SessionUser,
} from '@imphnen-frontend-service/utils';
import { LoaderFunctionArgs, redirect } from 'react-router';

const mappingPublicRoutes = [
  '/',
];

const mappingRoutePermissions = [
  {
    path: '/dashboard',
    permissions: [],
  },
];

const mappingPublicPrefixRoutes = [
  '/hackathons',
];

export const middleware = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const session = SessionUser.get();
  const session_token = SessionToken.get();
  const token = session_token?.token?.access_token;
  const userPermissions =
    session?.role?.permissions?.map?.((perm) => perm?.name) ?? [];

  // Allow to access the hackathon pages without authentication
  if (mappingPublicPrefixRoutes.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  if (mappingPublicRoutes.includes(pathname)) {
    if (token) return redirect('/dashboard');
    return null;
  }

  if (!session) return redirect('/');

  const matchedRoute = mappingRoutePermissions.find(
    (route) => route.path === pathname
  );

  if (matchedRoute) {
    const hasPermission =
      !matchedRoute.permissions ||
      matchedRoute.permissions.some((perm) => userPermissions.includes(perm));

    if (!hasPermission) {
      return '/dashboard';
    }
  }

  return null;
};
