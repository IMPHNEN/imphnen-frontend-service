import { createFileRoute, Outlet, Link, useLocation, useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@imphnen-frontend-service/service'
import { Icon } from '@iconify/react'
import { resolvePersona } from './dashboard/_data/persona-resolver'

interface NavItem {
  path?: string;
  label: string;
  icon: string;
  isLink?: boolean;
}

/**
 * Get navigation items based on persona.
 * Only items with isLink=true will use Link component; others render as non-navigating buttons.
 */
function getNavItems(persona: 'user' | 'mentor'): NavItem[] {
  if (persona === 'mentor') {
    return [
      { path: '/dashboard', label: 'Dashboard', icon: 'mdi:view-dashboard-outline', isLink: true },
      { path: '/dashboard/mentoring-setup', label: 'Mentoring Setup', icon: 'mdi:cog-outline', isLink: false },
      { path: '/dashboard/list-mentee', label: 'List Mentee', icon: 'mdi:account-group-outline', isLink: false },
      { path: '/dashboard/feedback', label: 'Feedback', icon: 'mdi:message-reply-text-outline', isLink: false },
    ];
  }

  return [
    { path: '/dashboard', label: 'Dashboard', icon: 'mdi:view-dashboard-outline', isLink: true },
    { path: '/dashboard/roadmap-discovery', label: 'Roadmap Discovery', icon: 'mdi:map-marker-path', isLink: true },
    { path: '/dashboard/learning-path', label: 'Learning Path', icon: 'mdi:book-open-page-variant-outline', isLink: true },
    { path: '/dashboard/mentoring', label: 'Mentoring', icon: 'mdi:video-outline', isLink: true },
  ];
}

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardLayout,
})

/**
 * Header component for the dashboard, containing the app brand and user profile.
 */
function HeaderDashboard({ persona, user, onLogout }: { persona: 'user' | 'mentor', user: any, onLogout: () => void }) {
  return (
    <header className="h-[58px] w-[972px] mx-auto mt-[52px] mb-[62px] bg-white rounded-sm shadow-sm flex items-center justify-between px-5">
      <Link to="/dashboard" className="text-[19px] font-semibold text-primary-accent">
        Dimentorin.dev
      </Link>

      <div className="flex items-center gap-4">
        <button className="w-7 h-7 rounded-sm bg-white text-neutral-600 flex items-center justify-center cursor-pointer">
          <Icon icon="lucide:bell" width="16" />
        </button>
        <button className="w-7 h-7 rounded-sm bg-white text-neutral-600 flex items-center justify-center cursor-pointer">
          <Icon icon="lucide:search" width="16" />
        </button>
        
        <button className="h-[42px] flex items-center gap-3 pl-2.5 cursor-pointer border-none bg-transparent">
          <div className="flex flex-col items-end text-right">
            <span className="text-xs font-medium text-neutral-600">{user?.fullname || 'User'}</span>
            <span className="text-[10px] font-medium text-neutral-600">{persona === 'mentor' ? 'Mentor' : 'Mentee'}</span>
          </div>
          <div 
            className="w-7 h-7 rounded-full bg-bg-placeholder bg-cover bg-center" 
            style={user?.avatar ? { backgroundImage: `url(${user.avatar})` } : {}}
          />
        </button>
      </div>
    </header>
  );
}

/**
 * Dashboard layout shell with persona-aware sidebar navigation.
 * Renders navigation and outlet for nested routes.
 */
function DashboardLayout() {
  const { session, clearSession } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()

  const searchParams = new URLSearchParams(location.search);
  const persona = resolvePersona(session?.user, searchParams);
  const navItems = getNavItems(persona);

  const handleLogout = () => {
    clearSession();
    navigate({ to: '/auth/login' });
  };

  const isNavItemActive = (path?: string) => {
    if (!path) return false;

    // Dashboard should only be active on the dashboard index route.
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/dashboard/';
    }

    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-bg-light-blue flex">
      {/* Sidebar Navigation */}
      <aside className="w-[228px] bg-white flex flex-col sticky top-0 h-screen z-100">
        {/* Logo */}
        <div className="pt-[60px] px-6 pb-8">
          <div className="h-12 flex items-center justify-center">
            <img 
              src="/logos/logo.svg" 
              alt="Dimentorin" 
              style={{ width: '128px', height: '48px', objectFit: 'contain' }} 
            />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-6 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = item.isLink ? isNavItemActive(item.path) : false;
            const baseClasses = 'h-8 px-3 rounded-sm flex items-center gap-3 cursor-pointer text-xs font-medium leading-[1.3] text-text-muted transition-all duration-200 hover:bg-bg-hover';
            const activeClasses = isActive ? 'bg-primary-accent text-white' : '';

            if (item.isLink && item.path) {
              return (
                <Link
                  key={item.path}
                  to={item.path}
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
              );
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
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="flex flex-col pt-4 px-6 pb-[34px]">
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <HeaderDashboard 
          persona={persona} 
          user={session?.user} 
          onLogout={handleLogout} 
        />
        
        <main className="w-[1052px] mx-auto px-10 pt-6 pb-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
