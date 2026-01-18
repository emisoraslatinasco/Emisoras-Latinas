import { Footer } from "@/components/layout";
import Link from "next/link";
import Image from "next/image";
import { getI18nFromCountry } from "@/utils/translations";
import { countries, CountryCode } from "@/data/stationsByCountry";
import { notFound } from "next/navigation";

export default async function ContactPage({ params }: { params: Promise<{ country: string }> }) {
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
            {isSpanish ? "Contacto" : isPortuguese ? "Contato" : "Contact"}
          </h1>

          <div className="space-y-6">
            {isSpanish ? (
              <>
                <p>
                  Si tienes preguntas, sugerencias o deseas reportar un problema, no dudes en contactarnos.
                </p>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                  <h2 className="text-xl font-semibold text-white mb-4">Correo Electrónico</h2>
                  <a href="mailto:emisoraslatinasco@gmail.com" className="text-blue-400 hover:text-blue-300 text-lg">
                    emisoraslatinasco@gmail.com
                  </a>
                </div>
              </>
            ) : isPortuguese ? (
              <>
                <p>
                  Se você tiver dúvidas, sugestões ou quiser reportar um problema, não hesite em nos contatar.
                </p>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                  <h2 className="text-xl font-semibold text-white mb-4">E-mail</h2>
                  <a href="mailto:emisoraslatinasco@gmail.com" className="text-blue-400 hover:text-blue-300 text-lg">
                    emisoraslatinasco@gmail.com
                  </a>
                </div>
              </>
            ) : (
              <>
                <p>
                  If you have questions, suggestions, or want to report an issue, feel free to contact us.
                </p>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                  <h2 className="text-xl font-semibold text-white mb-4">Email</h2>
                  <a href="mailto:emisoraslatinasco@gmail.com" className="text-blue-400 hover:text-blue-300 text-lg">
                    emisoraslatinasco@gmail.com
                  </a>
                </div>
              </>
            )}
          </div>
        </article>
      </div>
      <Footer />
    </main>
  );
}
