import { Outlet, Link, useLocation } from '@tanstack/react-router';
import { useAuthStore } from '../../auth/store/auth.store';

export const AdminDashboard = () => {
  const logout = useAuthStore((state) => state.logout);
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="min-h-screen bg-slate-100 flex">

      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-xl font-bold text-slate-800">Admin Panel</h1>
          <p className="text-xs text-slate-500 mt-1">QR Campaign Manager</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link
            to="/admin/campaigns"
            className={`block px-4 py-2 rounded-md transition-colors ${
              isActive('/admin/campaigns')
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Campaigns
          </Link>
          <Link
            to="/admin/users"
            className={`block px-4 py-2 rounded-md transition-colors ${
              isActive('/admin/users')
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Users
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <Link
            to="/"
            className="block px-4 py-2 text-sm text-slate-600 hover:text-slate-900 mb-2"
          >
            &larr; Back to App
          </Link>
          <button
            onClick={logout}
            className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors text-left"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};
