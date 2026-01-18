'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/utils/useI18n';

export default function Footer() {
  const { t, countryCode } = useI18n();
  
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
          {t.tagline}
        </p>

        {/* Enlaces legales principales */}
        <nav className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-slate-400">
          <Link href={`/radio/${countryCode}/nosotros`} className="hover:text-blue-400 transition-colors">
            {t.about_us || 'Quiénes Somos'}
          </Link>
          <Link href={`/radio/${countryCode}/privacidad`} className="hover:text-blue-400 transition-colors">
            {t.privacy_policy || 'Política de Privacidad'}
          </Link>
          <Link href={`/radio/${countryCode}/terminos`} className="hover:text-blue-400 transition-colors">
            {t.terms || 'Términos de Uso'}
          </Link>
          <Link href={`/radio/${countryCode}/contacto`} className="hover:text-blue-400 transition-colors">
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

