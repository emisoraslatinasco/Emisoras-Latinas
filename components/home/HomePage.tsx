import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Footer } from "@/components/layout";
import ContinueListeningBanner from "@/components/home/ContinueListeningBanner";
import { countries } from "@/data/stationsByCountry";

const FEATURED_GENRES = [
  { name: "Salsa", icon: "fa-music", country: "co" },
  { name: "Vallenato", icon: "fa-guitar", country: "co" },
  { name: "Reggaetón", icon: "fa-headphones", country: "co" },
  { name: "Noticias", icon: "fa-newspaper", country: "co" },
  { name: "Pop Latino", icon: "fa-microphone", country: "mx" },
  { name: "Cristiana", icon: "fa-cross", country: "co" },
  { name: "Rock", icon: "fa-drum", country: "ar" },
  { name: "Cumbia", icon: "fa-music", country: "co" },
  { name: "Bachata", icon: "fa-music", country: "do" },
  { name: "Tango", icon: "fa-music", country: "ar" },
  { name: "Deportes", icon: "fa-futbol", country: "ar" },
  { name: "Electrónica", icon: "fa-headphones", country: "es" },
];

const POPULAR_COUNTRIES_FIRST = [
  "CO",
  "MX",
  "AR",
  "PE",
  "ES",
  "US",
  "CL",
  "EC",
  "VE",
  "BR",
];

