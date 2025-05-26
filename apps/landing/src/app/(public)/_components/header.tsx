'use client';

import { Button, MenuIcon, XIcon } from '@components';
import { cn } from '@utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
          <Link href="#fitur" className="text-sm font-medium relative group">
            <span className="transition-colors hover:text-primary">Fitur</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="#komunitas"
            className="text-sm font-medium relative group"
          >
            <span className="transition-colors hover:text-primary">
              Komunitas
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="#sumber-belajar"
            className="text-sm font-medium relative group"
          >
            <span className="transition-colors hover:text-primary">
              Sumber Belajar
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="#testimoni"
            className="text-sm font-medium relative group"
          >
            <span className="transition-colors hover:text-primary">
              Testimoni
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        <div className="flex items-center gap-x-2">
          <Button onClick={() => router.push('/signin')}>Login</Button>

          {/* Mobile Menu Button */}
          <Button
            variant="secondary"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-md">
          <nav className="container flex flex-col py-4 text-center">
            <Link
              href="#fitur"
              className="py-3 text-sm font-medium border-b border-border/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Fitur
            </Link>
            <Link
              href="#komunitas"
              className="py-3 text-sm font-medium border-b border-border/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Komunitas
            </Link>
            <Link
              href="#sumber-belajar"
              className="py-3 text-sm font-medium border-b border-border/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sumber Belajar
            </Link>
            <Link
              href="#testimoni"
              className="py-3 text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimoni
            </Link>

            <Button onClick={() => router.push('/signin')}>Login</Button>
          </nav>
        </div>
      )}
    </header>
  );
}
