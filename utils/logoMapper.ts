import { CountryCode } from "@/data/stationsByCountry";

// URL base del backend API (sin /api)
const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
  "http://localhost:3000";

/**
 * Convierte la ruta del logo a la URL del backend
 * Los logos ahora se sirven desde el backend en /static/logos/{countryCode}/
 * @param logoLocal - Ruta del logo (puede ser del frontend o ya transformada del backend)
 * @param countryCode - Código del país
 * @returns URL completa del logo en el backend
 */
export function getLogoPath(
  logoLocal: string | null,
  countryCode: CountryCode,
): string {
  // Logo por defecto
  const defaultLogo = `${BACKEND_URL}/static/logos/general/antena.png`;

  if (!logoLocal) {
    return defaultLogo;
  }

  // Si ya es una URL completa del backend (comienza con http)
  if (logoLocal.startsWith("http")) {
    return logoLocal;
  }

  // Si ya tiene el formato del backend (/static/logos/...)
  if (logoLocal.startsWith("/static/logos/")) {
    return `${BACKEND_URL}${logoLocal}`;
  }

  // Normalizar barras invertidas (Windows) a barras normales
  const normalizedPath = logoLocal.replace(/\\\\/g, "/").replace(/\\/g, "/");

  // Extraer solo el nombre del archivo
  const fileName = normalizedPath.split("/").pop() || normalizedPath;

  // Construir URL del backend
  return `${BACKEND_URL}/static/logos/${countryCode}/${fileName}`;
}

/**
 * Obtener URL de bandera de un país
 */
export function getFlagPath(countryCode: CountryCode): string {
  return `${BACKEND_URL}/static/flags/${countryCode.toLowerCase()}.jpg`;
}
