/**
 * Cliente API para consumo público de anuncios publicitarios
 */

import { Advertisement, AdvertisementPosition, AdvertisementScope } from './api-admin-ads';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function getPublicAdvertisements(params: {
  position?: AdvertisementPosition;
  scope?: AdvertisementScope;
  countryId?: string;
  stationId?: string;
  isActive?: boolean;
}): Promise<Advertisement[]> {
  const searchParams = new URLSearchParams();
  if (params.isActive !== undefined) searchParams.set('isActive', String(params.isActive));
  if (params.position) searchParams.set('position', params.position);
  if (params.scope) searchParams.set('scope', params.scope);
  if (params.countryId) searchParams.set('countryId', params.countryId);
  if (params.stationId) searchParams.set('stationId', params.stationId);

  const queryString = searchParams.toString();
  const res = await fetch(`${API_BASE_URL.replace(/\/api$/, '')}/advertisements${queryString ? `?${queryString}` : ''}`, {
    next: { revalidate: 60 }, // Cache por 1 minuto
  });

  if (!res.ok) {
    console.error('Error fetching advertisements:', res.statusText);
    return [];
  }

  return res.json();
}
