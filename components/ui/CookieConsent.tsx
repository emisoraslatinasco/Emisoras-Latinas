'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const COOKIE_CONSENT_KEY = 'emisoras_latinas_cookie_consent';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar si ya se aceptaron las cookies
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Mostrar el banner después de un pequeño delay para mejor UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 animate-slideUp">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl shadow-black/50 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            {/* Icono */}
            <div className="hidden md:flex w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl items-center justify-center flex-shrink-0">
              <i className="fas fa-cookie-bite text-xl text-white"></i>
            </div>

            {/* Texto */}
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg mb-1 flex items-center gap-2">
                <i className="fas fa-cookie-bite text-amber-400 md:hidden"></i>
                Usamos cookies 🍪
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Usamos cookies para mejorar tu experiencia y mostrar publicidad personalizada. 
                Al continuar navegando, aceptas nuestra{' '}
                <Link href="/cookies" className="text-blue-400 hover:underline">
                  política de cookies
                </Link>{' '}
                y{' '}
                <Link href="/privacidad" className="text-blue-400 hover:underline">
                  política de privacidad
                </Link>.
              </p>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Link
                href="/cookies"
                className="px-4 py-2.5 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white text-sm font-medium rounded-lg transition-all text-center"
              >
                Ver Políticas
              </Link>
              <button
                onClick={handleAccept}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-semibold rounded-lg transition-all shadow-lg hover:shadow-blue-500/30"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
