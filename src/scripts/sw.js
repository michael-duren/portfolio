const CACHE_NAME = 'AUDIO_SAMPLES_CACHE';
const urlsToCache = [
  '/audio/bell.mp3',
  '/audio/blip.mp3',
  '/audio/K1.mp3',
  '/audio/K2.mp3',
  '/audio/K3.mp3',
  '/audio/K4.mp3',
  '/audio/K5.mp3',
  '/audio/K6.mp3',
  '/audio/K8.mp3',
  '/audio/K9.mp3',
  '/audio/K10.mp3',
  '/audio/pluck.mp3',
  '/audio/squeek-high.mp3',
  '/audio/squeek-low.mp3',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
