'use client';

import { Button, Card, CardContent, CardHeader, CardTitle } from '@components';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BiUpvote } from 'react-icons/bi';
import { FiCheckCircle } from 'react-icons/fi';
import { MdOutlineOpenInNew } from 'react-icons/md';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'upcoming' | 'in_progress' | 'completed';
  votes: number;
  created_at: string;
}

export default function ProjectsVote() {
  const [items, setItems] = useState<RoadmapItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch('https://api.imphnen.dev/v1/landing/cms/roadmap')
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

    // Optimistic update
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
      fetch(`https://api.imphnen.dev/v1/landing/cms/roadmap/vote/${id}`, {
        method: 'POST',
      }).catch(() => {});
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
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

      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2">
          <div className="flex items-center justify-center w-10 h-10 bg-amber-100 text-amber-600 rounded-lg">
            🔥
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Vote Now</h2>
        </div>

        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-5"
          >
            {upcomingItems.map((item) => (
              <motion.div key={item.id} variants={itemVariants} layout>
                <Card className="bg-white border border-gray-200 hover:border-primary-200 shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold text-gray-900 flex items-start">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 text-sm mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleVote(item.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          votedIds.has(item.id)
                            ? 'bg-primary-500 text-white hover:bg-primary-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <motion.span
                          animate={{ scale: votedIds.has(item.id) ? [1, 1.2, 1] : 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <BiUpvote
                            className={`w-4 h-4 ${
                              votedIds.has(item.id) ? 'text-white' : 'text-gray-600'
                            }`}
                          />
                        </motion.span>
                        <span>{votedIds.has(item.id) ? 'Voted' : 'Vote'}</span>
                      </motion.button>
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                        <BiUpvote className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">
                          {item.votes}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            {upcomingItems.length === 0 && (
              <p className="text-gray-500 text-sm px-2">No upcoming items yet.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2">
          <div className="flex items-center justify-center w-10 h-10 bg-primary-100 text-primary-600 rounded-lg">
            🧑‍🔧
          </div>
          <h2 className="text-xl font-semibold text-gray-900">In Progress</h2>
        </div>

        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-5"
          >
            {inProgressItems.map((item, index) => (
              <motion.div key={item.id} variants={itemVariants} layout>
                <Card className="bg-white border border-gray-200 hover:border-primary-200 shadow-sm hover:shadow-md transition-all h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold text-gray-900 flex items-start">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
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
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            {inProgressItems.length === 0 && (
              <p className="text-gray-500 text-sm px-2">Nothing in progress.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 text-green-600 rounded-lg">
            🤓
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Completed</h2>
        </div>

        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-5"
          >
            {completedItems.map((item) => (
              <motion.div key={item.id} variants={itemVariants} layout>
                <Card className="bg-white border border-gray-200 hover:border-green-200 shadow-sm hover:shadow-md transition-all h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold text-gray-900 flex items-start">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-3">
                      {item.description}
                    </p>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2 text-green-600">
                        <FiCheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Implemented</span>
                      </div>
                      <Button size="sm" className="flex gap-x-2">
                        Coba sekarang
                        <MdOutlineOpenInNew className="size-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            {completedItems.length === 0 && (
              <p className="text-gray-500 text-sm px-2">No completed items yet.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
