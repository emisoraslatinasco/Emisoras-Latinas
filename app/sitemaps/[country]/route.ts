import { NextRequest } from 'next/server';
import { countries, CountryCode, loadStationsByCountry } from '@/data/stationsByCountry';

// Configuración de la ruta dinámica
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

/**
 * Genera sitemaps individuales por país de forma dinámica
 * URL: /sitemaps/co -> genera sitemap XML de Colombia
 * Optimización de memoria: carga 1 archivo JSON a la vez
 */
export async function GET(
  request: NextRequest,
  props: { params: Promise<{ country: string }> }
) {
  const { country } = await props.params;
  
  if (!country) {
    return new Response('Country parameter is required', { status: 400 });
  }
  
  const baseUrl = 'https://www.emisoraslatinas.online';
  const countryCode = country.toUpperCase() as CountryCode;
  const countryData = countries.find(c => c.code === countryCode);

  if (!countryData) {
    return new Response('Country not found', { status: 404 });
  }

  const currentDate = new Date().toISOString();
  
  // Solo carga este país en memoria
  const stations = await loadStationsByCountry(countryCode);
  
  // URLs principales del país
  const urls: Array<{ url: string; lastModified: string; changeFrequency: string; priority: number }> = [
    {
      url: `${baseUrl}/radio/${country}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Páginas legales de este país
  const legalPages = ['nosotros', 'privacidad', 'terminos', 'contacto'];
  legalPages.forEach(page => {
    urls.push({
      url: `${baseUrl}/radio/${country}/${page}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  });

  // TODAS las emisoras de este país
  stations.forEach(station => {
    if (station.slug) {
      urls.push({
        url: `${baseUrl}/radio/${country}/${station.slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  });

  // Generar XML del sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, lastModified, changeFrequency, priority }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}

/**
 * Genera las rutas estáticas para cada país
 * Next.js usará estas rutas para SSG
 */
export async function generateStaticParams() {
  const countryCodes = [
    'co', 'ar', 'pe', 'br', 've', 'ec', 'mx', 'gt', 'bo', 'sv',
    'hn', 'ni', 'jm', 'pr', 'do', 'ua', 'uy', 'cl', 'cr', 'dk',
    'es', 'pt', 'tt', 'us', 'gb', 'fr', 'it'
  ];

  return countryCodes.map((country) => ({
    country,
  }));
}
