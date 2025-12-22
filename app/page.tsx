import { Footer } from "@/components/layout";
import HomeContent from "@/components/home/HomeContent";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto pt-8 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Las Mejores Emisoras Latinas en Vivo
        </h1>
        <img 
          src="/img/logo_emisoras_latinas.jpg" 
          alt="Emisoras Latinas - Tu Conexión Global Sonora"
          className="mx-auto my-4 w-full max-w-md h-auto rounded-xl shadow-lg object-cover block"
        />
        <div className="flex flex-wrap gap-4 justify-center text-slate-400 text-sm">
          <span className="flex items-center gap-2">
            <i className="fas fa-check-circle text-green-400"></i>
            100% Gratis
          </span>
          <span className="flex items-center gap-2">
            <i className="fas fa-check-circle text-green-400"></i>
            Streaming en Vivo
          </span>
          <span className="flex items-center gap-2">
            <i className="fas fa-check-circle text-green-400"></i>
            Sin Descargas
          </span>
        </div>
      </section>

      {/* Main Content - Client Component */}
      <HomeContent />

      {/* Ad Space */}
      <aside className="container mx-auto px-4 py-8" aria-label="Publicidad inferior">
        <div className="w-full max-w-6xl mx-auto h-24 bg-slate-800/50 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-600">
          <p className="text-slate-500 text-sm font-medium">Espacio publicitario 970x90</p>
        </div>
      </aside>

      <Footer />
    </div>
  );
}
