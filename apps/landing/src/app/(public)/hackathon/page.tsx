'use client';

import hackathons from '@/data/hackathons.json';
import { buttonVariants } from '@components';
import { cn } from '@utils';
import Image from 'next/image';
import { HiOutlineCode } from 'react-icons/hi';

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedHackathons.map((hackathon) => (
          <div
            key={hackathon.project_title}
            className="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 bg-card"
          >
            <div className="h-48 bg-muted relative">
              <Image
                src={hackathon.screenshot}
                alt={hackathon.project_title}
                fill
                className="object-cover object-top rounded-t-xl"
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized
              />
            </div>
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
          </div>
        ))}
      </div>
    </section>
  );
}