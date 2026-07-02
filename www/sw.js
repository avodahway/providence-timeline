const CACHE_NAME = 'providence-timeline-v16-native-follow-up';
const APP_SHELL = [
  '/',
  '/index.html',
  '/install.html',
  '/offline.html',
  '/atlas-engine.js',
  '/privacy.html',
  '/account-deletion.html',
  '/manifest.webmanifest',
  '/icons/providence-icon.svg',
  '/icons/providence-monogram.png',
  '/icons/providence-icon-180.png',
  '/icons/providence-icon-192.png',
  '/icons/providence-icon-512.png',
  '/icons/providence-maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (!response || response.status !== 200) return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match('/offline.html') || caches.match('/index.html')))
  );
});
