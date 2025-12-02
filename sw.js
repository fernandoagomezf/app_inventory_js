const CACHE_NAME = 'warehouse-inventory-v1';
const urlsToCache = [
  '/app_inventory_js/',
  '/app_inventory_js/index.html',
  '/app_inventory_js/detail.html',
  '/app_inventory_js/edit.html',
  '/app_inventory_js/update.html',
  '/app_inventory_js/new.html',
  '/app_inventory_js/styles/main.css',
  '/app_inventory_js/js/domain.js',
  '/app_inventory_js/js/infrastructure.js',
  '/app_inventory_js/js/application.js',
  '/app_inventory_js/js/client-index.js',
  '/app_inventory_js/js/client-detail.js',
  '/app_inventory_js/js/client-edit.js',
  '/app_inventory_js/js/client-update.js',
  '/app_inventory_js/js/client-new.js'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          (response) => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
