import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { countries, CountryCode } from '@/data/stationsByCountry';
import { getI18nFromCountry } from '@/utils/translations';
import { getStaticUrl } from '@/lib/api';
import { Footer } from '@/components/layout';
import AdSpace from '@/components/ui/AdSpace';
import IntegratedPlayer from '@/components/ui/IntegratedPlayer';
import ReportButton from '@/components/ui/ReportButton';
import StationImage from '@/components/ui/StationImage';
import BannerAd from '@/components/ads/BannerAd';
import { AdvertisementPosition } from '@/lib/api-admin-ads';
import Script from 'next/script';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

// ========== INTERFACES ==========

interface SocialNetwork {
  id: string;
  url: string;
  platform: string | null;
}

interface Genre {
  id: string;
  name: string;
  slug: string;
}

interface Station {
  id: string;
  nombre: string;
  genres?: Genre[];  // Backend devuelve array de objetos Genre
  ciudad?: string;
  descripcion?: string;
  descripcionExtendida?: string;  // SEO 2.0: contenido enriquecido para meta description
  logoUrl?: string;  // Backend usa logoUrl, no logo_local
  sitioWeb?: string;  // Backend usa camelCase
  socialNetworks?: SocialNetwork[];  // Backend devuelve array de objetos
  slug: string;
  urlStream?: string;  // Backend usa urlStream, no stream_url
}

// ========== SEO 2.0: Generador de Contenido con Sinónimos Aleatorios ==========

/**
 * Genera descripción inteligente con VARIACIONES ALEATORIAS usando sinónimos
 * Solo se usa si la emisora NO tiene descripción en la BD
 * 
 * MATEMÁTICAS DE VARIACIONES:
 * - Noticias (ES): 4 inicios × 3 conectores × 4 cierres = 48 combinaciones únicas
 * - Música (ES): 5 inicios × 4 conectores × 5 cierres = 100 combinaciones únicas
 * - Genérica (ES): 4 inicios × 3 conectores × 4 cierres = 48 combinaciones únicas
 * 
 * TOTAL: ~400 combinaciones únicas (200 ES + 200 EN)
 */
