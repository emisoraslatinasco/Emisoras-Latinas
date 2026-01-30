export interface StationByCountry {
  nombre: string;
  url_stream: string;
  logo_local: string | null;
  slug?: string; // URL-friendly identifier
  descripcion?: string;
  generos?: string[];
  redes_sociales?: string[];
  sitio_web?: string;
  ciudad?: string;
  frecuencia?: string; // e.g. "104.9 FM"
  ubicacion?: string; // Location/city
  logo?: string | null; // External logo URL
}

export type CountryCode =
  | "CO"
  | "AR"
  | "PE"
  | "BR"
  | "EC"
  | "MX"
  | "GT"
  | "BO"
  | "SV"
  | "HN"
  | "NI"
  | "JM"
  | "PR"
  | "DO"
  | "UA"
  | "UY"
  | "CL"
  | "CR"
  | "DK"
  | "ES"
  | "PT"
  | "TT"
  | "US"
  | "VE"
  | "FR"
  | "IT"
  | "GB";

export interface Country {
  code: CountryCode;
  name: string;
  flag: string;
  jsonFile: string;
}

export const countries: Country[] = [
  {
    code: "CO",
    name: "Colombia",
    flag: "/flags/colombia.jpg",
    jsonFile: "emisoras_colombia.json",
  },
  {
    code: "AR",
    name: "Argentina",
    flag: "/flags/argentina.jpg",
    jsonFile: "emisoras_argentinas.json",
  },
  {
    code: "PE",
    name: "Perú",
    flag: "/flags/peru.jpg",
    jsonFile: "emisoras_peru.json",
  },
  {
    code: "BR",
    name: "Brasil",
    flag: "/flags/brasil.jpg",
    jsonFile: "emisoras_brasil.json",
  },
  {
    code: "VE",
    name: "Venezuela",
    flag: "/flags/venezuela.jpg",
    jsonFile: "emisoras_venezuela.json",
  },
  {
    code: "EC",
    name: "Ecuador",
    flag: "/flags/ecuador.jpg",
    jsonFile: "emisoras_ecuador.json",
  },
  {
    code: "MX",
    name: "México",
    flag: "/flags/mexico.jpg",
    jsonFile: "emisoras_mexico.json",
  },
  {
    code: "GT",
    name: "Guatemala",
    flag: "/flags/guatemala.png",
    jsonFile: "emisoras_guatemala.json",
  },
  {
    code: "BO",
    name: "Bolivia",
    flag: "/flags/bolivia.png",
    jsonFile: "emisoras_bolivia.json",
  },
  {
    code: "SV",
    name: "El Salvador",
    flag: "/flags/el_salvador.jpg",
    jsonFile: "emisoras_elsalvador.json",
  },
  {
    code: "HN",
    name: "Honduras",
    flag: "/flags/honduras.jpg",
    jsonFile: "emisoras_honduras.json",
  },
  {
    code: "NI",
    name: "Nicaragua",
    flag: "/flags/nicaragua.jpg",
    jsonFile: "emisoras_nicaragua.json",
  },
  {
    code: "JM",
    name: "Jamaica",
    flag: "/flags/jamaica.jpg",
    jsonFile: "emisoras_jamaica.json",
  },
  {
    code: "PR",
    name: "Puerto Rico",
    flag: "/flags/puerto_rico.jpg",
    jsonFile: "emisoras_puertorico.json",
  },
  {
    code: "DO",
    name: "República Dominicana",
    flag: "/flags/republica_dominicana.jpg",
    jsonFile: "emisoras_republica_dominicana.json",
  },
  {
    code: "UA",
    name: "Ucrania",
    flag: "/flags/ucrania.jpg",
    jsonFile: "emisoras_ucrania.json",
  },
  {
    code: "UY",
    name: "Uruguay",
    flag: "/flags/uruguay.png",
    jsonFile: "emisoras_uruguay.json",
  },
  {
    code: "CL",
    name: "Chile",
    flag: "/flags/chile.jpg",
    jsonFile: "emisoras_chile.json",
  },
  {
    code: "CR",
    name: "Costa Rica",
    flag: "/flags/costa_rica.jpg",
    jsonFile: "emisoras_costarica.json",
  },
  {
    code: "DK",
    name: "Dinamarca",
    flag: "/flags/dinamarca.jpg",
    jsonFile: "emisoras_dinamarca.json",
  },
  {
    code: "ES",
    name: "España",
    flag: "/flags/españa.jpg",
    jsonFile: "emisoras_españa.json",
  },
  {
    code: "PT",
    name: "Portugal",
    flag: "/flags/portugal.jpg",
    jsonFile: "emisoras_portugal.json",
  },
  {
    code: "TT",
    name: "Trinidad y Tobago",
    flag: "/flags/trinidad_tobago.jpg",
    jsonFile: "emisoras_trinidad_y_tobago.json",
  },
  {
    code: "US",
    name: "Estados Unidos",
    flag: "/flags/usa.jpg",
    jsonFile: "emisoras_usa.json",
  },
  {
    code: "FR",
    name: "Francia",
    flag: "/flags/francia.jpg",
    jsonFile: "emisoras_francia.json",
  },
  {
    code: "IT",
    name: "Italia",
    flag: "/flags/italia.jpg",
    jsonFile: "emisoras_italia.json",
  },
  {
    code: "GB",
    name: "Reino Unido",
    flag: "/flags/reino_unido.jpg",
    jsonFile: "emisoras_reino_unido.json",
  },
];

