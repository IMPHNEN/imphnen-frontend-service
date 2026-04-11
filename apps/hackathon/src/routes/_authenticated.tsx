import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { SessionToken, SessionUser, hackathonApi } from '@imphnen-frontend-service/service'
import { useState } from 'react'
import { Sidebar } from '../components/sidebar'

const onboardingCache = new Map<string, { hasLocation: boolean; timestamp: number }>()
const CACHE_DURATION = 5000

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    const session = SessionToken.get()
    if (!session?.token?.access_token) {
      throw redirect({ to: '/auth/login' })
    }

    const user = SessionUser.get()
    const pathname = location.pathname

    if (!pathname.startsWith('/onboarding')) {
      const userId = user?.id
      if (!userId) {
        throw redirect({ to: '/auth/login' })
      }

      const now = Date.now()
      const cached = onboardingCache.get(userId)
      let hasLocation = false

      if (cached && now - cached.timestamp < CACHE_DURATION) {
        hasLocation = cached.hasLocation
      } else {
        if (user?.location) {
          hasLocation = true
        } else {
          try {
            const response = await hackathonApi.get('/users/me')
            hasLocation = !!response.data?.data?.location
          } catch {
            hasLocation = !!user?.location
          }
        }

        onboardingCache.set(userId, { hasLocation, timestamp: now })
      }

      if (!hasLocation) {
        throw redirect({ to: '/onboarding/user' })
      }
    }
  },
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <div className="lg:hidden sticky top-0 bg-white dark:bg-gray-900 border-b dark:border-gray-700 px-4 py-3 flex items-center z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-600 dark:text-gray-400"
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
          <h1 className="ml-3 text-lg font-bold text-gray-900 dark:text-white">
            Hackathon
          </h1>
        </div>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
