'use client';

import { useState, useMemo, memo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { countries, CountryCode } from '@/data/stationsByCountry';

// Memoized country item component to prevent unnecessary re-renders
interface CountryItemProps {
  country: { code: CountryCode; name: string; flag: string };
  isSelected: boolean;
  onSelect: (code: CountryCode) => void;
}

const CountryItem = memo(function CountryItem({ country, isSelected, onSelect }: CountryItemProps) {
  return (
    <Link
      href={`/radio/${country.code.toLowerCase()}`}
      onClick={() => onSelect(country.code)}
      className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all hover:scale-105 ${
        isSelected
          ? 'border-blue-500 ring-2 ring-blue-500/20'
          : 'border-slate-600 hover:border-slate-400'
      }`}
      aria-label={`Ir a emisoras de ${country.name}`}
      title={country.name}
    >
      <Image
        src={country.flag}
        alt={country.name}
        width={60}
        height={60}
        loading="lazy"
        className="w-full h-full object-cover"
        unoptimized
      />
    </Link>
  );
});

interface CountrySelectorProps {
  onCountryChange?: (countryCode: CountryCode) => void;
  selectedCountry: CountryCode;
}

export default function CountrySelector({ onCountryChange, selectedCountry }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCountrySelect = useCallback((countryCode: CountryCode) => {
    if (onCountryChange) {
      onCountryChange(countryCode);
    }
    setIsOpen(false);
    setSearchQuery('');
  }, [onCountryChange]);

  // Memoize filtered countries to prevent recalculation on every render
  const filteredCountries = useMemo(() => 
    countries.filter(country =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery]
  );

  const selectedCountryData = useMemo(() => 
    countries.find(c => c.code === selectedCountry),
    [selectedCountry]
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-2 ml-2 rounded-lg bg-slate-800/50 border-2 border-slate-700 hover:border-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
        aria-label={`País seleccionado: ${selectedCountryData?.name || 'Seleccionar país'}. Clic para cambiar.`}
        aria-expanded={isOpen}
      >
        <div className="w-12 h-10 rounded-sm overflow-hidden flex-shrink-0 bg-slate-700">
          {selectedCountryData && (
            <Image
              src={selectedCountryData.flag}
              alt={selectedCountryData.name}
              width={48}
              height={40}
              className="w-full h-full object-cover"
              unoptimized
            />
          )}
        </div>
        <div className="flex flex-col items-start">
          <span className="text-white font-semibold text-sm">
            {selectedCountryData?.name || 'Seleccionar'}
          </span>
          <span className="text-slate-500 text-xs">Cambiar país ▼</span>
        </div>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-14 left-0 z-20 bg-slate-800 rounded-lg shadow-xl border border-slate-700 p-2 space-y-2 w-[420px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar país..."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              autoFocus
            />
            <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto p-1 custom-scrollbar">
              {filteredCountries.map((country) => (
                <CountryItem
                  key={country.code}
                  country={country}
                  isSelected={selectedCountry === country.code}
                  onSelect={handleCountrySelect}
                />
              ))}
              {filteredCountries.length === 0 && (
                <p className="col-span-6 text-slate-500 text-xs text-center py-4">
                  No encontrado
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
