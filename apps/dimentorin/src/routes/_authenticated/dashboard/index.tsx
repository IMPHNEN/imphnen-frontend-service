import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard/')({
  component: DashboardIndexPage,
})

function DashboardIndexPage() {
  return <Navigate to="/dashboard/user" />
}
