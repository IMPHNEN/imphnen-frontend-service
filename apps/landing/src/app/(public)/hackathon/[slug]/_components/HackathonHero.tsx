'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface HackathonHeroProps {
  coverImage: string;
  hackathonName: string;
}

export function HackathonHero({ coverImage, hackathonName }: HackathonHeroProps) {
  return (
    <motion.div 
      className="relative h-64 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Image
        unoptimized
        fill
        src={coverImage}
        alt={hackathonName}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </motion.div>
  );
}