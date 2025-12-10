import { FC, ReactElement } from 'react';
import { useNavigate } from 'react-router';
import { useWinners } from '@imphnen-frontend-service/service';

const WinnerPage: FC = (): ReactElement => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useWinners();

  const winners = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600 dark:text-gray-400">
            Loading winners...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Error Loading Winners
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Unable to load winners at this time. Please try again later.
        </p>
      </div>
    );
  }

  // Sort winners by rank
  const sortedWinners = [...winners].sort((a, b) => a.rank - b.rank);

  // Medal emojis for top 3
  const getMedalEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '🏆';
    }
  };

  // Get rank color
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-yellow-600';
      case 2:
        return 'from-gray-300 to-gray-500';
      case 3:
        return 'from-amber-600 to-amber-800';
      default:
        return 'from-blue-500 to-blue-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Hackathon Winners
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Congratulations to all the winning teams!
            </p>
          </div>
        </div>
      </div>

      {/* Winners List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {winners.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No Winners Announced Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Winners will be announced here once the hackathon concludes.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Top 3 Winners - Mobile View */}
            <div className="md:hidden space-y-6">
              {[1, 2, 3].map((position) => {
                const winner = sortedWinners[position - 1];

                if(!winner) return null;

                return (
                  <div
                    key={winner.id}
                    className={`bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg ${
                      getRankColor(winner.rank).includes('yellow')
                        ? 'border-4 border-yellow-400 dark:border-yellow-600'
                        : getRankColor(winner.rank).includes('gray')
                        ? 'border-4 border-gray-400 dark:border-gray-600'
                        : 'border-4 border-amber-600 dark:border-amber-500'
                    }}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`aspect-square p-1 rounded-full bg-linear-to-br ${getRankColor(
                          winner.rank
                        )} flex items-center justify-center text-white font-bold text-2xl`}
                      >
                        <div className="text-4xl">
                          {getMedalEmoji(winner.rank)}
                        </div>
                      </div>

                      {winner.team.logo && (
                        <img
                          src={winner.team.logo}
                          alt={`${winner.team.name} logo`}
                          className="w-20 h-20 rounded-full object-cover border-3 border-white dark:border-gray-700 shadow-lg"
                        />
                      )}

                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                          {winner.team.name}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {winner.team.city}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Top 3 Winners - Tablet/Desktop Podium View */}
            <div className="hidden md:flex gap-8 items-end justify-center w-full">
              {[2, 1, 3].map((position) => {
                const winner = sortedWinners[position - 1];
                if(!winner) return null;
                return (
                  <div
                    key={winner.id}
                    className="w-full max-w-xs flex flex-col items-center space-y-4"
                  >
                    <div className="text-5xl">{getMedalEmoji(winner.rank)}</div>

                    {/* Team Logo */}
                    {winner.team.logo && (
                      <img
                        src={winner.team.logo}
                        alt={`${winner.team.name} logo`}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                      />
                    )}

                    <div className="text-center px-2">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {winner.team.name}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {winner.team.city}
                      </p>
                    </div>

                    {/* Podium */}
                    <div
                      className={`${
                        winner.rank === 1
                          ? 'h-42 bg-yellow-500'
                          : winner.rank === 2
                          ? 'h-32 bg-gray-400'
                          : 'h-16 bg-amber-600'
                      } w-full flex items-end justify-center rounded-t-lg shadow-lg`}
                    >
                      <div className="text-white font-bold text-3xl pb-4">
                        #{winner.rank}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ranks 4-23: Prize Winners */}
            {sortedWinners.filter((w) => w.rank >= 4 && w.rank <= 23).length >
              0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  Favorite
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sortedWinners
                    .filter((w) => w.rank >= 4 && w.rank <= 23)
                    .map((winner) => (
                      <div
                        key={winner.id}
                        className="bg-white dark:bg-gray-800 border-2 border-gray-400 dark:border-gray-600 rounded-lg p-4 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-center gap-4">
                          <div className="shrink-0">
                            <div className="w-12 h-12 rounded-full bg-linear-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-bold text-lg">
                              #{winner.rank}
                            </div>
                          </div>

                          {winner.team.logo && (
                            <img
                              src={winner.team.logo}
                              alt={`${winner.team.name} logo`}
                              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                            />
                          )}

                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 dark:text-white truncate">
                              {winner.team.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {winner.team.city}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded-full">
                                🎁 Prize Winner
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Rank 24+: Remaining Participants */}
            {sortedWinners.filter((w) => w.rank >= 24).length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  All Participants
                </h2>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {sortedWinners
                      .filter((w) => w.rank >= 24)
                      .map((participant) => (
                        <div
                          key={participant.id}
                          className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="shrink-0 w-10 text-center">
                              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                #{participant.rank}
                              </span>
                            </div>

                            {participant.team.logo && (
                              <img
                                src={participant.team.logo}
                                alt={`${participant.team.name} logo`}
                                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                              />
                            )}

                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {participant.team.name}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {participant.team.city}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Info */}
      {winners.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
              Congratulations! 🎉
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Thank you to all participants for making this hackathon a success.
              Every project and idea contributed to an incredible showcase of
              innovation and creativity.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WinnerPage;
