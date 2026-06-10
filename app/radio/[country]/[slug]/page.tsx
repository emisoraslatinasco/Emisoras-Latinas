import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { countries, CountryCode } from '@/data/stationsByCountry';
import { getI18nFromCountry } from '@/utils/translations';
import { getStaticUrl, optimizeCloudinary } from '@/lib/api';
import { Footer } from '@/components/layout';
import AdSpace from '@/components/ui/AdSpace';
import IntegratedPlayer from '@/components/ui/IntegratedPlayer';
import ReportButton from '@/components/ui/ReportButton';
import StationImage from '@/components/ui/StationImage';
import BannerAd from '@/components/ads/BannerAd';
import { AdvertisementPosition } from '@/lib/api-admin-ads';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { getHreflangFromCountry } from '@/utils/hreflang';

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

// ========== SEO 3.0: Generador de Contenido Extendido con Seed Determinístico ==========

/**
 * Hash determinístico desde string. Misma entrada = mismo número siempre.
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash | 0;
  }
  return Math.abs(hash);
}

/**
 * Genera párrafo completo (300+ chars) con VARIACIONES DETERMINÍSTICAS usando seed del slug.
 * Solo se usa si la emisora NO tiene descripción en la BD.
 * 
 * Cada slug produce SIEMPRE el mismo párrafo → contenido estable y sustancioso para Google.
 */
