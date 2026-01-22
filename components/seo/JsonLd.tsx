// Schema.org JSON-LD para SEO estructurado
export function WebsiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Emisoras Latinas',
    alternateName: 'Radio Online Latinoamérica',
    url: 'https://www.emisoraslatinas.online',
    description: 'Directorio de Radio Online #1 de Latinoamérica. Escucha gratis +21,000 emisoras de Colombia, Argentina, México, Perú y más.',
    inLanguage: 'es',
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
    name: 'Emisoras Latinas',
    url: 'https://www.emisoraslatinas.online',
    logo: 'https://www.emisoraslatinas.online/logos_general/logo_emisoras_latinas.jpg',
    description: 'Directorio de radio online que conecta a millones de oyentes con las mejores emisoras de Latinoamérica.',
    sameAs: [
      'https://facebook.com/emisoraslatinas',
      'https://instagram.com/emisoraslatinas',
      'https://twitter.com/emisoraslatinas',
      'https://youtube.com/@emisoraslatinas',
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
