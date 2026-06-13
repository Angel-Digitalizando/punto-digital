// =========================================================
// service-worker.js — Punto Digital Comunitario Morenense
//
// v19 (Junio 2026): menú hamburguesa + drawer, tooltip primera visita,
// botón volver arriba con SVG, fixes de contraste y tipografía.
// =========================================================

// v19 (Junio 2026): menú hamburguesa, drawer, tooltip primera vez,
// botón volver arriba mejorado, fixes UX/contraste/tipografía.
const CACHE_VERSION = 'punto-digital-v19';
const CACHE_NOMBRE  = CACHE_VERSION + '-assets';

const ASSETS_PRECACHE = [
    './',
    './index.html',
    './offline.html',
    './css/style.css',
    './js/storage.js',
    './js/tutoriales.js',
    './js/components/toast.js',
    './js/components/progressBar.js',
    './js/components/tutorialCard.js',
    './js/voice/speech.js',
    './js/ui.js',
    './js/accesibilidad.js',
    './js/script.js',
    './js/onboarding.js',
    './js/deeplink.js',
    './js/pwa.js',
    './manifest.json',
    './assets/icons/icon.svg',
    './assets/icons/icon-192.png',
    './assets/icons/icon-512.png',
];

// ── Instalación ──────────────────────────────────────────
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NOMBRE)
            .then(function (cache) { return cache.addAll(ASSETS_PRECACHE); })
            .then(function () { return self.skipWaiting(); })
    );
});

// ── Activación: limpiar caches viejos ────────────────────
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
            .then(function (nombres) {
                return Promise.all(
                    nombres
                        .filter(function (n) { return n !== CACHE_NOMBRE; })
                        .map(function (n) { return caches.delete(n); })
                );
            })
            .then(function () { return self.clients.claim(); })
    );
});

// ── Fetch: Network-First para JS, Cache-First para el resto ─
self.addEventListener('fetch', function (event) {
    if (event.request.method !== 'GET') return;

    var url;
    try { url = new URL(event.request.url); } catch (_) { return; }

    if (url.origin !== self.location.origin) return;
    if (url.protocol === 'chrome-extension:') return;

    event.respondWith(responderConCache(event.request));
});

function responderConCache(request) {
    var url = new URL(request.url);

    // JS: siempre red primero para garantizar código actualizado
    if (url.pathname.endsWith('.js')) {
        return fetch(request)
            .then(function (respuesta) {
                if (respuesta && respuesta.status === 200 && respuesta.type === 'basic') {
                    var clon = respuesta.clone();
                    caches.open(CACHE_NOMBRE).then(function (cache) { cache.put(request, clon); });
                }
                return respuesta;
            })
            .catch(function () { return caches.match(request); });
    }

    // CSS / HTML / assets: Cache-First con actualización en background
    return caches.match(request).then(function (cacheado) {
        if (cacheado) {
            actualizarEnBackground(request);
            return cacheado;
        }
        return fetch(request)
            .then(function (respuesta) {
                if (respuesta && respuesta.status === 200 && respuesta.type === 'basic') {
                    var clon = respuesta.clone();
                    caches.open(CACHE_NOMBRE).then(function (cache) { cache.put(request, clon); });
                }
                return respuesta;
            })
            .catch(function () {
                if ((request.headers.get('accept') || '').indexOf('text/html') !== -1) {
                    return caches.match('./offline.html');
                }
                return new Response('', { status: 503, statusText: 'Offline' });
            });
    });
}

function actualizarEnBackground(request) {
    fetch(request)
        .then(function (respuesta) {
            if (respuesta && respuesta.status === 200 && respuesta.type === 'basic') {
                caches.open(CACHE_NOMBRE).then(function (cache) { cache.put(request, respuesta); });
            }
        })
        .catch(function () { /* offline — esperado */ });
}
