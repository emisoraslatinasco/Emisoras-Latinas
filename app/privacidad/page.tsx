import { Metadata } from 'next';
import { Footer } from '@/components/layout';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidad - Emisoras Latinas',
  description: 'Política de Privacidad de Emisoras Latinas. Conoce cómo protegemos tus datos personales y el uso de cookies en nuestro sitio de radio online.',
  keywords: 'política de privacidad, privacidad, cookies, datos personales, emisoras latinas',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 shadow-2xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <i className="fas fa-broadcast-tower text-white text-2xl" aria-hidden="true"></i>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Emisoras Latinas
                </p>
                <p className="text-slate-400 text-sm hidden md:block">Directorio de Radio Online</p>
              </div>
            </Link>

            {/* Navigation Menu */}
            <nav className="flex gap-6" aria-label="Navegación principal">
              <Link href="/" className="text-slate-300 hover:text-white transition-colors font-medium">
                <i className="fas fa-home mr-2"></i>Inicio
              </Link>
              <Link href="/contacto" className="text-slate-300 hover:text-white transition-colors font-medium">
                <i className="fas fa-envelope mr-2"></i>Contacto
              </Link>
              <Link href="/privacidad" className="text-blue-400 font-semibold">
                <i className="fas fa-shield-alt mr-2"></i>Privacidad
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl flex-1" role="main">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <i className="fas fa-shield-alt text-blue-500 mr-3"></i>
            Política de Privacidad
          </h1>
          <p className="text-slate-400 text-lg">
            Última actualización: 13 de diciembre de 2025
          </p>
        </div>

        {/* Privacy Policy Content */}
        <article className="glass-effect rounded-2xl p-8 md:p-12 shadow-2xl space-y-8 text-slate-200">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introducción</h2>
            <p className="leading-relaxed">
              En <strong>Emisoras Latinas</strong>, nos comprometemos a proteger tu privacidad. Esta política explica
              cómo recopilamos, usamos y protegemos tu información personal cuando utilizas nuestro sitio web de
              radio online.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Información que Recopilamos</h2>
            <p className="leading-relaxed mb-3">Podemos recopilar los siguientes tipos de información:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Información de navegación:</strong> Dirección IP, tipo de navegador, páginas visitadas, tiempo de permanencia.</li>
              <li><strong>Cookies:</strong> Utilizamos cookies para mejorar tu experiencia y mostrar publicidad relevante.</li>
              <li><strong>Información de contacto:</strong> Si nos contactas voluntariamente, recopilamos tu nombre y correo electrónico.</li>
              <li><strong>Datos de uso:</strong> Emisoras reproducidas, categorías de interés, frecuencia de visitas.</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Cómo Usamos tu Información</h2>
            <p className="leading-relaxed mb-3">Utilizamos la información recopilada para:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Mejorar la funcionalidad del sitio web y la experiencia del usuario.</li>
              <li>Personalizar el contenido y las recomendaciones de emisoras.</li>
              <li>Mostrar publicidad relevante a través de Google AdSense.</li>
              <li>Analizar el tráfico del sitio y generar estadísticas anónimas.</li>
              <li>Responder a consultas y solicitudes de soporte.</li>
              <li>Cumplir con requisitos legales y regulatorios.</li>
            </ul>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Cookies y Tecnologías de Rastreo</h2>
            <p className="leading-relaxed mb-3">
              Nuestro sitio utiliza cookies para mejorar tu experiencia. Las cookies son pequeños archivos
              de texto que se almacenan en tu dispositivo.
            </p>
            <div className="bg-slate-800/50 rounded-lg p-4 mt-4">
              <h3 className="font-semibold text-white mb-2">Tipos de Cookies que Utilizamos:</h3>
              <ul className="space-y-2">
                <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del sitio.</li>
                <li><strong>Cookies analíticas:</strong> Nos ayudan a entender cómo los usuarios interactúan con el sitio.</li>
                <li><strong>Cookies publicitarias:</strong> Utilizadas por Google AdSense para mostrar anuncios personalizados.</li>
              </ul>
            </div>
            <p className="leading-relaxed mt-4">
              Puedes desactivar las cookies en la configuración de tu navegador, aunque esto puede afectar
              algunas funcionalidades del sitio.
            </p>
          </section>

          {/* Google AdSense */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Google AdSense y Publicidad</h2>
            <p className="leading-relaxed mb-3">
              Utilizamos <strong>Google AdSense</strong> para mostrar anuncios en nuestro sitio. Google puede usar
              cookies para mostrar anuncios basados en tus visitas anteriores a nuestro sitio web u otros sitios.
            </p>
            <p className="leading-relaxed">
              Puedes desactivar el uso de cookies de Google accediendo a la{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                Configuración de anuncios de Google
              </a>.
            </p>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Compartir Información con Terceros</h2>
            <p className="leading-relaxed mb-3">
              No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto en los
              siguientes casos:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Proveedores de servicios:</strong> Google AdSense, servicios de analítica web.</li>
              <li><strong>Requisitos legales:</strong> Si la ley lo requiere o es necesario para proteger nuestros derechos.</li>
              <li><strong>Con tu consentimiento:</strong> En cualquier otro caso, solicitaremos tu permiso explícito.</li>
            </ul>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Seguridad de los Datos</h2>
            <p className="leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal
              contra acceso no autorizado, alteración, divulgación o destrucción. Sin embargo, ningún método de
              transmisión por Internet es 100% seguro.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Tus Derechos</h2>
            <p className="leading-relaxed mb-3">Tienes derecho a:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Acceder a tu información personal que tenemos almacenada.</li>
              <li>Solicitar la corrección de datos inexactos.</li>
              <li>Solicitar la eliminación de tus datos personales.</li>
              <li>Oponerte al procesamiento de tus datos.</li>
              <li>Retirar tu consentimiento en cualquier momento.</li>
            </ul>
            <p className="leading-relaxed mt-4">
              Para ejercer estos derechos, contáctanos en{' '}
              <a href="mailto:privacidad@emisoraslatinas.com" className="text-blue-400 hover:text-blue-300 underline">
                privacidad@emisoraslatinas.com
              </a>.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Privacidad de Menores</h2>
            <p className="leading-relaxed">
              Nuestro sitio web no está dirigido a menores de 13 años. No recopilamos intencionalmente información
              personal de niños. Si descubrimos que hemos recopilado información de un menor sin consentimiento
              parental, la eliminaremos de inmediato.
            </p>
          </section>

          {/* External Links */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Enlaces a Sitios Externos</h2>
            <p className="leading-relaxed">
              Nuestro sitio puede contener enlaces a sitios web de terceros (emisoras de radio, redes sociales).
              No somos responsables de las prácticas de privacidad de estos sitios. Te recomendamos leer sus
              políticas de privacidad antes de proporcionar información.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Cambios a esta Política</h2>
            <p className="leading-relaxed">
              Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos sobre cambios
              significativos publicando la nueva política en esta página con una fecha de actualización revisada.
              Te recomendamos revisar esta página periódicamente.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-blue-900/30 rounded-lg p-6 border border-blue-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">
              <i className="fas fa-envelope text-blue-400 mr-2"></i>12. Contacto
            </h2>
            <p className="leading-relaxed mb-3">
              Si tienes preguntas sobre esta política de privacidad, contáctanos:
            </p>
            <ul className="space-y-2">
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:privacidad@emisoraslatinas.com" className="text-blue-400 hover:text-blue-300 underline">
                  privacidad@emisoraslatinas.com
                </a>
              </li>
              <li><strong>Sitio web:</strong> www.emisoraslatinas.com</li>
              <li>
                <strong>Formulario de contacto:</strong>{' '}
                <Link href="/contacto" className="text-blue-400 hover:text-blue-300 underline">
                  Ir a Contacto
                </Link>
              </li>
            </ul>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
