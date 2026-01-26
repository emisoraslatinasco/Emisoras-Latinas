import { NextRequest } from "next/server";
import {
  countries,
  CountryCode,
  loadStationsByCountry,
} from "@/data/stationsByCountry";

// Configuración de la ruta dinámica
export const dynamic = "force-dynamic";
export const dynamicParams = true;

// Máximo de URLs por sitemap (Google recomienda max 50,000, pero usamos 1,000 para evitar timeouts)
const MAX_URLS_PER_SITEMAP = 1000;

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

  const currentDate = new Date().toISOString();

  // Cargar emisoras del país
  const stations = await loadStationsByCountry(actualCountryCode);
  const stationsWithSlug = stations.filter((s) => s.slug);
  const totalPages = Math.ceil(stationsWithSlug.length / MAX_URLS_PER_SITEMAP);

  // Si es solicitud de índice, generar sitemap index
  if (isIndexRequest) {
    return generateSitemapIndex(
      baseUrl,
      country.replace("-index", ""),
      totalPages,
      currentDate,
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
      currentDate,
    );
  }

  const page = pageParam ? parseInt(pageParam, 10) : 1;

  if (page < 1 || page > totalPages) {
    return new Response(`Page must be between 1 and ${totalPages}`, {
      status: 400,
    });
  }

  return generateSitemapPage(
    baseUrl,
    country,
    stationsWithSlug,
    page,
    currentDate,
  );
}

/**
 * Genera una página específica del sitemap
 */
function generateSitemapPage(
  baseUrl: string,
  country: string,
  allStations: Array<{ slug?: string }>,
  page: number,
  currentDate: string,
) {
  const startIndex = (page - 1) * MAX_URLS_PER_SITEMAP;
  const endIndex = startIndex + MAX_URLS_PER_SITEMAP;
  const pageStations = allStations.slice(startIndex, endIndex);

  const urls: Array<{
    url: string;
    lastModified: string;
    changeFrequency: string;
    priority: number;
  }> = [];

  // Solo en la primera página incluir las URLs principales
  if (page === 1) {
    urls.push({
      url: `${baseUrl}/radio/${country}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    });

    // Páginas legales de este país
    const legalPages = ["nosotros", "privacidad", "terminos", "contacto"];
    legalPages.forEach((pageName) => {
      urls.push({
        url: `${baseUrl}/radio/${country}/${pageName}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    });
  }

  // Emisoras de esta página
  pageStations.forEach((station) => {
    if (station.slug) {
      urls.push({
        url: `${baseUrl}/radio/${country}/${station.slug}`,
        lastModified: currentDate,
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
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

/**
 * Genera un sitemap index que lista todos los sub-sitemaps
 */
function generateSitemapIndex(
  baseUrl: string,
  country: string,
  totalPages: number,
  currentDate: string,
) {
  const sitemaps = [];

  for (let page = 1; page <= totalPages; page++) {
    sitemaps.push({
      loc: `${baseUrl}/sitemaps/${country}?page=${page}`,
      lastmod: currentDate,
    });
  }

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    ({ loc, lastmod }) => `  <sitemap>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`,
  )
  .join("\n")}
</sitemapindex>`;

  return new Response(sitemapIndex, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

/**
 * Genera las rutas estáticas para cada país
 */
export async function generateStaticParams() {
  const countryCodes = [
    "co",
    "ar",
    "pe",
    "br",
    "ve",
    "ec",
    "mx",
    "gt",
    "bo",
    "sv",
    "hn",
    "ni",
    "jm",
    "pr",
    "do",
    "ua",
    "uy",
    "cl",
    "cr",
    "dk",
    "es",
    "pt",
    "tt",
    "us",
    "gb",
    "fr",
    "it",
  ];

  // Incluir tanto los países normales como sus índices para países grandes
  const params = countryCodes.map((country) => ({ country }));

  // Agregar índices para países grandes (USA, BR, etc.)
  const largeCountries = ["us", "br", "gb", "fr", "es"];
  largeCountries.forEach((country) => {
    params.push({ country: `${country}-index` });
  });

  return params;
}
