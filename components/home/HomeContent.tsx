'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { StationByCountry, CountryCode, loadStationsByCountry, filterByCategories, searchStations, getCategories } from '@/data/stationsByCountry';
import { StationCard, CategoryFilters, SearchBar } from '@/components/radio';
import CountrySelector from './CountrySelector';
import Pagination from '@/components/ui/Pagination';
import AdSpace from '@/components/ui/AdSpace';
import DynamicHeader from './DynamicHeader';

const ITEMS_PER_PAGE = 50;

const STORAGE_KEY = 'emisoras_latinas_country';

export default function HomeContent() {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(() => {
    // Intentar recuperar del localStorage solo en cliente
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && ['CO', 'PE', 'BR', 'EC', 'MX', 'GT', 'BO', 'SV', 'JM', 'PR', 'DO', 'UA', 'UY'].includes(saved)) {
        return saved as CountryCode;
      }
    }
    return 'EC';
  });
  const [stations, setStations] = useState<StationByCountry[]>([]);
  const [isLoadingStations, setIsLoadingStations] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  // Guardar país seleccionado en localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, selectedCountry);
    }
  }, [selectedCountry]);

  useEffect(() => {
    let cancelled = false;
    
    const loadData = async () => {
      try {
        const data = await loadStationsByCountry(selectedCountry);
        if (!cancelled) {
          setStations(data);
          setIsLoadingStations(false);
        }
      } catch {
        if (!cancelled) {
          setStations([]);
          setIsLoadingStations(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, [selectedCountry]);

  const categories = useMemo(() => {
    return ['all', ...getCategories(stations)];
  }, [stations]);

  const filteredStations = useMemo(() => {
    let result = filterByCategories(stations, selectedCategories);
    if (searchQuery.trim()) {
      result = searchStations(result, searchQuery);
    }
    return result;
  }, [stations, selectedCategories, searchQuery]);

  const totalPages = Math.ceil(filteredStations.length / ITEMS_PER_PAGE);

  const paginatedStations = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredStations.slice(startIndex, endIndex);
  }, [filteredStations, currentPage]);

  const handleCategoriesChange = useCallback((categories: string[]) => {
    setSelectedCategories(categories);
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleCountryChange = useCallback((country: CountryCode) => {
    setIsLoadingStations(true);
    setSelectedCountry(country);
    setCurrentPage(1);
  }, []);

  const handlePageChange = (page: number) => {
    // Determinar dirección del slide
    if (page > currentPage) {
      setSlideDirection('left'); // Avanzar: slide hacia la izquierda
    } else if (page < currentPage) {
      setSlideDirection('right'); // Retroceder: slide hacia la derecha
    }
    
    setCurrentPage(page);
    
    // Resetear dirección después de la animación
    setTimeout(() => setSlideDirection(null), 500);
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
      {/* Header dinámico según país */}
      <DynamicHeader 
        selectedCountry={selectedCountry} 
        stationCount={stations.length} 
      />

      <div className="flex justify-center gap-4 px-4">
        {/* Publicidad lateral izquierda - solo visible en pantallas grandes */}
        <aside className="hidden 2xl:block flex-shrink-0 pt-8">
          <div className="sticky top-4">
            <AdSpace 
              width="w-40" 
              height="h-[600px]" 
              label="Publicidad" 
              orientation="vertical" 
            />
          </div>
        </aside>

        {/* Contenido principal */}
        <div className="flex-1 max-w-7xl">
          {/* Country Selector */}
          <section className="pt-6">
            <CountrySelector
              selectedCountry={selectedCountry}
              onCountryChange={handleCountryChange}
            />
          </section>

        {/* Barra de controles: Buscador y Filtros alineados a la izquierda */}
        <section className="py-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-start">
            {/* Buscador - ancho limitado */}
            <div className="w-full sm:w-64">
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
            <div className="flex flex-wrap gap-2 items-center mt-3">
              <span className="text-xs text-slate-400 font-medium">Filtros:</span>
              {selectedCategories.map((category) => (
                <div
                  key={category}
                  className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-xs font-medium"
                >
                  <span>{category}</span>
                  <button
                    onClick={() => handleCategoriesChange(selectedCategories.filter(c => c !== category))}
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

        {/* Main - Grid de Emisoras */}
        <main className="py-8 flex-1" role="main">
        {/* Contador de resultados y Paginación en la misma línea */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <p className="text-slate-400 text-sm" role="status" aria-live="polite">
            {isLoadingStations ? 'Cargando emisoras...' : `Mostrando ${paginatedStations.length} de ${filteredStations.length} emisora${filteredStations.length !== 1 ? 's' : ''}`}
          </p>
          
          {/* Paginación compacta */}
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
        {isLoadingStations ? (
          <div className="text-center py-20">
            <i className="fas fa-spinner fa-spin text-6xl text-slate-700 mb-4" aria-hidden="true"></i>
            <p className="text-slate-400 text-xl">Cargando emisoras...</p>
          </div>
        ) : filteredStations.length > 0 ? (
          <>
            <section aria-label="Lista de emisoras de radio">
              <div 
                className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 ${
                  slideDirection === 'left' ? 'animate-slide-left' : 
                  slideDirection === 'right' ? 'animate-slide-right' : ''
                }`}
              >
                {paginatedStations.map((station, index) => (
                  <StationCard key={`${station.nombre}-${station.ciudad}-${index}`} station={station} index={index} countryCode={selectedCountry} />
                ))}
              </div>
            </section>

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
          /* Mensaje cuando no hay resultados */
          <div className="text-center py-20" role="alert">
            <i className="fas fa-search text-6xl text-slate-700 mb-4" aria-hidden="true"></i>
            <p className="text-slate-400 text-xl">No se encontraron emisoras</p>
            <p className="text-slate-500 text-sm mt-2">Intenta con otro término de búsqueda</p>
          </div>
        )}

          {/* Espacio para anuncio intermedio */}
          <AdSpace 
            width="w-full max-w-4xl mx-auto" 
            height="h-24" 
            label="Publicidad" 
            className="mt-12 mb-8"
          />
        </main>
      </div>

      {/* Publicidad lateral derecha - solo visible en pantallas grandes */}
      <aside className="hidden 2xl:block flex-shrink-0 pt-8">
        <div className="sticky top-4">
          <AdSpace 
            width="w-40" 
            height="h-[600px]" 
            label="Publicidad" 
            orientation="vertical" 
          />
        </div>
      </aside>
      </div>
    </>
  );
}