function generateSmartDescription(
  station: Station,
  city: string,
  countryName: string,
  lang: string
): string {
  // Función auxiliar para seleccionar elemento aleatorio
  const random = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const genres = station.genres?.map((g: Genre) => g.name) || [];
  const hasNews = genres.some((g) => 
    g.toLowerCase().includes('noticia') || g.toLowerCase().includes('news')
  );
  const hasMusic = genres.some((g) => 
    ['música', 'music', 'rock', 'pop', 'salsa', 'jazz', 'clásica'].some(m => g.toLowerCase().includes(m))
  );

  if (lang === 'es') {
    // ========== VARIACIÓN A: EMISORAS DE NOTICIAS ==========
    if (hasNews) {
      const inicios = [
        'Mantente informado con',
        'Sigue la actualidad en',
        'Escucha las noticias más relevantes en',
        'Conecta con la información de'
      ];
      const conectores = [
        'la fuente líder de noticias en',
        'tu estación de confianza desde',
        'transmitiendo reportajes en vivo desde'
      ];
      const cierres = [
        'Sucesos, análisis y debate en vivo.',
        'Cobertura 24/7 sin interrupciones.',
        'La voz autorizada de la región.',
        'Información verificada al instante.'
      ];

      return `${random(inicios)} ${station.nombre}, ${random(conectores)} ${city}. ${random(cierres)}`;
    }

    // ========== VARIACIÓN B: EMISORAS MUSICALES ==========
    if (hasMusic && genres[0]) {
      const inicios = [
        'Disfruta de la mejor selección de',
        'Escucha los mejores éxitos de',
        'Sintoniza ahora la mejor',
        'Conéctate con los ritmos de',
        'Vive la experiencia musical de'
      ];
      const conectores = [
        `en ${station.nombre}. Transmitiendo desde el corazón de`,
        `en ${station.nombre}, directo desde`,
        `con ${station.nombre}, la señal líder de`,
        `a través de ${station.nombre}, en vivo desde`
      ];
      const cierres = [
        'sin cortes comerciales.',
        'disponible online gratis.',
        'con la mejor calidad de audio.',
        'streaming 24/7 para ti.',
        'la banda sonora de tu día.'
      ];

      return `${random(inicios)} ${genres[0]} ${random(conectores)} ${city}, ${random(cierres)}`;
    }

    // ========== VARIACIÓN C: GENÉRICA (FALLBACK) ==========
    const iniciosGen = [
      'Escucha',
      'Sintoniza ahora',
      'Disfruta de',
      'Conéctate con'
    ];
    const conectoresGen = [
      'transmitiendo en vivo desde',
      'la señal líder de',
      'directo desde el corazón de'
    ];
    const cierresGen = [
      'sin cortes.',
      'disponible online.',
      'con la mejor calidad de audio.',
      'gratis para ti.'
    ];

    return `${random(iniciosGen)} ${station.nombre}, ${random(conectoresGen)} ${city}, ${random(cierresGen)}`;

  } else {
    // ========== VERSIÓN INGLÉS (MISMA ESTRUCTURA) ==========
    
    // VARIACIÓN A: NEWS
    if (hasNews) {
      const inicios = [
        'Stay informed with',
        'Get the latest news from',
        'Listen to breaking news on',
        'Connect with current events via'
      ];
      const conectores = [
        "your trusted news source in",
        "broadcasting live from",
        "the leading voice of"
      ];
      const cierres = [
        'Live coverage and analysis.',
        '24/7 news without interruptions.',
        'Verified information instantly.',
        'The authoritative voice of the region.'
      ];

      return `${random(inicios)} ${station.nombre}, ${random(conectores)} ${city}. ${random(cierres)}`;
    }

    // VARIACIÓN B: MUSIC
    if (hasMusic && genres[0]) {
      const inicios = [
        'Enjoy the best',
        'Listen to top hits of',
        'Tune in to the finest',
        'Connect with the rhythms of',
        'Experience the best'
      ];
      const conectores = [
        `on ${station.nombre}, broadcasting from`,
        `via ${station.nombre}, live from`,
        `with ${station.nombre}, streaming from`,
        `through ${station.nombre}, direct from`
      ];
      const cierres = [
        'commercial-free.',
        'available online free.',
        'with superior audio quality.',
        '24/7 streaming for you.',
        'the soundtrack of your day.'
      ];

      return `${random(inicios)} ${genres[0]} ${random(conectores)} ${city}, ${random(cierres)}`;
    }

    // VARIACIÓN C: GENERIC
    const iniciosGen = [
      'Listen to',
      'Tune in now to',
      'Enjoy',
      'Connect with'
    ];
    const conectoresGen = [
      'broadcasting live from',
      'the leading station of',
      'streaming direct from'
    ];
    const cierresGen = [
      'without interruptions.',
      'available online.',
      'with the best audio quality.',
      'free for you.'
    ];

    return `${random(iniciosGen)} ${station.nombre}, ${random(conectoresGen)} ${city}, ${random(cierresGen)}`;
  }
}

