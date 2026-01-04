'use client';

import { useState } from 'react';
import { countries, CountryCode } from '@/data/stationsByCountry';

interface CountrySelectorProps {
  onCountryChange: (countryCode: CountryCode) => void;
  selectedCountry: CountryCode;
}

export default function CountrySelector({ onCountryChange, selectedCountry }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCountrySelect = (countryCode: CountryCode) => {
    onCountryChange(countryCode);
    setIsOpen(false);
    setSearchQuery('');
  };

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCountryData = countries.find(c => c.code === selectedCountry);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-12 ml-2 rounded-sm overflow-hidden border-2 border-slate-700 hover:border-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
        aria-label={`País seleccionado: ${selectedCountryData?.name}`}
      >
        <img
          src={selectedCountryData?.flag}
          alt={selectedCountryData?.name}
          className="w-full h-full object-cover"
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed left-32 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-14 left-0 z-20 bg-slate-800 rounded-lg shadow-xl border border-slate-700 p-2 space-y-2 w-xs">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar país..."
              className="w-full px-3 py-2 bg-transparent border border-slate-600 rounded text-white placeholder-slate-500 text-sm focus:outline-none focus:border-slate-400 transition-colors"
              autoFocus
            />
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredCountries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleCountrySelect(country.code)}
                  className={`w-12 h-12 rounded-sm overflow-hidden border-2 transition-colors ${
                    selectedCountry === country.code
                      ? 'border-blue-500'
                      : 'border-slate-700 hover:border-slate-500'
                  }`}
                  aria-label={country.name}
                >
                  <img
                    src={country.flag}
                    alt={country.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
              {filteredCountries.length === 0 && (
                <p className="text-slate-500 text-sm text-center py-2">
                  No se encontraron países
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
