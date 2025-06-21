'use client';

import { useEffect, useRef, useState } from 'react';

interface IOption {
  value: string;
  label: string;
}

interface ICustomSelectProps {
  options: IOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  error?: string;
  touched?: boolean;
  size?: 'small' | 'medium' | 'large';
  placeholder?: string;
}

const CustomSelect = ({
  options,
  value,
  onChange,
  name,
  error,
  touched,
  size = 'medium',
  placeholder = 'Välj...',
}: ICustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectedOption = options.find((option) => option.value === value);
    setSelectedLabel(selectedOption?.label || '');
  }, [value, options]);

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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={`w-full sm:w-[160px] ${
          size === 'large' ? 'sm:w-full min-w-[240px]' : 'sm:w-[160px]'
        } h-[44px] px-3 text-left bg-white rounded-md border primary-input
          ${error && touched ? 'border-red-500' : ''}
          flex items-center justify-between`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{selectedLabel || placeholder}</span>
        <svg
          className={`w-5 h-5 text-primary-dark transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute w-full z-10 ${
            size === 'large' ? 'sm:w-full' : 'sm:w-[160px]'
          } mt-1 bg-white border border-gray-200 rounded-md shadow-lg`}
        >
          <ul className="py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <li
                key={option.value}
                className={`px-3 py-2 cursor-pointer
                  ${
                    value === option.value
                      ? 'bg-primary-accent text-white'
                      : 'text-gray-900 hover:bg-primary-light'
                  }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      <input type="hidden" name={name} value={value} />
    </div>
  );
};

export default CustomSelect;
