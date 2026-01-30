"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CountryCode } from "@/data/stationsByCountry";

const STORAGE_KEY = "emisoras_latinas_country";
const DEFAULT_COUNTRY = "co";

const validCountries: CountryCode[] = [
  "CO",
  "PE",
  "BR",
  "EC",
  "MX",
  "GT",
  "BO",
  "SV",
  "JM",
  "PR",
  "DO",
  "UA",
  "UY",
  "HN",
  "NI",
  "AR",
  "CL",
  "CR",
  "DK",
  "ES",
  "PT",
  "TT",
  "US",
  "VE",
  "FR",
  "IT",
  "GB",
];

export default function RedirectToCountry() {
  const router = useRouter();

  useEffect(() => {
    // Leer el país guardado en localStorage
    const savedCountry = localStorage.getItem(STORAGE_KEY);

    // Validar que el país sea válido
    let targetCountry = DEFAULT_COUNTRY;
    if (savedCountry && validCountries.includes(savedCountry as CountryCode)) {
      targetCountry = savedCountry.toLowerCase();
    }

    // Redirigir a la página del país
    router.replace(`/radio/${targetCountry}`);
  }, [router]);

  // Mostrar loading mientras se redirige
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center">
        <i className="fas fa-spinner fa-spin text-5xl text-blue-500 mb-4"></i>
        <p className="text-slate-400 text-lg">Cargando emisoras...</p>
      </div>
    </div>
  );
}
