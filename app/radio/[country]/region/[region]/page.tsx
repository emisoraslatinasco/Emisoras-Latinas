import { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout";
import {
  countries,
  CountryCode,
  StationByCountry,
  loadStationsByCountry,
} from "@/data/stationsByCountry";
import { getHreflangFromCountry } from "@/utils/hreflang";
import { notFound, permanentRedirect } from "next/navigation";
import { genreLabelEs, genreSlug } from "@/utils/genreSlug";
import {
  MIN_STATIONS_PER_REGION,
  groupStationsByRegion,
  resolveRegionParam,
} from "@/utils/regionSlug";
import StationCard from "@/components/radio/StationCard";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

// Same caching strategy as the genre page: each regeneration pages the whole
// country catalogue, and region content barely changes.
export const revalidate = 604800;
export const dynamicParams = true;

// Returning [] pre-generates nothing at build but lets Next honour `revalidate`
// (without generateStaticParams the page renders on every request).
export async function generateStaticParams() {
  return [];
}

const BASE_URL = "https://www.emisoraslatinas.online";
const TITLE_BUDGET = 60;

/** First title candidate that fits the SERP budget (last one is the fallback). */
function buildTitle(region: string, country: string, count: number): string {
  const brand = " | Emisoras Latinas";
  const candidates = [
    `Emisoras de ${region}, ${country} en vivo · ${count} radios${brand}`,
    `Emisoras de ${region}, ${country} · ${count} radios${brand}`,
    `Radio ${region} · ${count} emisoras${brand}`,
    `Emisoras de ${region}${brand}`,
  ];
  return candidates.find((t) => t.length <= TITLE_BUDGET) ?? candidates[candidates.length - 1];
}

/** Most frequent genres (Spanish labels) among the given stations. */
function topGenres(stations: StationByCountry[], limit: number): string[] {
  const counts = new Map<string, { label: string; n: number }>();
  for (const station of stations) {
    const seen = new Set<string>();
    for (const g of station.generos ?? []) {
      const slug = genreSlug(g);
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);
      const entry = counts.get(slug) ?? { label: genreLabelEs(g), n: 0 };
      entry.n += 1;
      counts.set(slug, entry);
    }
  }
  return [...counts.values()]
    .sort((a, b) => b.n - a.n)
    .slice(0, limit)
    .map((e) => e.label);
}

