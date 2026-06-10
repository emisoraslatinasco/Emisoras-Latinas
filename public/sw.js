// Service worker NEUTRALIZADO.
// Antes registraba las Push Notifications de Monetag (zona 11061710, 3nbf4.com),
// formato que viola las políticas de Google AdSense.
//
// Ahora hace lo contrario: se auto-elimina y cancela cualquier suscripción push
// que haya quedado registrada en navegadores de visitantes anteriores, para
// limpiar por completo el rastro de Monetag. No reactivar.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const sub = await self.registration.pushManager.getSubscription();
        if (sub) await sub.unsubscribe();
      } catch {
        // sin permiso de push o no soportado — se ignora
      }
      await self.registration.unregister();
      const clients = await self.clients.matchAll();
      clients.forEach((c) => c.navigate(c.url));
    })()
  );
});
