// Minimal service worker: makes the app installable. Always tries the network first so updates show up.
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open('mamta-v1').then(k => k.put(e.request, c)); return r; })
    .catch(() => caches.match(e.request)));
});
