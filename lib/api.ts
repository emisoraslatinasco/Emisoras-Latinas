/**
 * Cliente API para comunicación con el backend de Emisoras Latinas
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export interface Country {
  id: string;
  code: string;
  name: string;
  flagUrl: string;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
}

export interface SocialNetwork {
  id: string;
  url: string;
  platform: string | null;
}

export interface Station {
  id: string;
  nombre: string;
  slug: string;
  urlStream: string;
  logoUrl: string | null;
  descripcion: string | null;
  descripcionExtendida: string | null;
  ciudad: string | null;
  frecuencia: string | null;
  sitioWeb: string | null;
  eslogan: string | null;
  fundacion: string | null;
  contenidoEnriquecido: boolean;
  fechaEnriquecimiento: string | null;
  activo: boolean;
  country: Country;
  genres: Genre[];
  socialNetworks: SocialNetwork[];
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface FilterParams {
  page?: number;
  limit?: number;
  genres?: string;
  search?: string;
  city?: string;
}

/**
 * Obtener todos los países disponibles
 */
export async function getCountries(): Promise<Country[]> {
  const res = await fetch(`${API_BASE_URL}/countries`, {
    next: { revalidate: 3600 }, // Cache por 1 hora
  });

  if (!res.ok) {
    throw new Error(`Error fetching countries: ${res.status}`);
  }

  return res.json();
}

/**
 * Obtener un país por su código
 */
export async function getCountryByCode(code: string): Promise<Country> {
  const res = await fetch(`${API_BASE_URL}/countries/${code}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Error fetching country ${code}: ${res.status}`);
  }

  return res.json();
}

/**
 * Obtener emisoras de un país con filtros y paginación
 */
export async function getStationsByCountry(
  countryCode: string,
  params?: FilterParams,
): Promise<PaginatedResponse<Station>> {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.genres) searchParams.set("genres", params.genres);
  if (params?.search) searchParams.set("search", params.search);
  if (params?.city) searchParams.set("city", params.city);

  const queryString = searchParams.toString();
  const url = `${API_BASE_URL}/countries/${countryCode}/stations${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url, {
    next: { revalidate: 60 }, // Cache por 1 minuto
  });

  if (!res.ok) {
    throw new Error(
      `Error fetching stations for ${countryCode}: ${res.status}`,
    );
  }

  return res.json();
}

/**
 * Obtener géneros disponibles en un país
 */
export async function getGenresByCountry(
  countryCode: string,
): Promise<string[]> {
  const res = await fetch(`${API_BASE_URL}/countries/${countryCode}/genres`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Error fetching genres for ${countryCode}: ${res.status}`);
  }

  return res.json();
}

/**
 * Obtener una emisora por su slug
 */
export async function getStationBySlug(slug: string): Promise<Station> {
  const res = await fetch(`${API_BASE_URL}/stations/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Error fetching station ${slug}: ${res.status}`);
  }

  return res.json();
}

/**
 * Buscar emisoras
 */
export async function searchStations(
  query: string,
  limit: number = 20,
): Promise<Station[]> {
  const res = await fetch(
    `${API_BASE_URL}/stations/search?q=${encodeURIComponent(query)}&limit=${limit}`,
    {
      next: { revalidate: 0 }, // Sin cache para búsquedas
    },
  );

  if (!res.ok) {
    throw new Error(`Error searching stations: ${res.status}`);
  }

  return res.json();
}

/**
 * Obtener todas las emisoras con filtros (global)
 */
export async function getAllStations(
  params?: FilterParams,
): Promise<PaginatedResponse<Station>> {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.genres) searchParams.set("genres", params.genres);
  if (params?.search) searchParams.set("search", params.search);
  if (params?.city) searchParams.set("city", params.city);

  const queryString = searchParams.toString();
  const url = `${API_BASE_URL}/stations${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Error fetching all stations: ${res.status}`);
  }

  return res.json();
}

/**
 * Obtener todos los géneros
 */
export async function getAllGenres(): Promise<Genre[]> {
  const res = await fetch(`${API_BASE_URL}/genres`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Error fetching genres: ${res.status}`);
  }

  return res.json();
}

/**
 * Construir URL completa para assets estáticos del backend
 */
/**
 * Construir URL completa para assets estáticos del backend
 */
export function getStaticUrl(path: string): string {
  // Usar API_BASE_URL que ya tiene corrección de protocolo y sufijo /api
  const baseUrl = API_BASE_URL.replace(/\/api$/, "");
  return `${baseUrl}${path}`;
}

/**
 * Obtener URL de logo de una emisora
 */
export function getLogoUrl(station: Station): string | null {
  if (!station.logoUrl) return null;
  return getStaticUrl(station.logoUrl);
}

/**
 * Obtener URL de bandera de un país
 */
export function getFlagUrl(country: Country): string {
  return getStaticUrl(country.flagUrl);
}
