"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  StationByCountry,
  CountryCode,
  loadStationsByCountry,
  filterByCategories,
  searchStations,
  getCategories,
} from "@/data/stationsByCountry";
import { StationCard, CategoryFilters, SearchBar } from "@/components/radio";
import CountrySelector from "./CountrySelector";
import Pagination from "@/components/ui/Pagination";
import AdSpace from "@/components/ui/AdSpace";
import DynamicHeader from "./DynamicHeader";
import { useDebounce } from "@/utils/useDebounce";

/**
 * Calcula items por página basado en el tamaño del dataset
 * Países grandes (2000+): 12 items para reducir carga del DOM
 * Países medianos (1000-2000): 18 items
 * Países pequeños (<1000): 24 items
 */
const getItemsPerPage = (totalStations: number): number => {
  if (totalStations > 2000) return 12;  // USA (4043), Francia (2390)
  if (totalStations > 1000) return 18;  // UK (1987), México (1184), Chile (1025)
  return 24;  // Colombia, Argentina, etc.
};

const STORAGE_KEY = "emisoras_latinas_country";

const validCountries: CountryCode[] = [
  "CO", "PE", "BR", "EC", "MX", "GT", "BO", "SV", "JM", "PR",
  "DO", "UA", "UY", "HN", "NI", "AR", "CL", "CR", "DK", "ES",
  "PT", "TT", "US", "VE", "FR", "IT", "GB",
];

export default function HomeContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Estado inicial fijo para evitar hydration mismatch
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>("CO");
  const [isHydrated, setIsHydrated] = useState(false);

  const [stations, setStations] = useState<StationByCountry[]>([]);
  const [isLoadingStations, setIsLoadingStations] = useState(true);

  // Estados derivados de la URL
  const currentPage = Number(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('q') || "";
  // Debounce search query para prevenir filtrado bloqueante (300ms)
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const selectedCategories = useMemo(() => {
    const categoriesParam = searchParams.get('categories');
    return categoriesParam ? categoriesParam.split(',') : [];
  }, [searchParams]);

  // Cargar país guardado desde localStorage DESPUÉS del montaje (evita hydration mismatch)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && validCountries.includes(saved as CountryCode)) {
      setSelectedCountry(saved as CountryCode);
    }
    setIsHydrated(true);
  }, []);

  // Guardar país seleccionado en localStorage (solo después de hidratación)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, selectedCountry);
    }
  }, [selectedCountry, isHydrated]);

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

  // Función para construir URLs
  const createPageUrl = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return pathname + '?' + params.toString();
  }, [searchParams, pathname]);

  const updateUrl = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    if (updates.q !== undefined || updates.categories !== undefined) {
      params.set('page', '1');
    }

    router.push(pathname + '?' + params.toString(), { scroll: false });
  }, [pathname, router, searchParams]);

  const categories = useMemo(() => {
    return ["all", ...getCategories(stations)];
  }, [stations]);

  const filteredStations = useMemo(() => {
    let result = filterByCategories(stations, selectedCategories);
    if (debouncedSearchQuery.trim()) {
      result = searchStations(result, debouncedSearchQuery);
    }
    return result;
  }, [stations, selectedCategories, debouncedSearchQuery]);

  // Paginación adaptativa basada en el tamaño del dataset
  const itemsPerPage = useMemo(() => getItemsPerPage(stations.length), [stations.length]);
  
  const totalPages = Math.ceil(filteredStations.length / itemsPerPage);

  const paginatedStations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredStations.slice(startIndex, endIndex);
  }, [filteredStations, currentPage, itemsPerPage]);

  const handleCategoriesChange = useCallback((categories: string[]) => {
    updateUrl({ 
      categories: categories.length > 0 ? categories.join(',') : null 
    });
  }, [updateUrl]);

  const handleSearch = useCallback((query: string) => {
    updateUrl({ 
      q: query || null 
    });
  }, [updateUrl]);

  const handleCountryChange = useCallback((country: CountryCode) => {
    setIsLoadingStations(true);
    setSelectedCountry(country);
    // Limpiar filtros al cambiar de país
    updateUrl({ page: '1', q: null, categories: null });
  }, [updateUrl]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        document
          .querySelector<HTMLInputElement>('input[aria-label="Buscar emisora"]')
          ?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Header dinámico según país */}
      <DynamicHeader
        selectedCountry={selectedCountry}
        stationCount={stations?.length}
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
              {/* Buscador - ancho extendido */}
              <div className="w-full sm:w-[40rem] lg:w-[50rem]">
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
                <span className="text-xs text-slate-400 font-medium">
                  Filtros:
                </span>
                {selectedCategories.map((category) => (
                  <div
                    key={category}
                    className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-xs font-medium"
                  >
                    <span>{category}</span>
                    <button
                      onClick={() =>
                        handleCategoriesChange(
                          selectedCategories.filter((c) => c !== category),
                        )
                      }
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
              <p
                className="text-slate-400 text-sm"
                role="status"
                aria-live="polite"
              >
                {isLoadingStations
                  ? "Cargando emisoras..."
                  : `Mostrando ${paginatedStations.length} de ${
                      filteredStations.length
                    } emisora${filteredStations.length !== 1 ? "s" : ""}`}
              </p>

              {/* Paginación compacta */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  createPageUrl={createPageUrl}
                  compact
                />
              )}
            </div>

            {/* Grid de Emisoras */}
            {isLoadingStations ? (
              <div className="text-center py-20">
                <i
                  className="fas fa-spinner fa-spin text-6xl text-slate-700 mb-4"
                  aria-hidden="true"
                ></i>
                <p className="text-slate-400 text-xl">Cargando emisoras...</p>
              </div>
            ) : filteredStations.length > 0 ? (
              <>
                <section aria-label="Lista de emisoras de radio">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                    {paginatedStations.map((station, index) => (
                      <StationCard
                        key={`${station.nombre}-${station.ciudad}-${index}`}
                        station={station}
                        index={index}
                        countryCode={selectedCountry}
                      />
                    ))}
                  </div>
                </section>

                {/* Paginación Inferior */}
                {totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      createPageUrl={createPageUrl}
                    />
                  </div>
                )}
              </>
            ) : (
              /* Mensaje cuando no hay resultados */
              <div className="text-center py-20" role="alert">
                <i
                  className="fas fa-search text-6xl text-slate-700 mb-4"
                  aria-hidden="true"
                ></i>
                <p className="text-slate-400 text-xl">
                  No se encontraron emisoras
                </p>
                <p className="text-slate-500 text-sm mt-2">
                  Intenta con otro término de búsqueda
                </p>
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
