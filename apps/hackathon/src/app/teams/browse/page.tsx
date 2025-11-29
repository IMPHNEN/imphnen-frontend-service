import { FC, ReactElement, useState, useEffect } from 'react';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { Link, useNavigate } from 'react-router';
import {
  useTeams,
  useJoinTeam,
  useMyTeams,
  ETeamVisibility,
  joinTeamSchema,
  TJoinTeamForm,
} from '@imphnen-frontend-service/service';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CitySelect } from '../../../components/city-select';
import { Icon } from '@iconify/react';

const TEAMS_PER_PAGE = 12;

const BrowseTeamsPage: FC = (): ReactElement => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search term and reset page
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Reset to first page on search
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset page when city filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCity]);

  const {
    data: teamsData,
    isLoading,
    isFetching,
  } = useTeams({
    page: currentPage,
    limit: TEAMS_PER_PAGE,
    search: debouncedSearch,
    city: selectedCity || undefined,
    visibility: ETeamVisibility.PUBLIC,
  });

  const { data: myTeamsData } = useMyTeams();
  const { mutateAsync: joinTeam, isPending: isJoining } = useJoinTeam();

  const form = useForm<TJoinTeamForm>({
    resolver: zodResolver(joinTeamSchema),
    mode: 'all',
  });

  const teams = teamsData?.teams || [];
  const totalPages = teamsData?.totalPages || 1;
  const total = teamsData?.total || 0;
  const myTeams = myTeamsData?.data || [];

  // Helper function to check if user is a member of a team
  const isMyTeam = (teamId: string) => {
    return myTeams.some((team: any) => team.id === teamId);
  };

  const handleJoinRequest = (teamId: string) => {
    setSelectedTeamId(teamId);
    setShowJoinModal(true);
  };

  const onSubmit = form.handleSubmit(async (data) => {
    if (!selectedTeamId) return;

    try {
      await joinTeam({ teamId: selectedTeamId, data });
      setShowJoinModal(false);
      form.reset();
      setSelectedTeamId(null);
    } catch (error) {
      console.error('Failed to send join request:', error);
    }
  });

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Browse Teams
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Find and join teams looking for members
              </p>
            </div>
            <Link to="/dashboard" className="hidden md:block">
              <Button variant="secondary">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm mb-6 border dark:border-gray-800">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Teams
              </label>
              <input
                type="text"
                placeholder="Search by team name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-[42px] px-3 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filter by City
              </label>
              <CitySelect
                value={selectedCity}
                onChange={setSelectedCity}
                placeholder="All Cities (search to filter...)"
              />
            </div>
          </div>
        </div>

        {/* Teams Count */}
        {!isLoading && total > 0 && (
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {(currentPage - 1) * TEAMS_PER_PAGE + 1}-
            {Math.min(currentPage * TEAMS_PER_PAGE, total)} of {total} teams
          </div>
        )}

        {/* Teams List */}
        {isLoading ? (
          <div className="text-center py-12">
            <Icon icon="mdi:loading" className="animate-spin text-4xl text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 dark:text-gray-400">Loading teams...</p>
          </div>
        ) : teams.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No teams found
            </p>
            <p className="text-gray-500 dark:text-gray-500 mt-2">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          <>
            <div className={`grid gap-6 md:grid-cols-2 xl:grid-cols-3 ${isFetching ? 'opacity-50' : ''}`}>
              {teams.map((team: any) => (
                <div
                  key={team.id}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col border dark:border-gray-800"
                >
                  <img
                    src={team.banner || '/images/banner-imphnen.webp'}
                    alt={team.name}
                    className="w-full aspect-3/1 object-cover"
                  />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      {team.logo ? (
                        <img
                          src={team.logo}
                          alt={team.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-500 dark:text-gray-300 text-xl">
                            <Icon icon="mdi:account-group" />
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 leading-tight">
                          {team.name}
                        </h3>
                        <div className="text-sm font-sans text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
                          {team.has_submission && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 shrink-0">
                              <Icon icon="mdi:check-circle" className="text-sm" />
                              Submitted
                            </span>
                          )}
                          <p className="truncate flex-1 min-w-0 flex items-center gap-x-1">
                            <Icon icon="mdi:map-marker" />{' '}
                            <span>{team.city}</span>
                          </p>
                          <p className="whitespace-nowrap shrink-0 flex items-center gap-x-1">
                            <Icon icon="mdi:account-group" />{' '}
                            {team.member_count || 0} members
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 font-sans flex-1">
                      {team.description}
                    </p>
                    <div className="space-y-3 mt-auto">
                      {(team.member_count || 0) === 1 && !team.has_submission && (
                        <div className="p-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                          <p className="text-xs text-amber-700 dark:text-amber-400 flex items-center gap-1">
                            <Icon icon="mdi:alert" className="text-sm shrink-0" />
                            <span>This team needs at least 2 members to submit</span>
                          </p>
                        </div>
                      )}
                      {isMyTeam(team.id) ? (
                        <Button
                          className="w-full"
                          variant="secondary"
                          onClick={() => navigate(`/teams/${team.id}`)}
                        >
                          Your Team
                        </Button>
                      ) : (
                        <>
                          {myTeams.length === 0 &&
                            (team.member_count || 0) < 5 &&
                            !team.has_submission && (
                              <Button
                                className="w-full"
                                onClick={() => handleJoinRequest(team.id)}
                              >
                                Request to Join
                              </Button>
                            )}
                          <Button
                            className="w-full"
                            variant="secondary"
                            onClick={() => navigate(`/teams/${team.id}`)}
                          >
                            View Team
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1 || isFetching}
                    className="px-3"
                  >
                    <Icon icon="mdi:chevron-left" className="text-xl" />
                  </Button>

                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) =>
                      typeof page === 'string' ? (
                        <span
                          key={`ellipsis-${index}`}
                          className="px-2 text-gray-400 dark:text-gray-500"
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          disabled={isFetching}
                          className={`min-w-10 h-10 px-3 rounded-md text-sm font-medium transition-colors ${
                            currentPage === page
                              ? 'bg-blue-600 text-white'
                              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  <Button
                    variant="secondary"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages || isFetching}
                    className="px-3"
                  >
                    <Icon icon="mdi:chevron-right" className="text-xl" />
                  </Button>
                </div>

                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Join Request Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Request to Join Team
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 font-sans">
              Send a message to the team leader explaining why you want to join
            </p>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Message
                </label>
                <textarea
                  {...form.register('message')}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  placeholder="Tell the team leader why you want to join their team..."
                />
                {form.formState.errors.message && (
                  <p className="text-sm text-red-500 mt-1 font-sans">
                    {form.formState.errors.message.message}
                  </p>
                )}
              </div>
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => {
                    setShowJoinModal(false);
                    form.reset();
                    setSelectedTeamId(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={!form.formState.isValid || isJoining}
                >
                  {isJoining ? 'Sending...' : 'Send Request'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseTeamsPage;
