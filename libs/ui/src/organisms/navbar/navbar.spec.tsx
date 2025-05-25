import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  RenderResult,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './navbar';
import { ModalLoginProvider } from '@imphnen-frontend-service/utils';

interface MatchMediaResult {
  matches: boolean;
  media: string;
  onchange: null;
  addListener: ReturnType<typeof vi.fn>;
  removeListener: ReturnType<typeof vi.fn>;
  addEventListener: ReturnType<typeof vi.fn>;
  removeEventListener: ReturnType<typeof vi.fn>;
  dispatchEvent: ReturnType<typeof vi.fn>;
}

function mockMatchMedia(width: { matches: boolean }): void {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(
      (query: string): MatchMediaResult => ({
        matches: width.matches,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })
    ),
  });
}

const renderWithProvider = () =>
  render(
    <BrowserRouter>
      <ModalLoginProvider>
        <Navbar />
      </ModalLoginProvider>
    </BrowserRouter>
  );

describe('Navbar Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Test renders the logo', () => {
    renderWithProvider();
    const logo: HTMLElement = screen.getByAltText(/IMPHNEN Logo/i);
    expect(logo).toBeInTheDocument();
  });

  it('Test renders the Home link', () => {
    renderWithProvider();
    const homeLink: HTMLElement = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
  });

  it('Test renders the Merch Gacha link', () => {
    renderWithProvider();
    const merchLink: HTMLElement = screen.getByRole('link', {
      name: /merch gacha/i,
    });
    expect(merchLink).toBeInTheDocument();
  });

  it('Test displays horizontal menu on desktop screens', () => {
    mockMatchMedia({ matches: true });
    global.innerWidth = 1024;
    global.dispatchEvent(new Event('resize'));
    renderWithProvider();
    const navItems: HTMLElement = screen.getByRole('list');
    expect(navItems).toHaveClass('md:flex');
    const hamburgerButton: HTMLElement = screen.getByRole('button');
    expect(hamburgerButton).toHaveClass('md:hidden');
  });

  it('Test displays hamburger menu on mobile screens and can toggle dropdown', () => {
    mockMatchMedia({ matches: false });
    global.innerWidth = 375;
    global.dispatchEvent(new Event('resize'));
    renderWithProvider();
    const hamburgerButton: HTMLElement = screen.getByRole('button');
    expect(hamburgerButton).toBeVisible();
    fireEvent.click(hamburgerButton);
    const dropdownMenu: HTMLElement[] = screen.getAllByRole('list');
    expect(dropdownMenu[1]).toBeVisible();
    fireEvent.click(hamburgerButton);
    const updatedDropdownMenus: HTMLElement[] = screen.getAllByRole('list');
    expect(updatedDropdownMenus.length).toBe(1);
  });

  it('Test has correct height on tablet screens', () => {
    mockMatchMedia({ matches: true });
    global.innerWidth = 768;
    global.dispatchEvent(new Event('resize'));
    const { container }: RenderResult = renderWithProvider();
    const header: HTMLElement | null = container.querySelector('header');
    expect(header).not.toBeNull();
    if (header) {
      expect(header).toHaveClass('md:min-h-[60px]');
      expect(header).toHaveClass('md:max-h-[60px]');
    }
  });

  it('Test has max width constraint on large screens', () => {
    mockMatchMedia({ matches: true });
    global.innerWidth = 3840;
    global.dispatchEvent(new Event('resize'));
    const { container }: RenderResult = renderWithProvider();
    const header: HTMLElement | null = container.querySelector('header');
    expect(header).not.toBeNull();
    if (header) {
      expect(header).toHaveClass('max-w-[1280px]');
      expect(header).toHaveClass('xl:mx-auto');
    }
  });

  it('Test has correct ARIA role for nav', () => {
    const { container }: RenderResult = renderWithProvider();
    const header: HTMLElement | null = container.querySelector('header');
    expect(header).toHaveAttribute('role', 'nav');
  });
});
