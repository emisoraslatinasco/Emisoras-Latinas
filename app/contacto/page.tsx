'use client';

import { Footer } from '@/components/layout';
import ContactForm from '@/components/contact/ContactForm';
import Link from 'next/link';
import Image from 'next/image';

export default function ContactPage() {
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
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            <i className="fas fa-envelope text-blue-400 mr-3"></i>
            Contáctanos
          </h1>
          <p className="text-slate-400 mb-8">Estamos aquí para ayudarte. Envíanos tu consulta y te responderemos pronto.</p>
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
                    <a href="emisoraslatinasco@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                       emisoraslatinasco@gmail.com
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
      </div>

      <Footer />
    </main>
  );
}

