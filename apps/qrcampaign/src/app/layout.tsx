import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthStore } from './features/auth/store/auth.store';
import { Sidebar } from '../components/Sidebar';
import { MenuOutlined } from '@ant-design/icons';

// Helper to determine route types
const isPublicRoute = (pathname: string) => {
  return pathname.startsWith('/auth') || pathname === '/auth/callback';
};

export default function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    // If we're on a public route, no auth check needed
    if (isPublicRoute(location.pathname)) {
      return;
    }

    // AUTH CHECK
    if (!isAuthenticated) {
      // No session -> Redirect to login
      navigate('/auth/login', { replace: true });
      return;
    }
  }, [location.pathname, navigate, isAuthenticated]);

  // RENDER LOGIC

  // 1. Public Pages (Full Layout Control)
  if (isPublicRoute(location.pathname)) {
    return (
      <>
        <Outlet />
        <ScrollRestoration />
      </>
    );
  }

  // 2. Protected Pages
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
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

      <ScrollRestoration />
    </div>
  );
}
