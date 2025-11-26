import { FC, ReactElement } from 'react';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { useParams, useNavigate, Link } from 'react-router';
import { useUserDetailsById, useTeamsByUserId } from '@imphnen-frontend-service/service';

const UserProfilePage: FC = (): ReactElement => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { data: userData, isLoading, error } = useUserDetailsById(userId || '');
  const { data: teamsData } = useTeamsByUserId(userId || '');

  const user = userData?.data;
  const userTeams = teamsData?.data || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading user profile...</div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">User not found</h2>
        {error && <p className="text-red-600 mb-4">{String(error)}</p>}
        <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3 md:space-x-4">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.fullname}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
                  <span className="text-gray-500 text-2xl md:text-3xl">👤</span>
                </div>
              )}
              <div>
                <h1 className="text-xl md:text-3xl font-bold text-gray-900">{user.fullname}</h1>
                <p className="text-sm md:text-base text-gray-600 mt-1">{user.email}</p>
                {user.location && (
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-gray-500">📍 {user.location}</span>
                  </div>
                )}
              </div>
            </div>
            <Link to="/dashboard" className="hidden md:block">
              <Button variant="secondary">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* About Section */}
            {user.bio && (
              <div className="bg-white rounded-lg shadow-md p-4 md:p-6 overflow-hidden">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">About</h2>
                <p className="text-gray-700 break-all overflow-wrap-anywhere">{user.bio}</p>
              </div>
            )}

            {/* Skills Section */}
            {user.skills && user.skills.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Skills</h2>
                <div className="flex flex-wrap gap-3">
                  {user.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-blue-700 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Teams Section */}
            {userTeams.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Teams ({userTeams.length})</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {userTeams.map((team: any) => (
                    <Link key={team.id} to={'/teams/' + team.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <img src={team.banner || '/images/banner-imphnen.png'} alt={team.name} className="w-full h-24 object-cover" />
                      <div className="p-4">
                        <div className="flex items-center space-x-3 mb-2">
                          {team.logo && <img src={team.logo} alt={team.name} className="w-10 h-10 rounded-full object-cover" />}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 line-clamp-2">{team.name}</h3>
                            <div className="text-sm text-gray-600 flex gap-2">
                              <p className="truncate flex-1 min-w-0">📍 {team.city}</p>
                              <p className="whitespace-nowrap shrink-0">👥 {team.members?.length || 0} members</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2">{team.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Teams</h2>
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">👥</div>
                  <p className="text-gray-600">Not in any team yet</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 md:space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-gray-900 font-medium">{user.email}</p>
                </div>
                {user.location && (
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="text-gray-900 font-medium">{user.location}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
