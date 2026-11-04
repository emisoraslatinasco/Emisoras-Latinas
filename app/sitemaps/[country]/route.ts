import { NextRequest } from "next/server";
import {
  countries,
  CountryCode,
  getCategories,
  loadStationsByCountry,
} from "@/data/stationsByCountry";
import { genreSlug } from "@/utils/genreSlug";
import { groupStationsByRegion, qualifyingRegions } from "@/utils/regionSlug";

// Route handlers de sitemap: dynamic en runtime (no pre-render en build)
// porque el handler accede a searchParams. El cacheado real lo hace el CDN
// vía el header "Cache-Control: s-maxage=86400" del Response abajo.
// Resultado: Googlebot recibe respuesta cacheada por Vercel CDN durante 24h
// sin hits al backend.
export const dynamic = "force-dynamic";
export const dynamicParams = true;

// Máximo de URLs por sitemap: el límite del protocolo (50.000). Antes era 1.000,
// pero /sitemap.xml solo enlaza /sitemaps/<país> (la página 1), así que las
// emisoras a partir de la 1.001 de cada país grande quedaban fuera del sitemap.
// El país más grande ronda las 4.200 emisoras: cabe entero en un solo archivo y
// no añade consultas (la lista de slugs ya se trae completa en un único fetch).
const MAX_URLS_PER_SITEMAP = 50000;

// Genre pages with fewer active stations are thin content and stay out.
const MIN_STATIONS_PER_GENRE = 3;

interface GenreSitemapEntry {
  slug: string;
  lastmod?: string;
}

/**
 * Genre pages worth indexing for a country: canonical slugs with at least
 * MIN_STATIONS_PER_GENRE stations. The slugs endpoint carries no genres, so
 * this reuses loadStationsByCountry (same cached fetches the country and genre
 * pages already make; revalidate 6h, no dedicated origin call). lastmod is the
 * newest updatedAt among the genre's stations.
 */
async function buildGenreEntries(
  code: CountryCode,
  updatedAtBySlug: Map<string, string | undefined>,
): Promise<GenreSitemapEntry[]> {
  const stations = await loadStationsByCountry(code);
  const namesBySlug = new Map<string, Set<string>>();
  for (const name of getCategories(stations, code)) {
    const slug = genreSlug(name);
    if (!slug) continue;
    const names = namesBySlug.get(slug) ?? new Set<string>();
    names.add(name);
    namesBySlug.set(slug, names);
  }

  const entries: GenreSitemapEntry[] = [];
  for (const [slug, names] of namesBySlug) {
    const matching = stations.filter((s) => s.generos?.some((g) => names.has(g)));
    if (matching.length < MIN_STATIONS_PER_GENRE) continue;
    let lastmod: string | undefined;
    for (const st of matching) {
      const iso = toIsoDate(updatedAtBySlug.get(st.slug ?? ""));
      if (iso && (!lastmod || iso > lastmod)) lastmod = iso;
    }
    entries.push({ slug, lastmod });
  }
  return entries.sort((a, b) => a.slug.localeCompare(b.slug));
}

/**
 * Region pages worth indexing: regions (stored in `ciudad`) with at least
 * MIN_STATIONS_PER_REGION stations. Same cached station list as the genre
 * entries; lastmod is the newest updatedAt among the region's stations.
 */
async function buildRegionEntries(
  code: CountryCode,
  updatedAtBySlug: Map<string, string | undefined>,
): Promise<GenreSitemapEntry[]> {
  const stations = await loadStationsByCountry(code);
  const country = countries.find((c) => c.code === code);
  const groups = groupStationsByRegion(stations, { code, name: country?.name });
  const entries: GenreSitemapEntry[] = [];
  for (const group of qualifyingRegions(groups)) {
    let lastmod: string | undefined;
    for (const st of group.stations) {
      const iso = toIsoDate(updatedAtBySlug.get(st.slug ?? ""));
      if (iso && (!lastmod || iso > lastmod)) lastmod = iso;
    }
    entries.push({ slug: group.slug, lastmod });
  }
  return entries.sort((a, b) => a.slug.localeCompare(b.slug));
}

