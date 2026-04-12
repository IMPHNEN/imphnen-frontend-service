import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { SessionToken } from '@imphnen-frontend-service/service'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => {
    // Development-only bypass explicitly requested via environment flags
    const bypassAuth = import.meta.env.MODE === 'development' && import.meta.env.VITE_BYPASS_AUTH_MIDDLEWARE === 'true'
    
    if (bypassAuth) {
      return
    }

    const session = SessionToken.get()
    if (!session?.token?.access_token) {
      throw redirect({ to: '/auth/login' })
    }
  },
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  return <Outlet />
}
