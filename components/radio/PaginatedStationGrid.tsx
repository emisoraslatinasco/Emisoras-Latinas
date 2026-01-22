'use client';

import { useMemo, useCallback, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Estados derivados de la URL
  const currentPage = Number(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('q') || "";
  const selectedCategories = useMemo(() => {
    const categoriesParam = searchParams.get('categories');
    return categoriesParam ? categoriesParam.split(',') : [];
  }, [searchParams]);


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

  // Función para construir URLs de paginación manteniendo filtros
  const createPageUrl = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return pathname + '?' + params.toString();
  }, [searchParams, pathname]);

  // Handlers que actualizan la URL
  const updateUrl = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Resetear página a 1 cuando cambian filtros
    if (updates.q !== undefined || updates.categories !== undefined) {
      params.set('page', '1');
    }

    router.push(pathname + '?' + params.toString(), { scroll: false });
  }, [pathname, router, searchParams]);

  const handleCategoriesChange = useCallback((newCategories: string[]) => {
    // Solo actualizar si realmente cambió
    const currentCategoriesStr = searchParams.get('categories') || '';
    const newCategoriesStr = newCategories.join(',');
    if (currentCategoriesStr === newCategoriesStr) return;
    
    updateUrl({ 
      categories: newCategories.length > 0 ? newCategoriesStr : null 
    });
  }, [updateUrl, searchParams]);

  const handleSearch = useCallback((query: string) => {
    // Solo actualizar si realmente cambió
    const currentQuery = searchParams.get('q') || '';
    if (currentQuery === query) return;
    
    updateUrl({ 
      q: query || null 
    });
  }, [updateUrl, searchParams]);

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
            <SearchBar onSearch={handleSearch} compact initialValue={searchQuery} />
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
            createPageUrl={createPageUrl} // Usar URLs reales para SEO
            compact
          />
        )}
      </div>

      {/* Grid de Emisoras */}
      {filteredStations.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 min-h-[500px] content-start">
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
                createPageUrl={createPageUrl} // Usar URLs reales para SEO
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
            onClick={() => { updateUrl({ q: null, categories: null }); }}
            className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm transition-colors"
          >
            Ver todas las emisoras
          </button>
        </div>
      )}
    </div>
  );
}
