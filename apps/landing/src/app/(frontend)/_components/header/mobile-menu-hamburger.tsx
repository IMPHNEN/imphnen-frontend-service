'use client';

import { useMobileMenuStore } from '@/stores/mobile-menu-store';
import { Button } from '@components/atoms';
import { LuMenu, LuX } from 'react-icons/lu';

export function MobileMenuHamburger() {
  const mobileMenuOpen = useMobileMenuStore((s) => s.mobileMenuOpen);
  const toggleMobileMenu = useMobileMenuStore((s) => s.toggleMobileMenu);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden"
      onClick={toggleMobileMenu}
    >
      {mobileMenuOpen ? (
        <LuX className="h-6 w-6" />
      ) : (
        <LuMenu className="h-6 w-6" />
      )}
    </Button>
  );
}
