'use client';

import { getCategories } from '@/data/stations';

interface CategoryFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilters({ selectedCategory, onCategoryChange }: CategoryFiltersProps) {
  const categories = getCategories();

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {/* Botón "Todas" */}
      <button
        onClick={() => onCategoryChange('all')}
        className={`category-btn px-6 py-2 rounded-full font-medium transition-all duration-300 ${
          selectedCategory === 'all'
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
            : 'bg-slate-700 text-white hover:bg-slate-600'
        }`}
      >
        <i className="fas fa-th-large mr-2"></i>Todas
      </button>

      {/* Botones de categorías */}
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`category-btn px-6 py-2 rounded-full font-medium transition-all duration-300 ${
            selectedCategory === category
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
              : 'bg-slate-700 text-white hover:bg-slate-600'
          }`}
        >
          <i className="fas fa-music mr-2"></i>{category}
        </button>
      ))}
    </div>
  );
}
