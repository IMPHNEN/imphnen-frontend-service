'use client';

import SOCIALS from '@/data/socials.json';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  FaArrowRight,
  FaDiscord,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
} from 'react-icons/fa';

export function Communities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'FaFacebook':
        return FaFacebook;
      case 'FaDiscord':
        return FaDiscord;
      case 'FaInstagram':
        return FaInstagram;
      case 'FaTiktok':
        return FaTiktok;
      case 'FaLinkedin':
        return FaLinkedin;
      default:
        return FaArrowRight;
    }
  };

  const getPlatformColors = (iconName: string) => {
    switch (iconName) {
      case 'FaFacebook':
        return {
          iconColor: 'text-[#1877F2]',
        };
      case 'FaDiscord':
        return {
          iconColor: 'text-[#5865F2]',
        };
      case 'FaInstagram':
        return {
          iconColor: 'text-[#E4405F]',
        };
      case 'FaTiktok':
        return {
          iconColor: 'text-[#000000]',
        };
      case 'FaLinkedin':
        return {
          iconColor: 'text-[#0A66C2]',
        };
      default:
        return {
          iconColor: 'text-primary-500',
        };
    }
  };

  return (
    <section id="community" className="w-full py-20 md:py-28">
      <div className="container" ref={ref}>
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Bergabung dengan Komunitas Kami di
              <span className="block mt-2 text-primary-500">
                Berbagai Platform
              </span>
            </h2>
            <p className="max-w-[600px] mx-auto text-gray-600 md:text-lg/relaxed mt-4">
              Terhubung dengan sesama developer di komunitas kami
            </p>
          </motion.div>
        </div>

        <motion.div
          className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {SOCIALS.map((community, index) => {
            const IconComponent = getIconComponent(community.icon);
            const colors = getPlatformColors(community.icon);

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative p-8 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-all duration-300"
              >
                <div className="flex flex-col items-start gap-5">
                  <div className="flex items-center gap-4">
                    <IconComponent
                      className={`w-8 h-8 ${colors.iconColor} transition-colors`}
                    />
                    <h3 className="text-xl font-semibold text-gray-900">
                      {community.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm/relaxed">
                    {community.description}
                  </p>
                  <a
                    href={community.link}
                    className={`inline-flex items-center gap-2 mt-2 text-sm font-medium transition-colors`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Jelajahi Komunitas</span>
                    <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
