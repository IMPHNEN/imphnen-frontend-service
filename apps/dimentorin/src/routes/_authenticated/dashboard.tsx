import { createFileRoute, Outlet, Link, useLocation, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuthStore } from '@imphnen-frontend-service/service'
import { Icon } from '@iconify/react'

interface NavItem {
  path?: string;
  label: string;
  icon: string;
  isLink?: boolean;
}

const mentorNavItems: NavItem[] = [
  { path: '/dashboard/mentor', label: 'Dashboard', icon: 'mdi:view-dashboard-outline', isLink: true },
  { path: '/dashboard/mentor/mentoring-setup', label: 'Mentoring Setup', icon: 'mdi:cog-outline', isLink: true },
  { path: '/dashboard/mentor/list-mentee', label: 'List Mentee', icon: 'mdi:account-group-outline', isLink: true },
  { path: '/dashboard/mentor/feedback', label: 'Feedback', icon: 'mdi:message-reply-text-outline', isLink: true },
]

const userNavItems: NavItem[] = [
  { path: '/dashboard/user', label: 'Dashboard', icon: 'mdi:view-dashboard-outline', isLink: true },
  { path: '/dashboard/user/roadmap-discovery', label: 'Roadmap Discovery', icon: 'mdi:map-marker-path', isLink: true },
  { path: '/dashboard/user/learning-path', label: 'Learning Path', icon: 'mdi:book-open-page-variant-outline', isLink: true },
  { path: '/dashboard/user/mentoring', label: 'Mentoring', icon: 'mdi:video-outline', isLink: true },
]

const userSettingsNavItems: NavItem[] = [
  { path: '/dashboard/user/settings/account', label: 'Detail Akun', icon: 'mdi:account-outline', isLink: true },
  { path: '/dashboard/user/settings/privacy', label: 'Privasi & Keamanan', icon: 'mdi:shield-lock-outline', isLink: true },
  { path: '/dashboard/user/settings/preferences', label: 'Preferences', icon: 'mdi:tune-variant', isLink: true },
  { path: '/dashboard/user/settings/faq', label: 'FAQ', icon: 'mdi:help-circle-outline', isLink: true },
  { path: '/dashboard/user/settings/report', label: 'Laporkan Kendala', icon: 'mdi:alert-circle-outline', isLink: true },
  { path: '/dashboard/user/settings/feedback', label: 'Umpan Balik', icon: 'mdi:message-draw', isLink: true },
]

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardLayout,
})

/**
 * Dashboard Layout component.
 * Provides the sidebar navigation and main content area for authorized users.
 */
