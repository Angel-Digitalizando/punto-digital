// =========================================================
// script.js — Saludo dinámico, año actual, footer interactivo
// Punto Digital Comunitario Morenense
//
// Dependencias en carga: ninguna.
// Dependencias en runtime: PD_Toast (para feedback de copia).
//   PD_Toast se resuelve lazy: este módulo no falla si toast.js
//   no cargó, simplemente degrada a sin-feedback-visual.
//
// Side effects en init():
//   - Modifica textContent de #anio-actual
//   - Modifica innerHTML de .intro h2 (saludo dinámico)
//   - Agrega event listeners en #texto-direccion y #texto-autor
// =========================================================

(function () {
    'use strict';

    // ─── Saludo dinámico por hora ─────────────────────────
    function aplicarSaludo() {
        var h2 = document.querySelector('.intro h2');
        if (!h2) return;

        var hora   = new Date().getHours();
        var saludo = '¡Hola Vecino, Hola Vecina! 👋';

        if      (hora >= 5  && hora < 12) saludo = '¡Buenos días, vecino! ☀️';
        else if (hora >= 12 && hora < 19) saludo = '¡Buenas tardes, vecino! 🌤️';
        else                               saludo = '¡Buenas noches, vecino! 🌙';

        // textContent para el saludo, span separado para el subtítulo.
        // No usar innerHTML directo en el h2 completo para no pisar
        // posibles nodos hijos que otros módulos pudieran agregar.
        h2.textContent = saludo;

        var sub  = document.createElement('span');
        sub.textContent = '¿Listo para aprender algo nuevo hoy?';
        sub.style.cssText = 'font-size:0.8em;color:#555;display:block;margin-top:5px;';
        h2.appendChild(sub);
    }

    // ─── Año actual ───────────────────────────────────────
    function aplicarAnio() {
        var span = document.getElementById('anio-actual');
        if (span) span.textContent = String(new Date().getFullYear());
    }

    // ─── Copiar al portapapeles ───────────────────────────
    // Estrategia de detección en tres niveles:
    //   1. navigator.clipboard.writeText (moderno, async, seguro)
    //   2. document.execCommand('copy')  (deprecated pero funciona
    //      en Android 5/6, Chrome < 66 — target audience real)
    //   3. alert() como último recurso si nada funciona
    //
    // No usar execCommand como primera opción porque genera
    // DeprecationWarning en Chrome 90+ en consola (ruido).
    function copiar(texto, mensajeExito) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(texto)
                .then(function ()  { feedback(mensajeExito); })
                .catch(function () { copiarFallback(texto, mensajeExito); });
            return;
        }
        copiarFallback(texto, mensajeExito);
    }

    function copiarFallback(texto, mensajeExito) {
        // execCommand requiere un elemento seleccionable en el DOM.
        // Se usa textarea off-screen para no alterar el layout.
        var ta = document.createElement('textarea');
        ta.value       = texto;
        ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();

        var exito = false;
        try {
            // eslint-disable-next-line no-restricted-syntax
            exito = document.execCommand('copy');
        } catch (_) { /* silenciar */ }

        document.body.removeChild(ta);

        if (exito) {
            feedback(mensajeExito);
        } else {
            // Solo llegar acá en browsers muy viejos sin ninguna API
            alert('No se pudo copiar automáticamente.\nTexto: ' + texto);
        }
    }

    // Feedback visual unificado a través de PD_Toast
    function feedback(mensaje) {
        if (window.PD_Toast && window.PD_Toast.mostrarToast) {
            window.PD_Toast.mostrarToast('✅ ' + mensaje, 'exito', 2500);
        }
        // Sin fallback: el texto ya se copió, el feedback es cosmético
    }

    // ─── Footer interactivo ───────────────────────────────
    function inicializarFooter() {
        activarBotonCopia(
            'texto-direccion',
            'Moreno, Escuela 1, Uruguay 53.',
            'Dirección copiada al portapapeles'
        );
        activarBotonCopia(
            'texto-autor',
            'Ángel Nicolás Villegas (CENS 453, Moreno)',
            'Nombre del autor copiado'
        );
    }

    function activarBotonCopia(id, texto, mensaje) {
        var el = document.getElementById(id);
        if (!el) return;

        // Asegurar que sea interactivo para lectores de pantalla
        el.setAttribute('role',     'button');
        el.setAttribute('tabindex', '0');

        el.addEventListener('click', function () {
            copiar(texto, mensaje);
        });

        // Activación por teclado (Enter y Espacio, igual que un botón real)
        el.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); // Prevenir scroll en Espacio
                copiar(texto, mensaje);
            }
        });
    }

    // ─── Inicialización ───────────────────────────────────
    function init() {
        aplicarAnio();
        aplicarSaludo();
        inicializarFooter();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
