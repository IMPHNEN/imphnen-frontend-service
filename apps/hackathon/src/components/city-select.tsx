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

  // Filter cities based on search query
  const filteredCities = INDONESIAN_CITIES.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown when clicking outside
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
          className={`w-full h-[42px] px-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {value && !isOpen && (
          <button
            type="button"
            onClick={handleClearSelection}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredCities.length > 0 ? (
            <ul className="py-1">
              {filteredCities.map((city) => (
                <li
                  key={city}
                  onClick={() => handleSelectCity(city)}
                  className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                    value === city ? 'bg-blue-100 text-blue-700' : ''
                  }`}
                >
                  {city}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-3 py-2 text-gray-500 text-sm">
              No cities found
            </div>
          )}
        </div>
      )}
    </div>
  );
};
