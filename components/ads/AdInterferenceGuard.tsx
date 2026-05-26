'use client';
import { useEffect } from 'react';

/**
 * Vigila que el reproductor de audio (marcado con data-audio-player)
 * siga siendo clicable. Si detecta que está cubierto por un ad,
 * neutraliza el z-index del intruso para que el play funcione.
 *
 * Trade-off: el ad cubierto deja de generar revenue de ese caso,
 * pero protege la funcionalidad crítica del sitio (escuchar la radio).
 *
 * Corre cada 3s. Bajo costo, se monta una sola vez en el layout.
 */
export default function AdInterferenceGuard() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const AD_HOSTS = [
      'propellerads',
      '5gvci',
      '3nbf4',
      'n6wxm',
      'nap5k',
      'al5sm',
      'quge5',
    ];

    const isAdElement = (el: Element): boolean => {
      if (el.tagName === 'IFRAME') {
        const src = (el as HTMLIFrameElement).src || '';
        if (AD_HOSTS.some((h) => src.includes(h))) return true;
      }
      const idClass = `${el.id} ${el.className}`.toLowerCase();
      return /\b(mtg[_-]|monetag|propeller|adsbygoogle|onclick-ad)/.test(idClass);
    };

    const checkPlayer = () => {
      const player = document.querySelector<HTMLElement>('[data-audio-player]');
      if (!player) return;

      const rect = player.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      // Probamos varios puntos del player (esquinas + centro) para detectar
      // ads que cubran solo parte del reproductor.
      const points = [
        [rect.left + rect.width / 2, rect.top + rect.height / 2],
        [rect.left + 30, rect.top + rect.height / 2],
        [rect.right - 30, rect.top + rect.height / 2],
      ];

      for (const [x, y] of points) {
        const top = document.elementFromPoint(x, y);
        if (!top || top === player || player.contains(top)) continue;

        if (isAdElement(top)) {
          const offender = top as HTMLElement;
          // eslint-disable-next-line no-console
          console.warn('[AdGuard] Ad tapando el player, neutralizando:', {
            tag: offender.tagName,
            id: offender.id,
            className: offender.className,
          });
          offender.style.setProperty('z-index', '1', 'important');
          offender.style.setProperty('pointer-events', 'none', 'important');
        }
      }
    };

    const interval = window.setInterval(checkPlayer, 3000);
    return () => window.clearInterval(interval);
  }, []);

  return null;
}
