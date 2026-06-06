// =========================================================
// service-worker.js — Punto Digital Comunitario Morenense
//
// Deploy: https://angel-digitalizando.github.io/punto-digital/
//
// Estrategia: Cache-First con Stale-While-Revalidate
// para assets propios. Recursos externos pasan a la red.
//
// VERSIONADO:
//   Cambiar CACHE_VERSION fuerza reinstalación completa.
//   El activate handler borra TODOS los caches anteriores.
//   Compatible con usuarios que vienen de v1, v2, v3, v4.
//
// RUTAS:
//   Todas las rutas usan './' (relativas al SW).
//   El SW vive en /punto-digital/service-worker.js,
//   por lo que su scope es /punto-digital/ automáticamente.
//   Las rutas './index.html' resuelven a /punto-digital/index.html.
//   Esto es correcto para GitHub Pages con subdirectorio.
// =========================================================

const CACHE_VERSION = 'punto-digital-v13'; // ¡Cada vez le vamos agregando un número cuando agregamos funciones y necesitamos espacio de almacenamiento cache!
const CACHE_NOMBRE  = CACHE_VERSION + '-assets';

const ASSETS_PRECACHE = [
    // Shell de la app
    './',
    './index.html',
    './offline.html',
    // Estilos
    './css/style.css',
    // Módulos JS — en precache el orden no importa
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
    // Manifest y assets
    './manifest.json',
    './assets/icons/icon.svg',
    './assets/icons/icon-192.png',
    './assets/icons/icon-512.png',
];

// ── Instalación ──────────────────────────────────────────
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NOMBRE)
            .then(function (cache) {
                return cache.addAll(ASSETS_PRECACHE);
            })
            .then(function () {
                return self.skipWaiting();
            })
    );
});

// ── Activación: limpiar caches viejos y actualizar rápido ───
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
            .then(function () {
                // ESTA ES LA LÍNEA MÁGICA:
                // Le dice al navegador que tome el control inmediatamente
                return self.clients.claim(); 
            })
    );
});

// ── Fetch: Cache-First con actualización en background ───
self.addEventListener('fetch', function (event) {
    if (event.request.method !== 'GET') return;

    var url;
    try {
        url = new URL(event.request.url);
    } catch (_) { return; }

    // Solo interceptar mismo origen
    if (url.origin !== self.location.origin) return;
    if (url.protocol === 'chrome-extension:') return;

    event.respondWith(responderConCache(event.request));
});

function responderConCache(request) {
    var url = new URL(request.url);

    // SI ES UN ARCHIVO JS, SIEMPRE VAMOS A LA RED PRIMERO
    if (url.pathname.endsWith('.js')) {
        return fetch(request).catch(function() {
            return caches.match(request); // Si no hay red, recién ahí usamos caché
        });
    }

    // Para el resto de los archivos (css, html, imágenes), usamos la lógica vieja
    return caches.match(request).then(function (cacheado) {
        if (cacheado) {
            actualizarEnBackground(request);
            return cacheado;
        }
        return fetch(request).then(function (respuesta) {
            // ... (el resto de tu código igual)
        });
    });
}

function actualizarEnBackground(request) {
    fetch(request)
        .then(function (respuesta) {
            if (respuesta && respuesta.status === 200 && respuesta.type === 'basic') {
                caches.open(CACHE_NOMBRE).then(function (cache) {
                    cache.put(request, respuesta);
                });
            }
        })
        .catch(function () { /* offline — esperado */ });
}