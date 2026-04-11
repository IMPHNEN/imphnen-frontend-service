import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useAuthStore } from '../app/features/auth/store/auth.store'
import { Sidebar } from '../components/Sidebar'
import { MenuOutlined } from '@ant-design/icons'
import { useState } from 'react'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState()
    if (!isAuthenticated) {
      throw redirect({ to: '/auth/login' })
    }
  },
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 -ml-2 rounded-md hover:bg-gray-100 text-gray-700"
            >
              <MenuOutlined className="text-lg" />
            </button>
            <h1 className="font-semibold text-gray-900">QR Campaign</h1>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
