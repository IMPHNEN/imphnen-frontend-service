import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useAuthStore } from '../../app/features/auth/store/auth.store'

export const Route = createFileRoute('/_authenticated/admin')({
  beforeLoad: () => {
    const { user, isAuthenticated } = useAuthStore.getState()
    if (!isAuthenticated) {
      throw redirect({ to: '/auth/login' })
    }
    const userRole = user?.role?.name
    if (userRole !== 'Admin' && userRole !== 'Super Admin') {
      throw redirect({ to: '/' })
    }
  },
  component: () => <Outlet />,
})
