import { Suspense } from "react";
import {
  countries,
  loadStationsByCountry,
  getCategories,
  filterByCategory,
  CountryCode,
} from "@/data/stationsByCountry";
import PaginatedStationGrid from "@/components/radio/PaginatedStationGrid";
import { Metadata } from "next";
import Link from "next/link";
import DynamicHeader from "@/components/home/DynamicHeader";
import { Footer } from "@/components/layout";
import { notFound } from "next/navigation";
import AdSpace from "@/components/ui/AdSpace";
import BannerAd from "@/components/ads/BannerAd";
import StickyBottomAd from "@/components/ads/StickyBottomAd";
import { AdvertisementPosition } from "@/lib/api-admin-ads";
import CountrySelector from "@/components/home/CountrySelector";
import CountrySync from "@/components/home/CountrySync";
import { getI18nFromCountry } from "@/utils/translations";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getHreflangFromCountry } from "@/utils/hreflang";

function GridFallback() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <i className="fas fa-spinner fa-spin text-4xl text-blue-500 mb-4"></i>
        <p className="text-slate-400">Cargando emisoras...</p>
      </div>
    </div>
  );
}

// ISR: la página de país se regenera cada 6h tras la primera visita. Antes
// dependía del revalidate:60 del fetch interno, que disparaba una recarga
// completa de todas las emisoras del país cada minuto contra Neon.
export const revalidate = 21600;
export const dynamicParams = true;

