'use client';

import { motion } from 'framer-motion';
import { ButtonExploreEvent } from './button-explore-event';
import { ButtonJoinCommunity } from './button-join-community';
import { HeroBadge } from './hero-badge';
import { HeroImage } from './hero-image';
import { HeroMainText } from './hero-main-text';
import { HeroWrapper } from './hero-wrapper';

export function Hero() {
  return (
    <HeroWrapper>
      <div className="container px-4 md:px-8 relative">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HeroBadge />
            <HeroMainText />

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <ButtonJoinCommunity />
              <ButtonExploreEvent />
            </div>
          </motion.div>

          <HeroImage />
        </div>
      </div>
    </HeroWrapper>
  );
}
