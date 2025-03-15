import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  RenderResult,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './navbar';

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

describe('Navbar', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the logo', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const logo: HTMLElement = screen.getByAltText(/IMPHNEN Logo/i);
    expect(logo).toBeInTheDocument();
  });

  it('renders the Home link', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const homeLink: HTMLElement = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
  });

  it('renders the Merch Gacha link', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const merchLink: HTMLElement = screen.getByRole('link', {
      name: /merch gacha/i,
    });
    expect(merchLink).toBeInTheDocument();
  });

  it('displays horizontal menu on desktop screens', () => {
    mockMatchMedia({ matches: true });

    global.innerWidth = 1024;
    global.dispatchEvent(new Event('resize'));

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const navItems: HTMLElement = screen.getByRole('list');
    expect(navItems).toHaveClass('md:flex');

    const hamburgerButton: HTMLElement = screen.getByRole('button');
    expect(hamburgerButton).toHaveClass('md:hidden');
  });

  it('displays hamburger menu on mobile screens and can toggle dropdown', () => {
    mockMatchMedia({ matches: false });

    global.innerWidth = 375;
    global.dispatchEvent(new Event('resize'));

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const hamburgerButton: HTMLElement = screen.getByRole('button');
    expect(hamburgerButton).toBeVisible();

    fireEvent.click(hamburgerButton);

    const dropdownMenu: HTMLElement[] = screen.getAllByRole('list');
    expect(dropdownMenu[1]).toBeVisible();

    fireEvent.click(hamburgerButton);

    const updatedDropdownMenus: HTMLElement[] = screen.getAllByRole('list');
    expect(updatedDropdownMenus.length).toBe(1);
  });

  it('has correct height on tablet screens', () => {
    mockMatchMedia({ matches: true });

    global.innerWidth = 768;
    global.dispatchEvent(new Event('resize'));

    const { container }: RenderResult = render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const header: HTMLElement | null = container.querySelector('header');
    expect(header).not.toBeNull();
    if (header) {
      expect(header).toHaveClass('md:min-h-[60px]');
      expect(header).toHaveClass('md:max-h-[60px]');
    }
  });

  it('has max width constraint on large screens', () => {
    mockMatchMedia({ matches: true });

    global.innerWidth = 3840;
    global.dispatchEvent(new Event('resize'));

    const { container }: RenderResult = render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const header: HTMLElement | null = container.querySelector('header');
    expect(header).not.toBeNull();
    if (header) {
      expect(header).toHaveClass('max-w-[1280px]');
      expect(header).toHaveClass('xl:mx-auto');
    }
  });

  it('has correct ARIA role for navigation', () => {
    const { container }: RenderResult = render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const header: HTMLElement | null = container.querySelector('header');
    expect(header).toHaveAttribute('role', 'navigation');
  });
});
