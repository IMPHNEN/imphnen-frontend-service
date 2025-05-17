'use client';

import { ReactNode, useEffect, useState } from 'react';

export function HeroWrapper({ children }: { children: ReactNode }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 xl:py-40 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background to-background/50" />
        <div
          className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-gradient-to-r from-primary/20 to-blue-400/20 blur-3xl"
          style={{
            transform: `translate(${scrollY * 0.1}px, ${scrollY * -0.05}px)`,
            opacity: Math.max(0.2, 1 - scrollY * 0.0005),
          }}
        />
        <div
          className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full bg-gradient-to-r from-blue-400/20 to-primary/20 blur-3xl"
          style={{
            transform: `translate(${scrollY * -0.1}px, ${scrollY * 0.05}px)`,
            opacity: Math.max(0.2, 1 - scrollY * 0.0005),
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      {children}
    </section>
  );
}
