import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="glass-effect mt-20 py-8 mb-32">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <i className="fas fa-radio text-blue-500 text-2xl"></i>
          <span className="text-white font-semibold text-lg">Emisoras Latinas</span>
        </div>
        <p className="text-slate-400 text-sm mb-4">
          © 2025 Emisoras Latinas. Todos los derechos reservados.
        </p>
        <nav className="flex justify-center gap-6 mb-4">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm">
            Inicio
          </Link>
          <Link href="/contacto" className="text-slate-400 hover:text-white transition-colors text-sm">
            Contacto
          </Link>
          <Link href="/privacidad" className="text-slate-400 hover:text-white transition-colors text-sm">
            Privacidad
          </Link>
        </nav>
        <div className="flex justify-center gap-6">
          <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Facebook">
            <i className="fab fa-facebook text-xl"></i>
          </a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Instagram">
            <i className="fab fa-instagram text-xl"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
