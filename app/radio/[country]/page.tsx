
import { countries, loadStationsByCountry, CountryCode } from "@/data/stationsByCountry";
import PaginatedStationGrid from "@/components/radio/PaginatedStationGrid";
import { Metadata } from "next";
import Link from "next/link";
import DynamicHeader from "@/components/home/DynamicHeader";
import { Footer } from "@/components/layout";
import { notFound } from "next/navigation";
import AdSpace from "@/components/ui/AdSpace";
import CountrySelector from "@/components/home/CountrySelector";

// Generar rutas estáticas para todos los países disponibles
export async function generateStaticParams() {
  return countries.map((country) => ({
    country: country.code.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const code = resolvedParams.country.toUpperCase() as CountryCode;
  const country = countries.find(c => c.code === code);
  
  if (!country) {
    return {
      title: 'Emisoras Latinas',
    };
  }

  return {
    title: `Emisoras de Radio de ${country.name} en Vivo - Escuchar Gratis`,
    description: `Escucha las mejores emisoras de ${country.name} online gratis. Radio en vivo de ${country.name}: noticias, deportes, música y más. Sin cortes.`,
    alternates: {
      canonical: `/radio/${resolvedParams.country}`,
    },
    openGraph: {
       title: `Radio ${country.name} en Vivo - Emisoras Latinas`,
       description: `Escucha gratis las mejores emisoras de radio de ${country.name}.`,
       url: `https://www.emisoraslatinas.online/radio/${resolvedParams.country}`,
       type: 'website',
       images: [
         {
           url: country.flag || '/logos_general/logo_emisoras_latinas.jpg',
           width: 1200,
           height: 630,
           alt: `Radio ${country.name}`,
         }
       ]
    }
  };
}

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
   const resolvedParams = await params;
   const code = resolvedParams.country.toUpperCase() as CountryCode;
   const country = countries.find(c => c.code === code);
   
   if (!country) return notFound();

   const stations = await loadStationsByCountry(code);

   return (
     <main className="min-h-screen bg-slate-900">
       {/* Header Dinámico */}
       <DynamicHeader selectedCountry={code} stationCount={stations.length} />
       
       <div className="flex justify-center gap-4 px-4">
         {/* Publicidad lateral izquierda - solo visible en pantallas grandes */}
         <aside className="hidden 2xl:block flex-shrink-0 pt-8">
           <div className="sticky top-4">
             <AdSpace
               width="w-40"
               height="h-[600px]"
               label="Publicidad"
               orientation="vertical"
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
                  <Link href="/" className="hover:text-blue-400 transition-colors">Inicio</Link> 
                  <i className="fas fa-chevron-right text-xs"></i>
                  <span className="text-white">{country.name}</span>
                </div>
              </div>
            </div>

            {/* Publicidad Superior */}
            <div className="mb-8">
              <AdSpace width="w-full max-w-4xl mx-auto" height="h-24" label="Publicidad" />
            </div>

            {/* Grid de Emisoras */}
            <section aria-label={`Emisoras de ${country.name}`}>
                <PaginatedStationGrid 
                  stations={stations} 
                  countryCode={code} 
                />
            </section>
            
            {/* Texto SEO Rico */}
            <article className="prose prose-invert mt-16 max-w-4xl mx-auto text-slate-400 bg-slate-800/20 p-8 rounded-2xl border border-slate-700/30">
              <h2 className="text-2xl font-bold text-white mb-4">Escuchar Radio {country.name} Gratis Online</h2>
              <p className="mb-4">
                Bienvenido al directorio más completo de <strong>emisoras de radio de {country.name}</strong>. 
                Aquí puedes escuchar transmisiones en vivo de tus estaciones favoritas sin interrupciones.
              </p>
              <p className="mb-4">
                Nuestro catálogo incluye más de {stations.length} radios de {country.name}, cubriendo ciudades principales y regiones.
                Disfruta de géneros como noticias, deportes, música pop, rock, salsa, vallenato y mucho más.
              </p>
              <h3 className="text-xl font-bold text-white mt-6 mb-3">¿Por qué usar Emisoras Latinas?</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Streaming oficial directo y seguro.</li>
                <li>Sin publicidad intrusiva (pop-ups molestos).</li>
                <li>Compatible con móviles y escritorio.</li>
                <li>Directorio actualizado 2026.</li>
              </ul>
            </article>

            {/* Publicidad Inferior */}
            <div className="mt-12 mb-8">
              <AdSpace width="w-full max-w-4xl mx-auto" height="h-24" label="Publicidad" />
            </div>
         </div>

         {/* Publicidad lateral derecha - solo visible en pantallas grandes */}
         <aside className="hidden 2xl:block flex-shrink-0 pt-8">
           <div className="sticky top-4">
             <AdSpace
               width="w-40"
               height="h-[600px]"
               label="Publicidad"
               orientation="vertical"
             />
           </div>
         </aside>
       </div>
       
       <Footer />
     </main>
   );
}
