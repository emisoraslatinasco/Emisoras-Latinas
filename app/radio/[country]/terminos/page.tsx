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
    title: lang === 'es' ? "Términos de Uso | Emisoras Latinas" : 
           lang === 'pt' ? "Termos de Uso | Emisoras Latinas" : 
           "Terms of Use | Emisoras Latinas",
    description: lang === 'es' 
      ? "Términos y condiciones de uso de Emisoras Latinas. Reglas del servicio, limitaciones y derechos de autor."
      : lang === 'pt'
      ? "Termos e condições de uso da Emisoras Latinas. Regras do serviço, limitações e direitos autorais."
      : "Terms and conditions for using Emisoras Latinas. Service rules, limitations, and copyrights.",
    robots: { index: true, follow: true },
  };
}

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
              src="/logos_general/logo_miniatura_emisoras_latinas.jpg"
              alt="Emisoras Latinas"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-white font-bold text-xl">Emisoras Latinas</span>
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

          {isSpanish ? (
            <div className="space-y-6 leading-relaxed">
              <p>
                Bienvenido a <strong>Emisoras Latinas</strong>. Al acceder y utilizar nuestro sitio web
                (https://www.emisoraslatinas.online), aceptas cumplir con estos términos y condiciones.
                Por favor, léelos cuidadosamente antes de usar nuestros servicios.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Aceptación de los Términos</h2>
              <p>
                Al acceder a este sitio web, confirmas que tienes al menos 13 años de edad y que aceptas
                estar legalmente vinculado a estos términos. Si no estás de acuerdo con alguna parte de
                estos términos, no debes utilizar nuestro sitio.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Descripción del Servicio</h2>
              <p>
                Emisoras Latinas es un directorio de radio online que proporciona acceso gratuito a
                transmisiones de radio en vivo de América Latina y otras regiones. Nuestro servicio:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Permite escuchar emisoras de radio en streaming</li>
                <li>Proporciona información sobre estaciones de radio</li>
                <li>Ofrece funciones de búsqueda y filtrado por país, género y ciudad</li>
                <li>Es completamente gratuito para los usuarios</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Uso Permitido</h2>
              <p>Te comprometes a usar este sitio únicamente para fines legales y de manera que no:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Infrinja los derechos de terceros</li>
                <li>Sea fraudulenta, ilegal o dañina</li>
                <li>Interfiera con el funcionamiento normal del sitio</li>
                <li>Intente acceder a áreas restringidas del servidor</li>
                <li>Utilice bots o scripts automatizados para extraer datos masivamente</li>
                <li>Redistribuya el contenido sin autorización</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Propiedad Intelectual</h2>
              <p>
                El contenido de audio transmitido a través de este sitio es propiedad de las respectivas
                emisoras de radio y sus propietarios. Emisoras Latinas no reclama propiedad sobre el
                contenido de audio ni lo almacena en sus servidores.
              </p>
              <p className="mt-4">
                El diseño del sitio, logotipos, gráficos y código fuente son propiedad de Emisoras Latinas
                y están protegidos por las leyes de propiedad intelectual aplicables.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Enlaces a Terceros</h2>
              <p>
                Nuestro sitio contiene enlaces a sitios web de terceros (emisoras de radio, redes sociales, etc.).
                Estos enlaces se proporcionan únicamente para tu conveniencia. No tenemos control sobre el contenido
                de estos sitios externos y no somos responsables de ellos.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. Disponibilidad del Servicio</h2>
              <p>
                Nos esforzamos por mantener el sitio disponible 24/7, pero no garantizamos disponibilidad
                ininterrumpida. El servicio puede verse afectado por:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Mantenimiento programado o de emergencia</li>
                <li>Problemas técnicos en los servidores de las emisoras</li>
                <li>Factores fuera de nuestro control (conectividad de Internet, etc.)</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">7. Limitación de Responsabilidad</h2>
              <p>
                Emisoras Latinas se proporciona "tal cual" y "según disponibilidad". No ofrecemos garantías
                expresas o implícitas sobre la precisión, confiabilidad o disponibilidad del servicio.
                No seremos responsables por daños directos, indirectos, incidentales o consecuentes derivados
                del uso o la imposibilidad de uso de nuestro servicio.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">8. Modificaciones de los Términos</h2>
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios
                entrarán en vigor inmediatamente después de su publicación en esta página. El uso continuado
                del sitio después de cualquier cambio constituye tu aceptación de los nuevos términos.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">9. Ley Aplicable</h2>
              <p>
                Estos términos se rigen por las leyes de Colombia. Cualquier disputa se resolverá
                en los tribunales competentes de Colombia.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">10. Contacto</h2>
              <p>
                Para preguntas sobre estos términos, contáctanos en:{" "}
                <a href="mailto:emisoraslatinasco@gmail.com" className="text-blue-400 hover:text-blue-300">
                  emisoraslatinasco@gmail.com
                </a>
              </p>
            </div>
          ) : isPortuguese ? (
            <div className="space-y-6 leading-relaxed">
              <p>
                Bem-vindo à <strong>Emisoras Latinas</strong>. Ao acessar e usar nosso site
                (https://www.emisoraslatinas.online), você concorda em cumprir estes termos e condições.
                Por favor, leia-os com atenção antes de usar nossos serviços.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Aceitação dos Termos</h2>
              <p>
                Ao acessar este site, você confirma que tem pelo menos 13 anos de idade e que concorda
                em estar legalmente vinculado a estes termos. Se você não concordar com qualquer parte
                destes termos, não deve usar nosso site.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Descrição do Serviço</h2>
              <p>
                Emisoras Latinas é um diretório de rádio online que fornece acesso gratuito a
                transmissões de rádio ao vivo da América Latina e outras regiões. Nosso serviço:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Permite ouvir estações de rádio em streaming</li>
                <li>Fornece informações sobre estações de rádio</li>
                <li>Oferece funções de busca e filtro por país, gênero e cidade</li>
                <li>É completamente gratuito para os usuários</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Uso Permitido</h2>
              <p>Você concorda em usar este site apenas para fins legais e de maneira que não:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Viole os direitos de terceiros</li>
                <li>Seja fraudulenta, ilegal ou prejudicial</li>
                <li>Interfira no funcionamento normal do site</li>
                <li>Tente acessar áreas restritas do servidor</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Propriedade Intelectual</h2>
              <p>
                O conteúdo de áudio transmitido através deste site é propriedade das respectivas
                estações de rádio e seus proprietários. Emisoras Latinas não reivindica propriedade
                sobre o conteúdo de áudio.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Limitação de Responsabilidade</h2>
              <p>
                Emisoras Latinas é fornecido "como está" e "conforme disponível". Não oferecemos garantias
                expressas ou implícitas sobre a precisão, confiabilidade ou disponibilidade do serviço.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. Contato</h2>
              <p>
                Para dúvidas sobre estes termos, entre em contato:{" "}
                <a href="mailto:emisoraslatinasco@gmail.com" className="text-blue-400 hover:text-blue-300">
                  emisoraslatinasco@gmail.com
                </a>
              </p>
            </div>
          ) : (
            <div className="space-y-6 leading-relaxed">
              <p>
                Welcome to <strong>Emisoras Latinas</strong>. By accessing and using our website
                (https://www.emisoraslatinas.online), you agree to comply with these terms and conditions.
                Please read them carefully before using our services.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing this website, you confirm that you are at least 13 years old and agree
                to be legally bound by these terms. If you do not agree with any part of these terms,
                you should not use our site.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Description of Service</h2>
              <p>
                Emisoras Latinas is an online radio directory that provides free access to live radio
                broadcasts from Latin America and other regions. Our service:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Allows streaming of radio stations</li>
                <li>Provides information about radio stations</li>
                <li>Offers search and filter functions by country, genre, and city</li>
                <li>Is completely free for users</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Permitted Use</h2>
              <p>You agree to use this site only for lawful purposes and in a manner that does not:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Infringe the rights of third parties</li>
                <li>Be fraudulent, illegal, or harmful</li>
                <li>Interfere with the normal operation of the site</li>
                <li>Attempt to access restricted areas of the server</li>
                <li>Use bots or automated scripts to extract data</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Intellectual Property</h2>
              <p>
                Audio content streamed through this site is the property of respective radio stations
                and their owners. Emisoras Latinas does not claim ownership of audio content and does
                not store it on its servers.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Third-Party Links</h2>
              <p>
                Our site contains links to third-party websites (radio stations, social media, etc.).
                These links are provided for your convenience only. We have no control over these
                external sites and are not responsible for them.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. Limitation of Liability</h2>
              <p>
                Emisoras Latinas is provided "as is" and "as available". We make no express or implied
                warranties regarding the accuracy, reliability, or availability of the service.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">7. Contact</h2>
              <p>
                For questions about these terms, contact us at:{" "}
                <a href="mailto:emisoraslatinasco@gmail.com" className="text-blue-400 hover:text-blue-300">
                  emisoraslatinasco@gmail.com
                </a>
              </p>
            </div>
          )}

          <p className="text-xs text-slate-500 mt-8 pt-4 border-t border-slate-700">
            {isSpanish ? "Última actualización: Enero 2026" : isPortuguese ? "Última atualização: Janeiro 2026" : "Last updated: January 2026"}
          </p>
        </article>
      </div>
      <Footer />
    </main>
  );
}
