'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HackathonContent } from '@/content/hackathons/types';

interface HackathonHeaderProps {
  metadata: HackathonContent['metadata'];
}

export function HackathonHeader({ metadata }: HackathonHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl space-y-4 mb-8"
    >
      <div className='space-y-2'>
        <h1 className="text-2xl md:text-3xl font-bold">
          {metadata.name}
        </h1>
        {metadata.theme && (
          <p>
            {metadata.theme}
          </p>
        )}
      </div>
      {metadata.description && (
        <p>
          {metadata.description}
        </p>
      )}
    </motion.div>
  );
}