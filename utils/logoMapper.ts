import { CountryCode } from "@/data/stationsByCountry";

// Mapeo de códigos de país a carpetas de logos
const LOGO_FOLDER_MAP: Record<CountryCode, string> = {
  CO: "logos_emisoras-colombia",
  AR: "logos_emisoras-argentinas",
  PE: "logos_peru_ecuador",
  BR: "logos_emisoras-brasil",
  EC: "logos_peru_ecuador",
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
  VE: "logos_emisoras-venezuela",
  FR: "logos_emisoras-francia",
  IT: "logos_emisoras-italia",
  GB: "logos_emisoras-reino_unido",
};

/**
 * Convierte la ruta genérica del logo a la ruta específica del país
 * @param logoLocal - Ruta del logo en formato "logos_emisoras\\nombre.jpg" o "/logos_emisoras_pais/nombre.jpg"
 * @param countryCode - Código del país
 * @returns Ruta corregida del logo
 */
export function getLogoPath(
  logoLocal: string | null,
  countryCode: CountryCode,
): string {
  if (!logoLocal) {
    return "/logos_general/antena.png";
  }

  // Paso 1: Normalizar todas las barras invertidas (Windows) a barras normales (Linux/Web)
  // Manejamos tanto \\ como \\\\ (escape doble en JSON)
  const normalizedPath = logoLocal
    .replace(/\\\\/g, "/") // Reemplazar \\ por /
    .replace(/\\/g, "/"); // Reemplazar \ restantes por /

  // Paso 2: Si la ruta ya comienza con "/" y contiene "logos_emisoras-", está correcta
  if (
    normalizedPath.startsWith("/") &&
    normalizedPath.includes("logos_emisoras-")
  ) {
    return normalizedPath;
  }

  // Paso 3: Si la ruta comienza con "/" y tiene formato logos_emisoras_ (con guión bajo)
  // Necesitamos normalizar reemplazando el guión bajo por guión
  if (
    normalizedPath.startsWith("/") &&
    normalizedPath.includes("logos_emisoras_")
  ) {
    return normalizedPath.replace(
      /logos_emisoras_([a-zA-Z_]+)/,
      (match, country) => {
        return `logos_emisoras-${country}`;
      },
    );
  }

  // Paso 4: Formato antiguo (sin "/" inicial): extraer solo el nombre del archivo
  const folderName = LOGO_FOLDER_MAP[countryCode];

  // Extraer solo el nombre del archivo (después de la última barra)
  const fileName = normalizedPath.split("/").pop() || normalizedPath;

  // Construir la ruta correcta
  return `/${folderName}/${fileName}`;
}
