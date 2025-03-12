import { MenuOutlined } from '@ant-design/icons';
import { FC, ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar: FC = (): ReactElement => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header
      className="bg-white shadow-sm rounded-lg min-h-[47px] max-h-[47px] md:min-h-[60px] md:max-h-[60px] lg:min-h-[71px] lg:max-h-[71px] flex justify-between w-full max-w-[1280px] xl:mx-auto sticky"
      role="navigation"
    >
      <div className="flex w-full items-center justify-between px-6 py-3">
        <div className="flex items-center">
          <img
            src="/logos/simple.svg"
            alt="IMPHNEN Logo"
            className="h-8 w-auto"
          />
        </div>

        <nav className="w-full flex justify-end">
          <ul className="items-center gap-x-8 font-semibold hidden md:flex">
            <li>
              <Link
                to="#"
                className="text-primary-500 hover:text-primary-600 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link to="#" className="text-gray-600 transition-colors">
                Merch Gacha
              </Link>
            </li>
          </ul>
          <button
            className={`md:hidden duration-200 ${
              isDropdownOpen ? 'transform rotate-90' : ''
            }`}
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            <MenuOutlined style={{ color: '#1a8ce6' }} />
          </button>
          <div className="relative">
            {isDropdownOpen && (
              <div className="absolute right-0 top-0 mt-5">
                <ul className="mt-2 w-48 bg-white shadow-md border rounded-[16px] border-gray-200 px-5 py-3">
                  <li>
                    <Link
                      to="#"
                      className="block text-primary-500 hover:text-primary-600 transition-colors px-4 py-2 text-center font-semibold"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="block text-gray-600 transition-colors px-4 py-2 text-center font-semibold"
                    >
                      Merch Gacha
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
