import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useAuthStore } from '../app/features/auth/store/auth.store'

export const Route = createFileRoute('/_public')({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState()
    if (isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
  component: PublicLayout,
})

function PublicLayout() {
  return <Outlet />
}