function generateSmartDescription(
  station: Station,
  city: string,
  countryName: string,
  lang: string
): string {
  const seed = station.slug || station.nombre;
  const pick = <T,>(arr: T[], suffix: string): T => arr[hashString(seed + suffix) % arr.length];

  const genres = station.genres?.map((g: Genre) => g.name) || [];
  const hasNews = genres.some((g) => 
    g.toLowerCase().includes('noticia') || g.toLowerCase().includes('news')
  );
  const hasMusic = genres.some((g) => 
    ['música', 'music', 'rock', 'pop', 'salsa', 'jazz', 'clásica'].some(m => g.toLowerCase().includes(m))
  );

  if (lang === 'es') {
    if (hasNews) {
      const p1 = `${pick(['Mantente informado con','Sigue la actualidad en','Escucha las noticias más relevantes en','Conecta con la información de'], 'nP1')} ${station.nombre}, ${pick(['la fuente líder de noticias en','tu estación de confianza desde','transmitiendo reportajes en vivo desde'], 'nP1b')} ${city}. ${pick(['Sucesos, análisis y debate en vivo.','Cobertura 24/7 sin interrupciones.','La voz autorizada de la región.','Información verificada al instante.'], 'nP1c')}`;
      const p2 = pick([
        `Sintoniza desde cualquier dispositivo con streaming de alta calidad. Sin necesidad de registro ni suscripción, acceso libre las 24 horas.`,
        `Disponible online para que escuches desde el navegador, el celular o la tablet. Sin descargas, sin cortes, completamente gratis.`,
        `Transmisión en vivo desde ${city}, ${countryName}. Conéctate cuando quieras desde cualquier lugar del mundo con un solo clic.`,
        `La señal llega directo a tu dispositivo sin interrupciones. Solo necesitas conexión a internet para mantenerte al día con las noticias de ${countryName}.`,
      ], 'nP2');
      const p3 = pick([
        `${station.nombre} forma parte del directorio de Emisoras Latinas, la plataforma líder de radio online en Latinoamérica con más de 21,000 estaciones en vivo.`,
        `Descubre más emisoras de ${countryName} en Emisoras Latinas. Navega por el catálogo sin que la transmisión se detenga.`,
        `Explora otras emisoras de noticias, deportes y música en Emisoras Latinas. El catálogo más completo de radio en vivo de Latinoamérica.`,
      ], 'nP3');
      return `${p1} ${p2} ${p3}`;
    }

    if (hasMusic && genres[0]) {
      const p1 = `${pick(['Disfruta de la mejor selección de','Escucha los mejores éxitos de','Sintoniza ahora la mejor','Conéctate con los ritmos de','Vive la experiencia musical de'], 'mP1')} ${genres[0]} ${pick([`en ${station.nombre}. Transmitiendo desde el corazón de`,`en ${station.nombre}, directo desde`,`con ${station.nombre}, la señal líder de`,`a través de ${station.nombre}, en vivo desde`], 'mP1b')} ${city}, ${pick(['sin cortes comerciales.','disponible online gratis.','con la mejor calidad de audio.','streaming 24/7 para ti.','la banda sonora de tu día.'], 'mP1c')}`;
      const p2 = pick([
        `Conéctate desde cualquier dispositivo y disfruta de programación continua sin interrupciones. Escucha desde el navegador, el móvil o la tablet sin necesidad de instalar nada.`,
        `La música no se detiene. Reproduce en segundo plano mientras navegas por otras páginas. Acceso gratuito ilimitado, sin registro ni suscripciones.`,
        `Transmisión en alta definición desde ${city}, ${countryName}. La mejor selección musical te espera con un solo clic. Streaming 24 horas al día.`,
        `Dale play y deja que la música te acompañe. Señal estable y de calidad desde ${countryName} para todo el mundo. Sin cortes, 100% gratis.`,
      ], 'mP2');
      const p3 = pick([
        `${station.nombre} es parte de Emisoras Latinas, el directorio de radio online más grande de Latinoamérica con más de 21,000 emisoras. Encuentra tu estación favorita y escucha sin límites.`,
        `Descubre más emisoras de ${genres[0]} y otros géneros en Emisoras Latinas. Navega por el catálogo de ${countryName} mientras sigues escuchando tu música.`,
        `Emisoras Latinas te conecta con las mejores radios de ${countryName} y toda Latinoamérica. Explora, descubre y disfruta de radio en vivo gratis.`,
      ], 'mP3');
      return `${p1} ${p2} ${p3}`;
    }

    const p1 = `${pick(['Escucha','Sintoniza ahora','Disfruta de','Conéctate con'], 'gP1')} ${station.nombre}, ${pick(['transmitiendo en vivo desde','la señal líder de','directo desde el corazón de'], 'gP1b')} ${city}, ${pick(['sin cortes.','disponible online.','con la mejor calidad de audio.','gratis para ti.'], 'gP1c')}`;
    const p2 = pick([
      `Accede desde cualquier dispositivo con conexión a internet. Streaming continuo 24/7 sin necesidad de registro, suscripción ni descargas. Solo entra y dale play.`,
      `La radio online más fácil de escuchar. Reproduce en el navegador, el celular o la tablet sin instalar aplicaciones. Señal estable desde ${city}, ${countryName}.`,
      `Disfruta de programación variada desde ${countryName} para todo el mundo. Conexión gratuita e ilimitada los 7 días de la semana, las 24 horas del día.`,
    ], 'gP2');
    const p3 = pick([
      `${station.nombre} forma parte del catálogo de Emisoras Latinas, donde encontrarás más de 21,000 radios en vivo de toda Latinoamérica. Explora, descubre y escucha sin límites.`,
      `Emisoras Latinas es la plataforma líder de radio online en español. Navega por el directorio de ${countryName} y encuentra tu próxima emisora favorita.`,
      `Busca más emisoras de ${countryName} y otros países en Emisoras Latinas. El catálogo de radio en vivo más completo de Latinoamérica, siempre gratis.`,
    ], 'gP3');
    return `${p1} ${p2} ${p3}`;

  } else {
    if (hasNews) {
      const p1 = `${pick(['Stay informed with','Get the latest news from','Listen to breaking news on','Connect with current events via'], 'enNp1')} ${station.nombre}, ${pick(['your trusted news source in','broadcasting live from','the leading voice of'], 'enNp1b')} ${city}. ${pick(['Live coverage and analysis.','24/7 news without interruptions.','Verified information instantly.','The authoritative voice of the region.'], 'enNp1c')}`;
      const p2 = pick([
        `Tune in from any device with high-quality streaming. No registration or subscription needed — free access 24 hours a day.`,
        `Available online for browser, phone, or tablet. No downloads, no interruptions, completely free.`,
        `Live broadcast from ${city}, ${countryName}. Connect whenever you want from anywhere in the world with a single click.`,
        `The signal reaches your device without interruptions. All you need is an internet connection to stay up to date with news from ${countryName}.`,
      ], 'enNp2');
      const p3 = pick([
        `${station.nombre} is part of Emisoras Latinas, the leading online radio platform in Latin America with over 21,000 live stations.`,
        `Discover more stations from ${countryName} on Emisoras Latinas. Browse the catalog while your broadcast keeps playing.`,
        `Explore more news, sports and music stations on Emisoras Latinas. The most complete live radio directory in Latin America.`,
      ], 'enNp3');
      return `${p1} ${p2} ${p3}`;
    }

    if (hasMusic && genres[0]) {
      const p1 = `${pick(['Enjoy the best','Listen to top hits of','Tune in to the finest','Connect with the rhythms of','Experience the best'], 'enMp1')} ${genres[0]} ${pick([`on ${station.nombre}, broadcasting from`,`via ${station.nombre}, live from`,`with ${station.nombre}, streaming from`,`through ${station.nombre}, direct from`], 'enMp1b')} ${city}, ${pick(['commercial-free.','available online free.','with superior audio quality.','24/7 streaming for you.','the soundtrack of your day.'], 'enMp1c')}`;
      const p2 = pick([
        `Connect from any device and enjoy uninterrupted programming. Listen from your browser, phone, or tablet — no installation needed.`,
        `The music never stops. Play in the background while browsing other pages. Unlimited free access, no registration or subscriptions.`,
        `HD streaming from ${city}, ${countryName}. The best music selection is waiting for you with a single click. 24-hour broadcasting.`,
        `Hit play and let the music accompany you. Stable, quality signal from ${countryName} to the world. No cuts, 100% free.`,
      ], 'enMp2');
      const p3 = pick([
        `${station.nombre} is part of Emisoras Latinas, the largest online radio directory in Latin America with over 21,000 stations. Find your favorite and listen without limits.`,
        `Discover more ${genres[0]} stations and other genres on Emisoras Latinas. Browse the ${countryName} catalog while your music keeps playing.`,
        `Emisoras Latinas connects you with the best radio from ${countryName} and all of Latin America. Explore, discover, and enjoy free live radio.`,
      ], 'enMp3');
      return `${p1} ${p2} ${p3}`;
    }

    const p1 = `${pick(['Listen to','Tune in now to','Enjoy','Connect with'], 'enGp1')} ${station.nombre}, ${pick(['broadcasting live from','the leading station of','streaming direct from'], 'enGp1b')} ${city}, ${pick(['without interruptions.','available online.','with the best audio quality.','free for you.'], 'enGp1c')}`;
    const p2 = pick([
      `Access from any device with an internet connection. Continuous 24/7 streaming with no registration, subscription, or downloads needed. Just enter and hit play.`,
      `The easiest online radio to listen to. Play in your browser, phone, or tablet without installing apps. Stable signal from ${city}, ${countryName}.`,
      `Enjoy diverse programming from ${countryName} for the world. Free, unlimited connection 7 days a week, 24 hours a day.`,
    ], 'enGp2');
    const p3 = pick([
      `${station.nombre} is part of the Emisoras Latinas catalog, where you'll find over 21,000 live radio stations from all over Latin America. Explore, discover, and listen without limits.`,
      `Emisoras Latinas is the leading online radio platform in Spanish and English. Browse the ${countryName} directory and find your next favorite station.`,
      `Search for more stations from ${countryName} and other countries on Emisoras Latinas. The most complete live radio catalog in Latin America, always free.`,
    ], 'enGp3');
    return `${p1} ${p2} ${p3}`;
  }
}

