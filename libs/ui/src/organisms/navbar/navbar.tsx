import { MenuOutlined } from '@ant-design/icons';
import { Button } from '@imphnen-frontend-service/ui/atoms';
import { FC, ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar: FC = (): ReactElement => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="bg-primary-50 w-full px-[32px] pt-[32px] md:px-[60px] md:pt-[60px] lg:px-[80px] sticky top-0 z-50">
      <header
        className="bg-white shadow-lg rounded-lg min-h-[47px] max-h-[47px] md:min-h-[60px] md:max-h-[60px] lg:min-h-[71px] lg:max-h-[71px] flex justify-between w-full max-w-[1280px] xl:mx-auto"
        role="navigation"
      >
        <div className="flex w-full items-center justify-between p-4 md:px-[32px] md:py-[10px]">
          <div className="flex items-center">
            <img
              src="/logos/simple.svg"
              alt="IMPHNEN Logo"
              className="h-8 md:h-[40px] lg:h-[52px] w-auto"
            />
          </div>
          <nav className="w-full flex justify-end">
            <ul className="items-center gap-x-8 font-semibold hidden md:flex">
              <li>
                <Button
                  size="md"
                  variant="text"
                  className="lg:text-[19px] lg:max-h-[44px] text-primary-500 hover:text-primary-600 transition-colors"
                >
                  <Link to="#">Home</Link>
                </Button>
              </li>
              <li>
                <Button
                  size="md"
                  variant="text"
                  className="lg:text-[19px] lg:max-h-[44px] text-gray-600 hover:text-gray-700 transition-colors"
                >
                  <Link to="#">Merch Gacha</Link>
                </Button>
              </li>
              <li>
                <Button
                  size="md"
                  className="lg:text-[19px] lg:max-h-[44px] text-neutral-50 hover:text-neutral-200 transition-colors"
                >
                  <Link to="/login">Login</Link>
                </Button>
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
                    <li>
                      <Link
                        to="#"
                        className="block text-gray-600 transition-colors px-4 py-2 text-center font-semibold"
                      >
                        Login
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};
