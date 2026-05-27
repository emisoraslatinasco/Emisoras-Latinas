import { Suspense } from "react";
import { Metadata } from "next";
import { Footer } from "@/components/layout";
import RedirectToCountry from "@/components/home/RedirectToCountry";
import Link from "next/link";
import { countries } from "@/data/stationsByCountry";

export const metadata: Metadata = {
  title: { absolute: "Emisoras Latinas · +21.000 Radios En Vivo Gratis 24/7" },
  description:
    "Escucha más de 21.000 emisoras de radio en vivo de Latinoamérica y el mundo. Colombia, México, Argentina, España, Estados Unidos y más. Radio online gratis 24/7, sin cortes, sin registro. ¡Dale play ahora!",
  alternates: {
    canonical: "/",
  },
};

function RedirectFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center">
        <i className="fas fa-spinner fa-spin text-5xl text-blue-500 mb-4"></i>
        <p className="text-slate-400 text-lg">Cargando emisoras...</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Componente cliente que redirige al país guardado */}
      <Suspense fallback={<RedirectFallback />}>
        <RedirectToCountry />
      </Suspense>

      {/* Contenido SEO para crawlers (bots que no ejecutan JavaScript) */}
      <noscript>
        <div className="min-h-screen flex flex-col bg-slate-900">
          <section className="container mx-auto px-4 py-12 max-w-6xl">
            <article className="prose prose-invert max-w-none text-slate-400 bg-slate-800/20 p-8 rounded-2xl border border-slate-700/30">
              <h1 className="text-3xl font-bold text-white mb-6">
                Emisoras Latinas: Radio Online en Vivo y Gratis
              </h1>

              <p className="mb-4">
                Bienvenido a <strong>Emisoras Latinas</strong>, la plataforma más completa para escuchar
                radio por internet en vivo y gratis. Nuestro catálogo reúne más de 21.000 emisoras de
                radio online de Latinoamérica, España, Estados Unidos y Europa. Desde emisoras de Colombia,
                México, Argentina, Perú, Chile, Ecuador y Venezuela, hasta estaciones de Brasil, Francia,
                Italia, Reino Unido, Portugal y más.
              </p>

              <h2 className="text-xl font-bold text-white mt-8 mb-3">¿Cómo funciona?</h2>
              <p className="mb-4">
                Es muy simple: selecciona tu país en el selector, explora el catálogo de emisoras
                disponibles y haz clic en reproducir. El audio comienza en segundos y puedes seguir
                navegando por el sitio sin que la música se detenga. No necesitas registrarte, instalar
                aplicaciones ni pagar suscripciones. Todo funciona directamente desde tu navegador.
              </p>

              <h2 className="text-xl font-bold text-white mt-8 mb-3">Géneros para todos los gustos</h2>
              <p className="mb-4">
                En Emisoras Latinas encuentras emisoras de salsa, vallenato, reggaetón, rock en español,
                pop latino, bachata, merengue, cumbia, tango y mucho más. También radios de noticias,
                deportivas, cristianas, música clásica, jazz, electrónica y radio hablada.
              </p>

              <h2 className="text-xl font-bold text-white mt-8 mb-3">¿Por qué elegirnos?</h2>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>+21.000 emisoras:</strong> El catálogo más grande de radio online en español.</li>
                <li><strong>Gratis siempre:</strong> Sin suscripciones, sin pagos ocultos, sin registro.</li>
                <li><strong>Streaming continuo:</strong> Reproduce en segundo plano mientras navegas.</li>
                <li><strong>Multidispositivo:</strong> Funciona en PC, Mac, iPhone, Android y tablets.</li>
                <li><strong>30+ países:</strong> Radio de toda Latinoamérica, España, USA y Europa.</li>
              </ul>

              <div className="mt-8">
                <h3 className="text-lg font-bold text-white mb-4">Selecciona tu país:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {countries.map((c) => (
                    <Link key={c.code} href={`/radio/${c.code.toLowerCase()}`} className="text-blue-400 hover:underline">
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          </section>
          <Footer />
        </div>
      </noscript>
    </>
  );
}