// Enable dynamic rendering for 21K+ pages
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Generar metadata dinámica para SEO
export async function generateMetadata({ params }: { params: Promise<{ country: string; slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const code = resolvedParams.country.toUpperCase() as CountryCode;
  const country = countries.find(c => c.code === code);
  
  if (!country) {
    return { title: 'Emisoras Latinas' };
  }
  
  // SEO 2.0: Llamar al backend para obtener emisora
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${API_URL}/stations/${resolvedParams.slug}/full`, {
      next: { revalidate: 3600 } // Cachear por 1 hora
    });

    if (!res.ok) {
      return { title: 'Emisora no encontrada | Emisoras Latinas' };
    }

    const { station } = await res.json();

    getI18nFromCountry(code);
    const location = station.ciudad || country.name;

    // station.nombre suele incluir ya la frecuencia (ej. "Radio Caracol 89.7 FM");
    // por eso no la añadimos aparte — evita duplicarla en el title del SERP.
    // Title con marca dentro (no se usa template del layout para tener control de los 58 chars).
    const buildSeoTitle = (): string => {
      const brand = ' | Emisoras Latinas';
      const budget = 58 - brand.length;
      const full = `${station.nombre} En Vivo Gratis`;
      if (full.length <= budget) return full + brand;
      const short = `${station.nombre} En Vivo`;
      if (short.length <= budget) return short + brand;
      if (station.nombre.length <= budget) return station.nombre + brand;
      return station.nombre.substring(0, budget - 1).trim() + "…" + brand;
    };
    const seoTitle = buildSeoTitle();

    // Cascada de contenido para meta description: descripcionExtendida > descripcion > plantilla.
    // descripcionExtendida suele ser más rica (200-500 chars) y la recortamos a 158 con … final.
    const buildSeoDescription = (): string => {
      const richSource = (station.descripcionExtendida || station.descripcion || '').trim();
      if (richSource.length >= 50) {
        const tail = ' Escucha en vivo gratis, sin cortes.';
        const room = 158 - tail.length;
        const trimmed = richSource.length <= room
          ? richSource
          : richSource.substring(0, room - 1).trim() + '…';
        return `${trimmed}${tail}`;
      }
      const template = `Escucha ${station.nombre} desde ${location}, ${country.name}. Radio en vivo gratis 24/7, sin registro, sin cortes. Música y noticias en directo.`;
      return template.length <= 158 ? template : template.substring(0, 157) + '…';
    };
    const seoDescription = buildSeoDescription();
    
    // OG/Twitter: emojis permitidos, contenido más emocional para social sharing (FB/WA/X).
    const socialTitle = `▶️ ${station.nombre} EN VIVO 🎧 ${location}`;
    const socialDescription = `Escucha ${station.nombre} en vivo desde ${location}, ${country.name}. Radio gratis 24/7, sin cortes ni registro. ¡Dale play ahora! 🎶`;
    const socialImage = station.logoUrl
      ? getStaticUrl(station.logoUrl)
      : 'https://www.emisoraslatinas.online/logos_general/antena.png';

    return {
      // absolute: la marca ya viene incluida en seoTitle, no queremos el template del layout encima.
      title: { absolute: seoTitle },
      description: seoDescription,
      alternates: {
        canonical: `/radio/${resolvedParams.country}/${resolvedParams.slug}`,
      },
      openGraph: {
        title: socialTitle,
        description: socialDescription,
        url: `https://www.emisoraslatinas.online/radio/${resolvedParams.country}/${resolvedParams.slug}`,
        type: 'website',
        images: [
          {
            url: socialImage,
            width: 800,
            height: 600,
            alt: station.nombre,
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        title: socialTitle,
        description: socialDescription,
        images: [socialImage],
        creator: '@emisoraslatinas',
      },
    };
  } catch (error) {
    console.error('Error fetching station metadata:', error);
    return { title: 'Emisoras Latinas' };
  }
}

export default async function StationPage({ params }: { params: Promise<{ country: string; slug: string }> }) {
  const resolvedParams = await params;
  const code = resolvedParams.country.toUpperCase() as CountryCode;
  const country = countries.find(c => c.code === code);
  
  if (!country) return notFound();
  
  // SEO 2.0: Llamar al backend para obtener emisora + emisoras relacionadas
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  
  let station, relatedStations;
  try {
    console.log(`[StationPage] Fetching: ${API_URL}/stations/${resolvedParams.slug}/full`);
    const res = await fetch(`${API_URL}/stations/${resolvedParams.slug}/full`, {
      next: { revalidate: 3600 } // Cachear por 1 hora
    });

    console.log(`[StationPage] Response status: ${res.status}`);
    
    if (!res.ok) {
      console.error(`[StationPage] API returned ${res.status} for ${resolvedParams.slug}`);
      return notFound();
    }

    const data = await res.json();
    station = data.station;
    relatedStations = data.relatedStations;
    console.log(`[StationPage] Successfully loaded: ${station.nombre}`);
  } catch (error) {
    console.error(`[StationPage] Fetch error:`, error);
    return notFound();
  }
  
  const {t, lang} = getI18nFromCountry(code);
  
  // Extraer frecuencia del nombre si existe
  const frequency = station.nombre.match(/(\d{2,3}\.?\d?\s*(?:FM|AM))/i)?.[0];
  const location = station.ciudad || country.name;
  
  // JSON-LD para SEO
  const stationJsonLd = {
    "@context": "https://schema.org",
    "@type": "RadioStation",
    "name": station.nombre,
    "description": station.descripcion,
    "url": `https://www.emisoraslatinas.online/radio/${resolvedParams.country}/${resolvedParams.slug}`,
    "broadcastFrequency": frequency || undefined,
    "areaServed": {
      "@type": "City",
      "name": location
    },
    "genre": station.genres?.map((g: Genre) => g.name).join(', '),
    "image": station.logoUrl,
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* JSON-LD */}
      <Script
        id={`station-jsonld-${station.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(stationJsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: "https://www.emisoraslatinas.online" },
          {
            name: country.name,
            url: `https://www.emisoraslatinas.online/radio/${resolvedParams.country}`,
          },
          {
            name: station.nombre,
            url: `https://www.emisoraslatinas.online/radio/${resolvedParams.country}/${resolvedParams.slug}`,
          },
        ]}
      />
      
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/radio/${resolvedParams.country}`} className="flex items-center gap-3">
            <Image
              src="/logos_general/logo_miniatura_emisoras_latinas.jpg"
              alt="Emisoras Latinas"
              width={32}
              height={32}
              className="rounded-lg"
              unoptimized
            />
            <span className="text-white font-bold text-xl">Emisoras Latinas</span>
          </Link>
          <Link
            href={`/radio/${resolvedParams.country}`}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            {t.home}
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Breadcrumbs */}
        <nav className="text-sm text-slate-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-400">{t.home}</Link>
          <i className="fas fa-chevron-right text-xs"></i>
          <Link href={`/radio/${resolvedParams.country}`} className="hover:text-blue-400">{country.name}</Link>
          <i className="fas fa-chevron-right text-xs"></i>
          <span className="text-white">{station.nombre}</span>
        </nav>

        {/* Hero Section - Reproductor Integrado */}
        <div className="glass-effect rounded-2xl p-6 md:p-8 mb-8">
          <div className="grid md:grid-cols-[160px_1fr] gap-6">
            {/* Logo - Tamaño reducido */}
            <div className="flex justify-center items-start">
              <div className="relative w-36 h-36 rounded-xl overflow-hidden border-2 border-slate-700/50 shadow-xl">
                <StationImage
                  src={station.logoUrl ? getStaticUrl(station.logoUrl) : '/logos_general/antena.png'}
                  alt={station.nombre}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
            </div>

            {/* Info y Reproductor */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {station.nombre}
              </h1>
              
              <div className="flex flex-wrap gap-4 mb-6 text-slate-300">
                {frequency && (
                  <div className="flex items-center gap-2">
                    <i className="fas fa-broadcast-tower text-blue-400"></i>
                    <span className="font-semibold">{frequency}</span>
                  </div>
                )}
                {location && (
                  <div className="flex items-center gap-2">
                    <i className="fas fa-map-marker-alt text-red-400"></i>
                    <span>{location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <i className="fas fa-globe text-green-400"></i>
                  <span>{country.name}</span>
                </div>
              </div>

              {/* Géneros */}
              {station.genres && station.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {station.genres.slice(0, 5).map((genre: Genre, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Reproductor Integrado - Ocupa todo el ancho */}
          <div className="mt-8">
            <IntegratedPlayer station={station} countryCode={code} />
            {/* Botón de reporte para User Signals */}
            <ReportButton stationName={station.nombre} country={country.name} lang={lang} />
          </div>
        </div>

        {/* Publicidad */}
        <div className="mb-8 flex justify-center">
          <BannerAd
            position={AdvertisementPosition.STATION_UNDER_REPORT}
            stationId={station.id}
          />
        </div>

        {/* Información Organizada en Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          {/* Sección: Sobre la Emisora - CON ESTRATEGIA DE CASCADA */}
          <div className="glass-effect rounded-2xl p-6 lg:col-span-2">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <i className="fas fa-info-circle text-blue-400"></i>
              </div>
              {lang === 'es' ? 'Acerca de' : lang === 'en' ? 'About' : 'Sobre'} {station.nombre}
            </h2>
            <div className="text-slate-300 leading-relaxed space-y-3">
              {/* ESTRATEGIA DE CASCADA: Prioridad 1 = descripción BD, Prioridad 2 = plantilla */}
              {station.descripcion && station.descripcion.length > 50 ? (
                // CASO 1: Tiene descripción única en BD (protege las 4,000 indexadas)
                <>
                  <p>{station.descripcion}</p>
                  {frequency && (
                    <p className="text-slate-400">
                      {lang === 'es' 
                        ? `Sintoniza ${station.nombre} en el dial ${frequency}${location ? ` desde ${location}` : ''}. Transmitimos las 24 horas.`
                        : `Tune in to ${station.nombre} on ${frequency}${location ? ` from ${location}` : ''}. Broadcasting 24/7.`
                      }
                    </p>
                  )}
                </>
              ) : (
                // CASO 2: NO tiene descripción - usar plantilla VARIADA con sinónimos
                <p className="text-slate-400">
                  {generateSmartDescription(station, location, country.name, lang)}
                </p>
              )}
            </div>
          </div>

          {/* Sección: Sitio Web y Contacto */}
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                <i className="fas fa-globe text-green-400"></i>
              </div>
              {lang === 'es' ? 'Sitio Web' : 'Website'}
            </h3>
            {station.sitioWeb ? (
              <a 
                href={station.sitioWeb}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl hover:bg-slate-700/50 transition-colors group"
              >
                <i className="fas fa-external-link-alt text-green-400 group-hover:scale-110 transition-transform"></i>
                <span className="text-blue-400 hover:text-blue-300 truncate text-sm">
                  {station.sitioWeb.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </span>
              </a>
            ) : (
              <p className="text-slate-500 text-sm">
                {lang === 'es' ? 'Sitio web no disponible' : 'Website not available'}
              </p>
            )}
          </div>

          {/* Sección: Redes Sociales */}
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-500/20 rounded-xl flex items-center justify-center">
                <i className="fas fa-share-alt text-pink-400"></i>
              </div>
              {lang === 'es' ? 'Redes Sociales' : 'Social Media'}
            </h3>
            {station.socialNetworks && station.socialNetworks.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {station.socialNetworks.map((sn: SocialNetwork, idx: number) => {
                  const red = sn.url;
                  const socialIcon = red.includes('facebook') ? 'fa-facebook' :
                    red.includes('twitter') || red.includes('x.com') ? 'fa-twitter' :
                    red.includes('instagram') ? 'fa-instagram' :
                    red.includes('youtube') ? 'fa-youtube' :
                    red.includes('tiktok') ? 'fa-tiktok' : 'fa-link';
                  const socialColor = red.includes('facebook') ? 'bg-blue-600' :
                    red.includes('twitter') || red.includes('x.com') ? 'bg-sky-500' :
                    red.includes('instagram') ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                    red.includes('youtube') ? 'bg-red-600' :
                    red.includes('tiktok') ? 'bg-black' : 'bg-slate-600';
                  
                  return (
                    <a 
                      key={idx}
                      href={red}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 ${socialColor} rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg`}
                      title={sn.platform || red}
                    >
                      <i className={`fab ${socialIcon} text-xl`}></i>
                    </a>
                  );
                })}
              </div>
            ) : (
              <p className="text-slate-500 text-sm">
                {lang === 'es' ? 'Sin redes sociales' : 'No social media'}
              </p>
            )}
          </div>

          {/* Sección: Géneros Musicales */}
          {station.genres && station.genres.length > 0 && (
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <i className="fas fa-music text-purple-400"></i>
                </div>
                {lang === 'es' ? 'Géneros' : 'Genres'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {station.genres.map((genre: Genre, idx: number) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Sección: Ubicación */}
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                <i className="fas fa-map-marker-alt text-red-400"></i>
              </div>
              {lang === 'es' ? 'Ubicación' : 'Location'}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <i className="fas fa-city text-slate-500"></i>
                <span>{location || 'Ciudad no especificada'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <i className="fas fa-flag text-slate-500"></i>
                <span>{country.name}</span>
              </div>
              {frequency && (
                <div className="flex items-center gap-2 text-blue-400">
                  <i className="fas fa-broadcast-tower text-blue-500"></i>
                  <span className="font-semibold">{frequency}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Emisoras Relacionadas */}
        {relatedStations.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <i className="fas fa-broadcast-tower text-orange-400"></i>
              </div>
              {lang === 'es' ? 'Más radios de' : lang === 'en' ? 'More stations from' : 'Plus de radios de'} {location}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {relatedStations.map((related: Station) => (
                <Link
                  key={related.slug}
                  href={`/radio/${resolvedParams.country}/${related.slug}`}
                  className="glass-effect rounded-xl p-4 hover:scale-105 transition-transform text-center"
                >
                  <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden">
                    <StationImage
                      src={related.logoUrl ? getStaticUrl(related.logoUrl) : '/logos_general/antena.png'}
                      alt={related.nombre}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <p className="text-white text-sm font-semibold truncate">{related.nombre}</p>
                  {related.nombre.match(/(\d{2,3}\.?\d?\s*(?:FM|AM))/i) && (
                    <p className="text-slate-400 text-xs">{related.nombre.match(/(\d{2,3}\.?\d?\s*(?:FM|AM))/i)?.[0]}</p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Volver al listado */}
        <div className="text-center">
          <Link
            href={`/radio/${resolvedParams.country}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors"
          >
            <i className="fas fa-arrow-left"></i>
            <span>{lang === 'es' ? 'Ver todas las emisoras de' : lang === 'en' ? 'View all stations from' : 'Voir toutes les radios de'} {country.name}</span>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
