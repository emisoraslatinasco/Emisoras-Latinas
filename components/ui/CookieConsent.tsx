'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const COOKIE_CONSENT_KEY = 'emisoras_latinas_cookie_consent';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // Detectar el país actual de la URL para los enlaces
  const getCountryFromPath = (): string => {
    const match = pathname?.match(/\/radio\/([a-z]{2})/i);
    return match ? match[1].toLowerCase() : 'co'; // Default a Colombia
  };

  // Detectar idioma basado en el país
  const getLanguage = (): 'es' | 'pt' | 'en' => {
    const country = getCountryFromPath().toUpperCase();
    const portugueseCountries = ['BR', 'PT'];
    const englishCountries = ['US', 'GB', 'JM', 'TT'];
    
    if (portugueseCountries.includes(country)) return 'pt';
    if (englishCountries.includes(country)) return 'en';
    return 'es';
  };

  const lang = getLanguage();
  const countryCode = getCountryFromPath();

  // Textos por idioma
  const texts = {
    es: {
      title: 'Usamos cookies 🍪',
      description: 'Usamos cookies para mejorar tu experiencia y mostrar publicidad personalizada. Al continuar navegando, aceptas nuestra',
      cookiePolicy: 'política de cookies',
      and: 'y',
      privacyPolicy: 'política de privacidad',
      viewPolicies: 'Ver Políticas',
      accept: 'Aceptar Todas',
      reject: 'Solo Esenciales',
    },
    pt: {
      title: 'Usamos cookies 🍪',
      description: 'Usamos cookies para melhorar sua experiência e mostrar publicidade personalizada. Ao continuar navegando, você aceita nossa',
      cookiePolicy: 'política de cookies',
      and: 'e',
      privacyPolicy: 'política de privacidade',
      viewPolicies: 'Ver Políticas',
      accept: 'Aceitar Todos',
      reject: 'Apenas Essenciais',
    },
    en: {
      title: 'We use cookies 🍪',
      description: 'We use cookies to enhance your experience and show personalized ads. By continuing to browse, you accept our',
      cookiePolicy: 'cookie policy',
      and: 'and',
      privacyPolicy: 'privacy policy',
      viewPolicies: 'View Policies',
      accept: 'Accept All',
      reject: 'Essential Only',
    },
  };

  const t = texts[lang];

  useEffect(() => {
    // Verificar si ya se aceptaron las cookies
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Mostrar el banner después de un pequeño delay para mejor UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      accepted: true,
      essential: true,
      analytics: true,
      advertising: true,
      date: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      accepted: true,
      essential: true,
      analytics: false,
      advertising: false,
      date: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 animate-slideUp">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black border border-slate-600 rounded-2xl shadow-2xl shadow-black p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            {/* Icono */}
            <div className="hidden lg:flex w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl items-center justify-center flex-shrink-0">
              <i className="fas fa-cookie-bite text-2xl text-white"></i>
            </div>

            {/* Texto */}
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg mb-2 flex items-center gap-2">
                <i className="fas fa-cookie-bite text-amber-400 lg:hidden"></i>
                {t.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {t.description}{' '}
                <Link href={`/radio/${countryCode}/privacidad`} className="text-blue-400 hover:underline font-medium">
                  {t.privacyPolicy}
                </Link>.
              </p>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
              <button
                onClick={handleReject}
                className="px-4 py-2.5 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white text-sm font-medium rounded-lg transition-all text-center border border-slate-600/50"
              >
                {t.reject}
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-semibold rounded-lg transition-all shadow-lg hover:shadow-blue-500/30"
              >
                {t.accept}
              </button>
            </div>
          </div>
          
          {/* Texto legal adicional */}
          <p className="text-slate-500 text-xs mt-4 text-center lg:text-left">
            {lang === 'es' && 'Puedes cambiar tus preferencias en cualquier momento desde nuestra página de privacidad.'}
            {lang === 'pt' && 'Você pode alterar suas preferências a qualquer momento em nossa página de privacidade.'}
            {lang === 'en' && 'You can change your preferences at any time from our privacy page.'}
          </p>
        </div>
      </div>
    </div>
  );
}
