// Service worker NEUTRALIZADO.
// Un service worker de publicidad (push) quedó registrado en su día. Este archivo
// existe solo para deshacerlo: se auto-elimina y cancela cualquier suscripción
// push que haya quedado en navegadores de visitantes anteriores. NO añadir
// funcionalidad aquí ni reactivar push: en cuanto un navegador con el SW antiguo
// vuelve a comprobar actualizaciones, recibe esta versión y se limpia solo.
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
