
import { Footer } from "@/components/layout";
import Link from "next/link";
import Image from "next/image";
import { getI18nFromCountry } from "@/utils/translations";
import { countries, CountryCode } from "@/data/stationsByCountry";
import { notFound } from "next/navigation";
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { lang } = getI18nFromCountry(resolvedParams.country as CountryCode);
  return {
    title: lang === 'es' ? "Política de Privacidad | Emisoras Latinas" : "Privacy Policy | Emisoras Latinas",
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ country: string }> }) {
  const resolvedParams = await params;
  const { lang, t } = getI18nFromCountry(resolvedParams.country as CountryCode);
  const country = countries.find(c => c.code === resolvedParams.country.toUpperCase());
  
  if (!country) return notFound();

  const isSpanish = lang === 'es';

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/radio/${resolvedParams.country}`} className="flex items-center gap-3">
            <Image
              src="/logos_general/logo_miniatura_emisoras_latinas.jpg.png"
              alt="Emisoras Latinas"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-white font-bold text-xl">
              Emisoras Latinas
            </span>
          </Link>
          <Link
            href={`/radio/${resolvedParams.country}`}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            {isSpanish ? "Volver" : "Back"}
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="glass-effect rounded-2xl p-8 md:p-12 shadow-2xl text-slate-300">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 border-b border-slate-700 pb-4">
            {isSpanish ? "Política de Privacidad" : "Privacy Policy"}
          </h1>

          {isSpanish ? (
            <div className="space-y-6">
                 <p>
                  En <strong>Emisoras Latinas</strong>, accesible desde https://www.emisoraslatinas.online/radio/{resolvedParams.country},
                  una de nuestras principales prioridades es la privacidad de nuestros visitantes.
                </p>
                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Archivos de Registro</h2>
                <p>Información estándar de archivos de registro (IP, navegador, ISP, fecha/hora).</p>
                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Cookies y Web Beacons</h2>
                <p>Utilizamos cookies para almacenar preferencias de visitantes y optimizar la experiencia.</p>
                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Publicidad (Google AdSense)</h2>
                <p>Google utiliza cookies DART para mostrar anuncios basados en intereses.</p>
            </div>
          ) : (
            <div className="space-y-6">
                <p>
                  At <strong>Emisoras Latinas</strong>, accessible from https://www.emisoraslatinas.online/radio/{resolvedParams.country},
                  one of our main priorities is the privacy of our visitors.
                </p>
                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Log Files</h2>
                <p>Standard log file information (IP, browser, ISP, date/time).</p>
                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Cookies and Web Beacons</h2>
                <p>We use cookies to store visitor preferences and optimize user experience.</p>
                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Advertising (Google AdSense)</h2>
                <p>Google uses DART cookies to serve ads based on user interests.</p>
            </div>
          )}

          <p className="text-xs text-slate-500 mt-8">
            {isSpanish ? "Última actualización: Enero 2026" : "Last updated: January 2026"}
          </p>
        </article>
      </div>
      <Footer />
    </main>
  );
}
