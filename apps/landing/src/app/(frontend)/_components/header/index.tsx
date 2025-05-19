'use client';

import { useMobileMenuStore } from '@/stores/mobile-menu-store';
import { ButtonSignin } from './button-signin';
import { ButtonSignup } from './button-signup';
import { DesktopNavigation } from './desktop-navigation';
import { HeaderWrapper } from './header-wrapper';
import { Logo } from './logo';
import { MobileMenuHamburger } from './mobile-menu-hamburger';
import { MobileNavigation } from './mobile-navigation';
import { SimpleThemeToggle } from './simple-theme-toggle';

export function Header() {
  const mobileMenuOpen = useMobileMenuStore((s) => s.mobileMenuOpen);

  return (
    <HeaderWrapper>
      <div className="container flex h-16 items-center justify-between">
        <Logo />

        <DesktopNavigation />

        <div className="flex items-center gap-x-2">
          <ButtonSignin />
          <ButtonSignup />
          <SimpleThemeToggle />
          <MobileMenuHamburger />
        </div>
      </div>

      {mobileMenuOpen && <MobileNavigation />}
    </HeaderWrapper>
  );
}
