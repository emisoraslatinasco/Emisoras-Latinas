'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { countryToLanguage, getLanguageCode } from '@/utils/translations';

export default function DynamicLang() {
  const pathname = usePathname();

  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'radio' && segments[1]) {
      const code = segments[1].toUpperCase();
      const lang = getLanguageCode(code);
      document.documentElement.lang = lang;
    }
  }, [pathname]);

  return null;
}
