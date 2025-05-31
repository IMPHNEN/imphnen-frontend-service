'use client';

import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';

export function FeatureRequestCTA() {
  const handleSubmitFeature = () => {
    alert('Feature submission form would appear here!');
  };

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
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmitFeature}
          className="bg-white text-primary-500 font-semibold py-3 px-8 rounded-full flex items-center justify-center gap-2 mx-auto shadow-lg hover:shadow-xl transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <FiPlus className="w-5 h-5" />
          <span>Ajukan Fitur</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
