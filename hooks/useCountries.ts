import { useState, useEffect } from "react";
import { getCountries, getStaticUrl, Country } from "@/lib/api";
import { CountryCode } from "@/data/stationsByCountry";

export interface UICountry {
  code: CountryCode;
  name: string;
  flag: string;
}

export function useCountries() {
  const [countries, setCountries] = useState<UICountry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const apiCountries = await getCountries();

        // Transformar datos de API a formato UI y ordenar por nombre
        const uiCountries = apiCountries
          .map((c: Country) => ({
            code: c.code as CountryCode,
            name: c.name,
            flag: c.flagUrl
              ? getStaticUrl(c.flagUrl)
              : "/logos_general/antena.png",
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountries(uiCountries);
        setIsLoading(false);
      } catch (err) {
        console.error("Error loading countries:", err);
        setError("Error al cargar países");
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, isLoading, error };
}
