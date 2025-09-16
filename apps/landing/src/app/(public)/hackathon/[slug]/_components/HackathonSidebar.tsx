'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HackathonContent } from '@/content/hackathons/types';
import { HackathonHeader } from './HackathonHeader';
import { HackathonQuickInfo } from './HackathonQuickInfo';
import { HackathonRequirements } from './HackathonRequirements';

interface HackathonSidebarProps {
  metadata: HackathonContent['metadata'];
}

export function HackathonSidebar({ metadata }: HackathonSidebarProps) {
  return (
    <div className="lg:col-span-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <HackathonHeader metadata={metadata} />
        </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="space-y-6"
      >
        <HackathonQuickInfo metadata={metadata} />
        <HackathonRequirements requirements={metadata.requirements} />
      </motion.div>
    </div>
  );
}