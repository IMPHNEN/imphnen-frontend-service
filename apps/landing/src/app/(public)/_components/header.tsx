'use client';

import { LogoSimple } from '@/app/_components/logo';
import NAVIGATIONS from '@/data/navigations.json';
import { Button } from '@components';
import { cn } from '@utils';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LuMenu, LuX } from 'react-icons/lu';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 w-full z-50 bg-background/70">
      <div className="container flex h-20 items-center justify-between">
        <Link
          href="/"
          className="relative overflow-hidden rounded z-50"
          aria-label="Home"
        >
          <LogoSimple className="w-24 md:w-28" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAVIGATIONS.map(({ link, title }) => (
            <Link
              key={link}
              href={link}
              className={cn(
                'text-sm font-medium relative group px-1 py-2',
                pathname === link ? 'text-primary' : 'text-foreground/90'
              )}
            >
              <span className="transition-colors hover:text-primary block">
                {title}
              </span>
              {pathname === link && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-x-3">
          <Button
            onClick={() => router.push('/signin')}
            className="px-5 py-2 text-sm font-medium"
          >
            Masuk
          </Button>
          <Button
            variant="bordered"
            onClick={() => router.push('/signup')}
            className="px-5 py-2 text-sm font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30"
          >
            Daftar
          </Button>
        </div>

        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="flex md:hidden relative z-50 p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
        >
          {mobileMenuOpen ? (
            <LuX className="size-6" />
          ) : (
            <LuMenu className="size-6" />
          )}
        </button>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-60 bg-background flex flex-col"
            >
              <div className="container flex h-20 items-center justify-between">
                <Link
                  href="/"
                  className="relative overflow-hidden rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogoSimple className="w-24" />
                </Link>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  aria-label="Tutup menu"
                >
                  <LuX className="size-6" />
                </button>
              </div>

              <motion.nav
                className="flex-1 flex flex-col items-center justify-center gap-6 py-10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {NAVIGATIONS.map(({ link, title }) => (
                  <Link
                    key={link}
                    href={link}
                    className={cn(
                      'text-2xl font-medium py-2 px-6 rounded-lg transition-colors',
                      pathname === link
                        ? 'text-primary bg-primary/10'
                        : 'text-foreground hover:bg-muted'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {title}
                  </Link>
                ))}
              </motion.nav>

              <motion.div
                className="container space-y-4 pb-10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    router.push('/signin');
                  }}
                  className="w-full py-4 text-base"
                >
                  Masuk
                </Button>
                <Button
                  variant="bordered"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    router.push('/signup');
                  }}
                  className="w-full py-4 text-base shadow-lg shadow-primary/20"
                >
                  Daftar
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
