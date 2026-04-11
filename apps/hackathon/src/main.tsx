import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import {
  ModalLoginProvider,
  QueryProvider,
} from '@imphnen-frontend-service/utils'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/theme-provider'
import { routeTree } from './routeTree.gen'
import './index.css'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')

if (!rootElement) throw new Error('Failed to find the root element')

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system">
      <QueryProvider>
        <ModalLoginProvider>
          <Toaster position="top-right" richColors />
          <RouterProvider router={router} />
        </ModalLoginProvider>
      </QueryProvider>
    </ThemeProvider>
  </StrictMode>
)
