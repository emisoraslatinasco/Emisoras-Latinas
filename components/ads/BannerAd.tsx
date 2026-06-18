'use client';

import { useEffect, useState } from 'react';
import { getPublicAdvertisements } from '@/lib/api-ads';
import { Advertisement, AdvertisementPosition, AdvertisementScope } from '@/lib/api-admin-ads';
import { getStaticUrl, optimizeCloudinary } from '@/lib/api';

interface BannerAdProps {
  position: AdvertisementPosition;
  countryId?: string;
  stationId?: string;
  className?: string;
  // Scope explícito. Si se omite, se infiere de la posición (retrocompatible):
  // las posiciones HOME_* sirven tanto para la página de país (GENERAL) como para
  // la de emisora (STATION), por eso el contexto debe indicar el scope.
  scope?: AdvertisementScope;
}

export default function BannerAd({ position, countryId, stationId, className = '', scope }: BannerAdProps) {
  const [ad, setAd] = useState<Advertisement | null>(null);

  useEffect(() => {
    // Scope explícito si se pasó; si no, se infiere: STATION_UNDER_REPORT es de
    // emisora y el resto, por defecto, de la home/país.
    const resolvedScope = scope ?? (position === AdvertisementPosition.STATION_UNDER_REPORT
      ? AdvertisementScope.STATION
      : AdvertisementScope.GENERAL);

    getPublicAdvertisements({
      position,
      scope: resolvedScope,
      countryId,
      stationId,
      isActive: true,
    })
      .then((ads) => {
        if (ads && ads.length > 0) {
          // Si hay varios para una misma posición, seleccionamos uno aleatoriamente
          const randomAd = ads[Math.floor(Math.random() * ads.length)];
          setAd(randomAd);
        } else {
            console.warn(`No ads found for position ${position}`);
        }
      })
      .catch((err) => console.error('Failed to load ad', err));
  }, [position, countryId, stationId, scope]);

  if (!ad || !ad.imageUrl) {
    return null; // No muestra banner si no hay data
  }

  // Optimización + tope de ancho a 1000px (c_limit: solo reduce, no deforma).
  // Evita servir banners de varios MB a tamaño completo en cada carga.
  const imageUrl = optimizeCloudinary(
    ad.imageUrl.startsWith('http') ? ad.imageUrl : getStaticUrl(ad.imageUrl),
    1000,
  );

  const styleContext: React.CSSProperties = {
    width: ad.width || '100%',
    height: ad.height || 'auto',
    maxWidth: '100%',
  };

  const commonProps = {
    style: styleContext,
    className: `flex items-center justify-center overflow-hidden inline-block object-cover ${className}`,
    target: "_blank",
    // "sponsored" marca el enlace como publicidad/afiliado ante Google (evita
    // penalización SEO por venta de enlaces). "nofollow" da cobertura con
    // buscadores que aún no interpretan "sponsored". Aplica a todos los banners
    // porque todos son anuncios pagados (Amazon afiliados, Monetag, anunciantes).
    rel: "noopener noreferrer sponsored nofollow"
  };

  const imageElement = (
      <img
        src={imageUrl}
        alt={ad.name}
        className="w-full h-full object-cover rounded-lg"
        loading="lazy"
      />
  );

  // Amazon Associates exige mostrar este aviso de forma visible junto al enlace
  // de afiliado. Lo detectamos por la URL de destino (amazon.* / amzn.to / a.co)
  // para no tener que añadir un campo nuevo en el panel ni en la base de datos.
  const isAmazonLink = !!ad.linkUrl && /amazon\.|amzn\.to|amzn\.eu|a\.co\//i.test(ad.linkUrl);

  return (
    <div className={`mt-2 mb-2 flex flex-col items-center w-full ${className}`}>
      {ad.linkUrl ? (
        <a href={ad.linkUrl} {...commonProps}>
          {imageElement}
        </a>
      ) : (
        <div style={styleContext} className={`overflow-hidden ${className}`}>
          {imageElement}
        </div>
      )}
      {isAmazonLink && (
        <p className="mt-1 text-[10px] leading-tight text-gray-400 text-center">
          Como Asociado de Amazon, gano por las compras que califiquen.
        </p>
      )}
    </div>
  );
}
