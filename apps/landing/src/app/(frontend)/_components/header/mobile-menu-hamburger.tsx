'use client';

import {
  Button,
  MenuIcon,
  XIcon,
} from '@imphnen-frontend-service/shadcn-ui/atoms';
import { useMobileMenuStore } from '../../../../stores/mobile-menu-store';

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
        <XIcon className="h-6 w-6" />
      ) : (
        <MenuIcon className="h-6 w-6" />
      )}
    </Button>
  );
}
