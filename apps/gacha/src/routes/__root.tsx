import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Navbar } from '@imphnen-frontend-service/ui/organisms'
import { ModalLoginProvider } from '@imphnen-frontend-service/utils'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <ModalLoginProvider>
      <main className="bg-primary-50 min-h-screen">
        <Navbar />
        <Outlet />
      </main>
    </ModalLoginProvider>
  )
}
