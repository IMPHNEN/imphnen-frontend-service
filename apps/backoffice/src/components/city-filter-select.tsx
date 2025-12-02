import { FC, useState, useRef, useEffect } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import INDONESIAN_CITIES from '../constants/cities';

interface CityFilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  allOptionLabel?: string;
}

export const CityFilterSelect: FC<CityFilterSelectProps> = ({
  value,
  onChange,
  className = '',
  placeholder = 'Search cities...',
  allOptionLabel = 'All Cities',
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
        setSearchQuery('');
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
    onChange('all');
    setSearchQuery('');
    setIsOpen(false);
  };

  const displayValue = value === 'all' ? allOptionLabel : value;
  const showClearButton = value !== 'all' && !isOpen;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="relative">
        <FilterOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 text-sm pointer-events-none z-10" />
        <input
          ref={inputRef}
          type="text"
          value={isOpen ? searchQuery : displayValue}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onClick={handleInputClick}
          onFocus={handleInputClick}
          placeholder={isOpen ? placeholder : displayValue}
          className="border border-neutral-200 rounded-lg pl-10 pr-10 py-2.5 text-sm w-full focus:border-primary-500 focus:outline-none appearance-none bg-white cursor-pointer"
        />
        {showClearButton && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClearSelection();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xs cursor-pointer z-20"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {/* All Cities Option */}
          <div
            onClick={() => handleSelectCity('all')}
            className={`px-3 py-2 cursor-pointer hover:bg-neutral-50 border-b border-neutral-100 ${
              value === 'all'
                ? 'bg-primary-50 text-primary-700 font-medium'
                : 'text-neutral-900'
            }`}
          >
            {allOptionLabel}
          </div>

          {/* Filtered Cities */}
          {filteredCities.length > 0 ? (
            <div className="py-1">
              {filteredCities.slice(0, 100).map((city) => (
                <div
                  key={city}
                  onClick={() => handleSelectCity(city)}
                  className={`px-3 py-2 cursor-pointer hover:bg-neutral-50 text-sm ${
                    value === city
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-neutral-700'
                  }`}
                >
                  {city}
                </div>
              ))}
              {filteredCities.length > 100 && (
                <div className="px-3 py-2 text-xs text-neutral-500 border-t border-neutral-100">
                  Showing first 100 results. Continue typing to refine...
                </div>
              )}
            </div>
          ) : searchQuery ? (
            <div className="px-3 py-2 text-neutral-500 text-sm">
              No cities found matching "{searchQuery}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
