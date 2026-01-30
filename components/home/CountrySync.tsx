"use client";

import { useEffect } from "react";
import { CountryCode } from "@/data/stationsByCountry";

const STORAGE_KEY = "emisoras_latinas_country";

interface CountrySyncProps {
  countryCode: CountryCode;
}

/**
 * Componente invisible que sincroniza el país actual con localStorage.
 * Se usa en páginas de país para recordar la última selección del usuario.
 */
export default function CountrySync({ countryCode }: CountrySyncProps) {
  useEffect(() => {
    // Guardar el país actual en localStorage
    try {
      localStorage.setItem(STORAGE_KEY, countryCode);
      console.log(`[CountrySync] País guardado: ${countryCode}`);
    } catch (error) {
      console.error("[CountrySync] Error guardando país:", error);
    }
  }, [countryCode]);

  // Este componente no renderiza nada visible
  return null;
}
