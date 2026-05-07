import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard/user/settings')({
  component: UserSettingsLayout,
})

function UserSettingsLayout() {
  return <Outlet />
}
