/* eslint-disable @next/next/no-img-element */
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HackathonSummary } from '@/content/hackathons/types';
import { hackathonSummaries } from '@/content/hackathons/index';
import { 
  getDaysLeftText, 
  getProgressPercent, 
  filterHackathons,
  sortHackathons
} from '@/content/hackathons/utils';

const HackathonTags: React.FC<{ tags?: string[] }> = ({ tags }) => {
    if (!tags || tags.length === 0) return null;
    return (
        <div className="flex flex-wrap gap-2 mb-3 text-xs">
            {tags.slice(0, 3).map((t) => (
                <div
                    key={t}
                    className="px-3 py-[2px] rounded-md border border-primary-500/50 flex items-center justify-center gap-2"
                >
                    <div className="w-2 h-2 bg-primary-500 rounded-full" />
                    {t}
                </div>
            ))}
        </div>
    );
};

const RegistrationProgress: React.FC<{ hackathon: HackathonSummary }> = ({ hackathon }) => {
    const status = hackathon.status?.toLowerCase().trim();
    // Hide the progress bar if the status is explicitly "ended"
    if (status === 'ended') return null;

    const percent = getProgressPercent(hackathon);
    const label = getDaysLeftText(hackathon);
    if (percent === null && !label) return null;

    return (
        <div className="px-6 mt-2 mb-3 flex gap-2 items-center justify-center">
            <div
                className="w-full h-[0.6rem] rounded-full border border-primary-500/50 overflow-hidden"
                aria-label="Registration progress"
            >
                <div className="h-full bg-primary rounded-full" style={{ width: `${percent ?? 0}%` }} />
            </div>
            <div className="text-xs text-primary-700 shrink-0">{label}</div>
        </div>
    );
};

const HackathonCard: React.FC<{ hackathon: HackathonSummary; idx: number }> = ({ hackathon, idx }) => {
    return (
        <motion.div
            className="rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-card group"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.08, type: 'spring', stiffness: 60 }}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
        >
            <Link href={`/hackathon/${hackathon.slug}`} className="block focus:outline-none relative">
                <div className="h-48 bg-muted overflow-hidden">
                    <div className='w-full h-48 overflow-hidden object-cover'>
                        {/* using img tag since it simpler to control */}
                        <img
                            src={hackathon.cover}
                            alt={hackathon.name}
                            className="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>
                <div className='relative -mt-4 bg-card rounded-lg border-2 border-white hover:border-muted transition-all duration-300'>
                    <div className="p-6">
                        <div className="flex items-start justify-between gap-2">
                            <h3 className="text-lg font-medium mb-2 text-foreground line-clamp-2">
                                {hackathon.name}
                            </h3>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2 line-clamp-3">
                            {hackathon.description}
                        </p>
                        <HackathonTags tags={hackathon.tags} />
                    </div>
                    <RegistrationProgress hackathon={hackathon} />
                    {hackathon.prize && (
                        <div className="px-6 py-3 border-t font-medium text-lg">
                            <h4 className='text-muted-foreground'>Hadiah</h4>
                            <p>{hackathon.prize ?? '—'}</p>
                        </div>
                    )}
                </div>
            </Link>
        </motion.div>
    );
};

export default function HackathonsPage() {
    // Use static data instead of API calls
    const [filteredItems, setFilteredItems] = React.useState<HackathonSummary[]>(hackathonSummaries);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [statusFilter, setStatusFilter] = React.useState<string>('all');

    // Filter and sort hackathons
    React.useEffect(() => {
        let filtered = [...hackathonSummaries];

        // Apply search filter
        if (searchTerm) {
            filtered = filterHackathons(filtered, { search: searchTerm });
        }

        // Apply status filter
        if (statusFilter !== 'all') {
            filtered = filterHackathons(filtered, { status: [statusFilter] });
        }

        // Sort by registration start date (newest first)
        filtered = sortHackathons(filtered, 'registrationStart', 'desc');

        setFilteredItems(filtered);
    }, [searchTerm, statusFilter]);

    return (
        <section className="min-h-screen bg-background container py-10">
            {/* Search and Filter Controls */}
            <div className="mb-8 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Search hackathons..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 px-4 py-2 border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="ended">Ended</option>
                    </select>
                </div>
                
                {/* Results summary */}
                <div className="text-sm text-muted-foreground">
                    Showing {filteredItems.length} of {hackathonSummaries.length} hackathons
                </div>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: { transition: { staggerChildren: 0.12 } },
                }}
            >
                {filteredItems.map((hackathon, idx) => (
                    <HackathonCard key={hackathon.slug || hackathon.name} hackathon={hackathon} idx={idx} />
                ))}
            </motion.div>
            
            {/* No results message */}
            {filteredItems.length === 0 && (
                <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">
                        No hackathons found
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Try adjusting your search or filter criteria
                    </p>
                </div>
            )}
        </section>
    );
}
