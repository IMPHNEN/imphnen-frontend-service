import { FC, ReactElement } from 'react';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import {
  useUserDetailsById,
  useTeamsByUserId } from '@imphnen-frontend-service/service';
import { Icon } from '@iconify/react';

export const Route = createFileRoute('/_authenticated/users/$userId')({
  component: UserProfilePage })

const UserProfilePage: FC = (): ReactElement => {
  const { userId } = Route.useParams();
  const navigate = useNavigate();
  const { data: userData, isLoading, error } = useUserDetailsById(userId || '');
  const { data: teamsData } = useTeamsByUserId(userId || '');

  const user = userData?.data;
  const userTeams = teamsData?.data || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="text-gray-600 dark:text-gray-400">
          Loading user profile...
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          User not found
        </h2>
        {error && (
          <p className="text-red-600 dark:text-red-400 mb-4">{String(error)}</p>
        )}
        <Button onClick={() => navigate({ to: '/dashboard' })}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3 md:space-x-4">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.fullname}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                />
              ) : (
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-lg">
                  <span className="text-gray-500 dark:text-gray-400 text-2xl md:text-3xl">
                    <Icon icon="mdi:account-circle" className="w-10 h-10" />
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {user.fullname}
                </h1>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">
                  {user.email}
                </p>
                {user.location && (
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-gray-500 dark:text-gray-500">
                      <Icon
                        icon="mdi:map-marker"
                        className="inline-block w-4 h-4 mr-1"
                      />
                      {user.location}
                    </span>
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

          <div className="lg:col-span-2 space-y-4 md:space-y-6">

            {user.bio && (
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md dark:shadow-gray-950/50 p-4 md:p-6 overflow-hidden">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                  About
                </h2>
                <p className="text-gray-700 dark:text-gray-300 break-all overflow-wrap-anywhere font-sans">
                  {user.bio}
                </p>
              </div>
            )}

            {user.skills && user.skills.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md dark:shadow-gray-950/50 p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-3">
                  {user.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-4 py-2 border border-primary-600 dark:border-gray-500 text-primary-600 dark:text-white rounded-4xl text-xs font-medium dark:bg-gray-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {userTeams.length > 0 ? (
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md dark:shadow-gray-950/50 p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                  Team
                </h2>
                <div className="space-y-4">
                  {userTeams.map((team: any) => (
                    <Link
                      key={team.id}
                      to={'/teams/' + team.id}
                      className="block bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-950/50 overflow-hidden hover:shadow-lg transition-shadow border dark:border-gray-700"
                    >
                      <img
                        src={team.banner || '/images/banner-imphnen.webp'}
                        alt={team.name}
                        className="w-full aspect-3/1 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          {team.logo ? (
                            <img
                              src={team.logo}
                              alt={team.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                              <Icon icon="mdi:account-group" className="text-gray-500 dark:text-gray-400 text-xl" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1 text-lg">
                              {team.name}
                            </h3>
                            <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-3 font-sans mt-1">
                              {team.has_submission && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 shrink-0">
                                  <Icon icon="mdi:check-circle" className="text-sm" />
                                  Submitted
                                </span>
                              )}
                              {team.city && (
                                <span className="flex items-center gap-1 truncate">
                                  <Icon icon="mdi:map-marker" className="shrink-0" />
                                  <span className="truncate">{team.city}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        {team.description && (
                          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 font-sans">
                            {team.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md dark:shadow-gray-950/50 p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                  Team
                </h2>
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">
                    <Icon icon="mdi:account-group-outline" className="inline-block text-gray-400" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Not in any team yet
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4 md:space-y-6">

            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md dark:shadow-gray-950/50 p-4 md:p-6">
              <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Email
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {user.email}
                  </p>
                </div>
                {user.location && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Location
                    </p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {user.location}
                    </p>
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

