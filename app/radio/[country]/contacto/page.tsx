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
    title: lang === 'es' ? "Contacto | Emisoras Latinas" : 
           lang === 'pt' ? "Contato | Emisoras Latinas" : 
           "Contact | Emisoras Latinas",
    description: lang === 'es' 
      ? "Contacta con el equipo de Emisoras Latinas. Estamos aquí para ayudarte con preguntas, sugerencias o reportar problemas."
      : lang === 'pt'
      ? "Entre em contato com a equipe da Emisoras Latinas. Estamos aqui para ajudar com perguntas, sugestões ou problemas."
      : "Contact the Emisoras Latinas team. We're here to help with questions, suggestions, or to report issues.",
    robots: { index: true, follow: true },
  };
}

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
            {isSpanish ? "Contacto" : isPortuguese ? "Contato" : "Contact"}
          </h1>

          {isSpanish ? (
            <div className="space-y-8 leading-relaxed">
              <p className="text-lg">
                ¿Tienes preguntas, sugerencias o comentarios? Nos encantaría saber de ti.
                Nuestro equipo está comprometido a brindarte la mejor experiencia de radio online.
              </p>
              
              {/* Email Card */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-xl border border-blue-500/30">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-envelope text-blue-400 text-xl"></i>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2">Correo Electrónico</h2>
                    <p className="text-slate-400 mb-3">
                      Para consultas generales, soporte técnico o asociaciones comerciales:
                    </p>
                    <a href="mailto:emisoraslatinasco@gmail.com" className="text-blue-400 hover:text-blue-300 text-lg font-medium inline-flex items-center gap-2">
                      <i className="fas fa-paper-plane"></i>
                      emisoraslatinasco@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-clock text-green-400 text-xl"></i>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2">Tiempo de Respuesta</h2>
                    <p className="text-slate-400">
                      Normalmente respondemos en un plazo de <strong className="text-white">24-48 horas hábiles</strong>.
                      Los fines de semana y días festivos pueden tener tiempos de respuesta más largos.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mt-12">
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <i className="fas fa-question-circle text-purple-400"></i>
                  Preguntas Frecuentes
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/50">
                    <h3 className="text-white font-medium mb-2">¿Cómo puedo agregar mi emisora al directorio?</h3>
                    <p className="text-slate-400 text-sm">
                      Envíanos un correo con los datos de tu emisora: nombre, frecuencia, URL del stream,
                      logo y descripción. Evaluaremos tu solicitud y te responderemos.
                    </p>
                  </div>
                  
                  <div className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/50">
                    <h3 className="text-white font-medium mb-2">Una emisora no está funcionando, ¿qué hago?</h3>
                    <p className="text-slate-400 text-sm">
                      Repórtalo por correo indicando el nombre de la emisora y el país. Verificaremos
                      el stream y lo actualizaremos si es necesario.
                    </p>
                  </div>
                  
                  <div className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/50">
                    <h3 className="text-white font-medium mb-2">¿Emisoras Latinas es gratis?</h3>
                    <p className="text-slate-400 text-sm">
                      Sí, el servicio es completamente gratuito. Nos financiamos a través de publicidad
                      no intrusiva para mantener el sitio funcionando.
                    </p>
                  </div>
                  
                  <div className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/50">
                    <h3 className="text-white font-medium mb-2">¿Puedo solicitar la eliminación de mi emisora?</h3>
                    <p className="text-slate-400 text-sm">
                      Si eres el propietario de una emisora y deseas que sea removida del directorio,
                      contáctanos con prueba de propiedad y procesaremos tu solicitud.
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-12 text-center">
                <h2 className="text-xl font-semibold text-white mb-4">Síguenos</h2>
                <p className="text-slate-400 mb-6">
                  Mantente al día con las novedades y nuevas emisoras agregadas.
                </p>
                <div className="flex justify-center gap-4">
                  <a href="https://www.facebook.com/profile.php?id=61586652665186" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform">
                    <i className="fab fa-facebook-f text-xl"></i>
                  </a>
                  <a href="https://www.instagram.com/emisoras_latinas/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform">
                    <i className="fab fa-instagram text-xl"></i>
                  </a>
                </div>
              </div>
            </div>
          ) : isPortuguese ? (
            <div className="space-y-8 leading-relaxed">
              <p className="text-lg">
                Tem perguntas, sugestões ou comentários? Adoraríamos ouvir de você.
                Nossa equipe está comprometida em proporcionar a melhor experiência de rádio online.
              </p>
              
              {/* Email Card */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-xl border border-blue-500/30">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-envelope text-blue-400 text-xl"></i>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2">E-mail</h2>
                    <p className="text-slate-400 mb-3">
                      Para consultas gerais, suporte técnico ou parcerias comerciais:
                    </p>
                    <a href="mailto:emisoraslatinasco@gmail.com" className="text-blue-400 hover:text-blue-300 text-lg font-medium inline-flex items-center gap-2">
                      <i className="fas fa-paper-plane"></i>
                      emisoraslatinasco@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-clock text-green-400 text-xl"></i>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2">Tempo de Resposta</h2>
                    <p className="text-slate-400">
                      Normalmente respondemos em <strong className="text-white">24-48 horas úteis</strong>.
                      Finais de semana e feriados podem ter tempos de resposta mais longos.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mt-12">
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <i className="fas fa-question-circle text-purple-400"></i>
                  Perguntas Frequentes
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/50">
                    <h3 className="text-white font-medium mb-2">Como posso adicionar minha estação ao diretório?</h3>
                    <p className="text-slate-400 text-sm">
                      Envie-nos um e-mail com os dados da sua estação: nome, frequência, URL do stream,
                      logo e descrição. Avaliaremos sua solicitação e responderemos.
                    </p>
                  </div>
                  
                  <div className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/50">
                    <h3 className="text-white font-medium mb-2">Uma estação não está funcionando, o que faço?</h3>
                    <p className="text-slate-400 text-sm">
                      Reporte por e-mail indicando o nome da estação e o país. Verificaremos
                      o stream e o atualizaremos se necessário.
                    </p>
                  </div>
                  
                  <div className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/50">
                    <h3 className="text-white font-medium mb-2">Emisoras Latinas é grátis?</h3>
                    <p className="text-slate-400 text-sm">
                      Sim, o serviço é completamente gratuito. Nos financiamos através de publicidade
                      não intrusiva para manter o site funcionando.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8 leading-relaxed">
              <p className="text-lg">
                Have questions, suggestions, or feedback? We'd love to hear from you.
                Our team is committed to providing you with the best online radio experience.
              </p>
              
              {/* Email Card */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-xl border border-blue-500/30">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-envelope text-blue-400 text-xl"></i>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2">Email</h2>
                    <p className="text-slate-400 mb-3">
                      For general inquiries, technical support, or business partnerships:
                    </p>
                    <a href="mailto:emisoraslatinasco@gmail.com" className="text-blue-400 hover:text-blue-300 text-lg font-medium inline-flex items-center gap-2">
                      <i className="fas fa-paper-plane"></i>
                      emisoraslatinasco@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-clock text-green-400 text-xl"></i>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2">Response Time</h2>
                    <p className="text-slate-400">
                      We typically respond within <strong className="text-white">24-48 business hours</strong>.
                      Weekends and holidays may have longer response times.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mt-12">
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <i className="fas fa-question-circle text-purple-400"></i>
                  Frequently Asked Questions
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/50">
                    <h3 className="text-white font-medium mb-2">How can I add my station to the directory?</h3>
                    <p className="text-slate-400 text-sm">
                      Send us an email with your station details: name, frequency, stream URL,
                      logo, and description. We'll evaluate your request and respond.
                    </p>
                  </div>
                  
                  <div className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/50">
                    <h3 className="text-white font-medium mb-2">A station isn't working, what should I do?</h3>
                    <p className="text-slate-400 text-sm">
                      Report it via email indicating the station name and country. We'll verify
                      the stream and update it if necessary.
                    </p>
                  </div>
                  
                  <div className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/50">
                    <h3 className="text-white font-medium mb-2">Is Emisoras Latinas free?</h3>
                    <p className="text-slate-400 text-sm">
                      Yes, the service is completely free. We fund ourselves through non-intrusive
                      advertising to keep the site running.
                    </p>
                  </div>
                  
                  <div className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/50">
                    <h3 className="text-white font-medium mb-2">Can I request removal of my station?</h3>
                    <p className="text-slate-400 text-sm">
                      If you're the owner of a station and wish to have it removed from the directory,
                      contact us with proof of ownership and we'll process your request.
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-12 text-center">
                <h2 className="text-xl font-semibold text-white mb-4">Follow Us</h2>
                <p className="text-slate-400 mb-6">
                  Stay updated with news and newly added stations.
                </p>
                <div className="flex justify-center gap-4">
                  <a href="https://www.facebook.com/profile.php?id=61586652665186" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform">
                    <i className="fab fa-facebook-f text-xl"></i>
                  </a>
                  <a href="https://www.instagram.com/emisoras_latinas/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform">
                    <i className="fab fa-instagram text-xl"></i>
                  </a>
                </div>
              </div>
            </div>
          )}
        </article>
      </div>
      <Footer />
    </main>
  );
}
