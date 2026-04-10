import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { useAuthStore } from '@imphnen-frontend-service/service';
import { Icon } from '@iconify/react';
import { useEffect } from 'react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'mdi:view-dashboard' },
  { path: '/dashboard/settings', label: 'Settings', icon: 'mdi:cog' },
];

export default function DashboardLayout() {
  const { session, clearSession } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session?.token) navigate('/auth/login');
  }, [session, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link to="/" className="text-xl font-bold text-primary-600 dark:text-primary-400">
                Dimentorin
              </Link>
              <div className="hidden md:flex gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                      location.pathname === item.path
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon icon={item.icon} width="18" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                {session?.user?.fullname || session?.user?.email}
              </span>
              <button
                onClick={() => { clearSession(); navigate('/auth/login'); }}
                className="text-sm text-red-500 hover:text-red-600 cursor-pointer flex items-center gap-1"
              >
                <Icon icon="mdi:logout" width="18" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
