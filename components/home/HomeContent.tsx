'use client';

import { useState, useMemo, useEffect } from 'react';
import { filterByCategory, searchStations, Station } from '@/data/stations';
import { StationCard, CategoryFilters, SearchBar } from '@/components/radio';

export default function HomeContent() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStations = useMemo(() => {
    let result: Station[] = filterByCategory(selectedCategory);
    if (searchQuery.trim()) {
      result = searchStations(searchQuery).filter(
        s => selectedCategory === 'all' || s.category === selectedCategory
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector<HTMLInputElement>('input[aria-label="Buscar emisora"]')?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Buscador */}
      <section className="container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} />
      </section>

      {/* Categorías/Filtros */}
      <section className="container mx-auto px-4 py-8">
        <CategoryFilters
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </section>

      {/* Main - Grid de Emisoras */}
      <main className="container mx-auto px-4 py-8 max-w-7xl flex-1" role="main">
        {/* Contador de resultados */}
        <div className="mb-6">
          <p className="text-slate-400 text-sm" role="status" aria-live="polite">
            Mostrando {filteredStations.length} emisora{filteredStations.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Grid de Emisoras */}
        {filteredStations.length > 0 ? (
          <section aria-label="Lista de emisoras de radio">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
              {filteredStations.map((station, index) => (
                <StationCard key={station.id} station={station} index={index} />
              ))}
            </div>
          </section>
        ) : (
          /* Mensaje cuando no hay resultados */
          <div className="text-center py-20" role="alert">
            <i className="fas fa-search text-6xl text-slate-700 mb-4" aria-hidden="true"></i>
            <p className="text-slate-400 text-xl">No se encontraron emisoras</p>
            <p className="text-slate-500 text-sm mt-2">Intenta con otro término de búsqueda</p>
          </div>
        )}

        {/* Espacio para anuncio intermedio */}
        <aside className="mt-12 mb-8" aria-label="Publicidad intermedia">
          <div className="w-full max-w-4xl mx-auto h-32 bg-slate-800/50 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-600">
            <p className="text-slate-500 text-sm font-medium">Espacio publicitario 728x90</p>
          </div>
        </aside>
      </main>
    </>
  );
}
