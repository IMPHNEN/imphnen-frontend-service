'use client';

import HERO_CONTENT from '@/data/hero-content.json';
import HERO_STATS from '@/data/hero-stats.json';
import { Button } from '@components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

export function HeroSection() {
  const router = useRouter();
  const { communityLabel, headingLine1, headingLine2, description, buttons } =
    HERO_CONTENT;

  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background to-background/50" />
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-gradient-to-r from-primary/20 to-blue-400/20 blur-3xl opacity-60" />
        <div className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full bg-gradient-to-r from-blue-400/20 to-primary/20 blur-3xl opacity-60" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="container px-4 md:px-6 relative">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-8 animate-[fadeInUp_0.5s_ease-out]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
                {communityLabel}
              </span>
              <a
                href="https://ancikri.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border px-3 py-1 text-sm hover:bg-muted transition-colors"
              >
                Powered By Ancikri
              </a>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground/70">
                {headingLine1}{' '}
                <span className="bg-clip-text bg-gradient-to-r text-primary-500">
                  {headingLine2}
                </span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                {description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button size="lg" onClick={() => router.push(buttons.joinUrl)}>
                {buttons.join}
              </Button>
              <Button
                size="lg"
                variant="bordered"
                className="w-full sm:w-auto"
                onClick={() => router.push(buttons.exploreUrl)}
              >
                {buttons.explore}
              </Button>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-6 sm:gap-8">
              {HERO_STATS.map(({ value, label }, i) => (
                <Fragment key={i}>
                  <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold bg-clip-text text-primary-500">
                      {value}
                    </div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                  {i < HERO_STATS.length - 1 && (
                    <div className="hidden sm:block h-10 border-r border-border mx-4" />
                  )}
                </Fragment>
              ))}
            </div>
          </div>

          <div className="relative w-full lg:w-auto mx-auto lg:ml-auto animate-[fadeIn_0.5s_ease-out_0.2s_both]">
            <Image
              src="/logo.webp"
              alt="logo"
              width={600}
              height={500}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
