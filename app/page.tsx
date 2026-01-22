import { Suspense } from "react";
import { Footer } from "@/components/layout";
import HomeContent from "@/components/home/HomeContent";
import AdSpace from "@/components/ui/AdSpace";

function HomeContentFallback() {
  return (
    <div className="min-h-[600px] flex items-center justify-center">
      <div className="text-center">
        <i className="fas fa-spinner fa-spin text-4xl text-blue-500 mb-4"></i>
        <p className="text-slate-400">Cargando emisoras...</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content - Client Component con Header dinámico */}
      <Suspense fallback={<HomeContentFallback />}>
        <HomeContent />
      </Suspense>

      {/* Ad Space */}
      <div className="container mx-auto px-4 py-8">
        <AdSpace 
          width="w-full max-w-6xl mx-auto" 
          height="h-24" 
          label="Publicidad inferior"
        />
      </div>

      {/* Contenido SEO Global */}
      <section className="container mx-auto px-4 py-12 max-w-6xl">
        <article className="prose prose-invert max-w-none text-slate-400 bg-slate-800/20 p-8 rounded-2xl border border-slate-700/30">
          <h1 className="text-3xl font-bold text-white mb-6">Emisoras Latinas: Radio Online en Vivo y Gratis</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="mb-4">
                Bienvenido a <strong>Emisoras Latinas</strong>, la plataforma líder para escuchar radio por internet en Latinoamérica. 
                Disfruta de más de 15,000 estaciones de radio en vivo de Colombia, México, Argentina, Perú, España y más.
              </p>
              <p className="mb-4">
                Nuestra tecnología de streaming te permite escuchar tus programas favoritos sin cortes, con la mejor calidad de audio 
                y desde cualquier dispositivo. Noticias, deportes, música y entretenimiento al alcance de un clic.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-3">¿Por qué elegirnos?</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Variedad Inigualable:</strong> Desde emisoras FM populares hasta radios locales.</li>
                <li><strong>Sin Interrupciones:</strong> Reproductor optimizado para conexiones estables.</li>
                <li><strong>Gratis Siempre:</strong> Acceso ilimitado sin suscripciones.</li>
              </ul>
            </div>
          </div>
        </article>
      </section>

      <Footer />
    </div>
  );
}
