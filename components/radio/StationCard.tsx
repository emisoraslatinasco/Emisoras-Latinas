import { memo } from 'react';
import { StationByCountry, CountryCode } from '@/data/stationsByCountry';
import Image from 'next/image';
import Link from 'next/link';
import { getLogoPath } from '@/utils/logoMapper';

interface StationCardProps {
  station: StationByCountry;
  index: number;
  countryCode: CountryCode;
}

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
 * StationCard - Tarjeta de emisora con estilo overlay (SOLO NAVEGACIÓN)
 * Info superpuesta sobre el logo para diseño compacto
 * Memoized para evitar re-renders innecesarios
 * 
 * NOTE: JSON-LD schema is defined at the page level (ItemList), 
 * not per card, to optimize server-side rendering performance.
 */
const StationCard = memo(function StationCard({ station, index, countryCode }: StationCardProps) {
  const logoSrc = getLogoPath(station.logo_local, countryCode);
  const frequency = extractFrequency(station.nombre);
  const city = station.ciudad?.trim() || null;
  
  // URL de la página individual
  const stationUrl = `/radio/${countryCode.toLowerCase()}/${station.slug}`;

  return (
    <article
      className="group relative rounded-xl overflow-hidden transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
      aria-label={`${station.nombre}${frequency ? ` en ${frequency}` : ''}${city ? ` desde ${city}` : ''}`}
    >
      {/* Link que envuelve toda la tarjeta */}
      <Link href={stationUrl} className="block relative aspect-square">
        {/* Logo de fondo */}
        <div className="absolute inset-0 logo-container flex items-center justify-center bg-slate-900">
          <Image
            src={logoSrc}
            alt={`Logo de ${station.nombre}${frequency ? ` ${frequency}` : ''}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, 15vw"
            priority={index < 4}
            loading={index < 4 ? undefined : "lazy"}
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
