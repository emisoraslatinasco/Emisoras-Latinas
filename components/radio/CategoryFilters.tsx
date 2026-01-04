'use client';

import { useState, useRef, useEffect } from 'react';
import { IoChevronDown, IoClose } from 'react-icons/io5';

interface CategoryFiltersProps {
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  categories: string[];
  compact?: boolean;
}

export default function CategoryFilters({ selectedCategories, onCategoriesChange, categories, compact = false }: CategoryFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const genreCategories = categories.filter(c => c !== 'all');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoriesChange([...selectedCategories, category]);
    }
  };

  const removeCategory = (category: string) => {
    onCategoriesChange(selectedCategories.filter(c => c !== category));
  };

  const clearAll = () => {
    onCategoriesChange([]);
  };

  return (
    <div className={compact ? 'flex items-center gap-2' : 'space-y-3'}>
      {/* Chips de categorías seleccionadas - solo en modo no compacto */}
      {!compact && selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-slate-400 font-medium">Filtros activos:</span>
          {selectedCategories.map((category) => (
            <div
              key={category}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium shadow-md"
            >
              <span>{category}</span>
              <button
                onClick={() => removeCategory(category)}
                className="hover:bg-blue-700 rounded-full p-0.5 transition-colors"
                aria-label={`Quitar filtro ${category}`}
              >
                <IoClose size={14} />
              </button>
            </div>
          ))}
          <button
            onClick={clearAll}
            className="text-xs text-slate-400 hover:text-white underline transition-colors"
          >
            Limpiar todo
          </button>
        </div>
      )}

      {/* Desplegable de categorías */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between bg-slate-800/50 hover:bg-slate-700/70 text-slate-300 rounded-lg transition-all duration-200 font-medium border border-slate-700 ${
            compact ? 'px-3 py-2 text-sm gap-2 min-w-[140px]' : 'w-full px-4 py-2.5 text-sm'
          }`}
        >
          <span className={compact ? 'truncate' : ''}>
            {selectedCategories.length === 0
              ? (compact ? 'Géneros' : 'Seleccionar géneros')
              : `${selectedCategories.length} género${selectedCategories.length > 1 ? 's' : ''}`}
          </span>
          <IoChevronDown
            size={compact ? 14 : 18}
            className={`transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Menú desplegable */}
        {isOpen && (
          <div className={`absolute z-50 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl max-h-80 overflow-y-auto ${
            compact ? 'min-w-[400px] right-0' : 'min-w-[500px]'
          }`}>
            <div className={`grid gap-1 p-2 ${
              genreCategories.length > 12 ? 'grid-cols-3' : genreCategories.length > 6 ? 'grid-cols-2' : 'grid-cols-1'
            }`}>
              {genreCategories.map((category) => (
                <label
                  key={category}
                  className={`flex items-center gap-2 hover:bg-slate-700/70 cursor-pointer transition-colors rounded-md ${
                    compact ? 'px-2 py-1.5' : 'px-3 py-2'
                  } ${selectedCategories.includes(category) ? 'bg-blue-600/20' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer flex-shrink-0"
                  />
                  <span className="text-sm text-slate-300 truncate">{category}</span>
                </label>
              ))}
            </div>
            {selectedCategories.length > 0 && (
              <button
                onClick={clearAll}
                className="w-full px-3 py-2 text-xs text-slate-400 hover:text-white hover:bg-slate-700/70 border-t border-slate-700 transition-colors"
              >
                Limpiar filtros ({selectedCategories.length})
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
