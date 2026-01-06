"use client";

import Image from "next/image";
import { CountryCode } from "@/data/stationsByCountry";

interface CountryTheme {
  gradient: string;
  accentColor: string;
  slogan: string;
  emoji: string;
}

const countryThemes: Record<CountryCode, CountryTheme> = {
  CO: {
    gradient: "from-yellow-500 via-blue-600 to-red-600",
    accentColor: "text-yellow-400",
    slogan: "¡El ritmo colombiano en tu corazón!",
    emoji: "🇨🇴",
  },
  PE: {
    gradient: "from-red-600 via-white to-red-600",
    accentColor: "text-red-400",
    slogan: "¡La música peruana que nos une!",
    emoji: "🇵🇪",
  },
  BR: {
    gradient: "from-green-500 via-yellow-400 to-blue-600",
    accentColor: "text-green-400",
    slogan: "¡O melhor do Brasil para você!",
    emoji: "🇧🇷",
  },
  EC: {
    gradient: "from-yellow-400 via-blue-600 to-red-600",
    accentColor: "text-yellow-400",
    slogan: "¡Ecuador suena en todo el mundo!",
    emoji: "🇪🇨",
  },
  MX: {
    gradient: "from-green-600 via-white to-red-600",
    accentColor: "text-green-400",
    slogan: "¡Viva la música mexicana!",
    emoji: "🇲🇽",
  },
  GT: {
    gradient: "from-blue-500 via-white to-blue-500",
    accentColor: "text-blue-400",
    slogan: "¡Guatemala, corazón del mundo maya!",
    emoji: "🇬🇹",
  },
  BO: {
    gradient: "from-red-500 via-yellow-400 to-green-600",
    accentColor: "text-yellow-400",
    slogan: "¡Bolivia, tierra de ritmos ancestrales!",
    emoji: "🇧🇴",
  },
  SV: {
    gradient: "from-blue-600 via-white to-blue-600",
    accentColor: "text-blue-400",
    slogan: "¡El Salvador, pulgarcito musical!",
    emoji: "🇸🇻",
  },
  JM: {
    gradient: "from-green-500 via-yellow-400 to-black",
    accentColor: "text-yellow-400",
    slogan: "Feel the reggae vibes!",
    emoji: "🇯🇲",
  },
  PR: {
    gradient: "from-red-600 via-white to-blue-600",
    accentColor: "text-red-400",
    slogan: "¡Puerto Rico, la isla del encanto!",
    emoji: "🇵🇷",
  },
  DO: {
    gradient: "from-blue-600 via-white to-red-600",
    accentColor: "text-blue-400",
    slogan: "¡Dominicana, ritmo que contagia!",
    emoji: "🇩🇴",
  },
  UA: {
    gradient: "from-blue-500 via-blue-400 to-yellow-400",
    accentColor: "text-yellow-400",
    slogan: "Україна в наших серцях!",
    emoji: "🇺🇦",
  },
  UY: {
    gradient: "from-blue-400 via-white to-blue-400",
    accentColor: "text-blue-400",
    slogan: "¡Uruguay, pequeño gigante musical!",
    emoji: "🇺🇾",
  },
};

const countryNames: Record<CountryCode, string> = {
  CO: "Colombia",
  PE: "Perú",
  BR: "Brasil",
  EC: "Ecuador",
  MX: "México",
  GT: "Guatemala",
  BO: "Bolivia",
  SV: "El Salvador",
  JM: "Jamaica",
  PR: "Puerto Rico",
  DO: "Rep. Dominicana",
  UA: "Ucrania",
  UY: "Uruguay",
};

interface DynamicHeaderProps {
  selectedCountry: CountryCode;
  stationCount: number;
}

export default function DynamicHeader({
  selectedCountry,
  stationCount,
}: DynamicHeaderProps) {
  const theme = countryThemes[selectedCountry];
  const countryName = countryNames[selectedCountry];

  return (
    <section className="relative overflow-hidden">
      {/* Fondo con gradiente animado */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-10 animate-gradient-rotate`}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Lado izquierdo: Logo pequeño */}
          <div className="relative flex-shrink-0">
            <div
              className={`absolute -inset-1 bg-gradient-to-r ${theme.gradient} rounded-xl blur opacity-60 animate-pulse`}
            ></div>
            <div className="relative w-16 h-16 rounded-lg overflow-hidden">
              <Image
                src="/img/logo_emisoras_latinas.jpg"
                alt="Emisoras Latinas"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Centro: Título y slogan */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{theme?.emoji}</span>
              <h1
                className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${theme?.gradient} bg-clip-text text-transparent truncate`}
              >
                Emisoras de {countryName}
              </h1>
            </div>
            <p
              className={`text-sm ${theme?.accentColor} font-medium truncate hidden sm:block`}
            >
              {theme?.slogan}
            </p>
          </div>

          {/* Lado derecho: Badges compactos */}
          <div className="hidden md:flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/60 backdrop-blur-sm rounded-full text-xs text-white border border-slate-700/50">
              <i className="fas fa-broadcast-tower text-blue-400"></i>
              <span className="font-semibold">{stationCount}</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/60 backdrop-blur-sm rounded-full text-xs text-white border border-slate-700/50">
              <i className="fas fa-signal text-green-400"></i>
              En vivo
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/60 backdrop-blur-sm rounded-full text-xs text-white border border-slate-700/50">
              <i className="fas fa-gift text-purple-400"></i>
              Gratis
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
