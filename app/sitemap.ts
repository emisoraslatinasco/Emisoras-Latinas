import { MetadataRoute } from 'next';

/**
 * Sitemap principal que incluye las páginas principales
 * Los sitemaps por país están en /sitemaps/[country] (ej: /sitemaps/co)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.emisoraslatinas.online';
  const currentDate = new Date().toISOString();

  // Códigos de países
  const countryCodes = [
    'co', 'ar', 'pe', 'br', 've', 'ec', 'mx', 'gt', 'bo', 'sv', 
    'hn', 'ni', 'jm', 'pr', 'do', 'ua', 'uy', 'cl', 'cr', 'dk', 
    'es', 'pt', 'tt', 'us', 'gb', 'fr', 'it'
  ];

  // Página principal
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // Páginas por país (enlaces a las páginas principales de cada país)
  const countryPages: MetadataRoute.Sitemap = countryCodes.map((code) => ({
    url: `${baseUrl}/radio/${code}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Páginas legales por país
  const legalPages = ['nosotros', 'privacidad', 'terminos', 'contacto'];
  const countryLegalPages: MetadataRoute.Sitemap = countryCodes.flatMap((code) =>
    legalPages.map((page) => ({
      url: `${baseUrl}/radio/${code}/${page}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))
  );

  // Los sitemaps completos por país (con todas las emisoras) están en:
  // /sitemaps/co, /sitemaps/ar, /sitemaps/br, etc.
  // Agregar estos a Google Search Console para indexar todas las emisoras

  return [...mainPages, ...countryPages, ...countryLegalPages];
}
