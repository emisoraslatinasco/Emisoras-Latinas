import { Footer } from '@/components/layout';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Sobre Nosotros | Emisoras Latinas',
  description: 'Conoce la misión y el equipo detrás de Emisoras Latinas, el directorio de radio líder en Latinoamérica.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
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
            Volver
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="glass-effect rounded-2xl p-8 md:p-12 shadow-2xl text-slate-300 space-y-8">
          
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Conectando Latinoamérica a través de la música
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Nuestra misión es simple: que escuches tu emisora favorita con un solo clic, estés donde estés.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">¿Qué es Emisoras Latinas?</h2>
              <p className="mb-4">
                Emisoras Latinas es el directorio de radio online más moderno y rápido de la región. Nacimos con el objetivo de solucionar un problema común: sitios web lentos, llenos de publicidad intrusiva y reproductores que se cortan.
              </p>
              <p>
                Recopilamos más de <strong>15,000 emisoras</strong> de 22 países, ofreciendo una experiencia premium, gratuita y accesible para todos.
              </p>
            </div>
            <div className="relative h-80 w-full rounded-xl overflow-hidden">
               <Image 
                 src="/logos_general/emisoras_latinas_nosotros.jpg"
                 alt="Emisoras Latinas - Conectando Latinoamérica"
                 fill
                 className="object-contain"
                 sizes="(max-width: 768px) 100vw, 50vw"
               />
            </div>
          </div>

          <div className="border-t border-slate-700/50 pt-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Nuestros Valores</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
                <i className="fas fa-bolt text-yellow-400 text-3xl mb-4"></i>
                <h3 className="text-lg font-bold text-white mb-2">Velocidad</h3>
                <p className="text-sm">Tecnología de punta para que la música empiece a sonar inmediatamente.</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
                <i className="fas fa-heart text-red-400 text-3xl mb-4"></i>
                <h3 className="text-lg font-bold text-white mb-2">Pasión Latina</h3>
                <p className="text-sm">Curamos el contenido pensando en la cultura y gustos de cada país.</p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
                <i className="fas fa-shield-alt text-green-400 text-3xl mb-4"></i>
                <h3 className="text-lg font-bold text-white mb-2">Confianza</h3>
                <p className="text-sm">Información verificada y streams oficiales de alta calidad.</p>
              </div>
            </div>
          </div>

          <div className="text-center pt-8">
            <h2 className="text-2xl font-bold text-white mb-4">¿Tienes una emisora?</h2>
            <p className="mb-6">
              Si eres dueño de una estación de radio y quieres aparecer en nuestro directorio o actualizar tu información, escríbenos.
            </p>
            <Link href="/contacto" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg hover:shadow-blue-500/20">
              Contactar Soporte
            </Link>
          </div>

        </article>
      </div>
      <Footer />
    </main>
  );
}