function DashboardLayout() {
  const { session, clearSession } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()

  const isMentorSection = location.pathname.startsWith('/dashboard/mentor')
  const isSettingsSection =
    location.pathname.startsWith('/dashboard/user/settings') ||
    location.pathname.startsWith('/dashboard/mentor/settings')
  const persona: 'user' | 'mentor' = isMentorSection ? 'mentor' : 'user'
  const navItems = isSettingsSection
    ? userSettingsNavItems
    : isMentorSection
      ? mentorNavItems
      : userNavItems

  const handleLogout = () => {
    clearSession()
    navigate({ to: '/auth/login' })
  }

  const isNavItemActive = (path?: string) => {
    if (!path) return false
    if (path === '/dashboard/mentor' || path === '/dashboard/user') {
      return (
        location.pathname === path ||
        location.pathname === `${path}/`
      )
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-bg-light-blue flex">
      <aside className="w-57 bg-white flex flex-col sticky top-0 h-screen z-100">
        <div className="pt-15 px-6 pb-8">
          <div className="h-12 flex items-center justify-center">
            <img
              src="/logos/logo.svg"
              alt="Dimentorin"
              style={{ width: '128px', height: '48px', objectFit: 'contain' }}
            />
          </div>
        </div>

        <nav className="flex-1 px-6 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = item.isLink ? isNavItemActive(item.path) : false
            const baseClasses = 'h-8 px-3 rounded-sm flex items-center gap-3 cursor-pointer text-xs font-medium leading-[1.3] text-text-muted transition-all duration-200 hover:bg-bg-hover'
            const activeClasses = isActive ? 'bg-primary-accent text-white' : ''

            if (item.isLink && item.path) {
              return (
                <Link
                  key={item.path}
                  to={item.path as any}
                  className={`${baseClasses} ${activeClasses}`}
                >
                  <Icon
                    icon={item.icon}
                    width="16"
                    className={isActive ? 'text-white' : 'text-text-muted'}
                    style={isActive ? { color: '#ffffff' } : {}}
                  />
                  {item.label}
                </Link>
              )
            }

            return (
              <button
                key={item.label}
                className={baseClasses}
                type="button"
                disabled
              >
                <Icon icon={item.icon} width="16" />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="flex flex-col pt-4 px-6 pb-8.5">
          <div className="h-px bg-border-light mb-4" />
          <button
            onClick={handleLogout}
            className="h-8 px-3 rounded-sm flex items-center gap-3 cursor-pointer text-xs font-medium leading-[1.3] text-text-muted transition-all duration-200 hover:bg-bg-hover"
          >
            <Icon icon="mdi:logout" width="16" />
            Log Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <HeaderDashboard persona={persona} user={session?.user} />

        <main className="w-263 mx-auto px-10 pt-6 pb-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

/**
 * Header component for the dashboard, containing the app brand and user profile.
 */
function HeaderDashboard({ persona, user }: { persona: 'user' | 'mentor', user: any }) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  const notifications = [
    { id: 1, title: 'Mentoring Sesi Baru', message: 'Kamu punya sesi mentoring besok jam 20:00 WIB', time: '2 jam yang lalu', unread: true },
    { id: 2, title: 'Artikel Disetujui', message: 'Artikel "How to install linux" kamu telah disetujui mentor', time: '5 jam yang lalu', unread: false },
    { id: 3, title: 'Roadmap Selesai', message: 'Selamat! Kamu telah menyelesaikan roadmap Front-end Basic', time: '1 hari yang lalu', unread: false },
  ]

  return (
    <header className="h-14.5 w-243 mx-auto mt-13 mb-15.5 bg-white rounded-sm shadow-sm flex items-center justify-between px-5 relative">
      <Link to="/dashboard" className="text-[19px] font-semibold text-primary-accent">
        Dimentorin.dev
      </Link>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={`w-7 h-7 rounded-sm flex items-center justify-center cursor-pointer transition-colors ${
              isNotificationsOpen ? 'bg-primary-50 text-primary-accent' : 'bg-white text-neutral-600'
            }`}
          >
            <Icon icon="lucide:bell" width="16" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-[320px] bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
              <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                <h3 className="font-bold text-gray-900">Notifikasi</h3>
                <button className="text-xs text-primary-600 font-medium hover:underline cursor-pointer">Tandai semua dibaca</button>
              </div>
              <div className="max-h-100 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className={`p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer ${n.unread ? 'bg-primary-50/30' : ''}`}>
                    <div className="flex justify-between items-start mb-1">
                      <p className={`text-sm font-bold ${n.unread ? 'text-gray-900' : 'text-gray-700'}`}>{n.title}</p>
                      <span className="text-[10px] text-gray-400 whitespace-nowrap">{n.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2">{n.message}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-gray-50 text-center">
                <button className="text-xs font-bold text-gray-600 hover:text-primary-600 transition-colors cursor-pointer">Lihat Semua Notifikasi</button>
              </div>
            </div>
          )}
        </div>
        <Link 
          to={persona === 'mentor' ? '/dashboard/mentor/mentoring-setup' : '/dashboard/user/settings/account'}
          className="w-7 h-7 rounded-sm bg-white text-neutral-600 flex items-center justify-center cursor-pointer"
        >
          <Icon icon="lucide:settings" width="16" />
        </Link>
        
        <Link
          to="/profile"
          className="h-10.5 flex items-center gap-3 pl-2.5 cursor-pointer border-none bg-transparent"
        >
          <div className="flex flex-col items-end text-right">
            <span className="text-xs font-medium text-neutral-600">{user?.fullname || user?.name || 'User'}</span>
            <span className="text-[10px] font-medium text-neutral-600">{persona === 'mentor' ? 'Mentor' : 'Mentee'}</span>
          </div>
          <div
            className="w-7 h-7 rounded-full bg-bg-placeholder bg-cover bg-center"
            style={user?.avatar ? { backgroundImage: `url(${user.avatar})` } : user?.image ? { backgroundImage: `url(${user.image})` } : {}}
          />
        </Link>
      </div>
    </header>
  )
}
