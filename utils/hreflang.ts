import { getLanguageCode } from '@/utils/translations';

const langToHreflang: Record<string, string> = {
  es: 'es',
  en: 'en',
  fr: 'fr',
  pt: 'pt',
  it: 'it',
  da: 'da',
  uk: 'uk',
};

export function getHreflangFromCountry(countryCode: string): string {
  const lang = getLanguageCode(countryCode);
  const base = langToHreflang[lang] || lang;
  const region = countryCode.toUpperCase();
  if (base === region.toLowerCase()) return base;
  return `${base}-${region}`;
}
