import {
  PERMISSIONS,
  SessionToken,
  SessionUser,
} from '@imphnen-frontend-service/service';
import { LoaderFunctionArgs, redirect } from 'react-router';

const mappingPublicRoutes = [
  '/auth/login',
  '/auth/forgot',
  '/auth/new-password',
];

const mappingRoutePermissions = [
  {
    path: '/dashboard',
    permissions: [],
  },
  {
    path: '/users',
    permissions: [PERMISSIONS.USERS.READ_LIST],
  },
  {
    path: '/users/create',
    permissions: [PERMISSIONS.USERS.CREATE],
  },
  {
    path: '/users/update',
    permissions: [PERMISSIONS.USERS.UPDATE],
  },
  {
    path: '/users/detail',
    permissions: [PERMISSIONS.USERS.READ_DETAIL],
  },
  {
    path: '/roles',
    permissions: [PERMISSIONS.ROLES.READ_LIST],
  },
  {
    path: '/roles/create',
    permissions: [PERMISSIONS.ROLES.CREATE],
  },
  {
    path: '/roles/update',
    permissions: [PERMISSIONS.ROLES.UPDATE],
  },
  {
    path: '/roles/detail',
    permissions: [PERMISSIONS.ROLES.READ_DETAIL],
  },
  {
    path: '/permissions',
    permissions: [PERMISSIONS.PERMISSIONS.READ_LIST],
  },
  {
    path: '/permissions/create',
    permissions: [PERMISSIONS.PERMISSIONS.CREATE],
  },
  {
    path: '/permissions/update',
    permissions: [PERMISSIONS.PERMISSIONS.UPDATE],
  },
  {
    path: '/permissions/detail',
    permissions: [PERMISSIONS.PERMISSIONS.READ_DETAIL],
  },
];

export const middleware = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const session = SessionUser.get();
  const session_token = SessionToken.get();
  const token = session_token?.token?.access_token;
  const userPermissions =
    session?.role?.permissions?.map?.((perm) => perm?.name) ?? [];

  if (mappingPublicRoutes.includes(pathname)) {
    if (token) return redirect('/hackathon-dashboard');
    return null;
  }

  if (!session) return redirect('/auth/login');

  const matchedRoute = mappingRoutePermissions.find(
    (route) => route.path === pathname
  );

  if (matchedRoute) {
    const hasPermission =
      !matchedRoute.permissions ||
      matchedRoute.permissions.some((perm) => userPermissions.includes(perm));

    if (!hasPermission) {
      return '/hackathon-dashboard';
    }
  }

  return null;
};
