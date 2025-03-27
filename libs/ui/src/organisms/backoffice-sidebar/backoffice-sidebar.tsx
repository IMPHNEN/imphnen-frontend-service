import { FC, ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const BackofficeSidebar: FC = (): ReactElement => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <aside className="w-[280px] bg-white min-h-screen py-[60px] px-[28px] shadow-xl flex flex-col justify-between">
      <div className="flex flex-col">
        {/* Logo */}
        <div className="p-6 flex justify-center">
          <img
            src="/logos/simple.svg"
            alt="IMPHNEN Logo"
            className="w-[150px]"
          />
        </div>

        {/* Navigation Menu */}
        <nav className="mt-4 flex flex-col gap-2">
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 px-6 py-3 ${
              isActive('/dashboard')
                ? 'bg-primary-100 text-primary-500'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <rect
                width="20"
                height="20"
                rx="2"
                fill="currentColor"
                fillOpacity="0.2"
              />
              <path d="M7 9h2v5H7V9zm4-3h2v8h-2V6z" fill="currentColor" />
            </svg>
            <span>Dashboard & Set Gacha</span>
          </Link>

          <Link
            to="/users"
            className={`flex items-center gap-2 px-6 py-3 ${
              isActive('/users')
                ? 'bg-primary-100 text-primary-500'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M10 10a4 4 0 100-8 4 4 0 000 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                fill="currentColor"
              />
            </svg>
            <span>Data Akun</span>
          </Link>

          <Link
            to="/transactions"
            className={`flex items-center gap-2 px-6 py-3 ${
              isActive('/transactions')
                ? 'bg-primary-100 text-primary-500'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M17 4H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 10H3V6h14v8z"
                fill="currentColor"
              />
              <path d="M10 9h4v2h-4V9z" fill="currentColor" />
            </svg>
            <span>Validasi Transaksi</span>
          </Link>
        </nav>
      </div>

      {/* Log Out Button */}
      <div className="mb-6 px-6">
        <button className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M17 4h-4V2h-6v2H3v16h14V4zm-2 14H5V6h10v12z"
              fill="currentColor"
            />
            <path d="M8 9h4v2H8V9z" fill="currentColor" />
          </svg>
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};
