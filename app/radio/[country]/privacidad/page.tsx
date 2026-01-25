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
    title: lang === 'es' ? "Política de Privacidad | Emisoras Latinas" : 
           lang === 'pt' ? "Política de Privacidade | Emisoras Latinas" : 
           "Privacy Policy | Emisoras Latinas",
    description: lang === 'es' 
      ? "Política de privacidad de Emisoras Latinas. Información sobre el uso de cookies, datos personales y publicidad."
      : lang === 'pt'
      ? "Política de privacidade da Emisoras Latinas. Informações sobre cookies, dados pessoais e publicidade."
      : "Privacy policy for Emisoras Latinas. Information about cookies, personal data, and advertising.",
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ country: string }> }) {
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
            {isSpanish ? "Política de Privacidad" : isPortuguese ? "Política de Privacidade" : "Privacy Policy"}
          </h1>

          {isSpanish ? (
            <div className="space-y-6 leading-relaxed">
              <p>
                En <strong>Emisoras Latinas</strong>, accesible desde https://www.emisoraslatinas.online,
                una de nuestras principales prioridades es la privacidad de nuestros visitantes. Este documento
                de Política de Privacidad contiene los tipos de información que se recopilan y registran por
                Emisoras Latinas y cómo la utilizamos.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Información que Recopilamos</h2>
              <p>
                Cuando visitas nuestro sitio web, podemos recopilar cierta información automáticamente, incluyendo:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Tu dirección IP (Internet Protocol)</li>
                <li>Tipo y versión de navegador</li>
                <li>Proveedor de servicios de Internet (ISP)</li>
                <li>Fecha y hora de acceso</li>
                <li>Páginas visitadas dentro de nuestro sitio</li>
                <li>Dispositivo y sistema operativo utilizado</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Cookies y Tecnologías de Seguimiento</h2>
              <p>
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio. Las cookies
                son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web.
              </p>
              <p className="mt-4">Tipos de cookies que utilizamos:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del sitio.</li>
                <li><strong>Cookies de preferencias:</strong> Para recordar tus configuraciones y preferencias de audio.</li>
                <li><strong>Cookies analíticas:</strong> Para entender cómo los usuarios interactúan con nuestro sitio.</li>
                <li><strong>Cookies publicitarias:</strong> Utilizadas por nuestros socios publicitarios para mostrar anuncios relevantes.</li>
              </ul>
              <p className="mt-4">
                Puedes configurar tu navegador para rechazar todas las cookies o para indicar cuándo se envía una cookie.
                Sin embargo, algunas funciones del sitio pueden no funcionar correctamente sin cookies.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Google AdSense y Publicidad</h2>
              <p>
                Nuestro sitio utiliza Google AdSense para mostrar anuncios. Google, como proveedor de publicidad externo,
                utiliza cookies para publicar anuncios en nuestro sitio. El uso de la cookie DART por parte de Google
                le permite mostrar anuncios a nuestros usuarios en función de su visita a nuestro sitio y a otros sitios
                de Internet.
              </p>
              <p className="mt-4">
                Los usuarios pueden optar por no utilizar la cookie DART visitando la página de política de privacidad
                de la red de contenido y anuncios de Google en{" "}
                <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  https://policies.google.com/technologies/ads
                </a>.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Terceros y Servicios Externos</h2>
              <p>
                Nuestro sitio puede contener enlaces a sitios web externos de las emisoras de radio. No somos responsables
                de las prácticas de privacidad de estos sitios externos. Te recomendamos revisar las políticas de privacidad
                de cada sitio que visites.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Derechos del Usuario (GDPR/CCPA)</h2>
              <p>Si resides en la Unión Europea o California, tienes los siguientes derechos:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Derecho a acceder a tus datos personales</li>
                <li>Derecho a rectificar datos inexactos</li>
                <li>Derecho a solicitar la eliminación de tus datos</li>
                <li>Derecho a restringir u oponerse al procesamiento</li>
                <li>Derecho a la portabilidad de datos</li>
                <li>Derecho a retirar el consentimiento en cualquier momento</li>
              </ul>
              <p className="mt-4">
                Para ejercer cualquiera de estos derechos, contáctanos en{" "}
                <a href="mailto:emisoraslatinasco@gmail.com" className="text-blue-400 hover:text-blue-300">
                  emisoraslatinasco@gmail.com
                </a>.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. Seguridad de la Información</h2>
              <p>
                Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tu información
                personal contra acceso no autorizado, alteración, divulgación o destrucción. Sin embargo, ningún método
                de transmisión por Internet es 100% seguro.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">7. Cambios a Esta Política</h2>
              <p>
                Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Te notificaremos
                sobre cualquier cambio publicando la nueva política en esta página. Los cambios entran en vigor inmediatamente
                después de su publicación.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">8. Contacto</h2>
              <p>
                Si tienes preguntas sobre esta política de privacidad, puedes contactarnos en:{" "}
                <a href="mailto:emisoraslatinasco@gmail.com" className="text-blue-400 hover:text-blue-300">
                  emisoraslatinasco@gmail.com
                </a>
              </p>
            </div>
          ) : isPortuguese ? (
            <div className="space-y-6 leading-relaxed">
              <p>
                Na <strong>Emisoras Latinas</strong>, acessível em https://www.emisoraslatinas.online,
                uma de nossas principais prioridades é a privacidade de nossos visitantes. Este documento
                de Política de Privacidade contém os tipos de informações que são coletadas e registradas pela
                Emisoras Latinas e como as utilizamos.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Informações que Coletamos</h2>
              <p>Quando você visita nosso site, podemos coletar automaticamente certas informações, incluindo:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Seu endereço IP (Internet Protocol)</li>
                <li>Tipo e versão do navegador</li>
                <li>Provedor de serviços de Internet (ISP)</li>
                <li>Data e hora de acesso</li>
                <li>Páginas visitadas em nosso site</li>
                <li>Dispositivo e sistema operacional utilizados</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Cookies e Tecnologias de Rastreamento</h2>
              <p>
                Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site. Cookies
                são pequenos arquivos de texto armazenados em seu dispositivo quando você visita nosso site.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li><strong>Cookies essenciais:</strong> Necessários para o funcionamento básico do site.</li>
                <li><strong>Cookies de preferências:</strong> Para lembrar suas configurações e preferências de áudio.</li>
                <li><strong>Cookies analíticos:</strong> Para entender como os usuários interagem com nosso site.</li>
                <li><strong>Cookies publicitários:</strong> Usados por nossos parceiros de publicidade para exibir anúncios relevantes.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Google AdSense e Publicidade</h2>
              <p>
                Nosso site usa o Google AdSense para exibir anúncios. O Google, como fornecedor de publicidade externo,
                usa cookies para veicular anúncios em nosso site. O uso do cookie DART pelo Google permite que ele
                exiba anúncios com base na visita ao nosso site e a outros sites na Internet.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Seus Direitos (LGPD)</h2>
              <p>De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Confirmar a existência de tratamento de dados</li>
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos ou desatualizados</li>
                <li>Solicitar a anonimização ou eliminação de dados desnecessários</li>
                <li>Solicitar a portabilidade de dados</li>
                <li>Revogar o consentimento a qualquer momento</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Contato</h2>
              <p>
                Para dúvidas sobre esta política, entre em contato:{" "}
                <a href="mailto:emisoraslatinasco@gmail.com" className="text-blue-400 hover:text-blue-300">
                  emisoraslatinasco@gmail.com
                </a>
              </p>
            </div>
          ) : (
            <div className="space-y-6 leading-relaxed">
              <p>
                At <strong>Emisoras Latinas</strong>, accessible from https://www.emisoraslatinas.online,
                one of our main priorities is the privacy of our visitors. This Privacy Policy document contains
                the types of information that are collected and recorded by Emisoras Latinas and how we use it.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Information We Collect</h2>
              <p>When you visit our website, we may automatically collect certain information, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your IP (Internet Protocol) address</li>
                <li>Browser type and version</li>
                <li>Internet Service Provider (ISP)</li>
                <li>Date and time of access</li>
                <li>Pages visited within our site</li>
                <li>Device and operating system used</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar technologies to enhance your experience on our site. Cookies are small
                text files stored on your device when you visit our website.
              </p>
              <p className="mt-4">Types of cookies we use:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Essential cookies:</strong> Required for basic site functionality.</li>
                <li><strong>Preference cookies:</strong> To remember your settings and audio preferences.</li>
                <li><strong>Analytics cookies:</strong> To understand how users interact with our site.</li>
                <li><strong>Advertising cookies:</strong> Used by our advertising partners to display relevant ads.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Google AdSense and Advertising</h2>
              <p>
                Our site uses Google AdSense to display advertisements. Google, as a third-party advertising provider,
                uses cookies to serve ads on our site. Google&apos;s use of the DART cookie enables it to serve ads based
                on visits to our site and other sites on the Internet.
              </p>
              <p className="mt-4">
                Users may opt out of the DART cookie by visiting Google&apos;s ad and content network privacy policy at{" "}
                <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  https://policies.google.com/technologies/ads
                </a>.
              </p>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. User Rights (GDPR/CCPA)</h2>
              <p>If you reside in the European Union or California, you have the following rights:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Right to access your personal data</li>
                <li>Right to rectify inaccurate data</li>
                <li>Right to request deletion of your data</li>
                <li>Right to restrict or object to processing</li>
                <li>Right to data portability</li>
                <li>Right to withdraw consent at any time</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Contact</h2>
              <p>
                For questions about this privacy policy, contact us at:{" "}
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
