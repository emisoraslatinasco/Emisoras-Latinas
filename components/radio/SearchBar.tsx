'use client';

import { useState, useEffect, useRef } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ 
  onSearch, 
  placeholder = "Buscar emisora por nombre...",
  className = ""
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      <div 
        className={`relative flex items-center bg-slate-800/50 backdrop-blur-sm rounded-full border-2 transition-all duration-300 ${
          isFocused 
            ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
            : 'border-slate-700 hover:border-slate-600'
        }`}
      >
        {/* Icono de lupa */}
        <div className="absolute left-5 pointer-events-none">
          <i className={`fas fa-search text-lg transition-colors duration-300 ${
            isFocused ? 'text-blue-400' : 'text-slate-400'
          }`}></i>
        </div>

        {/* Input de búsqueda */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full py-4 pl-14 pr-14 bg-transparent text-white placeholder-slate-500 focus:outline-none text-base"
          aria-label="Buscar emisora"
        />

        {/* Botón para limpiar búsqueda */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-5 w-8 h-8 flex items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600 transition-colors duration-200"
            aria-label="Limpiar búsqueda"
            type="button"
          >
            <i className="fas fa-times text-slate-300 text-sm"></i>
          </button>
        )}
      </div>

      {/* Indicador de búsqueda activa */}
      {query && (
        <div className="absolute top-full mt-3 left-0 right-0 flex items-center justify-center gap-2 text-slate-400 text-sm animate-fadeInUp">
          <i className="fas fa-filter text-blue-400"></i>
          <span>Filtrando por: <strong className="text-white">&ldquo;{query}&rdquo;</strong></span>
          <button
            onClick={handleClear}
            className="text-blue-400 hover:text-blue-300 underline ml-2"
          >
            Limpiar
          </button>
        </div>
      )}

      {/* Atajos de teclado (hint) */}
      {!query && !isFocused && (
        <div className="absolute top-full mt-3 left-0 right-0 flex items-center justify-center gap-4 text-slate-500 text-xs">
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700">Ctrl</kbd>
            <span>+</span>
            <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700">K</kbd>
            <span className="ml-1">para buscar</span>
          </span>
        </div>
      )}
    </div>
  );
}
