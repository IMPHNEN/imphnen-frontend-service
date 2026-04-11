import { FC, useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useUserMe, useMyTeams } from '@imphnen-frontend-service/service';
import { useSession } from '@imphnen-frontend-service/service';

export const Navigation: FC = () => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: userData } = useUserMe();
  const { data: teamsData } = useMyTeams();
  const { signOut } = useSession();

  const user = userData?.data;
  const myTeams = teamsData?.data || [];
  const hasTeam = myTeams.length > 0;

  const handleLogout = async () => {
    await signOut();
    navigate('/auth/login');
  };

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <Link to="/dashboard" className="flex items-center space-x-2">
            <span className="text-2xl">🏆</span>
            <span className="text-xl font-bold text-gray-900">Hackathon</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/teams/browse"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Browse Teams
            </Link>
            {hasTeam && (
              <Link
                to={`/teams/${myTeams[0].id}`}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                My Team
              </Link>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 focus:outline-none"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.fullname}
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">👤</span>
                </div>
              )}
              <span className="hidden md:block text-gray-700 font-medium">
                {user?.fullname}
              </span>
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{user?.fullname}</p>
                  <p className="text-xs text-gray-600 truncate">{user?.email}</p>
                </div>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowUserMenu(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/teams/browse"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowUserMenu(false)}
                >
                  Browse Teams
                </Link>
                {hasTeam && (
                  <Link
                    to={`/teams/${myTeams[0].id}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    My Team
                  </Link>
                )}
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </nav>
  );
};
