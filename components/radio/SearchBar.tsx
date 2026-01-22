'use client';

import { useState, useEffect, useRef } from 'react';
import { useI18n } from '@/utils/useI18n';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  compact?: boolean;
  initialValue?: string;
}

export default function SearchBar({ 
  onSearch, 
  placeholder,
  className = "",
  compact = false,
  initialValue = ""
}: SearchBarProps) {
  const { t } = useI18n();
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // Ref para rastrear si el cambio viene del usuario (input) o de sincronización externa
  const isUserTyping = useRef(false);
  
  // Use provided placeholder or fallback to i18n
  const finalPlaceholder = placeholder || t.search_placeholder;

  // Sincronizar con initialValue cuando cambia (ej. navegación con URL)
  // Pero NO disparar onSearch aquí
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  // Debounce para búsqueda - SOLO cuando el usuario escribe
  useEffect(() => {
    // Solo ejecutar si el usuario está escribiendo
    if (!isUserTyping.current) {
      return;
    }
    
    const debounceTimer = setTimeout(() => {
      onSearch(query);
      isUserTyping.current = false; // Reset después de enviar
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, onSearch]);

  // Handler para cambios del usuario en el input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isUserTyping.current = true; // Marcar que es input del usuario
    setQuery(e.target.value);
  };

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
    <div className={`relative ${compact ? 'w-full' : 'w-full max-w-2xl mx-auto'} ${className}`}>
      <div 
        className={`relative flex items-center bg-slate-800/50 backdrop-blur-sm rounded-lg border transition-all duration-300 ${
          isFocused 
            ? 'border-blue-500 shadow-md shadow-blue-500/20' 
            : 'border-slate-700 hover:border-slate-600'
        }`}
      >
        {/* Icono de lupa */}
        <div className={`absolute ${compact ? 'left-3' : 'left-5'} pointer-events-none`}>
          <i className={`fas fa-search ${compact ? 'text-sm' : 'text-lg'} transition-colors duration-300 ${
            isFocused ? 'text-blue-400' : 'text-slate-400'
          }`}></i>
        </div>

        {/* Input de búsqueda */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={finalPlaceholder}
          className={`w-full ${compact ? 'py-2 pl-9 pr-9 text-sm' : 'py-4 pl-14 pr-14 text-base'} bg-transparent text-white placeholder-slate-500 focus:outline-none`}
          aria-label={t.search_placeholder}
        />

        {/* Botón para limpiar búsqueda */}
        {query && (
          <button
            onClick={handleClear}
            className={`absolute ${compact ? 'right-2 w-6 h-6' : 'right-5 w-8 h-8'} flex items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600 transition-colors duration-200`}
            aria-label={t.clear}
            type="button"
          >
            <i className={`fas fa-times text-slate-300 ${compact ? 'text-xs' : 'text-sm'}`}></i>
          </button>
        )}
      </div>

      {/* Indicador de búsqueda activa - solo en modo no compacto */}
      {!compact && query && (
        <div className="absolute top-full mt-3 left-0 right-0 flex items-center justify-center gap-2 text-slate-400 text-sm animate-fadeInUp">
          <i className="fas fa-filter text-blue-400"></i>
          <span>{t.filtering_by}: <strong className="text-white">&ldquo;{query}&rdquo;</strong></span>
          <button
            onClick={handleClear}
            className="text-blue-400 hover:text-blue-300 underline ml-2"
          >
            {t.clear}
          </button>
        </div>
      )}
    </div>
  );
}
