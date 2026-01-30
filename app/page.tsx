import { Suspense } from "react";
import { Footer } from "@/components/layout";
import RedirectToCountry from "@/components/home/RedirectToCountry";

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
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="mb-4">
                    Bienvenido a <strong>Emisoras Latinas</strong>, la
                    plataforma líder para escuchar radio por internet en
                    Latinoamérica. Disfruta de más de 15,000 estaciones de radio
                    en vivo de Colombia, México, Argentina, Perú, España y más.
                  </p>
                  <p className="mb-4">
                    Nuestra tecnología de streaming te permite escuchar tus
                    programas favoritos sin cortes, con la mejor calidad de
                    audio y desde cualquier dispositivo. Noticias, deportes,
                    música y entretenimiento al alcance de un clic.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-3">
                    ¿Por qué elegirnos?
                  </h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Variedad Inigualable:</strong> Desde emisoras FM
                      populares hasta radios locales.
                    </li>
                    <li>
                      <strong>Sin Interrupciones:</strong> Reproductor
                      optimizado para conexiones estables.
                    </li>
                    <li>
                      <strong>Gratis Siempre:</strong> Acceso ilimitado sin
                      suscripciones.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-bold text-white mb-4">
                  Selecciona tu país:
                </h3>
                <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <li>
                    <a
                      href="/radio/co"
                      className="text-blue-400 hover:underline"
                    >
                      Colombia
                    </a>
                  </li>
                  <li>
                    <a
                      href="/radio/mx"
                      className="text-blue-400 hover:underline"
                    >
                      México
                    </a>
                  </li>
                  <li>
                    <a
                      href="/radio/ar"
                      className="text-blue-400 hover:underline"
                    >
                      Argentina
                    </a>
                  </li>
                  <li>
                    <a
                      href="/radio/pe"
                      className="text-blue-400 hover:underline"
                    >
                      Perú
                    </a>
                  </li>
                  <li>
                    <a
                      href="/radio/es"
                      className="text-blue-400 hover:underline"
                    >
                      España
                    </a>
                  </li>
                  <li>
                    <a
                      href="/radio/ec"
                      className="text-blue-400 hover:underline"
                    >
                      Ecuador
                    </a>
                  </li>
                  <li>
                    <a
                      href="/radio/cl"
                      className="text-blue-400 hover:underline"
                    >
                      Chile
                    </a>
                  </li>
                  <li>
                    <a
                      href="/radio/ve"
                      className="text-blue-400 hover:underline"
                    >
                      Venezuela
                    </a>
                  </li>
                </ul>
              </div>
            </article>
          </section>
          <Footer />
        </div>
      </noscript>
    </>
  );
}
