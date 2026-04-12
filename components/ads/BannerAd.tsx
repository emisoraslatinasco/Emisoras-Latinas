'use client';

import { useEffect, useState } from 'react';
import { getPublicAdvertisements } from '@/lib/api-ads';
import { Advertisement, AdvertisementPosition, AdvertisementScope } from '@/lib/api-admin-ads';
import { getStaticUrl } from '@/lib/api';

interface BannerAdProps {
  position: AdvertisementPosition;
  countryId?: string;
  stationId?: string;
  className?: string;
}

export default function BannerAd({ position, countryId, stationId, className = '' }: BannerAdProps) {
  const [ad, setAd] = useState<Advertisement | null>(null);

  useEffect(() => {
    // Si la posición es de emisora, pasamos stationId, sino filtramos scope General
    const scope = position === AdvertisementPosition.STATION_UNDER_REPORT 
      ? AdvertisementScope.STATION 
      : AdvertisementScope.GENERAL;

    getPublicAdvertisements({
      position,
      scope,
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
  }, [position, countryId, stationId]);

  if (!ad || !ad.imageUrl) {
    return null; // No muestra banner si no hay data
  }

  const imageUrl = ad.imageUrl.startsWith('http') 
    ? ad.imageUrl 
    : getStaticUrl(ad.imageUrl);

  const styleContext: React.CSSProperties = {
    width: ad.width || '100%',
    height: ad.height || 'auto',
    maxWidth: '100%',
  };

  const commonProps = {
    style: styleContext,
    className: `flex items-center justify-center overflow-hidden inline-block object-cover ${className}`,
    target: "_blank",
    rel: "noopener noreferrer"
  };

  const imageElement = (
      <img
        src={imageUrl}
        alt={ad.name}
        className="w-full h-full object-cover rounded-lg"
        loading="lazy"
      />
  );

  return (
    <div className={`mt-2 mb-2 flex justify-center w-full ${className}`}>
      {ad.linkUrl ? (
        <a href={ad.linkUrl} {...commonProps}>
          {imageElement}
        </a>
      ) : (
        <div style={styleContext} className={`overflow-hidden ${className}`}>
          {imageElement}
        </div>
      )}
    </div>
  );
}
