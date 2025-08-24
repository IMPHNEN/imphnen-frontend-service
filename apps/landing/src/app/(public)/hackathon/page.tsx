'use client';

import hackathons from '@/data/hackathons.json';
import { buttonVariants } from '@components';
import { cn } from '@utils';
import Image from 'next/image';
import { HiOutlineCode } from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function HackathonsPage() {
  const sortedHackathons = [...hackathons];

  if (sortedHackathons.length === 0) {
    return (
      <section className="min-h-screen bg-background container py-10 flex items-center justify-center">
        <p className="text-muted-foreground text-lg">No hackathon projects available yet.</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-background container py-10">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {sortedHackathons.map((hackathon, idx) => (
          <motion.div
            key={hackathon.project_title}
            className="rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 bg-card group"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.08, type: 'spring', stiffness: 60 }}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
          >
            <motion.div className="h-48 bg-muted relative overflow-hidden rounded-t-xl">
              <Image
                src={`https://cdn.asepharyana.tech/imphnen/hackatons/${hackathon.file_name}`}
                alt={hackathon.project_title}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized
              />
            </motion.div>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                {hackathon.project_title}
              </h3>
              <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <HiOutlineCode className="w-4 h-4" />
                  <span>{hackathon.team_name}</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {hackathon.description}
              </p>
              <a
                href={hackathon.repo_link}
                target="_blank"
                className={cn(
                  buttonVariants({ variant: 'bordered' }),
                  'w-full text-sm'
                )}
              >
                Lihat Proyek
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
