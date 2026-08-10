import { useEffect, useState } from 'react';
import { BiUpvote } from 'react-icons/bi';
import { FiCheckCircle } from 'react-icons/fi';
import { MdOutlineOpenInNew } from 'react-icons/md';
import { getApiUrl } from '../utils/api';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'upcoming' | 'in_progress' | 'completed';
  votes: number;
  created_at: string;
}

export default function RoadmapVote() {
  const [items, setItems] = useState<RoadmapItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch(getApiUrl('/v1/landing/cms/roadmap'))
      .then((r) => r.json())
      .then((json) => {
        setItems(json.data || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const upcomingItems = items.filter((i) => i.status === 'upcoming');
  const inProgressItems = items.filter((i) => i.status === 'in_progress');
  const completedItems = items.filter((i) => i.status === 'completed');

  const handleVote = (id: string) => {
    const alreadyVoted = votedIds.has(id);

    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, votes: item.votes + (alreadyVoted ? -1 : 1) }
          : item
      )
    );

    if (alreadyVoted) {
      setVotedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } else {
      setVotedIds((prev) => new Set(prev).add(id));
      fetch(getApiUrl(`/v1/landing/cms/roadmap/vote/${id}`), {
        method: 'POST',
      }).catch(() => {});
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-3 border-gray-200 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {/* Vote Now column */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2">
          <div className="flex items-center justify-center w-10 h-10 bg-amber-100 text-amber-600 rounded-lg">
            🔥
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Vote Now</h2>
        </div>

        <div className="space-y-5">
          {upcomingItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 hover:border-primary-200 shadow-sm hover:shadow-md transition-all rounded-xl overflow-hidden"
            >
              <div className="p-4 pb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
              </div>
              <div className="px-4 pb-4">
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                  <button
                    onClick={() => handleVote(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      votedIds.has(item.id)
                        ? 'bg-primary-500 text-white hover:bg-primary-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <BiUpvote
                      className={`w-4 h-4 ${
                        votedIds.has(item.id) ? 'text-white' : 'text-gray-600'
                      }`}
                    />
                    <span>{votedIds.has(item.id) ? 'Voted' : 'Vote'}</span>
                  </button>
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                    <BiUpvote className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {item.votes}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {upcomingItems.length === 0 && (
            <p className="text-gray-500 text-sm px-2">No upcoming items yet.</p>
          )}
        </div>
      </div>

      {/* In Progress column */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2">
          <div className="flex items-center justify-center w-10 h-10 bg-primary-100 text-primary-600 rounded-lg">
            🧑‍🔧
          </div>
          <h2 className="text-xl font-semibold text-gray-900">In Progress</h2>
        </div>

        <div className="space-y-5">
          {inProgressItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 hover:border-primary-200 shadow-sm hover:shadow-md transition-all rounded-xl overflow-hidden"
            >
              <div className="p-4 pb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
              </div>
              <div className="px-4 pb-4">
                <p className="text-gray-600 text-sm">{item.description}</p>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-primary-500 h-1.5 rounded-full"
                      style={{ width: `${(index + 1) * 33}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">In development</p>
                </div>
              </div>
            </div>
          ))}
          {inProgressItems.length === 0 && (
            <p className="text-gray-500 text-sm px-2">Nothing in progress.</p>
          )}
        </div>
      </div>

      {/* Completed column */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 text-green-600 rounded-lg">
            🤓
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Completed</h2>
        </div>

        <div className="space-y-5">
          {completedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 hover:border-green-200 shadow-sm hover:shadow-md transition-all rounded-xl overflow-hidden"
            >
              <div className="p-4 pb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
              </div>
              <div className="px-4 pb-4">
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2 text-green-600">
                    <FiCheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Implemented</span>
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-sm font-medium hover:bg-primary/90 transition-colors">
                    Coba sekarang
                    <MdOutlineOpenInNew className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {completedItems.length === 0 && (
            <p className="text-gray-500 text-sm px-2">No completed items yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
