'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/utils/useI18n';

const popularCountries = [
  { code: 'co', name: 'Colombia' },
  { code: 'mx', name: 'México' },
  { code: 'ar', name: 'Argentina' },
  { code: 'pe', name: 'Perú' },
  { code: 'es', name: 'España' },
  { code: 'us', name: 'Estados Unidos' },
  { code: 'cl', name: 'Chile' },
  { code: 'ec', name: 'Ecuador' },
  { code: 've', name: 'Venezuela' },
  { code: 'br', name: 'Brasil' },
  { code: 'fr', name: 'Francia' },
  { code: 'it', name: 'Italia' },
  { code: 'gb', name: 'Reino Unido' },
  { code: 'pt', name: 'Portugal' },
  { code: 'uy', name: 'Uruguay' },
  { code: 'cr', name: 'Costa Rica' },
  { code: 'pa', name: 'Panamá' },
  { code: 'do', name: 'Rep. Dominicana' },
];

const popularGenres = [
  'Salsa', 'Noticias', 'Rock', 'Pop', 'Deportes',
  'Cristiana', 'Vallenato', 'Clásica', 'Jazz', 'Electrónica',
];

export default function Footer() {
  const { t, countryCode } = useI18n();
  // useI18n devuelve el código en MAYÚSCULA ('CO'); las rutas canónicas son en
  // minúscula ('/radio/co'). Normalizamos para no generar URLs duplicadas.
  const cc = countryCode.toLowerCase();

  return (
    <footer className="glass-effect mt-20 py-8 mb-32">
      <div className="container mx-auto px-4 text-center">
        {/* Logo y nombre */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <Image 
            src="/logos_general/logo_miniatura_emisoras_latinas.jpg"
            alt="Emisoras Latinas"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="text-white font-semibold text-lg">Emisoras Latinas</span>
        </div>

        {/* Descripción breve */}
        <p className="text-slate-500 text-xs mb-6 max-w-md mx-auto">
          {t.tagline}
        </p>

        {/* Enlaces legales principales */}
        <nav className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-slate-400">
          <Link href={`/radio/${cc}/nosotros`} className="hover:text-blue-400 transition-colors">
            {t.about_us || 'Quiénes Somos'}
          </Link>
          <Link href={`/radio/${cc}/privacidad`} className="hover:text-blue-400 transition-colors">
            {t.privacy_policy || 'Política de Privacidad'}
          </Link>
          <Link href={`/radio/${cc}/terminos`} className="hover:text-blue-400 transition-colors">
            {t.terms || 'Términos de Uso'}
          </Link>
          <Link href={`/radio/${cc}/contacto`} className="hover:text-blue-400 transition-colors">
            {t.contact || 'Contacto'}
          </Link>
        </nav>

        {/* Redes sociales */}
        <div className="flex justify-center gap-6 mb-6">
          <a href="https://www.facebook.com/profile.php?id=61586652665186" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors" aria-label="Facebook">
            <i className="fab fa-facebook text-xl"></i>
          </a>
          <a href="https://www.instagram.com/emisoras_latinas/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-400 transition-colors" aria-label="Instagram">
            <i className="fab fa-instagram text-xl"></i>
          </a>
        </div>

        {/* Países */}
        <div className="mb-6">
          <p className="text-slate-500 text-xs font-semibold mb-3 uppercase tracking-wider">Países</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs">
            {popularCountries.map((c) => (
              <Link key={c.code} href={`/radio/${c.code}`} className="text-slate-400 hover:text-blue-400 transition-colors">
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Géneros populares */}
        <div className="mb-6">
          <p className="text-slate-500 text-xs font-semibold mb-3 uppercase tracking-wider">Géneros</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs">
            {popularGenres.map((g) => (
              <Link key={g} href={`/radio/${cc}?categories=${encodeURIComponent(g)}`} className="text-slate-400 hover:text-blue-400 transition-colors">
                {g}
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <p className="text-slate-500 text-xs">
          © {new Date().getFullYear()} Emisoras Latinas. {t.all_rights_reserved}.
        </p>
        <p className="text-slate-600 text-xs mt-1">
          {t.radio_disclaimer}
        </p>
      </div>
    </footer>
  );
}

