import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard/mentor/settings')({
  component: MentorSettingsLayout,
})

function MentorSettingsLayout() {
  return <Outlet />
}
