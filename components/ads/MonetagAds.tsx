import Script from 'next/script';

/**
 * Monetag — formatos NO intrusivos, cargados con un simple <script>: NO usan el
 * service worker ni piden permiso de notificaciones del navegador. (El formato
 * "Push" clásico, que sí usaba el service worker y fue la causa raíz del rechazo
 * de AdSense, sigue retirado en public/sw.js y NO se reactiva aquí.)
 *
 * Cada entrada equivale a un snippet del panel de Monetag. El snippet original es
 * un IIFE que crea un <script>, le asigna dataset.zone y src; aquí se expresa de
 * forma declarativa con next/script (src + data-zone), que produce el mismo
 * elemento en el DOM.
 *
 * Los valores (zone + dominio) NO son secretos: aparecen en el HTML público del
 * sitio, por eso van aquí y no en variables de entorno. Para APAGAR Monetag,
 * comenta la(s) entrada(s) del array. Si Monetag rota el dominio del script,
 * actualiza el campo `src` con el nuevo snippet del panel.
 */
const MONETAG_ZONES = [
  // In-Page Push  (notificaciones dentro de la página, sin permiso del navegador)
  { id: 'inpage', zone: '11164017', src: 'https://nap5k.com/tag.min.js' },
  // Vignette Banner  (intersticial ligero en transiciones)
  { id: 'vignette', zone: '11164019', src: 'https://n6wxm.com/vignette.min.js' },
];

export default function MonetagAds() {
  return (
    <>
      {MONETAG_ZONES.map(({ id, zone, src }) => (
        <Script
          key={id}
          id={`monetag-${id}`}
          src={src}
          data-zone={zone}
          data-cfasync="false"
          strategy="afterInteractive"
        />
      ))}
    </>
  );
}
