'use client';

import { StationByCountry, CountryCode, countries } from '@/data/stationsByCountry';
import { useRadio } from '@/context/RadioContext';
import Image from 'next/image';
import { getLogoPath } from '@/utils/logoMapper';

interface StationCardProps {
  station: StationByCountry;
  index: number;
  countryCode: CountryCode;
}

/**
 * Extrae la frecuencia del nombre de la emisora
 * Ej: "Olímpica Stereo 104.9 FM" -> "104.9 FM"
 */
function extractFrequency(nombre: string): string | null {
  const patterns = [
    /(\d{2,3}\.?\d?\s*FM)/i,
    /(\d{2,3}\.?\d?\s*AM)/i,
    /(FM\s*\d{2,3}\.?\d?)/i,
    /(AM\s*\d{2,4})/i,
  ];
  for (const pattern of patterns) {
    const match = nombre.match(pattern);
    if (match) return match[1].trim().toUpperCase();
  }
  return null;
}

/**
 * Extrae la ciudad de la descripción o del campo ciudad
 */
function extractCity(station: StationByCountry): string | null {
  if (station.ciudad && station.ciudad.trim()) {
    return station.ciudad.trim();
  }
  return null;
}

/**
 * Genera JSON-LD para Schema.org RadioStation
 */
function generateJsonLd(station: StationByCountry, countryCode: CountryCode): object {
  const frequency = extractFrequency(station.nombre);
  const city = extractCity(station);
  const country = countries.find(c => c.code === countryCode);
  const countryName = country?.name || countryCode;
  
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "RadioStation",
    "name": station.nombre,
    "description": station.descripcion ? station.descripcion.substring(0, 300) : `Emisora de radio de ${countryName}`,
    "url": station.sitio_web || undefined,
  };
  
  // Agregar frecuencia si existe
  if (frequency) {
    jsonLd["broadcastFrequency"] = frequency;
  }
  
  // Agregar área servida
  if (city) {
    jsonLd["areaServed"] = {
      "@type": "Place",
      "name": city,
      "containedInPlace": {
        "@type": "Country",
        "name": countryName
      }
    };
  } else {
    jsonLd["areaServed"] = {
      "@type": "Country",
      "name": countryName
    };
  }
  
  // Agregar géneros si existen
  if (station.generos && station.generos.length > 0) {
    jsonLd["genre"] = station.generos.map(g => 
      g.replace(/^categoria:\s*/i, '').replace(/\n/g, '').trim()
    ).filter(g => g.length > 0);
  }
  
  // Agregar redes sociales si existen
  if (station.redes_sociales && station.redes_sociales.length > 0) {
    jsonLd["sameAs"] = station.redes_sociales;
  }
  
  return jsonLd;
}

