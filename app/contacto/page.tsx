import { Metadata } from 'next';
import { Footer } from '@/components/layout';
import ContactForm from '@/components/contact/ContactForm';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contacto - Emisoras Latinas',
  description: 'Contáctanos - Emisoras Latinas. Envíanos tus preguntas, sugerencias o reporta problemas con nuestro servicio de radio online.',
  keywords: 'contacto, soporte, ayuda, emisoras latinas, atención al cliente',
};

export default function ContactPage() {
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
              <Link href="/contacto" className="text-blue-400 font-semibold">
                <i className="fas fa-envelope mr-2"></i>Contacto
              </Link>
              <Link href="/privacidad" className="text-slate-300 hover:text-white transition-colors font-medium">
                <i className="fas fa-shield-alt mr-2"></i>Privacidad
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-5xl flex-1" role="main">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <i className="fas fa-envelope text-blue-500 mr-3"></i>
            Contáctanos
          </h1>
          <p className="text-slate-400 text-lg">
            Estamos aquí para ayudarte. Envíanos tu consulta y te responderemos pronto.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <ContactForm />

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <section className="glass-effect rounded-2xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">
                <i className="fas fa-info-circle text-blue-400 mr-2"></i>
                Información de Contacto
              </h2>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center shrink-0">
                    <i className="fas fa-envelope text-blue-400 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email de Soporte</h3>
                    <a href="mailto:soporte@emisoraslatinas.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                      soporte@emisoraslatinas.com
                    </a>
                    <p className="text-slate-400 text-sm mt-1">
                      Respondemos en 24-48 horas
                    </p>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center shrink-0">
                    <i className="fas fa-clock text-green-400 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Horario de Atención</h3>
                    <p className="text-slate-300">Lunes a Viernes</p>
                    <p className="text-slate-400 text-sm">9:00 AM - 6:00 PM (GMT-5)</p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center shrink-0">
                    <i className="fas fa-share-alt text-purple-400 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Redes Sociales</h3>
                    <div className="flex gap-3">
                      <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors" aria-label="Facebook">
                        <i className="fab fa-facebook text-white"></i>
                      </a>
                      <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-sky-500 rounded-lg flex items-center justify-center transition-colors" aria-label="Twitter">
                        <i className="fab fa-twitter text-white"></i>
                      </a>
                      <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors" aria-label="Instagram">
                        <i className="fab fa-instagram text-white"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Quick Links */}
            <section className="glass-effect rounded-2xl p-8 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-4">
                <i className="fas fa-question-circle text-yellow-400 mr-2"></i>
                Preguntas Frecuentes
              </h2>

              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <i className="fas fa-angle-right text-blue-400"></i>
                    ¿Cómo escuchar una emisora?
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <i className="fas fa-angle-right text-blue-400"></i>
                    ¿Cómo agregar mi emisora al directorio?
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <i className="fas fa-angle-right text-blue-400"></i>
                    Problemas de reproducción
                  </a>
                </li>
                <li>
                  <Link href="/privacidad" className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <i className="fas fa-angle-right text-blue-400"></i>
                    Política de privacidad
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
