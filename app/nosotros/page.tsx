'use client';

import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/layout/footer/Footer';

export default function NosotrosPage() {
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

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Conectando la Cultura Latina
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                A Través de la Música
              </span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Emisoras Latinas es el directorio de radio online más completo de Latinoamérica, 
              conectando a millones de personas con las emisoras de su tierra, sin importar donde se encuentren.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        
        {/* Misión */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50 mb-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <i className="fas fa-bullseye text-2xl text-white"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Nuestra Misión</h2>
              <p className="text-slate-300 leading-relaxed">
                Llevar la música, las noticias y la cultura de Latinoamérica a cada rincón del mundo. 
                Creemos que la radio es más que entretenimiento: es un vínculo con nuestras raíces, 
                un puente entre generaciones y una forma de mantener viva nuestra identidad cultural, 
                sin importar la distancia.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 text-center">
            <p className="text-3xl font-bold text-blue-400 mb-1">14,000+</p>
            <p className="text-slate-400 text-sm">Emisoras</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 text-center">
            <p className="text-3xl font-bold text-purple-400 mb-1">21</p>
            <p className="text-slate-400 text-sm">Países</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 text-center">
            <p className="text-3xl font-bold text-pink-400 mb-1">100%</p>
            <p className="text-slate-400 text-sm">Gratis</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 text-center">
            <p className="text-3xl font-bold text-green-400 mb-1">24/7</p>
            <p className="text-slate-400 text-sm">En Vivo</p>
          </div>
        </div>

        {/* Qué Ofrecemos */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50 mb-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">¿Qué Ofrecemos?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-globe-americas text-2xl text-blue-400"></i>
              </div>
              <h3 className="text-white font-semibold mb-2">Cobertura Global</h3>
              <p className="text-slate-400 text-sm">
                Emisoras de Colombia, México, Argentina, España, USA y más de 20 países.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-music text-2xl text-purple-400"></i>
              </div>
              <h3 className="text-white font-semibold mb-2">Todos los Géneros</h3>
              <p className="text-slate-400 text-sm">
                Salsa, vallenato, reggaeton, rock, pop, noticias, deportes y mucho más.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-mobile-alt text-2xl text-pink-400"></i>
              </div>
              <h3 className="text-white font-semibold mb-2">Sin Descargas</h3>
              <p className="text-slate-400 text-sm">
                Escucha directamente desde tu navegador, sin apps ni instalaciones.
              </p>
            </div>
          </div>
        </div>

        {/* Valores */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50 mb-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Nuestros Valores</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-check text-green-400"></i>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Accesibilidad</h3>
                <p className="text-slate-400 text-sm">
                  Creemos que la radio debe ser accesible para todos, sin barreras económicas ni geográficas.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-heart text-blue-400"></i>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Pasión por la Cultura</h3>
                <p className="text-slate-400 text-sm">
                  Cada emisora que agregamos representa una parte de nuestra rica herencia cultural latina.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-users text-purple-400"></i>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Comunidad</h3>
                <p className="text-slate-400 text-sm">
                  Conectamos a la diáspora latina con sus raíces, creando puentes entre continentes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 rounded-2xl p-8 md:p-12 border border-slate-700/50 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">¿Listo para explorar?</h2>
          <p className="text-slate-300 mb-6">
            Descubre miles de emisoras de radio en vivo, completamente gratis.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-blue-500/30"
          >
            <i className="fas fa-play"></i>
            Comenzar a Escuchar
          </Link>
        </div>

      </div>

      <Footer />
    </main>
  );
}
