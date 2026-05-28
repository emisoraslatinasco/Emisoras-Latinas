"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { countries, CountryCode } from "@/data/stationsByCountry";

const STORAGE_KEY = "emisoras_latinas_country";

const validCountries = new Set(countries.map((c) => c.code));

// Gradiente sutil por país: reutilizamos la paleta del DynamicHeader sin importarlo
// para mantener este componente como un client lean (no arrastra todo el theme dict).
const countryEmoji: Record<string, string> = {
  CO: "🇨🇴", MX: "🇲🇽", AR: "🇦🇷", PE: "🇵🇪", ES: "🇪🇸",
  US: "🇺🇸", CL: "🇨🇱", EC: "🇪🇨", VE: "🇻🇪", BR: "🇧🇷",
  FR: "🇫🇷", IT: "🇮🇹", GB: "🇬🇧", PT: "🇵🇹", UY: "🇺🇾",
  CR: "🇨🇷", PA: "🇵🇦", DO: "🇩🇴", GT: "🇬🇹", HN: "🇭🇳",
  NI: "🇳🇮", SV: "🇸🇻", BO: "🇧🇴", PR: "🇵🇷", JM: "🇯🇲",
  TT: "🇹🇹", DK: "🇩🇰", UA: "🇺🇦", AU: "🇦🇺", HR: "🇭🇷",
  PL: "🇵🇱", TH: "🇹🇭", TR: "🇹🇷",
};

export default function ContinueListeningBanner() {
  const [savedCountry, setSavedCountry] = useState<CountryCode | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw && validCountries.has(raw as CountryCode)) {
        setSavedCountry(raw as CountryCode);
      }
    } catch {
      // localStorage no disponible (modo incógnito estricto, etc.) — silenciar.
    }
  }, []);

  if (!savedCountry) return null;

  const country = countries.find((c) => c.code === savedCountry);
  if (!country) return null;

  return (
    <Link
      href={`/radio/${country.code.toLowerCase()}`}
      className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-2xl shadow-xl shadow-blue-900/40 transition-transform hover:scale-[1.02] animate-slide-right"
    >
      <span className="text-2xl">{countryEmoji[savedCountry] || "📻"}</span>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-xs text-blue-200 font-normal">
          Continúa escuchando
        </span>
        <span className="text-base">Radio {country.name} →</span>
      </span>
    </Link>
  );
}
