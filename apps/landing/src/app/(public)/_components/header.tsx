'use client';

import navigations from '@/data/navigations.json';
import { Button } from '@components';
import { cn } from '@utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LuMenu, LuX } from 'react-icons/lu';

export function Header() {
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative overflow-hidden rounded">
            <Link href="/">
              <Image
                src="/logo.webp"
                alt="IMPHNEN"
                width={64}
                height={64}
                className="object-cover"
              />
            </Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navigations.map(({ link, title }) => (
            <Link
              key={link}
              href={link}
              className="text-sm font-medium relative group"
            >
              <span className="transition-colors hover:text-primary">
                {title}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-x-2">
          <Button
            onClick={() => router.push('/signin')}
            className="hidden md:flex"
          >
            Login
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden"
          >
            {mobileMenuOpen ? (
              <LuX className="size-5" />
            ) : (
              <LuMenu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-md">
          <nav className="container flex flex-col py-4 text-center">
            {navigations.map(({ link, title }) => (
              <Link
                key={link}
                href={link}
                className="py-3 text-sm font-medium border-b border-border/50"
                onClick={() => router.push(link)}
              >
                {title}
              </Link>
            ))}

            <Button onClick={() => router.push('/signin')}>Login</Button>
          </nav>
        </div>
      )}
    </header>
  );
}
