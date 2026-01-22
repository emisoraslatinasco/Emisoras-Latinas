import { MetadataRoute } from 'next';

/**
 * Sitemap simple para desarrollo
 * Solo incluye páginas principales para no sobrecargar
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.emisoraslatinas.online';
  const currentDate = new Date().toISOString();

  // Códigos de países
  const countryCodes = [
    'CO', 'AR', 'PE', 'BR', 'VE', 'EC', 'MX', 'GT', 'BO', 'SV', 
    'HN', 'NI', 'JM', 'PR', 'DO', 'UA', 'UY', 'CL', 'CR', 'DK', 
    'ES', 'PT', 'TT', 'US', 'GB', 'FR', 'IT'
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

  // Páginas por país
  const countryPages: MetadataRoute.Sitemap = countryCodes.map((code) => ({
    url: `${baseUrl}/radio/${code.toLowerCase()}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Páginas legales por país
  const legalPages = ['nosotros', 'privacidad', 'terminos', 'contacto'];
  const countryLegalPages: MetadataRoute.Sitemap = countryCodes.flatMap((code) =>
    legalPages.map((page) => ({
      url: `${baseUrl}/radio/${code.toLowerCase()}/${page}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))
  );

  // TODO: En producción, agregar las 21K+ páginas de emisoras individuales
  // Por ahora solo retornamos las páginas principales para no afectar rendimiento
  console.log(`✅ Sitemap generado: ${mainPages.length + countryPages.length + countryLegalPages.length} URLs`);

  return [...mainPages, ...countryPages, ...countryLegalPages];
}
