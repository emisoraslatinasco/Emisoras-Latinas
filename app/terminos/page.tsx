'use client';

import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/layout/footer/Footer';

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/logos_general/logo_miniatura_emisoras_latinas.jpg.png"
              alt="Emisoras Latinas"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-white font-bold text-xl">Emisoras Latinas</span>
          </Link>
          <Link href="/" className="text-slate-400 hover:text-white transition-colors">
            <i className="fas fa-arrow-left mr-2"></i>
            Volver al inicio
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            <i className="fas fa-gavel text-purple-400 mr-3"></i>
            Aviso Legal y Términos de Uso
          </h1>
          <p className="text-slate-400 mb-8">Última actualización: Enero 2025</p>

          <div className="space-y-8 text-slate-300">
            
            {/* Sección 1 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm">1</span>
                Información General
              </h2>
              <p className="leading-relaxed">
                <strong>Emisoras Latinas</strong> es un directorio de radios online que facilita el acceso a emisoras 
                de radio de todo el mundo, principalmente de Latinoamérica y países hispanohablantes. El sitio web 
                proporciona enlaces a streams de audio públicos de terceros para que los usuarios puedan escuchar 
                radio en vivo de manera gratuita.
              </p>
            </section>

            {/* Sección 2 - IMPORTANTE */}
            <section className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <i className="fas fa-exclamation-triangle text-amber-400"></i>
                Descargo de Responsabilidad sobre Contenido
              </h2>
              <div className="space-y-4">
                <p className="leading-relaxed">
                  <strong className="text-amber-200">Emisoras Latinas NO aloja, almacena ni transmite ningún contenido de audio.</strong> 
                  Nuestro servicio funciona exclusivamente como un directorio de enlaces a streams públicos 
                  proporcionados por las propias emisoras de radio o por plataformas de streaming de terceros.
                </p>
                <p className="leading-relaxed">
                  Todo el contenido de audio (música, programas, noticias, etc.) es propiedad de las respectivas 
                  emisoras de radio y está sujeto a sus propios términos de licencia y derechos de autor. 
                  Emisoras Latinas no tiene control sobre el contenido transmitido por las emisoras.
                </p>
              </div>
            </section>

            {/* Sección 3 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm">2</span>
                Derechos de Autor y DMCA
              </h2>
              <div className="space-y-4">
                <p className="leading-relaxed">
                  Respetamos la propiedad intelectual de terceros. Si eres el propietario de una emisora de radio 
                  y deseas que tu enlace sea removido de nuestro directorio, o si crees que algún contenido 
                  infringe tus derechos de autor, por favor contáctanos.
                </p>
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
                  <h3 className="text-white font-medium mb-2">📧 Solicitud de Remoción DMCA</h3>
                  <p className="text-sm mb-2">
                    Para solicitar la remoción de un enlace, envía un correo a:
                  </p>
                  <a href="mailto:emisoraslatinasco@gmail.com" className="text-blue-400 hover:underline">
                    emisoraslatinasco@gmail.com
                  </a>
                  <p className="text-sm mt-2 text-slate-400">
                    Incluye: URL del contenido, prueba de propiedad, y datos de contacto.
                  </p>
                </div>
              </div>
            </section>

            {/* Sección 4 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm">3</span>
                Uso del Sitio Web
              </h2>
              <p className="leading-relaxed mb-4">
                Al utilizar Emisoras Latinas, aceptas las siguientes condiciones:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>El servicio es gratuito y está destinado únicamente para uso personal y no comercial</li>
                <li>No debes intentar acceder a partes restringidas del sitio o interferir con su funcionamiento</li>
                <li>No debes copiar, redistribuir ni modificar el contenido del sitio sin autorización</li>
                <li>Aceptas que el sitio muestre publicidad como parte de su modelo de monetización</li>
                <li>Eres responsable de cumplir con las leyes locales respecto al uso de contenido en streaming</li>
              </ul>
            </section>

            {/* Sección 5 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm">4</span>
                Limitación de Responsabilidad
              </h2>
              <div className="space-y-4">
                <p className="leading-relaxed">
                  Emisoras Latinas no garantiza:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>La disponibilidad continua de los streams de radio (pueden cambiar o dejar de funcionar)</li>
                  <li>La calidad del audio o la ausencia de interrupciones en las transmisiones</li>
                  <li>La exactitud de la información mostrada sobre las emisoras</li>
                  <li>Que el contenido transmitido por las emisoras sea apropiado para todos los públicos</li>
                </ul>
                <p className="leading-relaxed">
                  En ningún caso Emisoras Latinas será responsable por daños directos, indirectos, incidentales 
                  o consecuentes derivados del uso del sitio.
                </p>
              </div>
            </section>

            {/* Sección 6 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm">5</span>
                Propiedad Intelectual del Sitio
              </h2>
              <p className="leading-relaxed">
                El diseño, logos, marca &quot;Emisoras Latinas&quot;, código fuente y elementos gráficos del sitio web 
                son propiedad de Emisoras Latinas y están protegidos por las leyes de propiedad intelectual. 
                Los logos de las emisoras de radio pertenecen a sus respectivos propietarios.
              </p>
            </section>

            {/* Sección 7 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm">6</span>
                Enlaces a Terceros
              </h2>
              <p className="leading-relaxed">
                Nuestro sitio contiene enlaces a sitios web y servicios de terceros (emisoras de radio, redes sociales, 
                etc.). No somos responsables del contenido, políticas de privacidad o prácticas de estos sitios externos. 
                Te recomendamos revisar los términos de cada sitio que visites.
              </p>
            </section>

            {/* Sección 8 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm">7</span>
                Modificaciones
              </h2>
              <p className="leading-relaxed">
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán 
                en vigor inmediatamente después de su publicación en el sitio. El uso continuado del servicio 
                después de cualquier modificación constituye la aceptación de los nuevos términos.
              </p>
            </section>

            {/* Sección 9 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm">8</span>
                Ley Aplicable
              </h2>
              <p className="leading-relaxed">
                Estos términos se regirán e interpretarán de acuerdo con las leyes aplicables. Cualquier disputa 
                que surja en relación con estos términos se someterá a la jurisdicción de los tribunales competentes.
              </p>
            </section>

            {/* Contacto */}
            <section className="bg-slate-700/30 rounded-lg p-6 border border-slate-600/30">
              <h2 className="text-xl font-semibold text-white mb-4">
                <i className="fas fa-envelope text-purple-400 mr-2"></i>
                Contacto Legal
              </h2>
              <p className="mb-4">
                Para cualquier consulta legal o solicitud de remoción de contenido:
              </p>
              <div className="space-y-2">
                <p><strong>Email general:</strong> <a href="mailto:emisoraslatinasco@gmail.com" className="text-blue-400 hover:underline">emisoraslatinasco@gmail.com</a></p>
                <p><strong>DMCA:</strong> <a href="mailto:emisoraslatinasco@gmail.com" className="text-blue-400 hover:underline">emisoraslatinasco@gmail.com</a></p>
              </div>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
