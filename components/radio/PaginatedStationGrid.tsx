'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { StationByCountry, CountryCode, filterByCategories, searchStations, getCategories } from '@/data/stationsByCountry';
import StationCard from './StationCard';
import Pagination from '@/components/ui/Pagination';
import SearchBar from './SearchBar';
import CategoryFilters from './CategoryFilters';

interface PaginatedStationGridProps {
  stations: StationByCountry[];
  countryCode: CountryCode;
  itemsPerPage?: number;
}

export default function PaginatedStationGrid({ 
  stations, 
  countryCode, 
  itemsPerPage = 48 
}: PaginatedStationGridProps) {
  // Estados para búsqueda, filtros y paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);

  // Calcular categorías disponibles dinámicamente
  const categories = useMemo(() => {
    return ["all", ...getCategories(stations)];
  }, [stations]);

  // Filtrar y buscar emisoras
  const filteredStations = useMemo(() => {
    let result = filterByCategories(stations, selectedCategories);
    if (searchQuery.trim()) {
      result = searchStations(result, searchQuery);
    }
    return result;
  }, [stations, selectedCategories, searchQuery]);

  const totalPages = Math.ceil(filteredStations.length / itemsPerPage);

  // Obtener emisoras de la página actual
  const paginatedStations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredStations.slice(startIndex, endIndex);
  }, [filteredStations, currentPage, itemsPerPage]);

  // Handlers
  const handleCategoriesChange = useCallback((categories: string[]) => {
    setSelectedCategories(categories);
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handlePageChange = (page: number) => {
    if (page > currentPage) {
      setSlideDirection("left");
    } else if (page < currentPage) {
      setSlideDirection("right");
    }
    setCurrentPage(page);
    setTimeout(() => setSlideDirection(null), 500);
    
    // Scroll suave al inicio de la lista
    const gridElement = document.getElementById('station-grid-top');
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Atajo de teclado para buscar (Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        document.querySelector<HTMLInputElement>('input[aria-label="Buscar emisora"]')?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div id="station-grid-top">
      {/* Barra de controles: Buscador y Filtros */}
      <section className="mb-8">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-start mb-4">
          {/* Buscador */}
          <div className="w-full sm:w-[30rem] lg:w-[40rem]">
            <SearchBar onSearch={handleSearch} compact />
          </div>

          {/* Filtros de género */}
          <CategoryFilters
            selectedCategories={selectedCategories}
            onCategoriesChange={handleCategoriesChange}
            categories={categories}
            compact
          />
        </div>

        {/* Chips de filtros activos */}
        {selectedCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-slate-400 font-medium">Filtros:</span>
            {selectedCategories.map((category) => (
              <div key={category} className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-xs font-medium">
                <span>{category}</span>
                <button
                  onClick={() => handleCategoriesChange(selectedCategories.filter((c) => c !== category))}
                  className="hover:bg-blue-700 rounded-full p-0.5 transition-colors"
                  aria-label={`Quitar filtro ${category}`}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() => handleCategoriesChange([])}
              className="text-xs text-slate-400 hover:text-white underline transition-colors"
            >
              Limpiar
            </button>
          </div>
        )}
      </section>

      {/* Info de resultados y Paginación superior */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <p className="text-slate-400 text-sm" role="status" aria-live="polite">
          Mostrando {paginatedStations.length} de {filteredStations.length} emisora{filteredStations.length !== 1 ? "s" : ""}
        </p>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            compact
          />
        )}
      </div>

      {/* Grid de Emisoras */}
      {filteredStations.length > 0 ? (
        <>
          <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 min-h-[500px] content-start ${
             slideDirection === "left" ? "animate-slide-left" : slideDirection === "right" ? "animate-slide-right" : ""
          }`}>
            {paginatedStations.map((station, index) => (
              <StationCard 
                key={`${station.nombre}-${index}`} 
                station={station} 
                index={index} 
                countryCode={countryCode} 
              />
            ))}
          </div>

          {/* Paginación Inferior */}
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      ) : (
        /* Estado vacío */
        <div className="text-center py-20 bg-slate-800/20 rounded-2xl border border-slate-700/30" role="alert">
          <i className="fas fa-search text-6xl text-slate-700 mb-4" aria-hidden="true"></i>
          <p className="text-slate-400 text-xl font-medium">No se encontraron emisoras</p>
          <p className="text-slate-500 text-sm mt-2">Intenta ajustar tus filtros o búsqueda</p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategories([]); }}
            className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm transition-colors"
          >
            Ver todas las emisoras
          </button>
        </div>
      )}
    </div>
  );
}
