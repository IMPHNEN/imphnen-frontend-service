import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard/mentor/settings/')({
  component: MentorSettingsIndexPage,
})

function MentorSettingsIndexPage() {
  return <Navigate to="/dashboard/mentor/settings/account" />
}
