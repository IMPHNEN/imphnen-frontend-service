import { FC, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import {
  useMyTeams,
  useAuthStore,
  supabase,
} from '@imphnen-frontend-service/service';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
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

  const user = session?.user;
  const myTeams = teamsData?.data || [];
  const hasTeam = myTeams.length > 0;

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (onClose) {
      onClose();
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      clearSession();
      localStorage.clear();
      toast.success('Logged out successfully');
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
      clearSession();
      localStorage.clear();
      navigate('/auth/login');
    }
  };

  const navItems: NavItem[] = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <Icon icon="heroicons:home" className="w-5 h-5" />,
      show: true,
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

  const sidebarContent = (
    <div className="w-64 bg-white border-r min-h-screen flex flex-col">
      {/* Logo / Brand with Close Button */}
      <div className="p-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Hackathon</h1>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-500"
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

      {/* User Info */}
      <div className="p-4 border-y">
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
                className="text-gray-400"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.fullname || user?.email?.split('@')[0] || 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
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
                        ? 'bg-primary-50 text-primary-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
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

      {/* Logout Button */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
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
      {/* Desktop Sidebar - Always visible on lg+, sticky position */}
      <div className="hidden lg:block sticky top-0 h-screen overflow-y-auto">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar - Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={onClose}
          />
          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
