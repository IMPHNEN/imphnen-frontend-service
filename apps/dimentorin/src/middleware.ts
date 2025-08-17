import {
  PERMISSIONS,
  SessionToken,
  SessionUser,
} from '@imphnen-frontend-service/utils';
import { LoaderFunctionArgs, redirect } from 'react-router';

const mappingPublicRoutes = [
  '/',
  '/auth/login',
  '/auth/forgot',
  '/auth/forgot/otp',
  '/auth/register',
  '/auth/register/otp',
  '/auth/register/success',
  '/auth/new-password',
  '/auth/register-mentor',
  '/auth/register-mentor/pending',
  '/auth/register-mentor/success',
  '/auth/google-callback',
  '/auth/google-oauth-popup',
  '/resources',
];const mappingRoutePermissions = [
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

const mappingPublicPrefixRoutes = [
  '/mentoring',
  '/articles',
]

//TODO : Fix this later
// const redirectToFirstAccessibleRoute = (userPermissions: string[]) => {
//   const fallback = mappingRoutePermissions.find((route) =>
//     route.permissions.some((perm) => userPermissions.includes(perm))
//   );
//   return redirect(fallback?.path ?? '/auth/login');
// };

export const middleware = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const session = SessionUser.get();
  const session_token = SessionToken.get();
  const token = session_token?.token?.access_token;
  const userPermissions =
    session?.role?.permissions?.map?.((perm) => perm?.name) ?? [];

  // Allow to access the landing page without authentication
  // So, if the route prefix is in the mappingPublicPrefixRoutes, we return null
  // to indicate that we don't need to authenticate the user
  if (mappingPublicPrefixRoutes.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  if (mappingPublicRoutes.includes(pathname)) {
    if (token) return redirect('/dashboard');
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
      return '/dashboard';
    }
  }

  return null;
};
