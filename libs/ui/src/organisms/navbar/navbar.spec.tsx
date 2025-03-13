import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  RenderResult,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './navbar';

// Interface untuk hasil matchMedia
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

// Fungsi untuk mock matchMedia dengan tipe yang tepat
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
  // Setup dan cleanup untuk setiap test
  beforeEach(() => {
    // Reset DOM sebelum setiap test
    document.body.innerHTML = '';
  });

  afterEach(() => {
    // Cleanup setelah setiap test
    vi.restoreAllMocks();
  });

  // Test yang sudah ada sebelumnya
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

  // Test tambahan untuk responsifitas

  // Untuk Desktop Screen
  it('displays horizontal menu on desktop screens', () => {
    // Set viewport untuk desktop (di atas 768px)
    mockMatchMedia({ matches: true });

    // Setup
    global.innerWidth = 1024;
    global.dispatchEvent(new Event('resize'));

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Cek apakah menu horizontal ditampilkan
    const navItems: HTMLElement = screen.getByRole('list');
    expect(navItems).toHaveClass('md:flex');

    // Hamburger menu tidak terlihat di desktop
    const hamburgerButton: HTMLElement = screen.getByRole('button');
    expect(hamburgerButton).toHaveClass('md:hidden');
  });

  // Untuk Mobile Screen
  it('displays hamburger menu on mobile screens and can toggle dropdown', () => {
    // Set viewport untuk mobile (di bawah 768px)
    mockMatchMedia({ matches: false });

    // Setup
    global.innerWidth = 375;
    global.dispatchEvent(new Event('resize'));

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Hamburger menu harus terlihat
    const hamburgerButton: HTMLElement = screen.getByRole('button');
    expect(hamburgerButton).toBeVisible();

    // Klik hamburger menu untuk membuka dropdown
    fireEvent.click(hamburgerButton);

    // Dropdown menu harus terlihat setelah diklik
    const dropdownMenu: HTMLElement[] = screen.getAllByRole('list');
    expect(dropdownMenu[1]).toBeVisible();

    // Klik lagi untuk menutup dropdown
    fireEvent.click(hamburgerButton);

    // Dropdown tidak lagi terlihat (karena state berubah)
    const updatedDropdownMenus: HTMLElement[] = screen.getAllByRole('list');
    expect(updatedDropdownMenus.length).toBe(1); // Hanya menu horizontal yang tersisa
  });

  // Untuk Tablet Screen
  it('has correct height on tablet screens', () => {
    // Set viewport untuk tablet (antara mobile dan desktop)
    mockMatchMedia({ matches: true });

    // Setup
    global.innerWidth = 768;
    global.dispatchEvent(new Event('resize'));

    const { container }: RenderResult = render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Navbar harus memiliki kelas height untuk tablet
    const header: HTMLElement | null = container.querySelector('header');
    expect(header).not.toBeNull();
    if (header) {
      expect(header).toHaveClass('md:min-h-[60px]');
      expect(header).toHaveClass('md:max-h-[60px]');
    }
  });

  // Untuk Max Width pada 4K Screen
  it('has max width constraint on large screens', () => {
    // Set viewport untuk layar besar
    mockMatchMedia({ matches: true });

    // Setup
    global.innerWidth = 3840; // 4K resolution
    global.dispatchEvent(new Event('resize'));

    const { container }: RenderResult = render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Navbar harus memiliki max-width dan posisi tengah
    const header: HTMLElement | null = container.querySelector('header');
    expect(header).not.toBeNull();
    if (header) {
      expect(header).toHaveClass('max-w-[1280px]');
      expect(header).toHaveClass('xl:mx-auto');
    }
  });

  // Test tambahan untuk memeriksa peran dan aksesibilitas
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
