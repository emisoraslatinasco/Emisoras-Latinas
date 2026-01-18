import { Footer } from "@/components/layout";
import Link from "next/link";
import Image from "next/image";
import { getI18nFromCountry } from "@/utils/translations";
import { countries, CountryCode } from "@/data/stationsByCountry";
import { notFound } from "next/navigation";

export default async function TermsPage({ params }: { params: Promise<{ country: string }> }) {
  const resolvedParams = await params;
  const { lang } = getI18nFromCountry(resolvedParams.country as CountryCode);
  const country = countries.find(c => c.code === resolvedParams.country.toUpperCase());
  
  if (!country) return notFound();

  const isSpanish = lang === 'es';
  const isPortuguese = lang === 'pt';

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
            {isSpanish ? "Volver" : isPortuguese ? "Voltar" : "Back"}
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="glass-effect rounded-2xl p-8 md:p-12 shadow-2xl text-slate-300">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 border-b border-slate-700 pb-4">
            {isSpanish ? "Términos de Uso" : isPortuguese ? "Termos de Uso" : "Terms of Use"}
          </h1>

          <div className="space-y-6">
            {isSpanish ? (
              <>
                <p>Al utilizar <strong>Emisoras Latinas</strong>, aceptas los siguientes términos y condiciones.</p>
                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Uso del Servicio</h2>
                <p>El servicio es gratuito y está destinado solo para uso personal y no comercial.</p>
                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Contenido</h2>
                <p>Las emisoras de radio son propiedad de sus respectivos dueños. No almacenamos ni distribuimos contenido de audio.</p>
              </>
            ) : isPortuguese ? (
              <>
                <p>Ao utilizar <strong>Emisoras Latinas</strong>, você aceita os seguintes termos e condições.</p>
                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Uso do Serviço</h2>
                <p>O serviço é gratuito e destina-se apenas para uso pessoal e não comercial.</p>
                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Conteúdo</h2>
                <p>As estações de rádio são propriedade de seus respectivos donos. Não armazenamos nem distribuímos conteúdo de áudio.</p>
              </>
            ) : (
              <>
                <p>By using <strong>Emisoras Latinas</strong>, you agree to the following terms and conditions.</p>
                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Use of Service</h2>
                <p>The service is free and intended for personal, non-commercial use only.</p>
                <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Content</h2>
                <p>Radio stations are property of their respective owners. We do not store or distribute audio content.</p>
              </>
            )}
          </div>
        </article>
      </div>
      <Footer />
    </main>
  );
}
