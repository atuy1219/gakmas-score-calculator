const CACHE_NAME = 'gakmas-cache-v1';
const urlsToCache = [
  '/gakmas-score-calculator/',
  '/gakmas-score-calculator/index.html',
  '/gakmas-score-calculator/manifest.json',
  '/gakmas-score-calculator/icon-192.png',
  '/gakmas-score-calculator/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