export default function HomePage() {
  const sortedCountries = [...countries].sort((a, b) => {
    const idxA = POPULAR_COUNTRIES_FIRST.indexOf(a.code);
    const idxB = POPULAR_COUNTRIES_FIRST.indexOf(b.code);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.name.localeCompare(b.name);
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Qué es Emisoras Latinas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Emisoras Latinas es el directorio de radio online más completo de Latinoamérica con más de 21.000 emisoras de 27 países. Escuchas en vivo, gratis, sin registro ni descargas, desde cualquier dispositivo con internet.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuánto cuesta escuchar las emisoras?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Es completamente gratis. No requiere suscripción, pago ni registro. Solo necesitas conexión a internet y un navegador.",
        },
      },
      {
        "@type": "Question",
        name: "¿Desde qué dispositivos funciona?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Funciona desde cualquier dispositivo con navegador: PC, Mac, iPhone, Android, tablets, smart TVs. No hay que instalar aplicaciones.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuántos países y emisoras tienen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Más de 21.000 emisoras de 27 países: Colombia, México, Argentina, Perú, Chile, España, Estados Unidos, Ecuador, Venezuela, Brasil, Francia, Italia, Reino Unido, Portugal, Uruguay, Costa Rica, Panamá, República Dominicana y más.",
        },
      },
      {
        "@type": "Question",
        name: "¿La música se detiene al cambiar de página?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. El reproductor sigue sonando mientras navegas por el sitio. Puedes explorar otras emisoras sin perder lo que estás escuchando.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-900">
      <Script
        id="home-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero — compactado para que el grid de países se vea en el primer fold */}
      <section className="relative overflow-hidden border-b border-slate-800/60">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/25 to-pink-900/20 animate-gradient-rotate pointer-events-none" />
        <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/logos_general/logo_emisoras_latinas.jpg"
              alt="Emisoras Latinas"
              width={300}
              height={80}
              priority
              unoptimized
              className="h-14 md:h-20 w-auto mb-3"
            />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
              Emisoras Latinas
            </h1>
            <p className="text-sm md:text-base text-slate-300 max-w-2xl mb-4">
              Más de <strong className="text-white">21.000 radios en vivo gratis</strong> de Latinoamérica, España, EE.UU. y Europa. Streaming 24/7 sin cortes, sin registro.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              <span className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/70 backdrop-blur-sm rounded-full text-xs md:text-sm text-white border border-slate-700/50">
                <i className="fas fa-globe-americas text-blue-400"></i>
                27 países
              </span>
              <span className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/70 backdrop-blur-sm rounded-full text-xs md:text-sm text-white border border-slate-700/50">
                <i className="fas fa-signal text-green-400"></i>
                En vivo 24/7
              </span>
              <span className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-800/70 backdrop-blur-sm rounded-full text-xs md:text-sm text-white border border-slate-700/50">
                <i className="fas fa-gift text-purple-400"></i>
                100% gratis
              </span>
              <span className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-800/70 backdrop-blur-sm rounded-full text-xs md:text-sm text-white border border-slate-700/50">
                <i className="fas fa-mobile-alt text-pink-400"></i>
                Multidispositivo
              </span>
            </div>

            <ContinueListeningBanner />
          </div>
        </div>
      </section>

      {/* Country Grid */}
      <section className="container mx-auto px-4 py-8 md:py-10 max-w-6xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Explora por país
          </h2>
          <p className="text-sm md:text-base text-slate-400">
            Elige tu país y empieza a escuchar al instante
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {sortedCountries.map((c) => (
            <Link
              key={c.code}
              href={`/radio/${c.code.toLowerCase()}`}
              prefetch={false}
              className="glass-effect rounded-2xl p-4 hover:scale-105 transition-transform group"
            >
              <div className="relative w-full aspect-[3/2] mb-3 rounded-lg overflow-hidden bg-slate-800">
                <Image
                  src={c.flag}
                  alt={`Bandera de ${c.name}`}
                  fill
                  unoptimized
                  className="object-cover group-hover:brightness-110 transition"
                />
              </div>
              <p className="text-white font-semibold text-center text-sm">
                {c.name}
              </p>
              <p className="text-blue-400 text-xs text-center mt-1 opacity-0 group-hover:opacity-100 transition">
                Escuchar radio →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Genres */}
      <section className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Géneros populares
          </h2>
          <p className="text-slate-400">
            Salta directo al estilo musical que más disfrutas
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {FEATURED_GENRES.map((g) => (
            <Link
              key={g.name}
              href={`/radio/${g.country}/genero/${encodeURIComponent(g.name)}`}
              prefetch={false}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500/15 to-purple-500/15 hover:from-blue-500/30 hover:to-purple-500/30 text-white rounded-full border border-blue-500/30 transition-colors"
            >
              <i className={`fas ${g.icon} text-blue-400`}></i>
              <span className="text-sm font-medium">{g.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO rich content */}
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <article className="prose prose-invert max-w-none text-slate-300 bg-slate-800/20 p-8 md:p-10 rounded-2xl border border-slate-700/30">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">
            La radio de Latinoamérica al alcance de un clic
          </h2>
          <p className="mb-4 leading-relaxed">
            <strong>Emisoras Latinas</strong> es el directorio de radio online más
            completo de habla hispana. Reunimos más de <strong>21.000 estaciones</strong>{" "}
            en vivo de Colombia, México, Argentina, Perú, Chile, Ecuador, Venezuela,
            Bolivia, Uruguay, Paraguay, España, Estados Unidos, Brasil, Francia,
            Italia, Reino Unido, Portugal y muchos países más. Toda la cultura sonora
            latina —desde la salsa caribeña hasta el tango rioplatense, pasando por el
            vallenato colombiano, la cumbia mexicana, el reggaetón puertorriqueño y la
            música andina— al alcance de un solo clic.
          </p>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">
            Cómo funciona
          </h3>
          <p className="mb-4 leading-relaxed">
            Elige tu país en el grid de arriba, explora el catálogo de emisoras y haz
            clic en reproducir. El streaming arranca en segundos y sigue sonando
            mientras navegas por el resto del sitio. No hay que instalar nada, no hay
            registro y no hay suscripción. Tampoco hay límite de horas: puedes
            escuchar las 24 horas del día, los 7 días de la semana, desde cualquier
            dispositivo con navegador —PC, Mac, iPhone, Android, tablets, incluso
            Smart TVs—.
          </p>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">
            Géneros para todos los gustos
          </h3>
          <p className="mb-4 leading-relaxed">
            Nuestro catálogo cubre todos los estilos: <strong>música tropical</strong>{" "}
            (salsa, vallenato, merengue, bachata, cumbia, son cubano),{" "}
            <strong>música urbana</strong> (reggaetón, trap latino, hip-hop),{" "}
            <strong>pop y rock</strong> en español e inglés, <strong>música cristiana</strong>{" "}
            y de adoración, <strong>música clásica y jazz</strong>,{" "}
            <strong>folclore latinoamericano</strong> (mariachi, tango, ranchera,
            joropo, milonga), <strong>electrónica</strong>, y por supuesto{" "}
            <strong>emisoras de noticias, deportes y radio hablada</strong> de los
            principales medios de cada país.
          </p>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">
            ¿Por qué elegir Emisoras Latinas?
          </h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <strong className="text-white">Catálogo gigante:</strong> +21.000 emisoras
              verificadas, el directorio más grande de radio online en español.
            </li>
            <li>
              <strong className="text-white">Carga instantánea:</strong> el audio empieza en
              menos de 2 segundos.
            </li>
            <li>
              <strong className="text-white">Sin cortes:</strong> reproducción continua
              mientras exploras otras secciones del sitio.
            </li>
            <li>
              <strong className="text-white">Diseño limpio:</strong> interfaz moderna,
              oscura y sin distracciones; concentrada en la música.
            </li>
            <li>
              <strong className="text-white">100% gratis siempre:</strong> sin pagos
              ocultos, sin pruebas gratuitas, sin tarjeta de crédito.
            </li>
            <li>
              <strong className="text-white">Multidispositivo:</strong> funciona en todo
              dispositivo con navegador moderno.
            </li>
            <li>
              <strong className="text-white">PWA opcional:</strong> instalable como
              app desde tu navegador, sin pasar por tiendas de apps.
            </li>
          </ul>

          <h3 className="text-xl font-bold text-white mt-8 mb-3">
            Emisoras icónicas que encontrarás
          </h3>
          <p className="mb-4 leading-relaxed">
            En Colombia tenemos Caracol Radio, RCN Radio, Blu Radio, La FM, Olímpica
            Stereo, Tropicana, Radioacktiva y cientos más. En México Los 40, Radio
            Fórmula, W Radio, Imagen Radio. En Argentina Mitre, La Red, Rivadavia,
            Continental, Aspen. En España Cadena SER, COPE, Onda Cero, RNE, los 40
            Principales, Cadena 100, Kiss FM. En Estados Unidos las emisoras latinas
            de Miami, Los Ángeles, Nueva York, Houston y Chicago. Y miles más en cada
            uno de los 27 países que cubrimos.
          </p>

          <p className="mb-2 leading-relaxed">
            Si lo que buscas es{" "}
            <strong className="text-white">escuchar radio online en vivo y gratis</strong>,
            estás en el lugar correcto. Elige un país, encuentra tu emisora favorita y
            dale play. Así de simple.
          </p>
        </article>
      </section>

      {/* FAQ visible */}
      <section className="container mx-auto px-4 pb-16 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
          Preguntas frecuentes
        </h2>
        <div className="space-y-3">
          {faqJsonLd.mainEntity.map((q, idx) => (
            <details
              key={idx}
              className="group glass-effect rounded-xl p-5 cursor-pointer"
            >
              <summary className="flex items-center justify-between text-white font-semibold list-none">
                <span>{q.name}</span>
                <i className="fas fa-chevron-down text-blue-400 transition-transform group-open:rotate-180"></i>
              </summary>
              <p className="mt-3 text-slate-400 leading-relaxed">
                {q.acceptedAnswer.text}
              </p>
            </details>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
