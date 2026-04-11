import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admin/')({
  component: AdminPage,
})

function AdminPage() {
  return <div className="p-4">Select a menu item from the sidebar.</div>
}