/**
 * Genera sitemaps individuales por país de forma dinámica
 * URL: /sitemaps/co -> genera sitemap XML de Colombia
 * URL: /sitemaps/us?page=1 -> primera página del sitemap de USA
 * URL: /sitemaps/us-index -> índice de sitemaps de USA
 */
export async function GET(
  request: NextRequest,
  props: { params: Promise<{ country: string }> },
) {
  const { country } = await props.params;
  const { searchParams } = new URL(request.url);
  const pageParam = searchParams.get("page");

  if (!country) {
    return new Response("Country parameter is required", { status: 400 });
  }

  const baseUrl = "https://www.emisoraslatinas.online";

  // Detectar si es una solicitud de índice (ej: us-index)
  const isIndexRequest = country.endsWith("-index");
  const actualCountryCode = isIndexRequest
    ? (country.replace("-index", "").toUpperCase() as CountryCode)
    : (country.toUpperCase() as CountryCode);

  const countryData = countries.find((c) => c.code === actualCountryCode);

  if (!countryData) {
    return new Response("Country not found", { status: 404 });
  }

  // SEO 2.0: Llamar al backend para obtener todos los slugs desde la BD
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${API_URL}/stations/slugs/all`, {
      // 7 días: la lista de 22k slugs es una query pesada y cambia muy poco.
      // Se invalida on-demand (tag `sitemap-slugs`) cuando el admin crea/borra emisoras.
      next: { revalidate: 604800, tags: ['sitemap-slugs'] }
    });

    if (!res.ok) {
      return new Response('Error loading stations', { status: 500 });
    }

    const allStations: Array<{ slug: string; countryCode: string; updatedAt: string }> = await res.json();
    
    // Filtrar emisoras del país actual
    const stationsWithSlug = allStations
      .filter((s) => s.countryCode === actualCountryCode && s.slug)
      .map(s => ({
        slug: s.slug,
        updatedAt: s.updatedAt
      }));

    // Latest real station update for this country; undefined when unknown, in
    // which case <lastmod> is omitted rather than faked with the request time.
    const countryLastmod = stationsWithSlug.reduce<string | undefined>(
      (max, s) => {
        const iso = toIsoDate(s.updatedAt);
        return iso && (!max || iso > max) ? iso : max;
      },
      undefined,
    );

    const totalPages = Math.max(
      1,
      Math.ceil(stationsWithSlug.length / MAX_URLS_PER_SITEMAP),
    );

    // Si es solicitud de índice, generar sitemap index
    if (isIndexRequest) {
      return generateSitemapIndex(
        baseUrl,
        country.replace("-index", ""),
        totalPages,
        countryLastmod,
      );
    }

    // Si el país tiene muchas emisoras y no se especificó página, redirigir al índice
    if (totalPages > 1 && !pageParam) {
      // Generar solo la primera página por defecto
      return generateSitemapPage(
        baseUrl,
        country,
        stationsWithSlug,
        1,
        countryLastmod,
        await genreEntriesFor(actualCountryCode, stationsWithSlug),
        await regionEntriesFor(actualCountryCode, stationsWithSlug),
      );
    }

    const page = pageParam ? parseInt(pageParam, 10) : 1;

    if (page < 1 || page > totalPages) {
      return new Response(`Page must be between 1 and ${totalPages}`, {
        status: 400,
      });
    }

    // Generar sitemap para la página solicitada
    return generateSitemapPage(
      baseUrl,
      country,
      stationsWithSlug,
      page,
      countryLastmod,
      page === 1 ? await genreEntriesFor(actualCountryCode, stationsWithSlug) : [],
      page === 1 ? await regionEntriesFor(actualCountryCode, stationsWithSlug) : [],
    );
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}

/**
 * Genera una página específica del sitemap
 */
function generateSitemapPage(
  baseUrl: string,
  country: string,
  allStations: Array<{ slug?: string; updatedAt?: string }>,
  page: number,
  countryLastmod?: string,
  genreEntries: GenreSitemapEntry[] = [],
  regionEntries: GenreSitemapEntry[] = [],
) {
  const startIndex = (page - 1) * MAX_URLS_PER_SITEMAP;
  const endIndex = startIndex + MAX_URLS_PER_SITEMAP;
  const pageStations = allStations.slice(startIndex, endIndex);

  const urls: Array<{
    url: string;
    lastModified?: string;
    changeFrequency: string;
    priority: number;
  }> = [];

  // Solo en la primera página incluir las URLs principales
  if (page === 1) {
    urls.push({
      url: `${baseUrl}/radio/${country}`,
      lastModified: countryLastmod,
      changeFrequency: "weekly",
      priority: 0.9,
    });

    // Índice A-Z con enlace HTML a todas las emisoras del país
    urls.push({
      url: `${baseUrl}/radio/${country}/todas`,
      lastModified: countryLastmod,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  // Genre pages (only listed on page 1, alongside the country URLs)
  if (page === 1) {
    for (const genre of genreEntries) {
      urls.push({
        url: `${baseUrl}/radio/${country}/genero/${genre.slug}`,
        lastModified: genre.lastmod ?? countryLastmod,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  // Region pages (page 1 only, next to the genre URLs)
  if (page === 1) {
    for (const region of regionEntries) {
      urls.push({
        url: `${baseUrl}/radio/${country}/region/${region.slug}`,
        lastModified: region.lastmod ?? countryLastmod,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  // Emisoras de esta página
  pageStations.forEach((station) => {
    if (station.slug) {
      urls.push({
        url: `${baseUrl}/radio/${country}/${station.slug}`,
        // Fecha real de última modificación de la emisora: con la hora de la
        // petición en todas las URLs, Google descarta el lastmod por poco fiable.
        lastModified: toIsoDate(station.updatedAt) ?? countryLastmod,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  });

  // Generar XML del sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ url, lastModified, changeFrequency, priority }) => `  <url>
    <loc>${url}</loc>
    ${lastModified ? `<lastmod>${lastModified}</lastmod>
    ` : ""}<changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=604800",
    },
  });
}

