import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router';
import {
  add404PageToRoutesChildren,
  addErrorElementToRoutes,
  convertPagesToRoute,
  ModalLoginProvider,
  QueryProvider,
  HelmetProvider,
} from '@imphnen-frontend-service/utils';
import { Toaster } from 'sonner';
import './index.css';

const files = import.meta.glob('./app/**/*(page|layout).tsx');
const errorFiles = import.meta.glob('./app/**/*error.tsx');
const notFoundFiles = import.meta.glob('./app/**/*404.tsx');
const loadingFiles = import.meta.glob('./app/**/*loading.tsx');

const routes = convertPagesToRoute(files, loadingFiles) as RouteObject;
addErrorElementToRoutes(errorFiles, routes);
add404PageToRoutesChildren(notFoundFiles, routes);

const router = createBrowserRouter([
  {
    ...routes,
    // MIDDLEWARE TEMPORARILY DISABLED - causing infinite loops with React Router v7
    // TODO: Implement auth checks at component level or use different pattern
    // loader: middleware,
    // shouldRevalidate: () => false,
  },
]);

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <HelmetProvider>
      <QueryProvider>
        <ModalLoginProvider>
          <Toaster position="top-right" />
          <RouterProvider router={router} />
        </ModalLoginProvider>
      </QueryProvider>
    </HelmetProvider>
  </StrictMode>
);
