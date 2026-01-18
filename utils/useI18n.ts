'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { getTranslations, getLanguageCode } from './translations';

/**
 * Hook personalizado para internacionalización basada en el país de la URL
 * 
 * Uso:
 * const { t, lang, countryCode } = useI18n();
 * console.log(t.search_placeholder); // "Buscar emisora..." o "Search station..."
 */
export function useI18n() {
  const params = useParams();
  
  // Obtener el código de país de la URL (/radio/[country])
  const countryCode = useMemo(() => {
    const country = params?.country;
    if (typeof country === 'string') {
      return country.toUpperCase();
    }
    return 'CO'; // Default a Colombia si no hay país en la URL
  }, [params?.country]);
  
  // Obtener las traducciones para el país actual
  const t = useMemo(() => getTranslations(countryCode), [countryCode]);
  
  // Obtener el código de idioma
  const lang = useMemo(() => getLanguageCode(countryCode), [countryCode]);
  
  return {
    t,           // Objeto de traducciones
    lang,        // Código de idioma ('es', 'en', 'fr', etc.)
    countryCode, // Código de país ('CO', 'US', 'FR', etc.)
  };
}
