'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Banners de Adsterra.
 *
 * Cada banner iframe se renderiza dentro de su propio <iframe srcdoc>: el código
 * de Adsterra usa una variable global `atOptions`, así que varios banners en la
 * misma página se pisarían entre sí si se inyectaran directamente en el documento.
 * El iframe aísla esa global y además se vuelve a cargar al navegar (SPA).
 */

const BANNER_KEYS = {
  '728x90': 'cddcbdcf15a6c273daa9cb52f9919157',
  '468x60': 'f040b4c37c50bca5600870d67d3616ce',
  '320x50': '3cf7ef122cdfd84b9ed8137e4716903c',
  '300x250': '3c3da6cd32d3673b23d9e834d8f8ce67',
  '160x600': '62362d516ada3f749e228a31c5775994',
  '160x300': '18f202c92c08221c5429cfaab0c38cbd',
} as const;

export type AdsterraFormat = keyof typeof BANNER_KEYS;

const NATIVE_BANNER_ID = '737d5146bc04e6bccee4cb97a2c17ed7';
const NATIVE_BANNER_SRC = `https://pl31598451.profitableratecpmnetwork.com/${NATIVE_BANNER_ID}/invoke.js`;

function buildSrcDoc(key: string, width: number, height: number) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;overflow:hidden;background:transparent}</style></head><body>
<script>atOptions={'key':'${key}','format':'iframe','height':${height},'width':${width},'params':{}};</script>
<script src="https://www.highrevenueformat.com/${key}/invoke.js"></script>
</body></html>`;
}

interface AdsterraBannerProps {
  format: AdsterraFormat;
  className?: string;
}

export default function AdsterraBanner({ format, className = '' }: AdsterraBannerProps) {
  const [width, height] = format.split('x').map(Number);

  return (
    <div className={`flex justify-center ${className}`}>
      <iframe
        title="Publicidad"
        srcDoc={buildSrcDoc(BANNER_KEYS[format], width, height)}
        width={width}
        height={height}
        scrolling="no"
        loading="lazy"
        style={{ border: 0, maxWidth: '100%' }}
      />
    </div>
  );
}

/**
 * Banner horizontal adaptable: 728x90 en tablet/escritorio y 320x50 en móvil.
 * El formato se elige en el cliente para no cargar (ni contar impresiones de)
 * un banner oculto con CSS.
 */
export function AdsterraLeaderboard({ className = '' }: { className?: string }) {
  const [format, setFormat] = useState<AdsterraFormat | null>(null);

  useEffect(() => {
    setFormat(window.matchMedia('(min-width: 768px)').matches ? '728x90' : '320x50');
  }, []);

  if (!format) return null;
  return <AdsterraBanner format={format} className={className} />;
}

/**
 * Native Banner de Adsterra. Se inyecta en el documento (no en iframe) porque su
 * alto depende del contenido. Usar como máximo uno por página: el id del
 * contenedor es fijo.
 */
export function AdsterraNativeBanner({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = NATIVE_BANNER_SRC;
    container.parentNode?.insertBefore(script, container);

    return () => {
      script.remove();
      container.innerHTML = '';
    };
  }, []);

  return (
    <div className={`w-full ${className}`}>
      <div ref={containerRef} id={`container-${NATIVE_BANNER_ID}`} />
    </div>
  );
}
