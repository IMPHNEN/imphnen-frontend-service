'use client';

import { motion } from 'framer-motion';
import { RequestFeaturePopup } from './request-feature-popup';

export function FeatureRequestCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-primary-500 rounded-xl px-4 py-8 md:p-8 mb-8 text-center mx-auto max-w-7xl"
    >
      <div className="max-w-3xl mx-auto">
        <motion.h1
          className="text-2xl md:text-3xl font-bold text-white mb-3"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          Punya Ide Bagus untuk IMPHNEN?
        </motion.h1>
        <motion.p
          className="text-white/90 mb-6 text-lg text-balance"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Bagikan ide fitur atau layanan yang ingin Anda lihat di komunitas. Ide
          terbaik dengan vote tertinggi akan kami prioritaskan!
        </motion.p>
        <RequestFeaturePopup />
      </div>
    </motion.div>
  );
}
