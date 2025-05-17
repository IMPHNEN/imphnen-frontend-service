'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function HeroImage() {
  return (
    <motion.div
      className="relative w-full lg:w-auto mx-auto lg:ml-auto max-w-[600px] mt-8 lg:mt-0"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Image
        src="/logo.png"
        alt=""
        width={800}
        height={600}
        className="w-full h-auto object-cover"
        priority
      />
    </motion.div>
  );
}
