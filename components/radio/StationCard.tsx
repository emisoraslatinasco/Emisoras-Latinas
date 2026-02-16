'use client';

import { memo, useState, useCallback } from 'react';
import { StationByCountry, CountryCode } from '@/data/stationsByCountry';
import Image from 'next/image';
import Link from 'next/link';

// Imagen por defecto local (no depende del backend)
const DEFAULT_RADIO_IMAGE = '/logos_general/antena.png';

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
 * Fallback de imagen: backend logo → imagen por defecto local
 * 
 * NOTE: JSON-LD schema is defined at the page level (ItemList), 
 * not per card, to optimize server-side rendering performance.
 */
const StationCard = memo(function StationCard({ station, index, countryCode }: StationCardProps) {
  // logo_local ya viene con la URL completa del backend desde stationsByCountry.ts
  const logoSrc = station.logo_local || DEFAULT_RADIO_IMAGE;
  const frequency = extractFrequency(station.nombre);
  const city = station.ciudad?.trim() || null;
  
  // Estado para el fallback de imagen
  const [imgSrc, setImgSrc] = useState(logoSrc);
  const [hasError, setHasError] = useState(false);
  
  // URL de la página individual
  const stationUrl = `/radio/${countryCode.toLowerCase()}/${station.slug}`;

  /**
   * Fallback de imagen:
   * 1. Intenta cargar logo del backend (logoSrc)
   * 2. Si falla → imagen por defecto local (/logos_general/antena.png)
   */
  const handleImageError = useCallback(() => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(DEFAULT_RADIO_IMAGE);
    }
  }, [hasError]);

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
            src={imgSrc}
            alt={`Logo de ${station.nombre}${frequency ? ` ${frequency}` : ''}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, 15vw"
            priority={index < 4}
            loading={index < 4 ? undefined : "lazy"}
            unoptimized
            onError={handleImageError}
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
