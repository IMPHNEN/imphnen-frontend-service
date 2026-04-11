import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { SessionToken } from '@imphnen-frontend-service/service'

export const Route = createFileRoute('/_public')({
  beforeLoad: () => {
    const session = SessionToken.get()
    if (session?.token?.access_token) {
      throw redirect({ to: '/hackathon-dashboard' })
    }
  },
  component: PublicLayout,
})

function PublicLayout() {
  return (
    <main className="bg-primary-50 min-h-screen">
      <Outlet />
    </main>
  )
}
