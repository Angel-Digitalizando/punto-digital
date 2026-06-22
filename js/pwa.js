// =========================================================
// pwa.js — Service Worker + indicador de conexión
// Punto Digital Comunitario Morenense
//
// Dependencias en carga: ninguna.
// Dependencias en runtime: PD_Toast (toast.js).
//   PD_Toast se resuelve en el momento de usarlo, no en
//   carga, porque pwa.js se carga al final pero puede
//   necesitar toasts antes de que DOMContentLoaded dispare
//   en browsers lentos. La resolución lazy es intencional.
//
// Side effects en init():
//   - Registra event listeners 'online' y 'offline' en window
//   - Inserta #indicador-conexion en el DOM (dentro de <main>)
//   - Registra el service worker en window.load
// =========================================================

(function () {
    'use strict';

    // ─── Toast unificado ──────────────────────────────────
    // Delega SIEMPRE en PD_Toast. Sin sistema UI propio.
    // Si PD_Toast no está disponible (error de carga), degrada
    // silenciosamente — mejor que un crash visible.
    function toast(texto, tipo, duracion) {
        if (window.PD_Toast && window.PD_Toast.mostrarToast) {
            window.PD_Toast.mostrarToast(texto, tipo || 'info', duracion || 4000);
        }
        // Sin fallback intencional: si toast.js no cargó,
        // el aviso de actualización es no-crítico.
    }

    // ─── Registro del Service Worker ─────────────────────
    function registrarSW() {
        if (!('serviceWorker' in navigator)) return;

        // Registrar en 'load' para no competir con el
        // parsing y ejecución de JS crítico en first load.
        window.addEventListener('load', function () {
            navigator.serviceWorker
                .register('./service-worker.js')
                .then(function (registro) {

                    // Detectar nueva versión instalándose
                    registro.addEventListener('updatefound', function () {
                        var nuevoSW = registro.installing;
                        if (!nuevoSW) return;

                        nuevoSW.addEventListener('statechange', function () {
                            // 'installed' + controller existente = hay una versión
                            // anterior activa. Es el momento de avisar al usuario.
                            if (
                                nuevoSW.state === 'installed' &&
                                navigator.serviceWorker.controller
                            ) {
                                toast(
                                    '🔄 Hay una actualización disponible. ' +
                                    'Cerrá y volvé a abrir la app para verla.',
                                    'info',
                                    6000
                                );
                            }
                        });
                    });

                })
                .catch(function (err) {
                    // El registro puede fallar en HTTP (requiere HTTPS o localhost).
                    // No bloquear la app por esto.
                    console.warn('Service Worker no pudo registrarse:', err.message);
                });
        });
    }

    // ─── Indicador de conexión ────────────────────────────
    // Se inserta DENTRO de <main> como primer hijo, no en body.
    // Así hereda el flujo del documento y no depende de
    // posicionamiento sticky frágil relativo a otros elementos.
    function inyectarIndicador() {
        if (document.getElementById('indicador-conexion')) return;

        var indicador = document.createElement('div');
        indicador.id = 'indicador-conexion';
        // role=alert para que lectores de pantalla lo anuncien
        // inmediatamente cuando aparece (es información urgente).
        indicador.setAttribute('role', 'alert');
        indicador.setAttribute('aria-live', 'assertive');
        indicador.setAttribute('aria-atomic', 'true');
        indicador.style.display = 'none';

        // Insertar al inicio de <main> para que quede
        // visualmente arriba del contenido sin depender de
        // sticky ni de altura de otros elementos inyectados.
        var main = document.getElementById('contenido-principal');
        if (main && main.firstChild) {
            main.insertBefore(indicador, main.firstChild);
        } else if (main) {
            main.appendChild(indicador);
        } else {
            // Fallback: body
            document.body.appendChild(indicador);
        }
    }

    function sincronizarEstadoConexion() {
        var indicador = document.getElementById('indicador-conexion');
        if (!indicador) return;

        if (navigator.onLine) {
            indicador.style.display = 'none';
            indicador.textContent   = '';
        } else {
            indicador.style.display = 'block';
            indicador.textContent   =
                '📵 Sin internet — Los tutoriales guardados siguen disponibles';
        }
    }

    // ─── Inicialización ───────────────────────────────────
    function init() {
        registrarSW();
        inyectarIndicador();
        sincronizarEstadoConexion();

        window.addEventListener('online',  sincronizarEstadoConexion);
        window.addEventListener('offline', sincronizarEstadoConexion);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
