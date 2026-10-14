import { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout";
import {
  countries,
  CountryCode,
  loadStationsByCountry,
} from "@/data/stationsByCountry";
import { getI18nFromCountry } from "@/utils/translations";
import { getHreflangFromCountry } from "@/utils/hreflang";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

// Índice A-Z del país: un enlace HTML a CADA emisora. El grid de /radio/<país>
// pagina en el navegador, así que su HTML solo enlaza la primera tanda y el
// resto del catálogo quedaba sin enlaces internos rastreables.
//
// 7 días, igual que las páginas de género: el listado cambia muy poco y cada
// regeneración carga todo el catálogo del país.
export const revalidate = 604800;
export const dynamicParams = true;

// Sin generateStaticParams, Next renderiza la ruta en cada petición e ignora
// el revalidate. Con él, las 33 páginas se generan en el build (reutilizando
// la carga por país que ya hace /radio/<país>) y se sirven desde caché.
export async function generateStaticParams() {
  return countries.map((country) => ({
    country: country.code.toLowerCase(),
  }));
}

const BASE_URL = "https://www.emisoraslatinas.online";
const OTHER_GROUP = "#";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const code = resolvedParams.country.toUpperCase() as CountryCode;
  const country = countries.find((c) => c.code === code);
  if (!country) return { title: "Emisoras Latinas" };

  const stations = await loadStationsByCountry(code);
  const count = stations.filter((s) => s.slug).length.toLocaleString("es");
  const { lang } = getI18nFromCountry(code);
  const isSpanish = lang !== "en";
  const path = `/radio/${resolvedParams.country}/todas`;

  const title = isSpanish
    ? `Todas las Emisoras de ${country.name} (A-Z) | Emisoras Latinas`
    : `All ${country.name} Radio Stations (A-Z) | Emisoras Latinas`;
  const description = isSpanish
    ? `Listado completo de las ${count} emisoras de radio de ${country.name}, ordenadas de la A a la Z. Encuentra tu emisora y escúchala en vivo gratis, sin registro.`
    : `Complete list of the ${count} radio stations from ${country.name}, sorted A to Z. Find your station and listen live for free, no sign-up.`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: path,
      languages: { [getHreflangFromCountry(code)]: path },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${path}`,
      type: "website",
      images: [
        {
          url: "/logos_general/logo_emisoras_latinas.jpg",
          width: 1200,
          height: 630,
          alt: `Radio ${country.name}`,
        },
      ],
    },
    robots: { index: true, follow: true },
  };
}

// Letra inicial sin tildes ("Ábaco" -> "A"); lo que no empieza por letra
// (números, símbolos) va a un grupo aparte.
function groupKey(name: string): string {
  const first = name
    .trim()
    .charAt(0)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase();
  return /^[A-Z]$/.test(first) ? first : OTHER_GROUP;
}

export default async function AllStationsPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const resolvedParams = await params;
  const code = resolvedParams.country.toUpperCase() as CountryCode;
  const country = countries.find((c) => c.code === code);
  if (!country) return notFound();

  const stations = (await loadStationsByCountry(code)).filter((s) => s.slug);
  if (stations.length === 0) return notFound();

  const { lang } = getI18nFromCountry(code);
  const isSpanish = lang !== "en";
  const countryPath = `/radio/${resolvedParams.country}`;

  const groups = new Map<string, typeof stations>();
  [...stations]
    .sort((a, b) => a.nombre.localeCompare(b.nombre, lang))
    .forEach((station) => {
      const key = groupKey(station.nombre);
      const group = groups.get(key);
      if (group) group.push(station);
      else groups.set(key, [station]);
    });

  // Letras en orden alfabético y el grupo de números/símbolos al final.
  const groupKeys = [...groups.keys()].sort((a, b) => {
    if (a === OTHER_GROUP) return 1;
    if (b === OTHER_GROUP) return -1;
    return a.localeCompare(b);
  });

  const total = stations.length.toLocaleString("es");

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: BASE_URL },
          { name: country.name, url: `${BASE_URL}${countryPath}` },
          {
            name: isSpanish ? "Todas las emisoras" : "All stations",
            url: `${BASE_URL}${countryPath}/todas`,
          },
        ]}
      />

      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={countryPath} className="flex items-center gap-3">
            <span className="text-white font-bold text-xl">Emisoras Latinas</span>
          </Link>
          <Link
            href={countryPath}
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
          <Link href={countryPath} className="hover:text-blue-400">
            {country.name}
          </Link>
          <i className="fas fa-chevron-right text-xs" />
          <span className="text-white">
            {isSpanish ? "Todas las emisoras" : "All stations"}
          </span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {isSpanish
            ? `Todas las emisoras de ${country.name} de la A a la Z`
            : `All radio stations from ${country.name}, A to Z`}
        </h1>
        <p className="text-slate-400 text-lg mb-8">
          {isSpanish
            ? `Listado completo de las ${total} emisoras de ${country.name} disponibles en Emisoras Latinas. Elige una y escúchala en vivo gratis, sin registro.`
            : `Complete list of the ${total} stations from ${country.name} available on Emisoras Latinas. Pick one and listen live for free, no sign-up.`}
        </p>

        <nav
          aria-label={isSpanish ? "Índice alfabético" : "Alphabetical index"}
          className="flex flex-wrap gap-2 mb-10"
        >
          {groupKeys.map((key) => (
            <a
              key={key}
              href={`#letra-${key === OTHER_GROUP ? "otros" : key}`}
              className="w-9 h-9 flex items-center justify-center bg-slate-800/60 hover:bg-slate-700 text-slate-200 rounded-lg text-sm font-semibold border border-slate-700/50 transition-colors"
            >
              {key}
            </a>
          ))}
        </nav>

        {groupKeys.map((key) => (
          <section
            key={key}
            id={`letra-${key === OTHER_GROUP ? "otros" : key}`}
            className="mb-10 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-700/50 pb-2">
              {key}
            </h2>
            {/* Estilos desde el <ul> (no clases por ítem): con miles de filas,
                repetir clases en cada una multiplica el peso del HTML. */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-2 text-sm text-slate-500 [&>li]:truncate [&_a]:text-base [&_a]:text-blue-400 hover:[&_a]:text-blue-300">
              {groups.get(key)!.map((station) => (
                <li key={station.slug}>
                  {/* prefetch desactivado: son miles de enlaces y cada prefetch
                      sería una petición al origen. */}
                  <Link href={`${countryPath}/${station.slug}`} prefetch={false}>
                    {station.nombre}
                  </Link>
                  {station.ciudad ? ` — ${station.ciudad}` : null}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <div className="text-center">
          <Link
            href={countryPath}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors"
          >
            <i className="fas fa-arrow-left" />
            {isSpanish
              ? `Volver a la radio de ${country.name}`
              : `Back to ${country.name} radio`}
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
