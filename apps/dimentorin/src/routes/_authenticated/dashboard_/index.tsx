import { createFileRoute, Link } from '@tanstack/react-router'
import {
  useAuthStore,
  useSessionQuery,
  useMySessions,
  useMentorMe,
} from '@imphnen-frontend-service/service'
import { Icon } from '@iconify/react'

export const Route = createFileRoute('/_authenticated/dashboard_/')({
  component: DashboardIndexPage,
})

function DashboardIndexPage() {
  const { session } = useAuthStore()
  const { data: meData } = useSessionQuery(['mentor', 'sessions'])
  const { data: sessionsData } = useMySessions()
  const { data: mentorData } = useMentorMe()

  const user = session?.user
  const mentor = meData?.user?.mentor
  const sessions = sessionsData?.data || []

  const upcomingSessions = sessions.filter(
    (s: { status: string }) => s.status === 'confirmed' || s.status === 'pending'
  )
  const completedSessions = sessions.filter(
    (s: { status: string }) => s.status === 'completed'
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome, {user?.fullname || user?.email?.split('@')[0] || 'User'}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 font-sans">
          {mentor ? 'Manage your mentoring sessions and mentees' : 'Find mentors and book sessions'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Icon icon="mdi:calendar-clock" className="text-blue-600 dark:text-blue-400 text-xl" />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Upcoming</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{upcomingSessions.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Icon icon="mdi:check-circle" className="text-green-600 dark:text-green-400 text-xl" />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{completedSessions.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Icon icon="mdi:account-star" className="text-purple-600 dark:text-purple-400 text-xl" />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Role</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {mentor ? 'Mentor' : 'Mentee'}
          </p>
          {mentor?.status && (
            <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${
              mentor.status === 'verified'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
            }`}>
              {mentor.status}
            </span>
          )}
        </div>
      </div>

      {/* Mentor CTA */}
      {!mentor && (
        <div className="mb-8 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="font-bold text-primary-900 dark:text-primary-100 text-lg">Become a Mentor</h3>
              <p className="text-primary-700 dark:text-primary-300 text-sm mt-1">
                Share your knowledge and help others grow in their career.
              </p>
            </div>
            <Link
              to="/auth/register-mentor"
              className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              Register as Mentor
            </Link>
          </div>
        </div>
      )}

      {/* Upcoming Sessions */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {upcomingSessions.length > 0 ? 'Upcoming Sessions' : 'No Upcoming Sessions'}
          </h2>
          <Link
            to="/mentoring"
            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 flex items-center gap-1"
          >
            Browse Mentors
            <Icon icon="mdi:chevron-right" width="18" />
          </Link>
        </div>
        {upcomingSessions.length > 0 ? (
          <div className="space-y-3">
            {upcomingSessions.slice(0, 5).map((s: any) => (
              <div key={s.id} className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <Icon icon="mdi:video" className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{s.topic}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(s.scheduled_at).toLocaleDateString('en-US', {
                        weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                      {' '}&middot;{' '}{s.duration_minutes} min
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  s.status === 'confirmed'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                }`}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-xl p-8 text-center shadow-sm border border-gray-200 dark:border-gray-700">
            <Icon icon="mdi:calendar-blank" className="text-5xl text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              No upcoming sessions. Browse mentors to book your first session!
            </p>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-600 to-primary-500 h-20"></div>
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-10 mb-4">
            {user?.avatar ? (
              <img src={user.avatar} alt="" className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-900 shadow-lg object-cover" />
            ) : (
              <div className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-900 shadow-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-3xl text-gray-400">U</span>
              </div>
            )}
            <div className="pb-1">
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">{user?.fullname}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
