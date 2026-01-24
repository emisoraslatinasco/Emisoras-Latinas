import { memo, useMemo } from 'react';
import { StationByCountry, CountryCode, countries } from '@/data/stationsByCountry';
import Image from 'next/image';
import Link from 'next/link';
import { getLogoPath } from '@/utils/logoMapper';

interface StationCardProps {
  station: StationByCountry;
  index: number;
  countryCode: CountryCode;
}

// Pre-compute country lookup map for O(1) access
const countryMap = new Map(countries.map(c => [c.code, c.name]));

/**
 * Extrae la frecuencia del nombre de la emisora
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
 * Extrae la ciudad
 */
function extractCity(station: StationByCountry): string | null {
  if (station.ciudad && station.ciudad.trim()) {
    return station.ciudad.trim();
  }
  return null;
}

/**
 * Genera JSON-LD para Schema.org
 */
function generateJsonLd(station: StationByCountry, countryCode: CountryCode): object {
  const frequency = extractFrequency(station.nombre);
  const city = extractCity(station);
  const countryName = countryMap.get(countryCode) || countryCode;
  
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "RadioStation",
    "name": station.nombre,
    "description": station.descripcion ? station.descripcion.substring(0, 300) : `Emisora de radio de ${countryName}`,
    "url": station.sitio_web || undefined,
  };
  
  if (frequency) {
    jsonLd["broadcastFrequency"] = frequency;
  }
  
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
  
  if (station.generos && station.generos.length > 0) {
    jsonLd["genre"] = station.generos.map(g => 
      g.replace(/^categoria:\s*/i, '').replace(/\n/g, '').trim()
    ).filter(g => g.length > 0);
  }
  
  if (station.redes_sociales && station.redes_sociales.length > 0) {
    jsonLd["sameAs"] = station.redes_sociales;
  }
  
  return jsonLd;
}

/**
 * StationCard - Tarjeta de emisora con estilo overlay (SOLO NAVEGACIÓN)
 * Info superpuesta sobre el logo para diseño compacto
 * Memoized para evitar re-renders innecesarios
 */
const StationCard = memo(function StationCard({ station, index, countryCode }: StationCardProps) {
  const logoSrc = getLogoPath(station.logo_local, countryCode);
  const frequency = extractFrequency(station.nombre);
  const city = extractCity(station);
  
  // Memoize JSON-LD to prevent regeneration on every render
  const jsonLd = useMemo(() => 
    generateJsonLd(station, countryCode), 
    [station, countryCode]
  );
  
  // URL de la página individual
  const stationUrl = `/radio/${countryCode.toLowerCase()}/${station.slug}`;

  return (
    <article
      className="group relative rounded-xl overflow-hidden transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
      aria-label={`${station.nombre}${frequency ? ` en ${frequency}` : ''}${city ? ` desde ${city}` : ''}`}
    >
      {/* JSON-LD para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Link que envuelve toda la tarjeta */}
      <Link href={stationUrl} className="block relative aspect-square">
        {/* Logo de fondo */}
        <div className="absolute inset-0 logo-container flex items-center justify-center bg-slate-900">
          <Image
            src={logoSrc}
            alt={`Logo de ${station.nombre}${frequency ? ` ${frequency}` : ''}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
            priority={index < 6}
            loading={index < 6 ? undefined : "lazy"}
            unoptimized
          />
        </div>
        
        {/* Overlay con nombre - estilo de producción */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-2 pt-6">
          <h3 className="text-white font-semibold text-xs truncate">
            {station.nombre}
          </h3>
        </div>

      </Link>
    </article>
  );
});

export default StationCard;
