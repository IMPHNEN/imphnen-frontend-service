'use client';

import { buttonVariants } from '@components';
import { cn } from '@utils';
import { useEffect, useState } from 'react';
import { HiOutlineCode, HiOutlineTrophy } from 'react-icons/hi';
import { motion } from 'framer-motion';

interface TeamItem {
  id: string;
  name: string;
  description: string;
  city: string;
  logo: string | null;
  banner: string | null;
}

interface WinnerItem {
  id: string;
  team_id: string;
  team_name: string;
  rank: number;
  prize: string | null;
}

export default function HackathonsPage() {
  const [teams, setTeams] = useState<TeamItem[]>([]);
  const [winners, setWinners] = useState<WinnerItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('https://api.imphnen.dev/v1/hackathon/teams/browse?per_page=20')
        .then((r) => r.json())
        .then((j) => j.data?.data || [])
        .catch(() => []),
      fetch('https://api.imphnen.dev/v1/hackathon/winners')
        .then((r) => r.json())
        .then((j) => j.data || [])
        .catch(() => []),
    ]).then(([t, w]) => {
      setTeams(t);
      setWinners(w);
      setLoading(false);
    });
  }, []);

  const getWinnerRank = (teamId: string) => {
    const w = winners.find((x) => x.team_id === teamId);
    return w ? w.rank : null;
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-background container py-10 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-gray-200 border-t-primary-500 rounded-full animate-spin" />
      </section>
    );
  }

  if (teams.length === 0) {
    return (
      <section className="min-h-screen bg-background container py-10 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg mb-2">No hackathon teams yet.</p>
          <a href="https://hackathon.imphnen.dev" className={cn(buttonVariants(), 'mt-4')}>
            Join Hackathon
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-background container py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3 text-foreground">IMPHNEN Hackathon</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Tim-tim yang berpartisipasi dalam hackathon IMPHNEN
        </p>
      </div>

      {winners.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
            <HiOutlineTrophy className="text-amber-500" /> Pemenang
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {winners.sort((a, b) => a.rank - b.rank).map((w) => (
              <div key={w.id} className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 text-center">
                <div className="text-4xl mb-2">{w.rank === 1 ? '🥇' : w.rank === 2 ? '🥈' : '🥉'}</div>
                <h3 className="text-lg font-bold text-gray-900">{w.team_name}</h3>
                <p className="text-sm text-amber-700 mt-1">Juara {w.rank}</p>
                {w.prize && <p className="text-xs text-amber-600 mt-1">{w.prize}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6 text-foreground">Semua Tim</h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {teams.map((team, idx) => {
          const rank = getWinnerRank(team.id);
          return (
            <motion.div
              key={team.id}
              className={cn(
                'rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 bg-card group overflow-hidden',
                rank ? 'ring-2 ring-amber-300' : ''
              )}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
            >
              {team.banner ? (
                <div className="h-40 bg-muted relative overflow-hidden">
                  <img src={team.banner} alt={team.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              ) : (
                <div className="h-40 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <HiOutlineCode className="w-12 h-12 text-primary-400" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{team.name}</h3>
                  {rank && (
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">
                      Juara {rank}
                    </span>
                  )}
                </div>
                {team.city && (
                  <p className="text-xs text-muted-foreground mb-2">{team.city}</p>
                )}
                {team.description && (
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{team.description}</p>
                )}
                <a
                  href={`https://hackathon.imphnen.dev/teams/${team.id}`}
                  target="_blank"
                  className={cn(buttonVariants({ variant: 'bordered' }), 'w-full text-sm')}
                >
                  Lihat Tim
                </a>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
