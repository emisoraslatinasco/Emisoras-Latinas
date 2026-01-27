export interface StationByCountry {
  nombre: string;
  url_stream: string;
  logo_local: string | null;
  slug?: string;  // URL-friendly identifier
  descripcion?: string;
  generos?: string[];
  redes_sociales?: string[];
  sitio_web?: string;
  ciudad?: string;
  frecuencia?: string;  // e.g. "104.9 FM"
  ubicacion?: string;    // Location/city
  logo?: string | null;  // External logo URL
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

/**
 * LRU Cache para emisoras de países
 * Mantiene solo los N países más recientes para evitar saturación de memoria
 */
class LRUCache<K, V> {
  private cache: Map<K, V>;
  private maxSize: number;

  constructor(maxSize: number = 3) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      // Mover al final (más reciente)
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }

  set(key: K, value: V): void {
    // Si ya existe, eliminar para re-insertar al final
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    // Si excede el límite, eliminar el más antiguo (primero en el Map)
    else if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
        console.log(`[LRU Cache] Liberando memoria de país: ${String(firstKey)}`);
      }
    }
    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// Cache LRU con límite de 3 países para evitar saturación de memoria
const stationsCache = new LRUCache<CountryCode, StationByCountry[]>(3);

export async function loadStationsByCountry(
  countryCode: CountryCode,
): Promise<StationByCountry[]> {
  const cached = stationsCache.get(countryCode);
  if (cached) {
    console.log(`[Cache Hit] País: ${countryCode} (${cached.length} emisoras)`);
    return cached;
  }

  const country = countries.find((c) => c.code === countryCode);
  if (!country) {
    return [];
  }

  try {
    console.log(`[Cargando] País: ${countryCode} desde ${country.jsonFile}...`);
    const importedData = await import(`@/data/${country.jsonFile}`);
    const data: StationByCountry[] = importedData.default;
    stationsCache.set(countryCode, data);
    console.log(`[Cache Set] País: ${countryCode} (${data.length} emisoras, cache size: ${stationsCache.size()})`);
    return data;
  } catch (error) {
    console.error(`Error loading stations for ${countryCode}:`, error);
    return [];
  }
}

export function getCategories(stations: StationByCountry[]): string[] {
  const allGenres = stations.flatMap((s) => s.generos || []);
  return [...new Set(allGenres)].sort();
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