// Cache para evitar recargar JSON de países ya cargados
const stationsCache = new Map<CountryCode, StationByCountry[]>();

// Para rastrear cargas en progreso y evitar duplicados
const loadingPromises = new Map<CountryCode, Promise<StationByCountry[]>>();

export async function loadStationsByCountry(
  countryCode: CountryCode,
): Promise<StationByCountry[]> {
  // 1. Verificar cache primero
  const cached = stationsCache.get(countryCode);
  if (cached) {
    console.log(`[Cache HIT] País: ${countryCode} (${cached.length} emisoras)`);
    return cached;
  }

  // 2. Si ya hay una carga en progreso para este país, esperarla
  const existingPromise = loadingPromises.get(countryCode);
  if (existingPromise) {
    console.log(`[Esperando] Carga en progreso para ${countryCode}...`);
    return existingPromise;
  }

  const country = countries.find((c) => c.code === countryCode);
  if (!country) {
    return [];
  }

  // 3. Crear nueva promesa de carga
  const loadPromise = (async () => {
    try {
      console.log(
        `[Cargando] País: ${countryCode} desde ${country.jsonFile}...`,
      );
      const importedData = await import(`@/data/${country.jsonFile}`);
      const data: StationByCountry[] = importedData.default;

      // Guardar en cache
      stationsCache.set(countryCode, data);
      console.log(
        `[Cargado + Cached] País: ${countryCode} (${data.length} emisoras)`,
      );

      return data;
    } catch (error) {
      console.error(`Error loading stations for ${countryCode}:`, error);
      return [];
    } finally {
      // Limpiar promesa de carga
      loadingPromises.delete(countryCode);
    }
  })();

  // Registrar promesa de carga
  loadingPromises.set(countryCode, loadPromise);

  return loadPromise;
}

// Función para limpiar cache si es necesario (ej: para liberar memoria)
export function clearStationsCache(countryCode?: CountryCode): void {
  if (countryCode) {
    stationsCache.delete(countryCode);
    console.log(`[Cache] Limpiado: ${countryCode}`);
  } else {
    stationsCache.clear();
    console.log(`[Cache] Limpiado completamente`);
  }
}

// Función para pre-cargar un país en background
export function preloadCountry(countryCode: CountryCode): void {
  if (!stationsCache.has(countryCode) && !loadingPromises.has(countryCode)) {
    console.log(`[Preload] Iniciando carga anticipada de ${countryCode}...`);
    loadStationsByCountry(countryCode);
  }
}
// Cache para categorías por país (evita recalcular con datasets grandes)
const categoriesCache = new Map<CountryCode, string[]>();

export function getCategories(
  stations: StationByCountry[],
  countryCode?: CountryCode,
): string[] {
  // Si tenemos countryCode, verificar cache
  if (countryCode) {
    const cached = categoriesCache.get(countryCode);
    if (cached) return cached;
  }

  // Usar Set directamente para mejor rendimiento con datasets grandes
  const genreSet = new Set<string>();
  for (let i = 0; i < stations.length; i++) {
    const generos = stations[i].generos;
    if (generos) {
      for (let j = 0; j < generos.length; j++) {
        genreSet.add(generos[j]);
      }
    }
  }

  const result = Array.from(genreSet).sort();

  // Guardar en cache si tenemos countryCode
  if (countryCode) {
    categoriesCache.set(countryCode, result);
  }

  return result;
}

export function filterByCategory(
  stations: StationByCountry[],
  category: string,
): StationByCountry[] {
  if (category === "all") return stations;
  return stations.filter((s) => s.generos?.includes(category) || false);
}

export function filterByCategories(
  stations: StationByCountry[],
  categories: string[],
): StationByCountry[] {
  if (categories.length === 0) return stations;
  return stations.filter(
    (s) => s.generos?.some((g) => categories.includes(g)) || false,
  );
}

/**
 * Normaliza texto removiendo acentos y diacríticos
 * Ej: "olímpica" -> "olimpica", "niño" -> "nino"
 */
function normalizeText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function searchStations(
  stations: StationByCountry[],
  query: string,
): StationByCountry[] {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return stations;

  return stations.filter(
    (station) =>
      normalizeText(station.nombre).includes(normalizedQuery) ||
      station.generos?.some((g) =>
        normalizeText(g).includes(normalizedQuery),
      ) ||
      false ||
      (station.descripcion &&
        normalizeText(station.descripcion).includes(normalizedQuery)) ||
      false ||
      (station.ciudad &&
        normalizeText(station.ciudad).includes(normalizedQuery)) ||
      false,
  );
}
