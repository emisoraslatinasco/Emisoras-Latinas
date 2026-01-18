
import { countries, loadStationsByCountry, CountryCode } from "@/data/stationsByCountry";
import PaginatedStationGrid from "@/components/radio/PaginatedStationGrid";
import { Metadata } from "next";
import Link from "next/link";
import DynamicHeader from "@/components/home/DynamicHeader";
import { Footer } from "@/components/layout";
import { notFound } from "next/navigation";
import AdSpace from "@/components/ui/AdSpace";
import CountrySelector from "@/components/home/CountrySelector";
import { getI18nFromCountry } from "@/utils/translations";

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
    title: `Radio ${country.name} en Vivo Gratis - Sin Cortes ni Publicidad | Emisoras Latinas`,
    description: `Escucha las mejores emisoras de ${country.name} online gratis. ✓ Carga instantánea ✓ Sin pop-ups ✓ Reproductor que no se detiene. Más de 500 radios en vivo.`,
    alternates: {
      canonical: `/radio/${resolvedParams.country}`,
    },
    openGraph: {
       title: `Radio ${country.name} en Vivo - Experiencia Premium Gratis`,
       description: `Escucha radio de ${country.name} sin cortes, sin publicidad molesta y con carga instantánea. La mejor experiencia de radio online.`,
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
   const { t } = getI18nFromCountry(code);

   // Generar JSON-LD para la página de país (ItemList de RadioStations)
   const countryJsonLd = {
     "@context": "https://schema.org",
     "@type": "ItemList",
     "name": t.seo_title.replace('{country}', country.name),
     "description": t.seo_description_1.replace('{country}', country.name),
     "numberOfItems": stations.length,
     "itemListElement": stations.slice(0, 50).map((station, idx) => ({
       "@type": "ListItem",
       "position": idx + 1,
       "item": {
         "@type": "RadioStation",
         "name": station.nombre,
         "description": station.descripcion?.substring(0, 150) || `Radio station from ${country.name}`,
         "areaServed": {
           "@type": "Country",
           "name": country.name
         }
       }
     }))
   };


   return (
     <main className="min-h-screen bg-slate-900">
       {/* JSON-LD Structured Data para SEO */}
       <script
         type="application/ld+json"
         dangerouslySetInnerHTML={{ __html: JSON.stringify(countryJsonLd) }}
       />
       
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
                  <Link href="/" className="hover:text-blue-400 transition-colors">{t.home || 'Inicio'}</Link> 
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
            <section aria-label={`${t.stations_of} ${country.name}`}>
                <PaginatedStationGrid 
                  stations={stations} 
                  countryCode={code} 
                />
            </section>
            
            {/* Texto SEO Rico */}
            <article className="prose prose-invert mt-16 max-w-4xl mx-auto text-slate-400 bg-slate-800/20 p-8 rounded-2xl border border-slate-700/30">
              <h2 className="text-2xl font-bold text-white mb-4">{t.seo_title.replace('{country}', country.name)}</h2>
              <p className="mb-4">
                {t.seo_description_1.replace('{country}', country.name)}
              </p>
              <p className="mb-4">
                {t.seo_description_2.replace('{count}', stations.length.toString()).replace('{country}', country.name)}
              </p>
              <h3 className="text-xl font-bold text-white mt-6 mb-3">{t.why_choose_title}</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>{t.why_choose_items.fast_load.split(' - ')[0]}</strong> - {t.why_choose_items.fast_load.split(' - ')[1]}</li>
                <li><strong>{t.why_choose_items.no_ads.split(' - ')[0]}</strong> - {t.why_choose_items.no_ads.split(' - ')[1]}</li>
                <li><strong>{t.why_choose_items.continuous_play.split(' - ')[0]}</strong> - {t.why_choose_items.continuous_play.split(' - ')[1]}</li>
                <li><strong>{t.why_choose_items.premium_free.split(' - ')[0]}</strong> - {t.why_choose_items.premium_free.split(' - ')[1]}</li>
                <li>{t.why_choose_items.mobile_friendly}</li>
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
