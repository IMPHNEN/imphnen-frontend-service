import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { SessionToken } from '@imphnen-frontend-service/service'
import { useState } from 'react'
import { BackofficeSidebar } from '@imphnen-frontend-service/ui/organisms'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => {
    const session = SessionToken.get()
    if (!session?.token?.access_token) {
      throw redirect({ to: '/auth/login' })
    }
  },
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="bg-primary-50 min-h-screen flex justify-center">
      <div className="bg-primary-50 min-h-screen w-full flex">
        <BackofficeSidebar
          isOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />
        <div className="flex-1 overflow-auto">
          <header
            className={
              'lg:hidden sticky top-0 bg-white border-b border-primary-200 px-4 py-3 flex items-center gap-3 ' +
              (mobileSidebarOpen ? 'z-0' : 'z-30')
            }
          >
            <button
              type="button"
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 text-gray-700 cursor-pointer"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-p3 font-semibold text-primary-700">
              IMPHNEN Backoffice
            </h1>
          </header>

          <Outlet />
        </div>
      </div>
    </div>
  )
}
