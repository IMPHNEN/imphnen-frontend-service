import { createRootRoute, Outlet, ScrollRestoration } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  ),
});
