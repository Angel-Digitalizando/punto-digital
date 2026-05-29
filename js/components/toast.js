// =========================================================
// components/toast.js — Sistema unificado de notificaciones (Cartelitos)
// Punto Digital Comunitario Morenense
// =========================================================

(function () {
    'use strict';

    // 📝 NOTA TÉCNICA: Acá guardamos la "caja" (el contenedor) donde van a ir apareciendo 
    // todos los cartelitos. La creamos una sola vez en la memoria para no ensuciar la página.
    let contenedor = null;
    const MAX_TOASTS = 3; // Límite de cartelitos al mismo tiempo para no tapar la pantalla

    function obtenerContenedor() {
        if (contenedor && document.body.contains(contenedor)) return contenedor;
        
        let existente = document.getElementById('toast-contenedor');
        if (existente) { contenedor = existente; return contenedor; }

        contenedor = document.createElement('div');
        contenedor.id = 'toast-contenedor';
        
        // 📝 ACCESIBILIDAD: 'aria-live="polite"' hace que el celular le lea el cartelito 
        // a las personas con problemas de visión, pero sin interrumpir lo que estaban escuchando.
        // Es como alguien que espera pacientemente su turno para hablar.
        contenedor.setAttribute('aria-live', 'polite');
        contenedor.setAttribute('aria-atomic', 'false');
        contenedor.setAttribute('role', 'status');
        
        document.body.appendChild(contenedor);
        return contenedor;
    }

    /**
     * mostrarToast: Hace aparecer un cartelito en la pantalla.
     * @param {string} texto - El mensaje a mostrar (ej: "Guardado en favoritos").
     * @param {string} tipo - El color/estilo: 'exito' (verde), 'info' (azul), 'aviso' (amarillo), 'urgente' (rojo).
     * @param {number} duracion - Cuánto tiempo se queda en pantalla (en milisegundos).
     */
    function mostrarToast(texto, tipo, duracion) {
        tipo     = tipo     || 'exito';
        duracion = duracion || 3000;

        const cont  = obtenerContenedor();

        // 📝 MEJORA: Si ya hay muchos cartelitos juntos, borramos el más viejo 
        // para mantener la pantalla limpia.
        while (cont.childElementCount >= MAX_TOASTS) {
            cont.removeChild(cont.firstChild);
        }

        const toast = document.createElement('div');
        toast.className   = 'toast toast-' + tipo;
        toast.textContent = texto;

        // 📝 ACCESIBILIDAD: Si es urgente (ej. "Te quedaste sin internet"), 
        // le decimos al celular que interrumpa y avise YA usando 'assertive' y 'alert'.
        if (tipo === 'urgente') {
            toast.setAttribute('role', 'alert');
            toast.setAttribute('aria-live', 'assertive');
        }

        cont.appendChild(toast);

        // 📝 NOTA TÉCNICA: "void toast.getBoundingClientRect();"
        // Esto es un pequeño truco. Le damos un "empujoncito" al navegador para obligarlo 
        // a reconocer que el cartel ya está en la pantalla ANTES de agregarle la animación. 
        // Si no hacemos esto, en celulares viejitos el cartel aparece de golpe y sin gracia.
        void toast.getBoundingClientRect();
        toast.classList.add('toast-visible');

        // 📝 MEJORA: Permitimos que el vecino toque el cartelito para cerrarlo rápido
        // por si le está tapando algún botón importante.
        toast.addEventListener('click', function() {
            cerrarToast(toast);
        });

        // Preparamos el relojito que lo va a cerrar cuando se acabe el tiempo
        const timer = setTimeout(function () {
            cerrarToast(toast);
        }, duracion);

        // Guardamos el relojito escondido en el cartel por si lo cerramos a mano antes de tiempo
        toast._clearTimer = function () { clearTimeout(timer); };
        
        return toast;
    }

    // Función interna para desvanecer y borrar un cartel
    function cerrarToast(toast) {
        if (toast._clearTimer) toast._clearTimer(); // Frenamos el reloj
        toast.classList.remove('toast-visible');
        
        // 📝 NOTA TÉCNICA: Esperamos a que termine el efecto de desvanecimiento para borrarlo de verdad.
        // Le ponemos un reloj extra (fallback) por si el celular es viejito y se "olvida" 
        // de avisarnos que la animación ya terminó. ¡Así no dejamos basura invisible ocupando memoria!
        const fallback = setTimeout(function () { 
            if (toast.parentNode) toast.remove(); 
        }, 500);
        
        toast.addEventListener('transitionend', function () {
            clearTimeout(fallback);
            if (toast.parentNode) toast.remove();
        }, { once: true });
    }

    // ─── API pública: Compartimos la herramienta con el resto de la app ──────
    window.PD_Toast = { mostrarToast: mostrarToast };

    // Por las dudas, dejamos este "alias" para que los archivos más viejos 
    // que buscan la función dentro de PD_UI no se rompan.
    if (!window.PD_UI) window.PD_UI = {};
    window.PD_UI.mostrarToast = mostrarToast;

})();