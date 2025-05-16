import { create } from 'zustand';

interface MobileMenuState {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export const useMobileMenuStore = create<MobileMenuState>((set) => ({
  mobileMenuOpen: false,
  toggleMobileMenu: () =>
    set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
}));
