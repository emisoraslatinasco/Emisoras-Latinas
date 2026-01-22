import { Footer } from "@/components/layout";
import Link from "next/link";
import Image from "next/image";
import { getI18nFromCountry } from "@/utils/translations";
import { countries, CountryCode } from "@/data/stationsByCountry";
import { notFound } from "next/navigation";

export default async function AboutPage({ params }: { params: Promise<{ country: string }> }) {
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
              src="/logos_general/logo_miniatura_emisoras_latinas.jpg"
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
            {isSpanish ? "Quiénes Somos" : isPortuguese ? "Quem Somos" : "About Us"}
          </h1>

          <div className="space-y-6">
            {isSpanish ? (
              <>
                <p>
                  <strong>Emisoras Latinas</strong> es el directorio de radio online más completo de Latinoamérica y países de habla hispana.
                  Nuestra misión es conectar a millones de oyentes con sus emisoras favoritas sin interrupciones, sin publicidad intrusiva
                  y con la mejor calidad de streaming.
                </p>
                <p>
                  Ofrecemos más de 20,000 emisoras de radio en vivo de países como Colombia, México, Argentina, España, Estados Unidos,
                  Brasil, Francia, y muchos más. Nuestro reproductor premium permite escuchar radio mientras navegas, sin cortes ni buffering.
                </p>
              </>
            ) : isPortuguese ? (
              <>
                <p>
                  <strong>Emisoras Latinas</strong> é o diretório de rádio online mais completo da América Latina e países de língua espanhola.
                  Nossa missão é conectar milhões de ouvintes às suas emissoras favoritas sem interrupções, sem publicidade invasiva
                  e com a melhor qualidade de streaming.
                </p>
                <p>
                  Oferecemos mais de 20.000 emissoras de rádio ao vivo de países como Colômbia, México, Argentina, Espanha, Estados Unidos,
                  Brasil, França e muitos mais. Nosso player premium permite ouvir rádio enquanto navega, sem cortes ou buffering.
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>Emisoras Latinas</strong> is the most complete online radio directory in Latin America and Spanish-speaking countries.
                  Our mission is to connect millions of listeners with their favorite stations without interruptions, without intrusive ads,
                  and with the best streaming quality.
                </p>
                <p>
                  We offer over 20,000 live radio stations from countries like Colombia, Mexico, Argentina, Spain, United States,
                  Brazil, France, and many more. Our premium player lets you listen to radio while browsing, without cuts or buffering.
                </p>
              </>
            )}
          </div>
        </article>
      </div>
      <Footer />
    </main>
  );
}
