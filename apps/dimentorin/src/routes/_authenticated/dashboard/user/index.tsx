import { createFileRoute } from '@tanstack/react-router'
import { UserDashboard } from './_components/user-dashboard'

export const Route = createFileRoute('/_authenticated/dashboard/user/')({
  component: UserDashboard,
})
