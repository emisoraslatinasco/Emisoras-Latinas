"use client";

import Image from "next/image";
import { CountryCode } from "@/data/stationsByCountry";
import { getI18nFromCountry } from "@/utils/translations";

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
  HN: {
    gradient: "from-blue-500 via-white to-blue-500",
    accentColor: "text-blue-400",
    slogan: "¡Honduras, tierra de ritmos y cultura!",
    emoji: "🇭🇳",
  },
  NI: {
    gradient: "from-blue-500 via-white to-blue-500",
    accentColor: "text-blue-400",
    slogan: "¡Nicaragua, corazón de Centroamérica!",
    emoji: "🇳🇮",
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
  CL: {
    gradient: "from-red-600 via-white to-blue-600",
    accentColor: "text-red-400",
    slogan: "¡Chile, donde la música llega al cielo!",
    emoji: "🇨🇱",
  },
  CR: {
    gradient: "from-blue-600 via-white to-red-600",
    accentColor: "text-blue-400",
    slogan: "¡Pura vida y música tica!",
    emoji: "🇨🇷",
  },
  DK: {
    gradient: "from-red-600 via-white to-red-600",
    accentColor: "text-red-400",
    slogan: "Dansk musik til verden!",
    emoji: "🇩🇰",
  },
  ES: {
    gradient: "from-red-600 via-yellow-400 to-red-600",
    accentColor: "text-yellow-400",
    slogan: "¡La radio española en tu corazón!",
    emoji: "🇪🇸",
  },
  PT: {
    gradient: "from-green-600 via-red-500 to-green-600",
    accentColor: "text-green-400",
    slogan: "O melhor da rádio portuguesa!",
    emoji: "🇵🇹",
  },
  TT: {
    gradient: "from-red-600 via-white to-black",
    accentColor: "text-red-400",
    slogan: "Feel the Caribbean beat!",
    emoji: "🇹🇹",
  },
  US: {
    gradient: "from-blue-600 via-white to-red-600",
    accentColor: "text-blue-400",
    slogan: "The best of American radio!",
    emoji: "🇺🇸",
  },
  VE: {
    gradient: "from-yellow-400 via-blue-600 to-red-600",
    accentColor: "text-yellow-400",
    slogan: "¡Venezuela suena con fuerza!",
    emoji: "🇻🇪",
  },
  AR: {
    gradient: "from-blue-400 via-white to-blue-400",
    accentColor: "text-blue-400",
    slogan: "¡Argentina, pasión por la música!",
    emoji: "🇦🇷",
  },
  FR: {
    gradient: "from-blue-600 via-white to-red-600",
    accentColor: "text-blue-400",
    slogan: "La musique française dans votre cœur!",
    emoji: "🇫🇷",
  },
  IT: {
    gradient: "from-green-600 via-white to-red-600",
    accentColor: "text-green-400",
    slogan: "La musica italiana che emoziona!",
    emoji: "🇮🇹",
  },
  GB: {
    gradient: "from-blue-700 via-red-600 to-white",
    accentColor: "text-red-400",
    slogan: "The best of British radio!",
    emoji: "🇬🇧",
  },
  AU: {
    gradient: "from-blue-700 via-red-600 to-white",
    accentColor: "text-blue-400",
    slogan: "Australia's best hits!",
    emoji: "🇦🇺",
  },
  HR: {
    gradient: "from-red-600 via-white to-blue-600",
    accentColor: "text-red-400",
    slogan: "¡El corazón del Adriático!",
    emoji: "🇭🇷",
  },
  PA: {
    gradient: "from-blue-600 via-white to-red-600",
    accentColor: "text-blue-400",
    slogan: "¡Puente del mundo, corazón del universo!",
    emoji: "🇵🇦",
  },
  PL: {
    gradient: "from-white via-red-500 to-red-600",
    accentColor: "text-red-400",
    slogan: "¡La voz de Polonia!",
    emoji: "🇵🇱",
  },
  TH: {
    gradient: "from-red-600 via-white to-blue-600",
    accentColor: "text-blue-400",
    slogan: "¡La sonrisa de Asia!",
    emoji: "🇹🇭",
  },
  TR: {
    gradient: "from-red-600 via-red-500 to-white",
    accentColor: "text-red-400",
    slogan: "¡El puente entre dos mundos!",
    emoji: "🇹🇷",
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
  HN: "Honduras",
  NI: "Nicaragua",
  JM: "Jamaica",
  PR: "Puerto Rico",
  DO: "Rep. Dominicana",
  UA: "Ucrania",
  UY: "Uruguay",
  CL: "Chile",
  CR: "Costa Rica",
  DK: "Dinamarca",
  ES: "España",
  PT: "Portugal",
  TT: "Trinidad y Tobago",
  US: "Estados Unidos",
  VE: "Venezuela",
  AR: "Argentina",
  FR: "Francia",
  IT: "Italia",
  GB: "Reino Unido",
  AU: "Australia",
  HR: "Croacia",
  PA: "Panamá",
  PL: "Polonia",
  TH: "Tailandia",
  TR: "Turquía",
};

interface DynamicHeaderProps {
  selectedCountry: CountryCode;
  stationCount: number;
  countryCode?: string; // Used for i18n
}

export default function DynamicHeader({
  selectedCountry,
  stationCount,
}: DynamicHeaderProps) {
  const theme = countryThemes[selectedCountry];
  const countryName = countryNames[selectedCountry];
  const { t } = getI18nFromCountry(selectedCountry);

  return (
    <section className="relative overflow-hidden">
      {/* Fondo con gradiente animado */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-10 animate-gradient-rotate`}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Lado izquierdo: Logo de Emisoras Latinas */}
          <div className="relative flex-shrink-0">
            <div className="relative h-24 w-auto">
              <Image
                src="/logos_general/logo_emisoras_latinas.jpg"
                alt="Emisoras Latinas"
                width={360}
                height={96}
                className="h-24 w-auto object-contain"
                priority
                unoptimized
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
                {t.stations_of} {countryName}
              </h1>
            </div>
            <p
              className={`text-sm ${theme?.accentColor} font-medium truncate hidden sm:block`}
            >
              {theme?.slogan}
            </p>
          </div>

          {/* Lado derecho: Badges compactos */}
          <div className="hidden md:flex items-center gap-3">
            <span className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/60 backdrop-blur-sm rounded-full text-sm text-white border border-slate-700/50">
              <i className="fas fa-broadcast-tower text-blue-400 text-base"></i>
              <span className="font-semibold">{stationCount}</span>
            </span>
            <span className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/60 backdrop-blur-sm rounded-full text-sm text-white border border-slate-700/50">
              <i className="fas fa-signal text-green-400 text-base"></i>
              {t.live}
            </span>
            <span className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/60 backdrop-blur-sm rounded-full text-sm text-white border border-slate-700/50">
              <i className="fas fa-gift text-purple-400 text-base"></i>
              {t.free}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
