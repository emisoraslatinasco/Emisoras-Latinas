'use client';

import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/layout/footer/Footer';

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/logos_general/logo_miniatura_emisoras_latinas.jpg"
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
            <i className="fas fa-cookie-bite text-amber-400 mr-3"></i>
            Política de Cookies
          </h1>
          <p className="text-slate-400 mb-8">Última actualización: Enero 2025</p>

          <div className="space-y-8 text-slate-300">
            
            {/* Sección 1 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm">1</span>
                ¿Qué son las Cookies?
              </h2>
              <p className="leading-relaxed">
                Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo (ordenador, 
                tablet o móvil) cuando los visitas. Estas cookies permiten al sitio web recordar tus acciones y 
                preferencias (como idioma, tamaño de fuente, país seleccionado y otras preferencias de visualización) 
                durante un período de tiempo, para que no tengas que volver a configurarlas cada vez que regreses al sitio.
              </p>
            </section>

            {/* Sección 2 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm">2</span>
                Tipos de Cookies que Utilizamos
              </h2>
              
              <div className="space-y-4">
                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
                  <h3 className="text-white font-medium mb-2">🔧 Cookies Esenciales</h3>
                  <p className="text-sm">
                    Son necesarias para el funcionamiento básico del sitio. Incluyen cookies que recuerdan 
                    tu país seleccionado, preferencias de volumen y estado del reproductor de audio.
                  </p>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
                  <h3 className="text-white font-medium mb-2">📊 Cookies Analíticas (Google Analytics)</h3>
                  <p className="text-sm">
                    Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web, recopilando 
                    información de forma anónima. Esto nos permite mejorar continuamente la experiencia del usuario.
                  </p>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
                  <h3 className="text-white font-medium mb-2">📢 Cookies Publicitarias (Google AdSense)</h3>
                  <p className="text-sm">
                    Google AdSense utiliza cookies para mostrar anuncios relevantes basados en tus intereses 
                    y tu historial de navegación. Estas cookies son gestionadas por Google y están sujetas a 
                    su <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Política de Privacidad</a>.
                  </p>
                </div>
              </div>
            </section>

            {/* Sección 3 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm">3</span>
                Cookies de Terceros
              </h2>
              <p className="leading-relaxed mb-4">
                Además de nuestras propias cookies, utilizamos servicios de terceros que pueden establecer sus propias cookies:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Google AdSense:</strong> Para mostrar anuncios personalizados</li>
                <li><strong>Google Analytics:</strong> Para análisis de tráfico web</li>
                <li><strong>Proveedores de streaming:</strong> Las emisoras de radio pueden usar sus propias cookies</li>
              </ul>
            </section>

            {/* Sección 4 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm">4</span>
                Control de Cookies
              </h2>
              <p className="leading-relaxed mb-4">
                Puedes controlar y/o eliminar las cookies según tus preferencias. Puedes eliminar todas las cookies 
                que ya están en tu dispositivo y configurar la mayoría de los navegadores para que no las acepten. 
                Sin embargo, si lo haces, es posible que tengas que ajustar manualmente algunas preferencias cada 
                vez que visites el sitio.
              </p>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-200 text-sm">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  <strong>Nota:</strong> Desactivar ciertas cookies puede afectar la funcionalidad del sitio 
                  y tu experiencia de navegación.
                </p>
              </div>
            </section>

            {/* Sección 5 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm">5</span>
                Cómo Gestionar las Cookies en tu Navegador
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" 
                   className="bg-slate-700/30 rounded-lg p-4 text-center hover:bg-slate-700/50 transition-colors">
                  <i className="fab fa-chrome text-2xl text-blue-400 mb-2"></i>
                  <p className="text-sm">Chrome</p>
                </a>
                <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web" target="_blank" rel="noopener noreferrer"
                   className="bg-slate-700/30 rounded-lg p-4 text-center hover:bg-slate-700/50 transition-colors">
                  <i className="fab fa-firefox text-2xl text-orange-400 mb-2"></i>
                  <p className="text-sm">Firefox</p>
                </a>
                <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer"
                   className="bg-slate-700/30 rounded-lg p-4 text-center hover:bg-slate-700/50 transition-colors">
                  <i className="fab fa-safari text-2xl text-blue-300 mb-2"></i>
                  <p className="text-sm">Safari</p>
                </a>
                <a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer"
                   className="bg-slate-700/30 rounded-lg p-4 text-center hover:bg-slate-700/50 transition-colors">
                  <i className="fab fa-edge text-2xl text-cyan-400 mb-2"></i>
                  <p className="text-sm">Edge</p>
                </a>
              </div>
            </section>

            {/* Sección 6 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm">6</span>
                Más Información
              </h2>
              <p className="leading-relaxed">
                Para más información sobre cómo Google utiliza los datos cuando usas sitios web de sus socios, 
                visita: <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  policies.google.com/technologies/partner-sites
                </a>
              </p>
            </section>

            {/* Contacto */}
            <section className="bg-slate-700/30 rounded-lg p-6 border border-slate-600/30">
              <h2 className="text-xl font-semibold text-white mb-4">
                <i className="fas fa-envelope text-blue-400 mr-2"></i>
                ¿Tienes preguntas?
              </h2>
              <p className="mb-4">
                Si tienes alguna pregunta sobre nuestra política de cookies, no dudes en contactarnos:
              </p>
              <a href="mailto:emisoraslatinasco@gmail.com" className="text-blue-400 hover:underline">
                emisoraslatinasco@gmail.com
              </a>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
