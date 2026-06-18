'use client';

import { useEffect, useState } from 'react';
import { getPublicAdvertisements } from '@/lib/api-ads';
import { Advertisement, AdvertisementPosition, AdvertisementScope } from '@/lib/api-admin-ads';
import { getStaticUrl, optimizeCloudinary } from '@/lib/api';

interface StickyBottomAdProps {
  countryId?: string;
  stationId?: string;
  // GENERAL (página de país) por defecto; STATION para la página de emisora.
  scope?: AdvertisementScope;
}

/**
 * Banner inferior FIJO (sticky) que ocupa ~15% del alto del viewport, a lo ancho
 * de la página. Igual que los banners HOME_* es de scope GENERAL y se filtra por
 * país (countryId vacío = todos los países, resuelto en el backend con
 * `OR country.id IS NULL`).
 *
 * Trae su propio anuncio (en vez de envolver <BannerAd/>) para poder renderizar
 * el contenedor fijo + botón de cerrar SOLO cuando hay un anuncio que mostrar y
 * no dejar una franja vacía al pie de la página.
 */
export default function StickyBottomAd({ countryId, stationId, scope = AdvertisementScope.GENERAL }: StickyBottomAdProps) {
  const [ad, setAd] = useState<Advertisement | null>(null);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    getPublicAdvertisements({
      position: AdvertisementPosition.HOME_STICKY_BOTTOM,
      scope,
      countryId,
      stationId,
      isActive: true,
    })
      .then((ads) => {
        if (ads && ads.length > 0) {
          setAd(ads[Math.floor(Math.random() * ads.length)]);
        }
      })
      .catch((err) => console.error('Failed to load sticky ad', err));
  }, [countryId, stationId, scope]);

  if (!ad || !ad.imageUrl || closed) {
    return null;
  }

  const imageUrl = optimizeCloudinary(
    ad.imageUrl.startsWith('http') ? ad.imageUrl : getStaticUrl(ad.imageUrl),
    1600,
  );

  // Mismo criterio que BannerAd: marca enlaces de Amazon para el disclosure legal.
  const isAmazonLink = !!ad.linkUrl && /amazon\.|amzn\.to|amzn\.eu|a\.co\//i.test(ad.linkUrl);

  const imageElement = (
    <img
      src={imageUrl}
      alt={ad.name}
      className="h-full w-auto max-w-full object-contain"
      loading="lazy"
    />
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex h-[15vh] min-h-[80px] items-center justify-center border-t border-slate-700 bg-slate-900/95 backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setClosed(true)}
        aria-label="Cerrar anuncio"
        className="absolute right-1 top-1 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-slate-800/80 text-sm text-slate-300 hover:bg-slate-700 hover:text-white"
      >
        <i className="fas fa-times"></i>
      </button>

      {ad.linkUrl ? (
        <a
          href={ad.linkUrl}
          target="_blank"
          rel="noopener noreferrer sponsored nofollow"
          className="flex h-full items-center"
        >
          {imageElement}
        </a>
      ) : (
        <div className="flex h-full items-center">{imageElement}</div>
      )}

      {isAmazonLink && (
        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] leading-none text-slate-400">
          Como Asociado de Amazon, gano por las compras que califiquen.
        </span>
      )}
    </div>
  );
}
