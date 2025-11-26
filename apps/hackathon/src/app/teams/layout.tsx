import { FC, ReactElement, useState } from 'react';
import { Outlet } from 'react-router';
import { Sidebar } from '../../components/sidebar';

const TeamsLayout: FC = (): ReactElement => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-950">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        {/* Mobile Header with Hamburger */}
        <div className="lg:hidden sticky top-0 bg-white dark:bg-neutral-900 border-b dark:border-neutral-700 px-4 py-3 z-10">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-600 dark:text-neutral-400"
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
            <h1 className="ml-3 text-lg font-bold text-gray-900">Hackathon</h1>
          </div>
        </div>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeamsLayout;
