import { createFileRoute, useLocation } from '@tanstack/react-router'
import { useAuthStore } from '@imphnen-frontend-service/service'
import { resolvePersona } from '../dashboard/_data/persona-resolver'
import { UserDashboard } from '../dashboard_/_components/user/user-dashboard'
import { MentorDashboard } from '../dashboard_/_components/mentor/mentor-dashboard'

export const Route = createFileRoute('/_authenticated/dashboard/')({
  component: DashboardIndexPage,
})

/**
 * Dashboard Index Page
 * Routes to either user or mentor dashboard based on persona resolution.
 * Persona resolved via query parameter or user role.
 */
function DashboardIndexPage() {
  const { session } = useAuthStore()
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search);
  const persona = resolvePersona(session?.user, searchParams);

  return (
    <div>
      {persona === 'mentor' ? <MentorDashboard /> : <UserDashboard />}
    </div>
  );
}
