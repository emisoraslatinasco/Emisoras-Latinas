import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="glass-effect mt-20 py-8 mb-32">
      <div className="container mx-auto px-4 text-center">
        {/* Logo y nombre */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <Image 
            src="/logos_general/logo_miniatura_emisoras_latinas.jpg.png"
            alt="Emisoras Latinas"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="text-white font-semibold text-lg">Emisoras Latinas</span>
        </div>

        {/* Descripción breve */}
        <p className="text-slate-500 text-xs mb-6 max-w-md mx-auto">
          El directorio de radio online más completo de Latinoamérica. 
          Conectando la cultura latina a través de la música.
        </p>

        {/* Enlaces legales principales */}
        <nav className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6">
          <Link href="/nosotros" className="text-slate-400 hover:text-white transition-colors text-sm">
            Quiénes Somos
          </Link>
          <span className="text-slate-600 hidden md:inline">|</span>
          <Link href="/privacidad" className="text-slate-400 hover:text-white transition-colors text-sm">
            Política de Privacidad
          </Link>
          <span className="text-slate-600 hidden md:inline">|</span>
          <Link href="/cookies" className="text-slate-400 hover:text-white transition-colors text-sm">
            Política de Cookies
          </Link>
          <span className="text-slate-600 hidden md:inline">|</span>
          <Link href="/terminos" className="text-slate-400 hover:text-white transition-colors text-sm">
            Aviso Legal
          </Link>
          <span className="text-slate-600 hidden md:inline">|</span>
          <Link href="/contacto" className="text-slate-400 hover:text-white transition-colors text-sm">
            Contacto
          </Link>
        </nav>

        {/* Redes sociales */}
        <div className="flex justify-center gap-6 mb-6">
          <a href="https://facebook.com/emisoraslatinas" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors" aria-label="Facebook">
            <i className="fab fa-facebook text-xl"></i>
          </a>
          <a href="https://instagram.com/emisoraslatinas" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-400 transition-colors" aria-label="Instagram">
            <i className="fab fa-instagram text-xl"></i>
          </a>
          <a href="https://twitter.com/emisoraslatinas" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors" aria-label="Twitter">
            <i className="fab fa-twitter text-xl"></i>
          </a>
          <a href="https://youtube.com/@emisoraslatinas" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-red-400 transition-colors" aria-label="YouTube">
            <i className="fab fa-youtube text-xl"></i>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-slate-500 text-xs">
          © {new Date().getFullYear()} Emisoras Latinas. Todos los derechos reservados.
        </p>
        <p className="text-slate-600 text-xs mt-1">
          Las emisoras de radio pertenecen a sus respectivos propietarios.
        </p>
      </div>
    </footer>
  );
}