/** "A, B y C" */
function joinList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`;
}

async function loadRegion(countryParam: string, regionParam: string) {
  const code = countryParam.toUpperCase() as CountryCode;
  const country = countries.find((c) => c.code === code);
  if (!country) return null;
  const stations = await loadStationsByCountry(code);
  const ctx = { code, name: country.name };
  const resolved = resolveRegionParam(regionParam, groupStationsByRegion(stations, ctx), ctx);
  if (!resolved || resolved.group.stations.length < MIN_STATIONS_PER_REGION) return null;
  return { code, country, resolved };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; region: string }>;
}): Promise<Metadata> {
  const { country: countryParam, region: regionParam } = await params;
  const loaded = await loadRegion(countryParam, regionParam);
  // Unknown or thin region: the page itself returns notFound(); keep metadata inert.
  if (!loaded) return { title: "Emisoras Latinas", robots: { index: false } };

  const { code, country, resolved } = loaded;
  const { label, slug, stations } = resolved.group;
  const count = stations.length;
  const path = `/radio/${countryParam}/region/${slug}`;
  const title = buildTitle(label, country.name, count);
  const description = `Escucha ${count} emisoras de ${label}, ${country.name} en vivo gratis. Radios online 24/7 sin cortes ni registro. ¡Dale play ahora!`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: path,
      languages: { [getHreflangFromCountry(code)]: path },
    },
    openGraph: {
      title: `▶️ Emisoras de ${label}, ${country.name} en vivo 🎧`,
      description,
      url: `${BASE_URL}${path}`,
      type: "website",
      images: [
        {
          url: "/logos_general/logo_emisoras_latinas.jpg",
          width: 1200,
          height: 630,
          alt: `Emisoras de ${label}, ${country.name}`,
        },
      ],
    },
    robots: { index: true, follow: true },
  };
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ country: string; region: string }>;
}) {
  const { country: countryParam, region: regionParam } = await params;
  const loaded = await loadRegion(countryParam, regionParam);
  if (!loaded) return notFound();

  const { code, country, resolved } = loaded;
  const { label, slug, stations } = resolved.group;

  // Legacy / case / accent variants get a permanent redirect to the canonical slug.
  const canonicalPath = `/radio/${countryParam}/region/${slug}`;
  if (!resolved.isCanonical) permanentRedirect(canonicalPath);

  const count = stations.length;
  const genres = topGenres(stations, 3);
  // Stations arrive ordered by priority (VIP first) from the API.
  const topStations = stations.slice(0, 10);
  const featuredNames = stations.slice(0, 3).map((s) => s.nombre);
  const place = `${label}, ${country.name}`;

  const intro =
    `En ${place} hay ${count} emisoras de radio disponibles en vivo en Emisoras Latinas.` +
    (genres.length ? ` Los géneros más frecuentes son ${joinList(genres)}.` : "") +
    ` Entre ellas: ${joinList(featuredNames)}.`;

  const faqs: { q: string; a: string }[] = [
    {
      q: `¿Cuántas emisoras de ${label} hay en Emisoras Latinas?`,
      a: `Hay ${count} emisoras de ${place}, todas en vivo y gratuitas.`,
    },
    ...(genres.length
      ? [
          {
            q: `¿Qué géneros se escuchan en las emisoras de ${label}?`,
            a: `Los géneros más frecuentes entre las emisoras de ${place} son ${joinList(genres)}.`,
          },
        ]
      : []),
    {
      q: `¿Qué emisoras de ${label} puedo escuchar?`,
      a: `Entre las emisoras de ${place} están ${joinList(featuredNames)}, además de ${count - featuredNames.length} más en esta página.`,
    },
    {
      q: `¿Cómo escuchar radio de ${label} gratis?`,
      a: `Elige una de las ${count} emisoras de esta página y pulsa reproducir. El streaming empieza al instante, sin descargas, suscripción ni registro.`,
    },
  ];

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Emisoras de ${place}`,
    numberOfItems: count,
    itemListElement: topStations.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE_URL}/radio/${countryParam}/${s.slug}`,
      name: s.nombre,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: BASE_URL },
          { name: country.name, url: `${BASE_URL}/radio/${countryParam}` },
          { name: label, url: `${BASE_URL}${canonicalPath}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/radio/${countryParam}`} className="flex items-center gap-3">
            <span className="text-white font-bold text-xl">Emisoras Latinas</span>
          </Link>
          <Link
            href={`/radio/${countryParam}`}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <i className="fas fa-arrow-left mr-2" />
            Volver
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <nav className="text-sm text-slate-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-400">
            Inicio
          </Link>
          <i className="fas fa-chevron-right text-xs" />
          <Link href={`/radio/${countryParam}`} className="hover:text-blue-400">
            {country.name}
          </Link>
          <i className="fas fa-chevron-right text-xs" />
          <span className="text-white">{label}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Emisoras de {label}, {country.name} en vivo
        </h1>
        <p className="text-slate-400 text-lg mb-8 max-w-4xl">{intro}</p>

        <section className="mb-10 bg-slate-800/30 border border-slate-700/30 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Las emisoras de {label} más populares
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-slate-300">
            {topStations.map((s) => (
              <li key={s.slug || s.nombre}>
                <Link
                  href={`/radio/${countryParam}/${s.slug}`}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  {s.nombre}
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-12">
          {stations.map((station, idx) => (
            <StationCard
              key={station.slug || station.nombre}
              station={station}
              index={idx}
              countryCode={code}
            />
          ))}
        </div>

        {/* Visible FAQ (matches the FAQPage schema) — real data only */}
        <section className="mb-12 max-w-4xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <i className="fas fa-circle-question text-blue-400" />
            </div>
            Preguntas frecuentes sobre la radio de {label}
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-slate-800/30 border border-slate-700/30 rounded-xl p-5"
              >
                <summary className="flex items-center justify-between text-white font-semibold cursor-pointer list-none">
                  <span>{faq.q}</span>
                  <i className="fas fa-chevron-down text-blue-400 transition-transform group-open:rotate-180" />
                </summary>
                <p className="faq-answer mt-3 text-slate-300 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="text-center">
          <Link
            href={`/radio/${countryParam}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors"
          >
            <i className="fas fa-arrow-left" />
            Ver todas las emisoras de {country.name}
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
