import { FC, ReactElement, useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { Link, useNavigate } from 'react-router';
import {
  useInfiniteTeams,
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

const BrowseTeamsPage: FC = (): ReactElement => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [showJoinModal, setShowJoinModal] = useState(false);

  // Ref for intersection observer
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const {
    data: teamsData,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteTeams({
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

  // Flatten pages into single array
  const teams = teamsData?.pages.flatMap((page) => page.data) || [];
  const myTeams = myTeamsData?.data || [];

  // Intersection Observer callback
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  // Set up intersection observer
  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '100px',
      threshold: 0,
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [handleObserver]);

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

        {/* Teams List */}
        {isLoading ? (
          <div className="text-center py-12">
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
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {teams.map((team) => (
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
                        <div className="flex items-start gap-2">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 leading-tight flex-1 min-w-0">
                            {team.name}
                          </h3>
                          {team.has_submission && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 shrink-0 mt-0.5">
                              <Icon icon="mdi:check-circle" className="text-sm" />
                              Submitted
                            </span>
                          )}
                        </div>
                        <div className="text-sm font-sans text-gray-600 dark:text-gray-400 flex gap-2 mt-1">
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
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 font-sans">
                      {team.description}
                    </p>
                    <div className="space-y-3 mt-auto">
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

            {/* Intersection Observer Sentinel */}
            <div ref={loadMoreRef} className="py-8 flex justify-center">
              {isFetchingNextPage && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Icon icon="mdi:loading" className="animate-spin text-xl" />
                  <span>Loading more teams...</span>
                </div>
              )}
              {!hasNextPage && teams.length > 0 && (
                <p className="text-gray-500 dark:text-gray-500 text-sm">
                  No more teams to load
                </p>
              )}
            </div>
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
