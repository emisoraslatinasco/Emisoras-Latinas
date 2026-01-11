import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.emisoraslatinas.online';
  const currentDate = new Date().toISOString();

  // Páginas principales
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacidad`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terminos`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Códigos de países disponibles
  const countryCodes = [
    'CO', 'AR', 'PE', 'BR', 'VE', 'EC', 'MX', 'GT', 'BO', 'SV', 
    'JM', 'PR', 'DO', 'UA', 'UY', 'CL', 'CR', 'DK', 'ES', 'PT', 
    'TT', 'US'
  ];

  // Páginas por país (para cuando se implementen rutas dinámicas)
  const countryPages: MetadataRoute.Sitemap = countryCodes.map((code) => ({
    url: `${baseUrl}/radio/${code.toLowerCase()}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...mainPages, ...countryPages];
}