// Generar rutas estáticas para todos los países disponibles
export async function generateStaticParams() {
  return countries.map((country) => ({
    country: country.code.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const code = resolvedParams.country.toUpperCase() as CountryCode;
  const country = countries.find((c) => c.code === code);

  if (!country) {
    return {
      title: "Emisoras Latinas",
    };
  }

  // loadStationsByCountry tiene cache in-memory: la llamada del componente abajo hará cache-HIT.
  const stations = await loadStationsByCountry(code);
  const N = stations.length;

  const buildSeoTitle = (): string => {
    const brand = " | Emisoras Latinas";
    const budget = 58 - brand.length;
    // Prioridad 1: conteo de emisoras (diferenciador más fuerte para CTR en SERP)
    if (N > 0) {
      const withCount = `Radio ${country.name} · ${N.toLocaleString()}+ Emisoras`;
      if (withCount.length <= budget) return withCount + brand;
    }
    // Prioridad 2: sin conteo, versión larga
    const full = `Radio ${country.name} En Vivo Gratis`;
    if (full.length <= budget) return full + brand;
    // Prioridad 3: versión compacta
    const short = `Radio ${country.name} En Vivo`;
    if (short.length <= budget) return short + brand;
    return `Radio ${country.name}` + brand;
  };

  const buildSeoDescription = (): string => {
    const cta = " ¡Dale play ahora!";
    const base = N > 0
      ? `Escucha ${N.toLocaleString()} emisoras de ${country.name} en vivo gratis 24/7. Música, noticias y deportes. Sin registro ni descargas.${cta}`
      : `Escucha emisoras de ${country.name} en vivo gratis 24/7. Música, noticias y deportes. Sin registro ni descargas.${cta}`;
    return base.length <= 158 ? base : base.substring(0, 157 - cta.length) + "…" + cta;
  };

  const seoTitle = buildSeoTitle();
  const seoDescription = buildSeoDescription();

  // OG/Twitter: emojis permitidos, longitud más laxa (FB/WA muestran ~88 chars).
  // Buscan engagement social, no posicionamiento en Google.
  const socialTitle = `▶️ Radio ${country.name} En Vivo${N > 0 ? ` · ${N}+ Emisoras` : ""} Gratis 🎧`;
  const socialDescription = N > 0
    ? `🎧 Escucha ${N} emisoras de ${country.name} en vivo gratis: música, noticias y deportes 24/7. Sin cortes, sin registro. ¡Dale play desde cualquier dispositivo!`
    : `🎧 Escucha radios de ${country.name} en vivo gratis: música, noticias y deportes 24/7. Sin cortes, sin registro. ¡Dale play desde cualquier dispositivo!`;
  // Usamos el logo principal (1200x630-friendly) como OG image. Las flags de /public/flags/ son
  // thumbnails ~250x180 — sirven para UI pero Facebook/WhatsApp las rechazan como preview social.
  const socialImage = "/logos_general/logo_emisoras_latinas.jpg";

  return {
    // absolute: evita que el template global del layout se concatene y sature los 58 chars del SERP.
    title: { absolute: seoTitle },
    description: seoDescription,
    alternates: {
      canonical: `/radio/${resolvedParams.country}`,
      languages: {
        [getHreflangFromCountry(code)]: `/radio/${resolvedParams.country}`,
      },
    },
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url: `https://www.emisoraslatinas.online/radio/${resolvedParams.country}`,
      type: "website",
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: `Radio ${country.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [socialImage],
      creator: "@emisoraslatinas",
    },
  };
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const resolvedParams = await params;
  const code = resolvedParams.country.toUpperCase() as CountryCode;
  const country = countries.find((c) => c.code === code);

  if (!country) return notFound();

  const stations = await loadStationsByCountry(code);
  const { t, lang } = getI18nFromCountry(code);

  // FAQ del país: UNA sola fuente para el schema Y el acordeón visible (Google
  // exige que el contenido FAQ sea visible en la página). Incluye preguntas
  // agregadas/comparativas de alto tráfico (AEO) además de las 3 base.
  const faqCount = stations.length.toLocaleString();
  const isEn = lang === "en";
  const countryFaqs: { q: string; a: string }[] = [
    {
      q: t.faq_how_question.replace("{country}", country.name),
      a: t.faq_how_answer,
    },
    {
      q: t.faq_count_question
        .replace("{count}", faqCount)
        .replace("{country}", country.name),
      a: t.faq_count_answer
        .replace("{count}", faqCount)
        .replace("{country}", country.name),
    },
    { q: t.faq_free_question, a: t.faq_free_answer },
    isEn
      ? {
          q: `Can I listen to ${country.name} radio from abroad?`,
          a: `Yes. Since it's internet radio, you can listen to ${country.name} stations from anywhere in the world, free and with no restrictions.`,
        }
      : {
          q: `¿Puedo escuchar radio de ${country.name} desde el extranjero?`,
          a: `Sí. Al ser radio por internet, puedes escuchar las emisoras de ${country.name} desde cualquier país del mundo, gratis y sin restricciones.`,
        },
    isEn
      ? {
          q: `Do I need an app or account to listen?`,
          a: `No. Emisoras Latinas works right in your browser — no app to download and no sign-up required.`,
        }
      : {
          q: `¿Necesito una app o registro para escuchar?`,
          a: `No. Emisoras Latinas funciona en el navegador; no necesitas descargar ninguna app ni crear una cuenta.`,
        },
    isEn
      ? {
          q: `What kinds of stations can I find from ${country.name}?`,
          a: `You'll find music (pop, rock, tropical, regional), news, sports and Christian radio from ${country.name}. Use the search box or genre filters to narrow down.`,
        }
      : {
          q: `¿Qué tipo de emisoras de ${country.name} puedo encontrar?`,
          a: `Encontrarás emisoras de música (pop, rock, tropical, regional), noticias, deportes y radio cristiana de ${country.name}. Usa el buscador o los filtros de género para afinar.`,
        },
  ];

  // Géneros más populares del país (por nº de emisoras) para enlazar a las
  // páginas /genero/<x>: contenido comparativo + descubrimiento (antes esas
  // páginas estaban huérfanas). Top 18 para no saturar ni diluir link equity.
  const topGenres = getCategories(stations, code)
    .map((g) => ({ name: g, count: filterByCategory(stations, g).length }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 18);

  // Proyección ligera para el grid cliente: solo los campos que el listado usa
  // (tarjeta + búsqueda + filtro). Se omiten url_stream, redes_sociales,
  // sitio_web, logo (duplicado), frecuencia, etc. que NO se renderizan en el
  // grid. Esto recorta drásticamente el HTML serializado (la página de país
  // pesaba ~2MB) SIN cambiar el comportamiento ni añadir consultas a Neon,
  // porque la búsqueda/filtrado sigue siendo 100% en el navegador.
  const slimStations = stations.map((s) => ({
    nombre: s.nombre,
    slug: s.slug,
    logo_local: s.logo_local,
    generos: s.generos,
    descripcion: s.descripcion,
    ciudad: s.ciudad,
    isVip: s.isVip,
    url_stream: "", // requerido por el tipo StationByCountry, no se usa en el listado
  }));

  // Generar JSON-LD para la página de país (ItemList de RadioStations)
  const countryJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.seo_title.replace("{country}", country.name),
    description: t.seo_description_1.replace("{country}", country.name),
    numberOfItems: stations.length,
    itemListElement: stations.slice(0, 50).map((station, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "RadioStation",
        name: station.nombre,
        description:
          station.descripcion?.substring(0, 150) ||
          `Radio station from ${country.name}`,
        areaServed: {
          "@type": "Country",
          name: country.name,
        },
      },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-900">
      {/* Sincronizar país con localStorage */}
      <CountrySync countryCode={code} />

      {/* JSON-LD Structured Data para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(countryJsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: "https://www.emisoraslatinas.online" },
          {
            name: country.name,
            url: `https://www.emisoraslatinas.online/radio/${resolvedParams.country}`,
          },
        ]}
      />

      {/* FAQ Schema para featured snippet en SERP. Se genera del MISMO array
          que el acordeón visible de abajo (Google exige coincidencia). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": countryFaqs.map((f) => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": { "@type": "Answer", "text": f.a },
            })),
          }),
        }}
      />

      {/* Header Dinámico */}
      <DynamicHeader selectedCountry={code} stationCount={stations.length} />

      <div className="flex justify-center gap-4 px-4">
        {/* Publicidad lateral izquierda - solo visible en pantallas grandes */}
        <aside className="hidden 2xl:block flex-shrink-0 pt-8">
          <div className="sticky top-4">
            <BannerAd
              position={AdvertisementPosition.HOME_LEFT}
              countryId={country.id || country.code}
              className="w-40 h-[600px]"
            />
          </div>
        </aside>

        {/* Contenido principal */}
        <div className="flex-1 max-w-7xl">
          {/* Country Selector & Breadcrumbs */}
          <div className="pt-6 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <CountrySelector selectedCountry={code} />

              {/* Breadcrumbs */}
              <div className="text-sm text-slate-500 flex items-center gap-2 px-2">
                <Link
                  href="/"
                  className="hover:text-blue-400 transition-colors"
                >
                  {t.home || "Inicio"}
                </Link>
                <i className="fas fa-chevron-right text-xs"></i>
                <span className="text-white">{country.name}</span>
              </div>
            </div>
          </div>

          {/* Publicidad Superior */}
          <div className="mb-8 flex justify-center">
            <BannerAd
              position={AdvertisementPosition.HOME_TOP}
              countryId={country.id || country.code}
            />
          </div>

          {/* Grid de Emisoras */}
          <section aria-label={`${t.stations_of} ${country.name}`}>
            <Suspense fallback={<GridFallback />}>
              <PaginatedStationGrid stations={slimStations} countryCode={code} />
            </Suspense>
          </section>

          {/* Explora por género: enlaza a las páginas comparativas /genero/<x>.
              Antes estaban huérfanas (sin enlaces internos) → sin rastreo. */}
          {topGenres.length > 0 && (
            <section className="mt-16 max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">
                {isEn
                  ? `Explore ${country.name} radio by genre`
                  : `Explora la radio de ${country.name} por género`}
              </h2>
              <div className="flex flex-wrap gap-3">
                {topGenres.map((g) => (
                  <Link
                    key={g.name}
                    href={`/radio/${resolvedParams.country}/genero/${encodeURIComponent(
                      g.name,
                    )}`}
                    className="px-4 py-2 bg-slate-800/60 hover:bg-slate-700 text-slate-200 rounded-full text-sm border border-slate-700/50 transition-colors"
                  >
                    {isEn ? `${g.name} radio` : `Radio ${g.name}`}
                    <span className="ml-2 text-slate-500">{g.count}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Texto SEO Rico */}
          <article className="prose prose-invert mt-16 max-w-4xl mx-auto text-slate-400 bg-slate-800/20 p-8 rounded-2xl border border-slate-700/30">
            <h2 className="text-2xl font-bold text-white mb-4">
              {t.seo_title.replace("{country}", country.name)}
            </h2>
            <p className="mb-4">
              {t.seo_description_1.replace("{country}", country.name)}
            </p>
            <p className="mb-4">
              {t.seo_description_2
                .replace("{count}", stations.length.toString())
                .replace("{country}", country.name)}
            </p>
            <h3 className="text-xl font-bold text-white mt-6 mb-3">
              {t.why_choose_title}
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>{t.why_choose_items.fast_load.split(" - ")[0]}</strong>{" "}
                - {t.why_choose_items.fast_load.split(" - ")[1]}
              </li>
              <li>
                <strong>{t.why_choose_items.no_ads.split(" - ")[0]}</strong> -{" "}
                {t.why_choose_items.no_ads.split(" - ")[1]}
              </li>
              <li>
                <strong>
                  {t.why_choose_items.continuous_play.split(" - ")[0]}
                </strong>{" "}
                - {t.why_choose_items.continuous_play.split(" - ")[1]}
              </li>
              <li>
                <strong>
                  {t.why_choose_items.premium_free.split(" - ")[0]}
                </strong>{" "}
                - {t.why_choose_items.premium_free.split(" - ")[1]}
              </li>
              <li>{t.why_choose_items.mobile_friendly}</li>
            </ul>
          </article>

          {/* Preguntas frecuentes VISIBLES (coinciden con el FAQPage schema) */}
          <section className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <i className="fas fa-circle-question text-blue-400"></i>
              </div>
              {isEn
                ? `Frequently asked questions about ${country.name} radio`
                : `Preguntas frecuentes sobre la radio de ${country.name}`}
            </h2>
            <div className="space-y-3">
              {countryFaqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-slate-800/30 border border-slate-700/30 rounded-xl p-5"
                >
                  <summary className="flex items-center justify-between text-white font-semibold cursor-pointer list-none">
                    <span>{faq.q}</span>
                    <i className="fas fa-chevron-down text-blue-400 transition-transform group-open:rotate-180"></i>
                  </summary>
                  <p className="faq-answer mt-3 text-slate-300 leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Publicidad Inferior */}
          <div className="mt-12 mb-8 flex justify-center">
            <BannerAd
              position={AdvertisementPosition.HOME_BOTTOM}
              countryId={country.id || country.code}
            />
          </div>
        </div>

        {/* Publicidad lateral derecha - solo visible en pantallas grandes */}
        <aside className="hidden 2xl:block flex-shrink-0 pt-8">
          <div className="sticky top-4">
            <BannerAd
              position={AdvertisementPosition.HOME_RIGHT}
              countryId={country.id || country.code}
              className="w-40 h-[600px]"
            />
          </div>
        </aside>
      </div>

      <Footer />

      {/* Banner inferior fijo (sticky 15%). Scope GENERAL filtrado por país,
          igual que los demás banners HOME_*. Trae su propio anuncio y solo se
          muestra si hay uno activo; incluye botón para cerrarlo. */}
      <StickyBottomAd countryId={country.id || country.code} />
    </main>
  );
}
