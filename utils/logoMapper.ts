import { CountryCode } from "@/data/stationsByCountry";

/**
 * @deprecated Este archivo ya no se usa. Los logos ahora vienen directamente
 * del backend a través de `logo_local` en StationByCountry, que ya incluye
 * la URL completa del servidor (ej: https://api.emisoraslatinas.com/static/logos/CO/emisora.jpg)
 * 
 * La transformación se hace en data/stationsByCountry.ts usando getStaticUrl() de lib/api.ts
 * 
 * Este archivo se mantiene solo por compatibilidad temporal.
 * TODO: Eliminar este archivo cuando se confirme que no hay dependencias.
 */

/**
 * @deprecated - No usar. Los logos vienen del backend.
 * Mapea código de país al nombre de la carpeta de logos en /public/
 * Los logos se almacenan en /public/logos_emisoras-{region}/
 */
const COUNTRY_LOGO_FOLDER: Record<CountryCode, string> = {
  CO: "logos_emisoras-colombia",
  AR: "logos_emisoras-argentinas",
  PE: "logos_emisoras-peru",
  BR: "logos_emisoras-brasil",
  VE: "logos_emisoras-venezuela",
  EC: "logos_emisoras-ecuador",
  MX: "logos_emisoras-mexico",
  GT: "logos_emisoras-guatemala",
  BO: "logos_emisoras-bolivia",
  SV: "logos_emisoras-elsalvador",
  HN: "logos_emisoras-honduras",
  NI: "logos_emisoras-nicaragua",
  JM: "logos_emisoras-jamaica",
  PR: "logos_emisoras-puertorico",
  DO: "logos_emisoras-republica_dominicana",
  UA: "logos_emisoras-ucrania",
  UY: "logos_emisoras-uruguay",
  CL: "logos_emisoras-chile",
  CR: "logos_emisoras-costarica",
  DK: "logos_emisoras-dinamarca",
  ES: "logos_emisoras-españa",
  PT: "logos_emisoras-portugal",
  TT: "logos_emisoras-trinidad_y_tobago",
  US: "logos_emisoras-usa",
  FR: "logos_emisoras-francia",
  IT: "logos_emisoras-italia",
  GB: "logos_emisoras-reino_unido",
  AU: "logos_emisoras-australia",
  HR: "logos_emisoras-croacia",
  PA: "logos_emisoras-panama",
  PL: "logos_emisoras-polonia",
  TH: "logos_emisoras-tailandia",
  TR: "logos_emisoras-turquia",
};

/** Imagen fallback cuando no hay logo o falla la carga */
export const DEFAULT_LOGO = "/logos_general/antena.png";

/**
 * Obtiene la ruta del logo de una emisora.
 *
 * Estrategia:
 * 1. Si logoLocal es una URL completa (http/https) → usarla directamente
 * 2. Si es una ruta del backend (/static/logos/CO/file.jpg) → extraer filename
 *    y apuntar a /public/logos_emisoras-{country}/file.jpg
 * 3. Si es una ruta local (logos_emisoras/file.jpg) → extraer filename
 *    y apuntar a /public/logos_emisoras-{country}/file.jpg
 * 4. Fallback → antena.png
 */
export function getLogoPath(
  logoLocal: string | null,
  countryCode: CountryCode,
): string {
  if (!logoLocal) {
    return DEFAULT_LOGO;
  }

  // Si ya es una URL completa (internet), usarla directamente
  if (logoLocal.startsWith("http://") || logoLocal.startsWith("https://")) {
    return logoLocal;
  }

  // Normalizar barras invertidas (Windows) a barras normales
  const normalizedPath = logoLocal.replace(/\\\\/g, "/").replace(/\\/g, "/");

  // Extraer solo el nombre del archivo
  const fileName = normalizedPath.split("/").pop() || normalizedPath;

  if (!fileName) {
    return DEFAULT_LOGO;
  }

  // Obtener la carpeta de logos para este país
  const folder = COUNTRY_LOGO_FOLDER[countryCode];
  if (!folder) {
    return DEFAULT_LOGO;
  }

  // Devolver ruta local del frontend: /logos_emisoras-colombia/Besame_FM.jpg
  return `/${folder}/${fileName}`;
}

/**
 * Obtener URL de bandera de un país
 */
export function getFlagPath(countryCode: CountryCode): string {
  return `/flags/${countryCode.toLowerCase()}.jpg`;
}
