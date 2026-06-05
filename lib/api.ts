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
  isVip: boolean;
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
    next: { revalidate: 86400 }, // Catálogo casi inmutable: 24h
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
    next: { revalidate: 86400 },
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
    next: { revalidate: 21600 }, // 6h: el catálogo de emisoras cambia muy poco
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
    next: { revalidate: 86400 },
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
    next: { revalidate: 21600 },
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
    next: { revalidate: 21600 },
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
    next: { revalidate: 86400 },
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
  // Si ya es una URL absoluta (p.ej. Cloudinary: https://res.cloudinary.com/...),
  // devolverla tal cual; no anteponer el backend.
  if (/^https?:\/\//i.test(path)) return path;
  // Usar API_BASE_URL que ya tiene corrección de protocolo y sufijo /api
  const baseUrl = API_BASE_URL.replace(/\/api$/, "");
  return `${baseUrl}${path}`;
}

/**
 * Inserta optimización automática de Cloudinary en una URL de entrega:
 *  - f_auto: formato moderno (WebP/AVIF) según el navegador
 *  - q_auto: calidad automática (recorta peso sin pérdida visible)
 *  - w_{width}: ancho máximo (los logos se muestran pequeños) — opcional
 * Reduce el ancho de banda ~80%. Para URLs que NO son de Cloudinary (p.ej.
 * /static/flags del backend) la devuelve sin cambios.
 */
export function optimizeCloudinary(url: string, width?: number): string {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }
  // Idempotente: si ya tiene una transformación, no la dupliques.
  if (/\/upload\/[^/]*(f_auto|q_auto|w_\d)/.test(url)) return url;
  // c_limit: solo reduce si la imagen es más grande que el ancho dado; nunca
  // agranda ni recorta (seguro para banners de tamaños variables).
  const t = width ? `f_auto,q_auto,c_limit,w_${width}` : "f_auto,q_auto";
  return url.replace("/upload/", `/upload/${t}/`);
}

/**
 * Obtener URL de logo de una emisora (optimizada para Cloudinary)
 */
export function getLogoUrl(station: Station, width = 256): string | null {
  if (!station.logoUrl) return null;
  return optimizeCloudinary(getStaticUrl(station.logoUrl), width);
}

/**
 * Obtener URL de bandera de un país
 */
export function getFlagUrl(country: Country): string {
  return getStaticUrl(country.flagUrl);
}
