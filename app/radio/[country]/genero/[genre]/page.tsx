import { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout";
import {
  countries,
  CountryCode,
  loadStationsByCountry,
  filterByCategory,
} from "@/data/stationsByCountry";
import { getI18nFromCountry } from "@/utils/translations";
import { getHreflangFromCountry } from "@/utils/hreflang";
import { notFound } from "next/navigation";
import StationCard from "@/components/radio/StationCard";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

// 7 días: cada regeneración pagina todo el catálogo del país (costoso) y el
// contenido por género cambia muy poco. Reduce hits al origen (blindaje coste).
export const revalidate = 604800;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string; genre: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const code = resolvedParams.country.toUpperCase() as CountryCode;
  const country = countries.find((c) => c.code === code);
  if (!country) return { title: "Emisoras Latinas" };

  const genreName = decodeURIComponent(resolvedParams.genre);
  const stations = await loadStationsByCountry(code);
  const count = filterByCategory(stations, genreName).length;
  const { lang } = getI18nFromCountry(code);

  const titleEs = `Radio ${genreName} ${country.name} En Vivo Gratis | Emisoras Latinas`;
  const titleEn = `Listen to ${genreName} Radio ${country.name} Live Free | Emisoras Latinas`;
  const title = lang === "es" ? titleEs : titleEn;

  const descEs = `Escucha las mejores emisoras de ${genreName} de ${country.name} en vivo gratis. ${count} radios online 24/7 sin cortes ni registro. ¡Dale play ahora!`;
  const descEn = `Listen to the best ${genreName} radio stations from ${country.name} live and free. ${count} online radios 24/7 without cuts or registration. Play now!`;
  const description = lang === "es" ? descEs : descEn;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `/radio/${resolvedParams.country}/genero/${resolvedParams.genre}`,
      languages: {
        [getHreflangFromCountry(code)]: `/radio/${resolvedParams.country}/genero/${resolvedParams.genre}`,
      },
    },
    openGraph: {
      title: `▶️ Radio ${genreName} ${country.name} En Vivo Gratis 🎧`,
      description,
      url: `https://www.emisoraslatinas.online/radio/${resolvedParams.country}/genero/${resolvedParams.genre}`,
      type: "website",
      images: [
        {
          url: "/logos_general/logo_emisoras_latinas.jpg",
          width: 1200,
          height: 630,
          alt: `Radio ${genreName} ${country.name}`,
        },
      ],
    },
    robots: { index: true, follow: true },
  };
}

