export interface StationByCountry {
  nombre: string;
  url_stream: string;
  logo_local: string | null;
  descripcion?: string;
  generos?: string[];
  redes_sociales?: string[];
  sitio_web?: string;
  ciudad?: string;
}

export type CountryCode =
  | "CO"
  | "PE"
  | "BR"
  | "EC"
  | "MX"
  | "GT"
  | "BO"
  | "SV"
  | "JM"
  | "PR"
  | "DO"
  | "UA"
  | "UY"
  | "HN"
  | "NI"
  | "AR";

export interface Country {
  code: CountryCode;
  name: string;
  flag: string;
  jsonFile: string;
}

export const countries: Country[] = [
  {
    code: "CO",
    name: "Colombia",
    flag: "/flags/colombia.jpg",
    jsonFile: "emisoras_colombia.json",
  },
  {
    code: "PE",
    name: "Perú",
    flag: "/flags/peru.jpg",
    jsonFile: "emisoras_peru.json",
  },
  {
    code: "BR",
    name: "Brasil",
    flag: "/flags/brasil.jpg",
    jsonFile: "emisoras_brasil.json",
  },
  {
    code: "EC",
    name: "Ecuador",
    flag: "/flags/ecuador.jpg",
    jsonFile: "emisoras_ecuador.json",
  },
  {
    code: "MX",
    name: "México",
    flag: "/flags/Mexico.jpg",
    jsonFile: "emisoras_mexico.json",
  },
  {
    code: "GT",
    name: "Guatemala",
    flag: "/flags/Guatemala.png",
    jsonFile: "emisoras_guatemala.json",
  },
  {
    code: "BO",
    name: "Bolivia",
    flag: "/flags/bolivia.png",
    jsonFile: "emisoras_bolivia.json",
  },
  {
    code: "SV",
    name: "El Salvador",
    flag: "/flags/el_salvador.jpg",
    jsonFile: "emisoras_elsalvador.json",
  },
  {
    code: "JM",
    name: "Jamaica",
    flag: "/flags/Jamaica.jpg",
    jsonFile: "emisoras_jamaica.json",
  },
  {
    code: "PR",
    name: "Puerto Rico",
    flag: "/flags/puerto rico.png",
    jsonFile: "emisoras_puertorico.json",
  },
  {
    code: "DO",
    name: "República Dominicana",
    flag: "/flags/Republica dominicana.png",
    jsonFile: "emisoras_republica_dominicana.json",
  },
  {
    code: "UA",
    name: "Ucrania",
    flag: "/flags/Ucrania.jpg",
    jsonFile: "emisoras_ukrania.json",
  },
  {
    code: "UY",
    name: "Uruguay",
    flag: "/flags/Uruguay.png",
    jsonFile: "emisoras_uruguay.json",
  },
  {
    code: "HN",
    name: "Honduras",
    flag: "/flags/Honduras.png",
    jsonFile: "emisoras_honduras.json",
  },
  {
    code: "NI",
    name: "Nicaragua",
    flag: "/flags/Nicaragua.png",
    jsonFile: "emisoras_nicaragua.json",
  },
  {
    code: "AR",
    name: "Argentina",
    flag: "/flags/Argentina.png",
    jsonFile: "emisoras_argentinas.json",
  },
];

const stationsCache: Record<CountryCode, StationByCountry[]> = {} as Record<
  CountryCode,
  StationByCountry[]
>;

export async function loadStationsByCountry(
  countryCode: CountryCode
): Promise<StationByCountry[]> {
  if (stationsCache[countryCode]) {
    return stationsCache[countryCode];
  }

  const country = countries.find((c) => c.code === countryCode);
  if (!country) {
    return [];
  }

  try {
    const importedData = await import(`@/data/${country.jsonFile}`);
    const data: StationByCountry[] = importedData.default;
    stationsCache[countryCode] = data;
    return data;
  } catch (error) {
    console.error(`Error loading stations for ${countryCode}:`, error);
    return [];
  }
}

export function getCategories(stations: StationByCountry[]): string[] {
  const allGenres = stations.flatMap((s) => s.generos || []);
  return [...new Set(allGenres)].sort();
}

export function filterByCategory(
  stations: StationByCountry[],
  category: string
): StationByCountry[] {
  if (category === "all") return stations;
  return stations.filter((s) => s.generos?.includes(category) || false);
}

export function filterByCategories(
  stations: StationByCountry[],
  categories: string[]
): StationByCountry[] {
  if (categories.length === 0) return stations;
  return stations.filter(
    (s) => s.generos?.some((g) => categories.includes(g)) || false
  );
}

export function searchStations(
  stations: StationByCountry[],
  query: string
): StationByCountry[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return stations;

  return stations.filter(
    (station) =>
      station.nombre.toLowerCase().includes(lowerQuery) ||
      station.generos?.some((g) => g.toLowerCase().includes(lowerQuery)) ||
      false ||
      station.descripcion?.toLowerCase().includes(lowerQuery) ||
      false ||
      station.ciudad?.toLowerCase().includes(lowerQuery) ||
      false
  );
}
