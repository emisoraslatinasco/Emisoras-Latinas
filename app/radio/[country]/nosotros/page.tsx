import { Footer } from "@/components/layout";
import Link from "next/link";
import Image from "next/image";
import { getI18nFromCountry } from "@/utils/translations";
import { countries, CountryCode } from "@/data/stationsByCountry";
import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { getHreflangFromCountry } from "@/utils/hreflang";

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { lang } = getI18nFromCountry(resolvedParams.country as CountryCode);
  const country = countries.find(c => c.code === resolvedParams.country.toUpperCase());
  const countryName = country?.name || resolvedParams.country.toUpperCase();
  return {
    title: lang === 'es' ? `Quiénes Somos · ${countryName} | Emisoras Latinas` :
           lang === 'pt' ? `Quem Somos · ${countryName} | Emisoras Latinas` :
           lang === 'fr' ? `À Propos · ${countryName} | Emisoras Latinas` :
           `About Us · ${countryName} | Emisoras Latinas`,
    description: lang === 'es'
      ? `Conoce Emisoras Latinas, el directorio de radio online más completo de ${countryName}. +20.000 emisoras gratis, sin cortes, streaming 24/7.`
      : lang === 'pt'
      ? `Conheça a Emisoras Latinas, o diretório de rádio online mais completo da ${countryName}. +20.000 emissoras grátis, sem cortes, streaming 24/7.`
      : `Discover Emisoras Latinas, the most complete online radio directory in ${countryName}. +20,000 free stations, no interruptions, 24/7 streaming.`,
    alternates: {
      canonical: `/radio/${resolvedParams.country}/nosotros`,
      languages: {
        [getHreflangFromCountry(resolvedParams.country)]: `/radio/${resolvedParams.country}/nosotros`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ country: string }> }) {
  const resolvedParams = await params;
  const { lang } = getI18nFromCountry(resolvedParams.country as CountryCode);
  const country = countries.find(c => c.code === resolvedParams.country.toUpperCase());
  
  if (!country) return notFound();

  const isSpanish = lang === 'es';
  const isPortuguese = lang === 'pt';

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: "https://www.emisoraslatinas.online" },
          { name: country.name, url: `https://www.emisoraslatinas.online/radio/${resolvedParams.country}` },
          { name: isSpanish ? "Quiénes Somos" : isPortuguese ? "Quem Somos" : "About Us", url: `https://www.emisoraslatinas.online/radio/${resolvedParams.country}/nosotros` },
        ]}
      />
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
        <nav className="text-sm text-slate-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-400">{isSpanish ? "Inicio" : isPortuguese ? "Início" : "Home"}</Link>
          <i className="fas fa-chevron-right text-xs"></i>
          <Link href={`/radio/${resolvedParams.country}`} className="hover:text-blue-400">{country.name}</Link>
          <i className="fas fa-chevron-right text-xs"></i>
          <span className="text-white">{isSpanish ? "Quiénes Somos" : isPortuguese ? "Quem Somos" : "About Us"}</span>
        </nav>
        <article className="glass-effect rounded-2xl p-8 md:p-12 shadow-2xl text-slate-300">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 border-b border-slate-700 pb-4">
            {isSpanish ? "Quiénes Somos" : isPortuguese ? "Quem Somos" : "About Us"}
          </h1>

          <div className="space-y-6">
            {isSpanish ? (
              <>
                <p>
                  <strong>Emisoras Latinas</strong> es el directorio de radio online más completo de Latinoamérica y países de habla hispana.
                  Nuestra misión es conectar a millones de oyentes con sus emisoras favoritas sin interrupciones, con la mejor calidad de
                  streaming y una experiencia limpia y moderna.
                </p>
                <p>
                  Actualmente ofrecemos más de <strong>21,000 emisoras de radio en vivo</strong> de {country.name} y más de 30 países
                  incluyendo Colombia, México, Argentina, España, Estados Unidos, Brasil, Francia, Perú, Chile, Ecuador, Venezuela,
                  y muchos más. Nuestro reproductor premium integrado permite escuchar radio mientras navegas, sin cortes ni buffering.
                </p>
                <h2 className="text-xl font-bold text-white mt-8 mb-3">Nuestra historia</h2>
                <p>
                  Emisoras Latinas nació con la idea de centralizar en un solo lugar todas las emisoras de radio de Latinoamérica.
                  Lo que comenzó como un proyecto pequeño con estaciones de Colombia se ha expandido a más de 30 países, convirtiéndose
                  en el directorio de radio online hispano más grande del mundo.
                </p>
                <h2 className="text-xl font-bold text-white mt-8 mb-3">¿Cómo funciona?</h2>
                <p>
                  Selecciona tu país en el selector, elige cualquier emisora de la lista y haz clic en reproducir. El audio comienza
                  en menos de 2 segundos. Puedes seguir navegando por el catálogo sin que la música se detenga. Todo desde el navegador,
                  sin necesidad de instalar apps ni registrarte.
                </p>
                <h2 className="text-xl font-bold text-white mt-8 mb-3">Nuestro compromiso</h2>
                <p>
                  Trabajamos constantemente para mantener actualizado nuestro catálogo de emisoras, verificar que los streams funcionen
                  correctamente y ofrecer la mejor experiencia de usuario posible. Si encuentras una emisora que no funciona, puedes
                  reportarla desde el botón de la página de reproducción y la revisaremos.
                </p>
              </>
            ) : isPortuguese ? (
              <>
                <p>
                  <strong>Emisoras Latinas</strong> é o diretório de rádio online mais completo da América Latina e países de língua espanhola.
                  Nossa missão é conectar milhões de ouvintes às suas emissoras favoritas sem interrupções, com a melhor qualidade de
                  streaming e uma experiência limpa e moderna.
                </p>
                <p>
                  Atualmente oferecemos mais de <strong>21.000 emissoras de rádio ao vivo</strong> de {country.name} e mais de 30 países
                  incluindo Colômbia, México, Argentina, Espanha, Estados Unidos, Brasil, França, Peru, Chile, Equador, Venezuela,
                  e muitos mais. Nosso player premium integrado permite ouvir rádio enquanto navega, sem cortes ou buffering.
                </p>
                <h2 className="text-xl font-bold text-white mt-8 mb-3">Nossa história</h2>
                <p>
                  A Emisoras Latinas nasceu com a ideia de centralizar em um só lugar todas as emissoras de rádio da América Latina.
                  O que começou como um pequeno projeto com estações da Colômbia se expandiu para mais de 30 países, tornando-se
                  o maior diretório de rádio online hispânico do mundo.
                </p>
                <h2 className="text-xl font-bold text-white mt-8 mb-3">Como funciona?</h2>
                <p>
                  Selecione seu país no seletor, escolha qualquer emissora da lista e clique em reproduzir. O áudio começa em menos
                  de 2 segundos. Você pode continuar navegando pelo catálogo sem que a música pare. Tudo pelo navegador, sem precisar
                  instalar aplicativos ou se registrar.
                </p>
                <h2 className="text-xl font-bold text-white mt-8 mb-3">Nosso compromisso</h2>
                <p>
                  Trabalhamos constantemente para manter nosso catálogo de emissoras atualizado, verificar se os streams funcionam
                  corretamente e oferecer a melhor experiência de usuário possível. Se encontrar uma emissora que não funciona, você
                  pode reportá-la pelo botão na página de reprodução e a revisaremos.
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>Emisoras Latinas</strong> is the most complete online radio directory in Latin America and Spanish-speaking countries.
                  Our mission is to connect millions of listeners with their favorite stations without interruptions, with the best streaming
                  quality and a clean, modern experience.
                </p>
                <p>
                  We currently offer over <strong>21,000 live radio stations</strong> from {country.name} and more than 30 countries
                  including Colombia, Mexico, Argentina, Spain, the United States, Brazil, France, Peru, Chile, Ecuador, Venezuela,
                  and many more. Our integrated premium player lets you listen to radio while browsing, without cuts or buffering.
                </p>
                <h2 className="text-xl font-bold text-white mt-8 mb-3">Our story</h2>
                <p>
                  Emisoras Latinas was born with the idea of centralizing all Latin American radio stations in one place. What started
                  as a small project with Colombian stations has expanded to over 30 countries, becoming the largest Hispanic online
                  radio directory in the world.
                </p>
                <h2 className="text-xl font-bold text-white mt-8 mb-3">How it works</h2>
                <p>
                  Select your country from the selector, choose any station from the list and click play. The audio starts in less than
                  2 seconds. You can continue browsing the catalog without the music stopping. All from the browser, no app installation
                  or registration needed.
                </p>
                <h2 className="text-xl font-bold text-white mt-8 mb-3">Our commitment</h2>
                <p>
                  We constantly work to keep our station catalog updated, verify that streams work correctly, and offer the best possible
                  user experience. If you find a station that isn't working, you can report it using the button on the playback page
                  and we'll review it.
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
