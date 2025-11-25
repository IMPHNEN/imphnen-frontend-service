import { FC, ReactElement, useState } from 'react';
import { Button, Input, Select } from '@imphnen-frontend-service/ui/atoms';
import { Link, useNavigate } from 'react-router';
import { useTeams, useJoinTeam, useMyTeams, ETeamVisibility, joinTeamSchema, TJoinTeamForm } from '@imphnen-frontend-service/service';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import INDONESIAN_CITIES_DATA from '../../../constants/cities';

const INDONESIAN_CITIES = ['All Cities', ...INDONESIAN_CITIES_DATA];

const BrowseTeamsPage: FC = (): ReactElement => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const { data: teamsData, isLoading } = useTeams({
    search,
    city: selectedCity === 'All Cities' ? undefined : selectedCity,
    visibility: ETeamVisibility.PUBLIC,
  });

  const { data: myTeamsData } = useMyTeams();
  const { mutateAsync: joinTeam, isPending: isJoining } = useJoinTeam();

  const form = useForm<TJoinTeamForm>({
    resolver: zodResolver(joinTeamSchema),
    mode: 'all',
  });

  const teams = teamsData?.data || [];
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Browse Teams</h1>
              <p className="text-gray-600 mt-1">Find and join teams looking for members</p>
            </div>
            <Link to="/dashboard" className="hidden md:block">
              <Button variant="secondary">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Teams
              </label>
              <Input
                type="text"
                placeholder="Search by team name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by City
              </label>
              <Select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full"
              >
                {INDONESIAN_CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        {/* Teams List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading teams...</p>
          </div>
        ) : teams.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-600 text-lg">No teams found</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => (
              <div key={team.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                <img
                  src={team.banner || '/images/banner-imphnen.png'}
                  alt={team.name}
                  className="w-full h-32 object-cover"
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
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-xl">👥</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{team.name}</h3>
                      <p className="text-sm text-gray-600">
                        <span>📍 {team.city}</span>
                        <span> 👥 {team.members?.length || 0} members</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
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
                        {(team.members?.length || 0) < 5 && (
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
        )}
      </div>

      {/* Join Request Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Request to Join Team
            </h2>
            <p className="text-gray-600 mb-6">
              Send a message to the team leader explaining why you want to join
            </p>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  {...form.register('message')}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell the team leader why you want to join their team..."
                />
                {form.formState.errors.message && (
                  <p className="text-sm text-red-500 mt-1">
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
