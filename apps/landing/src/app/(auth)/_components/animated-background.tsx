'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import {
  SiCplusplus,
  SiCss3,
  SiGo,
  SiHtml5,
  SiJavascript,
  SiPhp,
  SiPython,
  SiRuby,
  SiRust,
  SiSwift,
  SiTypescript,
} from 'react-icons/si';

export function AnimatedBackground() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const iconColorMap = useMemo(
    () => [
      { Icon: SiJavascript, color: '#F7DF1E' },
      { Icon: SiTypescript, color: '#3178C6' },
      { Icon: SiPython, color: '#3776AB' },
      { Icon: SiCplusplus, color: '#00599C' },
      { Icon: SiRuby, color: '#CC342D' },
      { Icon: SiSwift, color: '#F05138' },
      { Icon: SiRust, color: '#000000' },
      { Icon: SiGo, color: '#00ADD8' },
      { Icon: SiPhp, color: '#777BB4' },
      { Icon: SiHtml5, color: '#E34F26' },
      { Icon: SiCss3, color: '#1572B6' },
    ],
    []
  );

  const getRandom = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const floatingIcons = useMemo(() => {
    if (!isClient) return [];

    return Array.from({ length: 40 }).map((_, i) => {
      const { Icon, color } = iconColorMap[i % iconColorMap.length];
      return (
        <motion.div
          key={i}
          className="pointer-events-none absolute"
          style={{
            top: `${getRandom(0, 100)}%`,
            left: `${getRandom(0, 100)}%`,
            fontSize: `${getRandom(16, 32)}px`,
            color: color,
            opacity: getRandom(0.1, 0.2),
            rotate: getRandom(-180, 180),
          }}
          animate={{
            y: [0, getRandom(-100, 100), 0],
            x: [0, getRandom(-50, 50), 0],
            rotate: getRandom(-180, 180),
          }}
          transition={{
            duration: getRandom(15, 25),
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        >
          <Icon className="h-full w-full" />
        </motion.div>
      );
    });
  }, [isClient, iconColorMap]);

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">{floatingIcons}</div>
  );
}