// ISR: cada página se cachea 24h tras la primera generación on-demand.
// Esto reduce queries a Neon en ~99% — antes con force-dynamic cada visita
// disparaba una query fresca a la BD por el backend.
export const revalidate = 86400;
export const dynamicParams = true;

/**
 * Fetch al backend con 1 reintento ante errores transitorios (red/timeout o 5xx).
 * Devuelve la Response para que el llamador distinga:
 *   - 404  → la emisora NO existe (notFound legítimo)
 *   - 5xx / red → backend caído (NO es un 404; conviene devolver 500 y reintentar)
 * Esto evita que un tropiezo puntual de Neon/Render haga que Google des-indexe
 * una página que sí existe (clave para la revisión de AdSense).
 */
async function fetchStationFull(url: string, retries = 1): Promise<Response> {
  let lastErr: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { next: { revalidate: 86400 } });
      if (res.status >= 500 && attempt < retries) {
        await new Promise((r) => setTimeout(r, 400)); // backoff corto antes de reintentar
        continue;
      }
      return res;
    } catch (err) {
      lastErr = err; // error de red / timeout
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 400));
        continue;
      }
    }
  }
  throw lastErr ?? new Error('fetchStationFull: backend no disponible');
}

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
      next: { revalidate: 86400 } // 24h: alineado con el revalidate de la página
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
        const tail = ' ¡Escucha en vivo ahora, sin cortes!';
        const room = 158 - tail.length;
        const trimmed = richSource.length <= room
          ? richSource
          : richSource.substring(0, room - 1).trim() + '…';
        return `${trimmed}${tail}`;
      }
      const template = `Escucha ${station.nombre} desde ${location}, ${country.name} en vivo online. Radio gratis 24/7, sin cortes ni registro. ¡Dale play ahora!`;
      return template.length <= 158 ? template : template.substring(0, 157) + '…';
    };
    const seoDescription = buildSeoDescription();
    
    // OG/Twitter: emojis permitidos, contenido más emocional para social sharing (FB/WA/X).
    const socialTitle = `▶️ ${station.nombre} EN VIVO 🎧 ${location}`;
    const socialDescription = `Escucha ${station.nombre} en vivo desde ${location}, ${country.name}. Radio gratis 24/7, sin cortes ni registro. ¡Dale play ahora! 🎶`;
    const socialImage = station.logoUrl
      ? getStaticUrl(station.logoUrl)
      : 'https://www.emisoraslatinas.online/logos_general/logo_emisoras_latinas.jpg';

    return {
      // absolute: la marca ya viene incluida en seoTitle, no queremos el template del layout encima.
      title: { absolute: seoTitle },
      description: seoDescription,
      alternates: {
        canonical: `/radio/${resolvedParams.country}/${resolvedParams.slug}`,
        languages: {
          [getHreflangFromCountry(code)]: `/radio/${resolvedParams.country}/${resolvedParams.slug}`,
        },
      },
      openGraph: {
        title: socialTitle,
        description: socialDescription,
        url: `https://www.emisoraslatinas.online/radio/${resolvedParams.country}/${resolvedParams.slug}`,
        type: 'website',
        images: [
          {
            url: socialImage,
            width: 1200,
            height: 630,
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

  let res: Response;
  try {
    res = await fetchStationFull(`${API_URL}/stations/${resolvedParams.slug}/full`);
  } catch (error) {
    // Red/timeout tras reintentos: el backend está caído, NO que la emisora no exista.
    // Lanzamos para que Next devuelva 500 → Google reintenta luego en vez de tratarla
    // como 404 y sacarla del índice (esto protege la revisión de AdSense).
    console.error(`[StationPage] Backend inaccesible para ${resolvedParams.slug}:`, error);
    throw new Error(`Backend no disponible para ${resolvedParams.slug}`);
  }

  // 404 explícito = la emisora realmente no existe → notFound legítimo.
  if (res.status === 404) {
    return notFound();
  }
  // 5xx persistente tras el reintento → 500 (no 404), para que Google reintente.
  if (!res.ok) {
    console.error(`[StationPage] Backend respondió ${res.status} para ${resolvedParams.slug}`);
    throw new Error(`Backend respondió ${res.status} para ${resolvedParams.slug}`);
  }

  try {
    const data = await res.json();
    station = data.station;
    relatedStations = data.relatedStations;
  } catch (error) {
    console.error(`[StationPage] Respuesta inválida para ${resolvedParams.slug}:`, error);
    throw new Error(`Respuesta inválida del backend para ${resolvedParams.slug}`);
  }

  // Defensa: si el backend respondió 200 pero sin la emisora, es inconsistencia de datos.
  if (!station) {
    return notFound();
  }
  relatedStations = relatedStations ?? [];
  
  const {t, lang} = getI18nFromCountry(code);
  
  // Extraer frecuencia del nombre si existe
  const frequency = station.nombre.match(/(\d{2,3}\.?\d?\s*(?:FM|AM))/i)?.[0];
  const location = station.ciudad || country.name;

  const pageUrl = `https://www.emisoraslatinas.online/radio/${resolvedParams.country}/${resolvedParams.slug}`;

  // sameAs: enlaza la entidad emisora con su web oficial y redes sociales reales.
  // Es la señal de entidad más fuerte (entity disambiguation / Knowledge Graph).
  // Solo datos verificados de la BD — nunca inventados.
  const sameAs = [
    station.sitioWeb,
    ...(station.socialNetworks?.map((sn: SocialNetwork) => sn.url) || []),
  ].filter((u): u is string => Boolean(u));

  const schemaGenres: string[] = station.genres?.map((g: Genre) => g.name) || [];

  // areaServed: City SOLO cuando hay ciudad real; si no, Country (evita marcar
  // un país como "City", que es factualmente incorrecto).
  const schemaAreaServed = station.ciudad
    ? {
        "@type": "City",
        name: station.ciudad,
        containedInPlace: { "@type": "Country", name: country.name },
      }
    : { "@type": "Country", name: country.name };

  // JSON-LD para SEO
  const stationJsonLd = {
    "@context": "https://schema.org",
    "@type": "RadioStation",
    "@id": `${pageUrl}#radiostation`,
    "name": station.nombre,
    "description": station.descripcionExtendida || station.descripcion,
    "url": pageUrl,
    "inLanguage": getHreflangFromCountry(code),
    "broadcastFrequency": frequency || undefined,
    "areaServed": schemaAreaServed,
    "genre": schemaGenres.length ? schemaGenres : undefined,
    "image": station.logoUrl ? getStaticUrl(station.logoUrl) : undefined,
    "sameAs": sameAs.length ? sameAs : undefined,
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://www.emisoraslatinas.online/#website",
      "name": "Emisoras Latinas",
      "url": "https://www.emisoraslatinas.online",
    },
    "potentialAction": {
      "@type": "ListenAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": pageUrl,
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ]
      },
      "expectsAcceptanceOf": {
        "@type": "Offer",
        "name": station.nombre,
        "availability": "https://schema.org/InStock",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
  };

  // FAQ factual por emisora: respuestas basadas en datos REALES (nombre,
  // frecuencia, ciudad, país, géneros), no prosa hilada. Aporta contenido útil
  // y único por página y habilita rich results (FAQPage), atacando el riesgo de
  // "scaled content" mejorando el contenido en vez de ocultarlo.
  const genreNames: string[] = station.genres?.map((g: Genre) => g.name) || [];
  const stationFaqs: { q: string; a: string }[] = lang === 'en'
    ? [
        { q: `How can I listen to ${station.nombre} live?`, a: `Click play on this page. ${station.nombre} streams live for free, with no registration, from any device with a web browser.` },
        ...(frequency ? [{ q: `What frequency does ${station.nombre} broadcast on?`, a: `${station.nombre} broadcasts on ${frequency}${location ? ` from ${location}` : ''}, ${country.name}.` }] : []),
        { q: `Is it free to listen to ${station.nombre}?`, a: `Yes. Listening to ${station.nombre} on Emisoras Latinas is completely free, 24/7, with no subscription or sign-up.` },
        ...(genreNames.length ? [{ q: `What does ${station.nombre} play?`, a: `${station.nombre} broadcasts ${genreNames.join(', ')}.` }] : []),
        { q: `Where does ${station.nombre} broadcast from?`, a: `${station.nombre} broadcasts from ${location}, ${country.name}.` },
      ]
    : [
        { q: `¿Cómo escuchar ${station.nombre} en vivo?`, a: `Haz clic en reproducir en esta página. ${station.nombre} transmite en vivo gratis, sin registro, desde cualquier dispositivo con navegador.` },
        ...(frequency ? [{ q: `¿En qué frecuencia transmite ${station.nombre}?`, a: `${station.nombre} transmite en ${frequency}${location ? ` desde ${location}` : ''}, ${country.name}.` }] : []),
        { q: `¿Es gratis escuchar ${station.nombre}?`, a: `Sí. Escuchar ${station.nombre} en Emisoras Latinas es completamente gratis, las 24 horas, sin suscripción ni registro.` },
        ...(genreNames.length ? [{ q: `¿Qué tipo de programación tiene ${station.nombre}?`, a: `${station.nombre} emite ${genreNames.join(', ')}.` }] : []),
        { q: `¿Desde dónde transmite ${station.nombre}?`, a: `${station.nombre} transmite desde ${location}, ${country.name}.` },
      ];

  const stationFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: stationFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(stationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(stationFaqJsonLd) }}
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
                  src={station.logoUrl ? optimizeCloudinary(getStaticUrl(station.logoUrl), 320) : '/logos_general/antena.png'}
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
                    <Link
                      key={idx}
                      href={`/radio/${resolvedParams.country}?categories=${encodeURIComponent(genre.name)}`}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30 hover:bg-blue-500/40 transition-colors"
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Reproductor Integrado - Ocupa todo el ancho */}
          <div className="mt-8">
            <IntegratedPlayer station={station} countryCode={code} autoPlay={true} />
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
              {/* CASCADA 3 NIVELES:
                  1. descripcionExtendida (poblada por script, ~280 chars, única por emisora)
                  2. descripcion corta + frase de frecuencia (las pocas con BD original)
                  3. plantilla generateSmartDescription (fallback) */}
              {station.descripcionExtendida && station.descripcionExtendida.length > 50 ? (
                <p>{station.descripcionExtendida}</p>
              ) : station.descripcion && station.descripcion.length > 50 ? (
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
                  <Link
                    key={idx}
                    href={`/radio/${resolvedParams.country}?categories=${encodeURIComponent(genre.name)}`}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30 hover:from-purple-500/40 hover:to-pink-500/40 transition-colors"
                  >
                    {genre.name}
                  </Link>
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

        {/* Preguntas frecuentes de la emisora (contenido factual + FAQPage schema) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <i className="fas fa-circle-question text-blue-400"></i>
            </div>
            {lang === 'en' ? 'Frequently asked questions' : 'Preguntas frecuentes'}
          </h2>
          <div className="space-y-3">
            {stationFaqs.map((faq, idx) => (
              <details key={idx} className="group glass-effect rounded-xl p-5">
                <summary className="flex items-center justify-between text-white font-semibold cursor-pointer list-none">
                  <span>{faq.q}</span>
                  <i className="fas fa-chevron-down text-blue-400 transition-transform group-open:rotate-180"></i>
                </summary>
                <p className="mt-3 text-slate-300 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

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
                      src={related.logoUrl ? optimizeCloudinary(getStaticUrl(related.logoUrl), 256) : '/logos_general/antena.png'}
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
