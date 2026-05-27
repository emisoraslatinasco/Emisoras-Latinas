'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const POPUNDER_DELAY_MS = 10000;

export default function MonetagPopunder() {
  const pathname = usePathname();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean);
    const isStationPage = segments.length >= 3 && segments[0] === 'radio';

    if (isStationPage) return;

    timeoutRef.current = setTimeout(() => {
      const s = document.createElement('script');
      s.dataset.zone = '11061806';
      s.src = 'https://al5sm.com/tag.min.js';
      document.body.appendChild(s);
    }, POPUNDER_DELAY_MS);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [pathname]);

  return null;
}
