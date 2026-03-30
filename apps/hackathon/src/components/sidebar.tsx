import { FC, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import {
  useMyTeams,
  useAuthStore,
} from '@imphnen-frontend-service/service';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useTheme } from './theme-provider';
import { Icon } from '@iconify/react';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  show: boolean;
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { session, clearSession } = useAuthStore();
  const { data: teamsData } = useMyTeams();
  const { theme, setTheme, resolvedTheme } = useTheme();

  const user = session?.user;
  const myTeams = teamsData?.data || [];
  const hasTeam = myTeams.length > 0;

  useEffect(() => {
    if (onClose) {
      onClose();
    }
  }, [location.pathname]);

  const handleLogout = () => {
    clearSession();
    localStorage.clear();
    toast.success('Logged out successfully');
    navigate('/auth/login');
  };

  const navItems: NavItem[] = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <Icon icon="heroicons:home" className="w-5 h-5" />,
      show: true,
    },
    {
      name: 'My Teams',
      path: '/teams/' + myTeams[0]?.id,
      icon: <Icon icon="heroicons:users" className="w-5 h-5" />,
      show: myTeams.length > 0,
    },
    {
      name: 'Browse Teams',
      path: '/teams/browse',
      icon: <Icon icon="heroicons-outline:search" className="w-5 h-5" />,
      show: true,
    },
    {
      name: 'Create Team',
      path: '/teams/create',
      icon: <Icon icon="heroicons:plus" className="h-5 w-5" />,
      show: !hasTeam,
    },
    {
      name: 'Edit Profile',
      path: '/profile',
      icon: (
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
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      show: false,
    },
  ];

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const getThemeIcon = () => {
    if (theme === 'system') {
      return (
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
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      );
    }
    if (resolvedTheme === 'dark') {
      return (
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
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      );
    }
    return (
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
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    );
  };

  const getThemeLabel = () => {
    if (theme === 'system') return 'System';
    if (theme === 'dark') return 'Dark';
    return 'Light';
  };

  const sidebarContent = (
    <div className="w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-800 min-h-screen flex flex-col">
      <div className="p-6 flex items-center justify-between border-b dark:border-gray-800">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Hackathon
        </h1>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="p-4 border-b dark:border-gray-800">
        <div className="flex items-center space-x-3">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.fullname || 'User'}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <Icon
                icon="ic:baseline-person"
                width="24"
                height="24"
                className="text-gray-400 dark:text-gray-400"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user?.fullname || user?.email?.split('@')[0] || 'User'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems
            .filter((item) => item.show)
            .map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-50 dark:bg-blue-900/30 text-primary-600 dark:text-blue-400 font-medium'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
        </ul>
      </nav>

      <div className="p-4 border-t dark:border-gray-800 space-y-2">
        <button
          onClick={cycleTheme}
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        >
          {getThemeIcon()}
          <span>{getThemeLabel()}</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
        >
          <Icon
            icon="heroicons:arrow-right-end-on-rectangle"
            className="w-5 h-5"
          />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block sticky top-0 h-screen overflow-y-auto">
        {sidebarContent}
      </div>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={onClose}
          />
          <div className="fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
