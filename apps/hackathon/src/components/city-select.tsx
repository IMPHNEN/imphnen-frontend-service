import { FC, useState, useRef, useEffect } from 'react';
import INDONESIAN_CITIES from '../constants/cities';

interface CitySelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}

export const CitySelect: FC<CitySelectProps> = ({
  value,
  onChange,
  error,
  placeholder = 'Search your city...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCities = INDONESIAN_CITIES.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectCity = (city: string) => {
    onChange(city);
    setSearchQuery('');
    setIsOpen(false);
  };

  const handleInputClick = () => {
    setIsOpen(true);
    setSearchQuery('');
  };

  const handleClearSelection = () => {
    onChange('');
    setSearchQuery('');
    setIsOpen(true);
    inputRef.current?.focus();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={isOpen ? searchQuery : value}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onClick={handleInputClick}
          placeholder={placeholder}
          className={`w-full h-[42px] px-3 text-[15px] border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
            error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
        />
        {value && !isOpen && (
          <button
            type="button"
            onClick={handleClearSelection}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 cursor-pointer dark:hover:text-gray-300"
          >
            ✕
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto text-label2">
          {filteredCities.length > 0 ? (
            <ul className="py-1">
              {filteredCities.map((city) => (
                <li
                  key={city}
                  onClick={() => handleSelectCity(city)}
                  className={`px-3 py-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 ${
                    value === city
                      ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400'
                      : 'text-gray-900 dark:text-gray-200'
                  }`}
                >
                  {city}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-3 py-2 text-gray-500 dark:text-gray-400 text-sm">
              No cities found
            </div>
          )}
        </div>
      )}
    </div>
  );
};
