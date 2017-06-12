// Cache first

var CACHE_NAME = 'v1';

var urlsToCache = [
	'index.html',
	'css/app.css',
	'css/font.css',
	'js/color-coder.js',
	'sound/yes.mp3',
	'sound/no.mp3',
	'phonegap.js'
];

this.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('v1').then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
