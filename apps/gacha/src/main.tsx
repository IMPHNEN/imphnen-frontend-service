import { createRoot } from 'react-dom/client';
import { middleware } from './middleware';
import { StrictMode } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router';
import {
  add404PageToRoutesChildren,
  addErrorElementToRoutes,
  convertPagesToRoute,
  QueryProvider,
} from '@imphnen-frontend-service/utils';
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
    loader: middleware,
    shouldRevalidate: () => true,
  },
]);

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  </StrictMode>
);
