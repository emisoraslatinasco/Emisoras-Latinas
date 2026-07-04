// Schema.org JSON-LD para SEO estructurado
export function WebsiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.emisoraslatinas.online/#website',
    name: 'Emisoras Latinas',
    alternateName: 'Radio Online Latinoamérica',
    url: 'https://www.emisoraslatinas.online',
    description: 'Directorio de Radio Online #1 de Latinoamérica. Escucha gratis +21,000 emisoras de Colombia, Argentina, México, Perú y más.',
    inLanguage: 'es',
    publisher: { '@id': 'https://www.emisoraslatinas.online/#organization' },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.emisoraslatinas.online/?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.emisoraslatinas.online/#organization',
    name: 'Emisoras Latinas',
    alternateName: 'Radio Online Latinoamérica',
    url: 'https://www.emisoraslatinas.online',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.emisoraslatinas.online/logos_general/logo_emisoras_latinas.jpg',
      width: 1200,
      height: 630,
    },
    description: 'Directorio de radio online que conecta a millones de oyentes con más de 22.000 emisoras en vivo de Latinoamérica, España, Estados Unidos y Europa.',
    slogan: 'Escucha la radio de Latinoamérica en vivo, gratis y sin cortes.',
    foundingDate: '2025',
    // Señales de entidad para el Knowledge Graph / motores generativos (GEO):
    // de qué trata la organización y a qué territorio sirve.
    knowsAbout: [
      'Radio online',
      'Emisoras de radio en vivo',
      'Streaming de radio',
      'Radio latinoamericana',
      'Radio en español',
    ],
    areaServed: [
      { '@type': 'Place', name: 'Latinoamérica' },
      { '@type': 'Country', name: 'Colombia' },
      { '@type': 'Country', name: 'México' },
      { '@type': 'Country', name: 'Argentina' },
      { '@type': 'Country', name: 'España' },
      { '@type': 'Country', name: 'Estados Unidos' },
    ],
    sameAs: [
      'https://www.facebook.com/profile.php?id=61586652665186',
      'https://www.instagram.com/emisoras_latinas/',
      'https://www.youtube.com/@EmisorasLatinas',
      'https://www.tiktok.com/@emisoraslatinas',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'emisoraslatinasco@gmail.com',
      contactType: 'customer service',
      availableLanguage: ['Spanish', 'English'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * Dataset schema: un directorio de +22.000 emisoras ES un dataset. Declararlo
 * es una señal de autoridad fuerte para motores generativos (GEO) y habilita
 * aparición en Google Dataset Search. Enlaza a la organización como publisher.
 */
export function DatasetJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    '@id': 'https://www.emisoraslatinas.online/#dataset',
    name: 'Directorio de Emisoras de Radio de Latinoamérica',
    description:
      'Base de datos de más de 22.000 emisoras de radio en vivo de 27 países (Latinoamérica, España, Estados Unidos y Europa), con nombre, ciudad, frecuencia, géneros, enlaces oficiales y stream de audio gratuito.',
    url: 'https://www.emisoraslatinas.online',
    keywords: [
      'radio online',
      'emisoras en vivo',
      'radio latinoamericana',
      'streaming de radio',
      'radio gratis',
    ],
    license: 'https://www.emisoraslatinas.online/terminos',
    isAccessibleForFree: true,
    inLanguage: ['es', 'en'],
    creator: { '@id': 'https://www.emisoraslatinas.online/#organization' },
    publisher: { '@id': 'https://www.emisoraslatinas.online/#organization' },
    spatialCoverage: {
      '@type': 'Place',
      name: 'Latinoamérica, España, Estados Unidos y Europa',
    },
    variableMeasured: [
      'Nombre de la emisora',
      'País',
      'Ciudad',
      'Frecuencia',
      'Géneros musicales',
      'URL de streaming',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Componente principal que incluye todos los JSON-LD necesarios para la página principal
export default function SeoJsonLd() {
  return (
    <>
      <WebsiteJsonLd />
      <OrganizationJsonLd />
    </>
  );
}