export default async function GenrePage({
  params,
}: {
  params: Promise<{ country: string; genre: string }>;
}) {
  const resolvedParams = await params;
  const code = resolvedParams.country.toUpperCase() as CountryCode;
  const country = countries.find((c) => c.code === code);
  if (!country) return notFound();

  const genreName = decodeURIComponent(resolvedParams.genre);
  const stations = await loadStationsByCountry(code);
  const filtered = filterByCategory(stations, genreName);
  const { lang } = getI18nFromCountry(code);

  const isSpanish = lang === "es";

  // Guarda contra "thin content": una página de género sin emisoras no aporta
  // valor y no debe indexarse.
  if (filtered.length === 0) return notFound();

  const base = "https://www.emisoraslatinas.online";

  // Las emisoras vienen ordenadas por prioridad (VIP/priority) desde la API, así
  // que "las primeras" = las más destacadas → base del ranking comparativo.
  const topStations = filtered.slice(0, 10);
  const topNames = topStations.slice(0, 5).map((s) => s.nombre);
  const namesSentence = topNames.slice(0, 3).join(", ");

  // ItemList RANKEADO: es lo que habilita listas "mejores X" en resultados y lo
  // que los motores de IA citan como ranking.
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isSpanish
      ? `Mejores emisoras de ${genreName} en ${country.name}`
      : `Best ${genreName} radio stations in ${country.name}`,
    numberOfItems: filtered.length,
    itemListElement: topStations.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${base}/radio/${resolvedParams.country}/${s.slug}`,
      name: s.nombre,
    })),
  };

  // FAQ específico de género+país (alto tráfico AEO). Respuestas factuales que
  // nombran emisoras reales y el conteo real.
  const genreFaqs: { q: string; a: string }[] = isSpanish
    ? [
        {
          q: `¿Cuál es la mejor emisora de ${genreName} en ${country.name}?`,
          a: `Entre las emisoras de ${genreName} más populares de ${country.name} están ${namesSentence}. Puedes escucharlas todas gratis, en vivo y sin registro en Emisoras Latinas.`,
        },
        {
          q: `¿Cuántas emisoras de ${genreName} hay en ${country.name}?`,
          a: `En Emisoras Latinas encuentras ${filtered.length} emisoras de ${genreName} de ${country.name}, todas en vivo y gratuitas.`,
        },
        {
          q: `¿Cómo escuchar radio ${genreName} de ${country.name} gratis?`,
          a: `Elige una de las ${filtered.length} emisoras de esta página y pulsa reproducir. El streaming empieza al instante, sin descargas, suscripción ni registro.`,
        },
        {
          q: `¿Puedo escuchar ${genreName} de ${country.name} desde el extranjero?`,
          a: `Sí. Al ser radio por internet, puedes escuchar estas emisoras de ${genreName} desde cualquier país del mundo, gratis y sin restricciones.`,
        },
      ]
    : [
        {
          q: `What is the best ${genreName} radio station in ${country.name}?`,
          a: `Some of the most popular ${genreName} stations from ${country.name} are ${namesSentence}. You can listen to them all free, live and with no sign-up on Emisoras Latinas.`,
        },
        {
          q: `How many ${genreName} radio stations are there in ${country.name}?`,
          a: `On Emisoras Latinas you'll find ${filtered.length} ${genreName} stations from ${country.name}, all live and free.`,
        },
        {
          q: `How can I listen to ${genreName} radio from ${country.name} for free?`,
          a: `Pick one of the ${filtered.length} stations on this page and hit play. Streaming starts instantly — no downloads, subscription or sign-up.`,
        },
        {
          q: `Can I listen to ${genreName} from ${country.name} abroad?`,
          a: `Yes. Since it's internet radio, you can listen to these ${genreName} stations from anywhere in the world, free and with no restrictions.`,
        },
      ];

  const genreFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: genreFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: "https://www.emisoraslatinas.online" },
          { name: country.name, url: `https://www.emisoraslatinas.online/radio/${resolvedParams.country}` },
          { name: genreName, url: `https://www.emisoraslatinas.online/radio/${resolvedParams.country}/genero/${resolvedParams.genre}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(genreFaqJsonLd) }}
      />

      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/radio/${resolvedParams.country}`} className="flex items-center gap-3">
            <span className="text-white font-bold text-xl">Emisoras Latinas</span>
          </Link>
          <Link
            href={`/radio/${resolvedParams.country}`}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <i className="fas fa-arrow-left mr-2" />
            {isSpanish ? "Volver" : "Back"}
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <nav className="text-sm text-slate-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-400">
            {isSpanish ? "Inicio" : "Home"}
          </Link>
          <i className="fas fa-chevron-right text-xs" />
          <Link href={`/radio/${resolvedParams.country}`} className="hover:text-blue-400">
            {country.name}
          </Link>
          <i className="fas fa-chevron-right text-xs" />
          <span className="text-white">{genreName}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {isSpanish
            ? `Radio ${genreName} de ${country.name} En Vivo`
            : `${genreName} Radio from ${country.name} Live`}
        </h1>
        <p className="text-slate-400 text-lg mb-8">
          {isSpanish
            ? `${filtered.length} emisoras de ${genreName} disponibles de ${country.name}. Escucha gratis online, sin cortes, 24/7.`
            : `${filtered.length} ${genreName} stations available from ${country.name}. Listen free online, no cuts, 24/7.`}
        </p>

        {/* Ranking visible (respuesta directa AEO/GEO) que nombra las emisoras
            más populares y enlaza a cada una (link interno = mejor rastreo). */}
        <section className="mb-10 bg-slate-800/30 border border-slate-700/30 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            {isSpanish
              ? `Las emisoras de ${genreName} más populares de ${country.name}`
              : `The most popular ${genreName} stations in ${country.name}`}
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-slate-300">
            {topStations.map((s) => (
              <li key={s.slug || s.nombre}>
                <Link
                  href={`/radio/${resolvedParams.country}/${s.slug}`}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  {s.nombre}
                </Link>
                {s.ciudad ? (
                  <span className="text-slate-500"> — {s.ciudad}</span>
                ) : null}
              </li>
            ))}
          </ol>
        </section>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-12">
          {filtered.map((station, idx) => (
            <StationCard
              key={station.slug || station.nombre}
              station={station}
              index={idx}
              countryCode={code}
            />
          ))}
        </div>

        <article className="prose prose-invert max-w-none text-slate-400 bg-slate-800/20 p-8 rounded-2xl border border-slate-700/30 mb-12">
          <h2 className="text-xl font-bold text-white mb-4">
            {isSpanish
              ? `Escuchar Radio ${genreName} de ${country.name} Online`
              : `Listen to ${genreName} Radio from ${country.name} Online`}
          </h2>
          <p className="mb-4">
            {isSpanish
              ? `Emisoras Latinas te ofrece la colección más completa de emisoras de ${genreName} de ${country.name} en un solo lugar. Navega por nuestra selección de ${filtered.length} estaciones de radio en vivo, todas verificadas y disponibles 24 horas al día, 7 días a la semana.`
              : `Emisoras Latinas offers you the most complete collection of ${genreName} radio stations from ${country.name} in one place. Browse our selection of ${filtered.length} live radio stations, all verified and available 24 hours a day, 7 days a week.`}
          </p>
          <p>
            {isSpanish
              ? `Solo tienes que elegir una emisora y hacer clic en reproducir. El streaming comienza al instante sin necesidad de registro, suscripción ni descargas. Disfruta de ${genreName} desde ${country.name} donde quieras y cuando quieras.`
              : `Just choose a station and click play. Streaming starts instantly with no registration, subscription, or downloads needed. Enjoy ${genreName} from ${country.name} wherever and whenever you want.`}
          </p>
        </article>

        {/* FAQ visible (coincide con el FAQPage schema) — género + país */}
        <section className="mb-12 max-w-4xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <i className="fas fa-circle-question text-blue-400" />
            </div>
            {isSpanish
              ? `Preguntas frecuentes sobre radio ${genreName} de ${country.name}`
              : `FAQ about ${genreName} radio from ${country.name}`}
          </h2>
          <div className="space-y-3">
            {genreFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-slate-800/30 border border-slate-700/30 rounded-xl p-5"
              >
                <summary className="flex items-center justify-between text-white font-semibold cursor-pointer list-none">
                  <span>{faq.q}</span>
                  <i className="fas fa-chevron-down text-blue-400 transition-transform group-open:rotate-180" />
                </summary>
                <p className="faq-answer mt-3 text-slate-300 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <div className="text-center">
          <Link
            href={`/radio/${resolvedParams.country}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors"
          >
            <i className="fas fa-arrow-left" />
            {isSpanish
              ? `Ver todas las emisoras de ${country.name}`
              : `View all stations from ${country.name}`}
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
