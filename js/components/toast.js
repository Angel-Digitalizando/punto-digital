// =========================================================
// components/toast.js — Sistema unificado de notificaciones
// Punto Digital Comunitario Morenense
// ─── Dependencias: ninguna. Debe cargarse temprano. ──────
// =========================================================

(function () {
    'use strict';

    // Contenedor único reutilizado durante toda la sesión
    let contenedor = null;

    function obtenerContenedor() {
        if (contenedor && document.body.contains(contenedor)) return contenedor;
        // Crear o recuperar (puede haberse removido del DOM accidentalmente)
        let existente = document.getElementById('toast-contenedor');
        if (existente) { contenedor = existente; return contenedor; }

        contenedor = document.createElement('div');
        contenedor.id = 'toast-contenedor';
        // aria-live="assertive" para avisos urgentes (offline), "polite" para el resto.
        // Usamos polite por defecto; los avisos urgentes pasan 'urgente' como tipo.
        contenedor.setAttribute('aria-live', 'polite');
        contenedor.setAttribute('aria-atomic', 'false');
        contenedor.setAttribute('role', 'status');
        document.body.appendChild(contenedor);
        return contenedor;
    }

    /**
     * mostrarToast(texto, tipo, duracion)
     * tipo: 'exito' | 'info' | 'aviso' | 'urgente'
     * duracion: ms (default 3000)
     */
    function mostrarToast(texto, tipo, duracion) {
        tipo     = tipo     || 'exito';
        duracion = duracion || 3000;

        const cont  = obtenerContenedor();
        const toast = document.createElement('div');
        toast.className  = 'toast toast-' + tipo;
        toast.textContent = texto;

        // Accesibilidad: alertas urgentes usan role=alert
        if (tipo === 'urgente') {
            toast.setAttribute('role', 'alert');
            toast.setAttribute('aria-live', 'assertive');
        }

        cont.appendChild(toast);

        // Forzar reflow antes de agregar clase de transición
        // (necesario para que la animación CSS funcione en Android WebView)
        void toast.getBoundingClientRect();
        toast.classList.add('toast-visible');

        const timer = setTimeout(function () {
            toast.classList.remove('toast-visible');
            // Fallback por si transitionend no dispara (Android 5/6)
            const fallback = setTimeout(function () { if (toast.parentNode) toast.remove(); }, 500);
            toast.addEventListener('transitionend', function () {
                clearTimeout(fallback);
                if (toast.parentNode) toast.remove();
            }, { once: true });
        }, duracion);

        // Limpiar timer si el elemento se remueve antes (evita leak)
        toast._clearTimer = function () { clearTimeout(timer); };
        return toast;
    }

    // ─── API pública ──────────────────────────────────────
    window.PD_Toast = { mostrarToast: mostrarToast };

    // Alias de compatibilidad para módulos que usan PD_UI.mostrarToast
    if (!window.PD_UI) window.PD_UI = {};
    window.PD_UI.mostrarToast = mostrarToast;

})();