export default function StationCard({ station, index, countryCode }: StationCardProps) {
  const { currentStation, isPlaying, loadingStation, playStation } = useRadio();
  const isCurrentStation = currentStation?.nombre === station.nombre;
  const isCurrentlyPlaying = isCurrentStation && isPlaying;
  const isThisStationLoading = loadingStation === station.nombre;
  
  const logoSrc = getLogoPath(station.logo_local, countryCode);
  const frequency = extractFrequency(station.nombre);
  const city = extractCity(station);
  const jsonLd = generateJsonLd(station, countryCode);

  return (
    <article
      onClick={() => playStation(station, countryCode)}
      className={`group relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 shadow-lg ${
        isCurrentlyPlaying 
          ? 'scale-105 animate-border-glow' 
          : isThisStationLoading
          ? 'scale-105'
          : 'bg-slate-800/40 hover:bg-slate-800/60 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20'
      }`}
      aria-label={`Reproducir ${station.nombre}${frequency ? ` en ${frequency}` : ''}${city ? ` desde ${city}` : ''}`}
    >
      {/* JSON-LD Structured Data - Invisible para usuarios, legible por Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Borde animado con gradiente cuando está reproduciendo */}
      {isCurrentlyPlaying && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl animate-gradient-rotate opacity-75"></div>
      )}
      
      {/* Borde pulsante cuando está cargando */}
      {isThisStationLoading && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 rounded-2xl animate-pulse opacity-75"></div>
      )}
      
      <div className={`relative aspect-square w-full ${isCurrentlyPlaying || isThisStationLoading ? 'rounded-2xl overflow-hidden' : ''}`}>
        {/* Logo de la emisora */}
        <div className={`absolute inset-0 logo-container flex items-center justify-center bg-slate-900 ${isCurrentlyPlaying || isThisStationLoading ? 'inset-0.5 rounded-xl' : ''}`}>
          <Image
            src={logoSrc}
            alt={`Logo de ${station.nombre}${frequency ? ` ${frequency}` : ''}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            priority={index < 12}
            loading={index < 12 ? undefined : "lazy"}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          {/* Fallback icon si la imagen no carga */}
          <div className="fallback-icon hidden w-full h-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
            <i className={`fas fa-radio text-white ${isCurrentlyPlaying ? 'text-6xl' : 'text-7xl'} opacity-90`} aria-hidden="true"></i>
          </div>

          {/* Overlay con icono de Play/Pause/Loading */}
          <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 flex items-center justify-center z-10 ${
            isThisStationLoading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/40">
              {isThisStationLoading ? (
                <i className="fas fa-spinner fa-spin text-white text-2xl" aria-hidden="true"></i>
              ) : (
                <i className={`fas ${isCurrentlyPlaying ? 'fa-pause' : 'fa-play'} text-white text-2xl ${isCurrentlyPlaying ? '' : 'ml-1'}`} aria-hidden="true"></i>
              )}
            </div>
          </div>

          {/* Indicador de reproducción activa con ecualizador */}
          {isCurrentlyPlaying && (
            <div className="absolute bottom-2 right-2 z-20">
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-purple-600 px-2.5 py-1.5 rounded-full shadow-lg">
                <div className="flex items-end gap-0.5 h-4">
                  <div className="w-1 bg-white rounded-full equalizer-bar-1" style={{ height: '60%' }}></div>
                  <div className="w-1 bg-white rounded-full equalizer-bar-2" style={{ height: '100%' }}></div>
                  <div className="w-1 bg-white rounded-full equalizer-bar-3" style={{ height: '40%' }}></div>
                  <div className="w-1 bg-white rounded-full equalizer-bar-4" style={{ height: '80%' }}></div>
                </div>
                <span className="text-white text-xs font-bold">EN VIVO</span>
              </div>
            </div>
          )}
        </div>

        {/* Información de la emisora - Visible */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10">
          {/* Nombre con etiqueta semántica h3 */}
          <h3 
            className="text-white font-semibold text-sm truncate drop-shadow-lg"
            style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)' }}
          >
            {station.nombre}
          </h3>
          
          {/* Frecuencia visible si existe - SEO importante */}
          {frequency && (
            <p className="text-blue-400 text-xs font-medium mt-0.5 drop-shadow-md">
              <i className="fas fa-broadcast-tower mr-1" aria-hidden="true"></i>
              {frequency}
              {city && <span className="text-slate-400"> • {city}</span>}
            </p>
          )}
          
          {/* Géneros */}
          {station.generos && station.generos.length > 0 && !frequency && (
            <p 
              className="text-slate-400 text-xs truncate mt-0.5 drop-shadow-md"
              style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)' }}
            >
              {station.generos.slice(0, 2).map(g => 
                g.replace(/^categoria:\s*/i, '').replace(/\n/g, '').trim()
              ).join(', ')}
            </p>
          )}
        </div>
        
        {/* Contenido SEO oculto visualmente pero presente en DOM para Google */}
        <div className="sr-only">
          <span>Nombre de emisora: {station.nombre}</span>
          {frequency && <span>Frecuencia: {frequency}</span>}
          {city && <span>Ubicación: {city}</span>}
          {station.generos && station.generos.length > 0 && (
            <span>Géneros: {station.generos.join(', ')}</span>
          )}
          {station.descripcion && (
            <p>{station.descripcion}</p>
          )}
        </div>
      </div>
    </article>
  );
}
