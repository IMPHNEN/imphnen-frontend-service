import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu, X, Github, Star } from 'lucide-react';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Fitur', to: '/features' },
  { label: 'Download', to: '/download' },
  { label: 'Wiki', to: '/wiki' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Tentang', to: '/about' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src="https://imphnen.dev/logo.webp" alt="IMPHNEN" className="h-8 w-auto" />
              <span className="font-bold text-xl text-primary-900 tracking-tight hidden sm:block">
                Imphnen<span className="text-primary-500">OS</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-500 hover:bg-primary-50 transition-colors"
                activeProps={{
                  className: 'text-primary-600 bg-primary-50',
                }}
                activeOptions={{ exact: link.to === '/' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right section */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://github.com/IMPHNEN/ImphnenOs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:text-primary-600 transition-colors shadow-sm"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
              <div className="flex items-center gap-1 border-l border-gray-200 pl-2 ml-1 text-gray-500">
                <Star className="w-3 h-3" />
              </div>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-primary-600 hover:bg-primary-50 focus:outline-none"
            >
              <span className="sr-only">Buka menu utama</span>
              {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-gray-100 bg-white absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                activeProps={{
                  className: 'text-primary-600 bg-primary-50',
                }}
                activeOptions={{ exact: link.to === '/' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://github.com/IMPHNEN/ImphnenOs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
            >
              <Github className="w-5 h-5" />
              <span>Star di GitHub</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