/** Genre entries; a failure here must not break the station sitemap. */
async function genreEntriesFor(
  code: CountryCode,
  stations: Array<{ slug: string; updatedAt?: string }>,
): Promise<GenreSitemapEntry[]> {
  try {
    return await buildGenreEntries(
      code,
      new Map(stations.map((s) => [s.slug, s.updatedAt])),
    );
  } catch (error) {
    console.error("Error building genre sitemap entries:", error);
    return [];
  }
}

/** Region entries; a failure here must not break the station sitemap. */
async function regionEntriesFor(
  code: CountryCode,
  stations: Array<{ slug: string; updatedAt?: string }>,
): Promise<GenreSitemapEntry[]> {
  try {
    return await buildRegionEntries(
      code,
      new Map(stations.map((s) => [s.slug, s.updatedAt])),
    );
  } catch (error) {
    console.error("Error building region sitemap entries:", error);
    return [];
  }
}

function toIsoDate(value?: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

/**
 * Genera un sitemap index que lista todos los sub-sitemaps
 */
function generateSitemapIndex(
  baseUrl: string,
  country: string,
  totalPages: number,
  lastmod?: string,
) {
  const sitemaps = [];

  for (let page = 1; page <= totalPages; page++) {
    sitemaps.push({
      loc: `${baseUrl}/sitemaps/${country}?page=${page}`,
      lastmod,
    });
  }

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    ({ loc, lastmod }) => `  <sitemap>
    <loc>${loc}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
  </sitemap>`,
  )
  .join("\n")}
</sitemapindex>`;

  return new Response(sitemapIndex, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=604800",
    },
  });
}

/**
 * Genera las rutas estáticas para cada país
 */
export async function generateStaticParams() {
  // Derivado de `countries` para que un país nuevo entre solo al sitemap.
  const countryCodes = countries.map((c) => c.code.toLowerCase());

  // Incluir tanto los países normales como sus índices para países grandes
  const params = countryCodes.map((country) => ({ country }));

  // Agregar índices para países grandes (USA, BR, etc.)
  const largeCountries = ["us", "br", "gb", "fr", "es"];
  largeCountries.forEach((country) => {
    params.push({ country: `${country}-index` });
  });

  return params;
}
