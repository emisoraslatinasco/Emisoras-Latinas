import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { countries, CountryCode, loadStationsByCountry } from '@/data/stationsByCountry';
import { getI18nFromCountry } from '@/utils/translations';
import { Footer } from '@/components/layout';
import AdSpace from '@/components/ui/AdSpace';
import { getLogoPath } from '@/utils/logoMapper';
import IntegratedPlayer from '@/components/ui/IntegratedPlayer';
import ReportButton from '@/components/ui/ReportButton';

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
  
  const stations = await loadStationsByCountry(code);
  const station = stations.find(s => s.slug === resolvedParams.slug);
  
  if (!station) {
    return { title: 'Emisora no encontrada | Emisoras Latinas' };
  }
  
  getI18nFromCountry(code); // Validate country code
  const stationFrequency = station.nombre.match(/(\d{2,3}\.?\d?\s*(?:FM|AM))/i)?.[0];
  const frequency = stationFrequency ? ` ${stationFrequency}` : '';
  const location = station.ciudad || country.name;
  
  // Título optimizado para CTR: "Escuchar {Name} en VIVO {Freq} - {City} | Gratis"
  const seoTitle = `Escuchar ${station.nombre} en VIVO${frequency} - ${location} | Gratis`;
  
  // Descripción persuasiva con CTA
  const seoDescription = station.descripcion 
    ? `▶️ ${station.descripcion.substring(0, 120)}... Escucha ahora gratis, sin cortes.`
    : `▶️ Escucha ${station.nombre}${frequency} en vivo desde ${location}. Radio online gratis 24/7, sin cortes ni registro. ¡Dale play ahora!`;
  
  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: `/radio/${resolvedParams.country}/${resolvedParams.slug}`,
    },
    openGraph: {
      title: `▶️ ${station.nombre} - Radio en Vivo Gratis`,
      description: seoDescription,
      url: `https://www.emisoraslatinas.online/radio/${resolvedParams.country}/${resolvedParams.slug}`,
      type: 'website',
      images: [
        {
          url: getLogoPath(station.logo_local, code),
          width: 800,
          height: 600,
          alt: station.nombre,
        }
      ]
    }
  };
}

export default async function StationPage({ params }: { params: Promise<{ country: string; slug: string }> }) {
  const resolvedParams = await params;
  const code = resolvedParams.country.toUpperCase() as CountryCode;
  const country = countries.find(c => c.code === code);
  
  if (!country) return notFound();
  
  const stations = await loadStationsByCountry(code);
  const station = stations.find(s => s.slug === resolvedParams.slug);
  
  if (!station) return notFound();
  
  const {t, lang} = getI18nFromCountry(code);
  
  // Emisoras relacionadas de la misma ciudad
  const relatedStations = stations
    .filter(s => s.ciudad === station.ciudad && s.slug !== station.slug)
    .slice(0, 6);
  
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
    "genre": station.generos?.join(', '),
    "image": station.logo_local,
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(stationJsonLd) }}
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
                <Image
                  src={getLogoPath(station.logo_local, code)}
                  alt={station.nombre}
                  fill
                  className="object-cover"
                  priority
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
              {station.generos && station.generos.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {station.generos.slice(0, 5).map((genre, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                    >
                      {genre}
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
        <div className="mb-8">
          <AdSpace width="w-full max-w-4xl mx-auto" height="h-24" label="Publicidad" />
        </div>

        {/* Información Organizada en Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          {/* Sección: Sobre la Emisora */}
          <div className="glass-effect rounded-2xl p-6 lg:col-span-2">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <i className="fas fa-info-circle text-blue-400"></i>
              </div>
              {lang === 'es' ? 'Acerca de' : lang === 'en' ? 'About' : 'Sobre'} {station.nombre}
            </h2>
            <div className="text-slate-300 leading-relaxed space-y-3">
              {station.descripcion ? (
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
                  {lang === 'es' 
                    ? `${station.nombre} es una emisora de ${country.name}. Disfruta de su programación en vivo las 24 horas del día.`
                    : `${station.nombre} is a radio station from ${country.name}. Enjoy live programming 24/7.`
                  }
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
            {station.sitio_web ? (
              <a 
                href={station.sitio_web}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl hover:bg-slate-700/50 transition-colors group"
              >
                <i className="fas fa-external-link-alt text-green-400 group-hover:scale-110 transition-transform"></i>
                <span className="text-blue-400 hover:text-blue-300 truncate text-sm">
                  {station.sitio_web.replace(/^https?:\/\//, '').replace(/\/$/, '')}
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
            {station.redes_sociales && station.redes_sociales.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {station.redes_sociales.map((red, idx) => {
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
                      title={red}
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
          {station.generos && station.generos.length > 0 && (
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <i className="fas fa-music text-purple-400"></i>
                </div>
                {lang === 'es' ? 'Géneros' : 'Genres'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {station.generos.map((genre, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                  >
                    {genre}
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
              {relatedStations.map((related) => (
                <Link
                  key={related.slug}
                  href={`/radio/${resolvedParams.country}/${related.slug}`}
                  className="glass-effect rounded-xl p-4 hover:scale-105 transition-transform text-center"
                >
                  <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden">
                    <Image
                      src={getLogoPath(related.logo_local, code)}
                      alt={related.nombre}
                      fill
                      className="object-cover"
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
