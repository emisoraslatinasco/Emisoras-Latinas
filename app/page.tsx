import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "@/components/layout";
import { countries } from "@/data/stationsByCountry";
import CountrySync from "@/components/home/CountrySync";

export const metadata: Metadata = {
  title: { absolute: "Emisoras Latinas · +21.000 Radios En Vivo Gratis 24/7" },
  description:
    "Escucha más de 21.000 emisoras de radio en vivo de Latinoamérica y el mundo. Colombia, México, Argentina, España, Estados Unidos y más. Radio online gratis 24/7, sin cortes, sin registro. ¡Dale play ahora!",
  alternates: {
    canonical: "/",
  },
};

const topGenres = [
  { name: "Salsa", icon: "fa-music" },
  { name: "Noticias", icon: "fa-newspaper" },
  { name: "Rock", icon: "fa-guitar" },
  { name: "Pop", icon: "fa-star" },
  { name: "Deportes", icon: "fa-futbol" },
  { name: "Cristiana", icon: "fa-cross" },
  { name: "Vallenato", icon: "fa-drum" },
  { name: "Clásica", icon: "fa-headphones" },
  { name: "Jazz", icon: "fa-saxophone" },
  { name: "Electrónica", icon: "fa-bolt" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <CountrySync countryCode="CO" />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-gradient-rotate" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Emisoras Latinas
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-4 max-w-3xl mx-auto">
            +21.000 radios en vivo gratis de Latinoamérica y el mundo
          </p>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            Música, noticias, deportes y entretenimiento. Sin registro, sin cortes, 24 horas al día.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {countries.slice(0, 10).map((c) => (
              <Link
                key={c.code}
                href={`/radio/${c.code.toLowerCase()}`}
                className="inline-flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all hover:scale-105 border border-slate-700/50 text-sm"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Países Grid */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          Selecciona tu país
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {countries.map((c) => (
            <Link
              key={c.code}
              href={`/radio/${c.code.toLowerCase()}`}
              className="group flex flex-col items-center gap-3 p-4 bg-slate-800/50 hover:bg-slate-700/70 rounded-2xl transition-all hover:scale-105 border border-slate-700/50"
            >
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-slate-600 group-hover:border-blue-500 transition-colors">
                <Image
                  src={c.flag}
                  alt={`Radio ${c.name}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                  unoptimized
                />
              </div>
              <span className="text-white text-sm font-medium text-center">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Géneros populares */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          Explora por género
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {topGenres.map((g) => (
            <Link
              key={g.name}
              href={`/radio/co?categories=${encodeURIComponent(g.name)}`}
              className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white rounded-xl transition-all border border-slate-600/50"
            >
              <i className={`fas ${g.icon} text-blue-400`} />
              <span>{g.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <article className="prose prose-invert max-w-none text-slate-400 bg-slate-800/20 p-8 md:p-12 rounded-2xl border border-slate-700/30">
          <h2 className="text-2xl font-bold text-white mb-6">
            Escucha Radio Online en Vivo — Directorio #1 de Latinoamérica
          </h2>

          <p className="mb-4">
            Bienvenido a <strong>Emisoras Latinas</strong>, la plataforma más completa para escuchar
            radio por internet en vivo y gratis. Nuestro catálogo reúne más de 21.000 emisoras de
            radio online de Latinoamérica, España, Estados Unidos y Europa. Desde emisoras de Colombia,
            México, Argentina, Perú, Chile, Ecuador y Venezuela, hasta estaciones de Brasil, Francia,
            Italia, Reino Unido, Portugal y más.
          </p>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">¿Cómo funciona?</h3>
          <p className="mb-4">
            Es muy simple: selecciona tu país en el selector, explora el catálogo de emisoras
            disponibles y haz clic en reproducir. El audio comienza en segundos y puedes seguir
            navegando por el sitio sin que la música se detenga. No necesitas registrarte, instalar
            aplicaciones ni pagar suscripciones. Todo funciona directamente desde tu navegador, ya
            sea en computadora, tablet o celular.
          </p>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">Géneros para todos los gustos</h3>
          <p className="mb-4">
            En Emisoras Latinas encuentras emisoras de todos los géneros: <strong>salsa</strong>,
            vallenato, reggaetón, rock en español, pop latino, bachata, merengue, cumbia, tango y
            mucho más. También contamos con <strong>emisoras de noticias</strong> para mantenerte
            informado, radios deportivas para seguir a tu equipo favorito, emisoras cristianas y
            religiosas, estaciones de música clásica, jazz, electrónica y radio hablada. Hay una
            emisora para cada momento del día.
          </p>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">
            ¿Por qué Emisoras Latinas?
          </h3>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>
              <strong>+21.000 emisoras:</strong> El catálogo más grande de radio online en español.
            </li>
            <li>
              <strong>Gratis siempre:</strong> Sin suscripciones, sin pagos ocultos, sin registro.
            </li>
            <li>
              <strong>Streaming continuo:</strong> Reproduce en segundo plano mientras navegas.
            </li>
            <li>
              <strong>Multidispositivo:</strong> Funciona en PC, Mac, iPhone, Android y tablets.
            </li>
            <li>
              <strong>Calidad de audio:</strong> Transmisiones en alta definición y conexión estable.
            </li>
            <li>
              <strong>Catálogo actualizado:</strong> Agregamos y verificamos emisoras constantemente.
            </li>
            <li>
              <strong>30+ países:</strong> Radio de toda Latinoamérica, España, USA y Europa.
            </li>
          </ul>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">
            Países disponibles
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            {countries.map((c) => (
              <Link
                key={c.code}
                href={`/radio/${c.code.toLowerCase()}`}
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
              >
                Radio {c.name}
              </Link>
            ))}
          </div>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">
            Escucha donde quieras
          </h3>
          <p className="mb-4">
            Nuestro reproductor está optimizado para funcionar en cualquier dispositivo con conexión
            a internet. Abre Emisoras Latinas en el navegador de tu preferencia, elige una emisora
            y dale play. La transmisión continúa incluso si cambias de página dentro del sitio.
            Perfecto para escuchar mientras trabajas, estudias, haces ejercicio o simplemente
            disfrutas de tu tiempo libre.
          </p>
        </article>
      </section>

      <Footer />
    </main>
  );
}
