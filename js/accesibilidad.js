// =========================================================
// accesibilidad.js — Sistema de Accesibilidad Flotante v3
// Punto Digital Comunitario Morenense
//
// Cambios v3 (Junio 2026):
//   - FAB flotante bottom-right con ícono ISA inline SVG
//   - Panel compacto independiente con animación suave
//   - Cierre por clic afuera, Escape o botón ×
//   - Sin Font Awesome, sin icon packs, sin dependencias externas
//   - API pública invariante: toggleLecturaGrande, toggleAltoContraste,
//     toggleModoUltra expuestas en window
//   - Eliminada inyectarBarra() — sin barra sticky
//
// Dependencias en carga: ninguna.
// Dependencias en runtime: PD_Storage (storage.js), PD_Speech (speech.js),
//   PD_Toast (toast.js) — todas lazy/opcionales.
// =========================================================

(function () {
    'use strict';

    // ─── Estado del panel ─────────────────────────────────
    var panelVisible = false;

    // ─────────────────────────────────────────────────────
    // NÚCLEO — Aplicar / retirar modos accesibles
    // Única fuente de verdad para todos los modos.
    // ─────────────────────────────────────────────────────

    function aplicarModo(clase, activo, claveStorage) {
        document.documentElement.classList.toggle(clase, activo);

        if (window.PD_Storage) {
            window.PD_Storage.guardarConfiguracion({ [claveStorage]: activo });
        }

        // Sincronizar aria-pressed y estado visual en TODOS los botones
        // que controlan este modo (el panel puede tener >1 por modo).
        document.querySelectorAll('[data-modo="' + clase + '"]').forEach(function (btn) {
            btn.setAttribute('aria-pressed', String(activo));
            var est = btn.querySelector('.acc-estado');
            if (est) est.textContent = activo ? 'ON' : 'OFF';
            btn.classList.toggle('acc-opcion-activa', activo);
        });
    }

    function aplicarLecturaGrande(activo, esManual) {
        aplicarModo('modo-lectura-grande', activo, 'lecturaGrande');
        if (esManual !== undefined && window.PD_Storage) {
            window.PD_Storage.guardarConfiguracion({ lecturaGrandeManual: !!esManual });
        }
    }

    function aplicarAltoContraste(activo, esManual) {
        aplicarModo('modo-alto-contraste', activo, 'altoContraste');
        if (esManual !== undefined && window.PD_Storage) {
            window.PD_Storage.guardarConfiguracion({ altoContrasteManual: !!esManual });
        }
    }

    function aplicarModoUltra(activo) {
        aplicarModo('modo-ultra', activo, 'modoUltra');

        if (activo) {
            aplicarLecturaGrande(true, false);
            aplicarAltoContraste(true, false);
        } else {
            var config = window.PD_Storage ? window.PD_Storage.obtenerConfiguracion() : {};
            if (!config.lecturaGrandeManual) aplicarLecturaGrande(false, false);
            if (!config.altoContrasteManual) aplicarAltoContraste(false, false);
        }
    }

    // ─── Toggles públicos ─────────────────────────────────

    function toggleLecturaGrande() {
        var activo = document.documentElement.classList.contains('modo-lectura-grande');
        aplicarLecturaGrande(!activo, true);
        if (activo && window.PD_Storage) {
            window.PD_Storage.guardarConfiguracion({ lecturaGrandeManual: false });
        }
    }

    function toggleAltoContraste() {
        var activo = document.documentElement.classList.contains('modo-alto-contraste');
        aplicarAltoContraste(!activo, true);
        if (activo && window.PD_Storage) {
            window.PD_Storage.guardarConfiguracion({ altoContrasteManual: false });
        }
    }

    function toggleModoUltra() {
        aplicarModoUltra(!document.documentElement.classList.contains('modo-ultra'));
    }

    // Toggle de voz: no persiste (speech se reinicia al recargar).
    // Usa id="btn-voz" para compatibilidad con speech.js que llama
    // sincronizarBtnVozExterno() buscando ese id.
    function toggleVoz() {
        if (!window.PD_Speech) {
            if (window.PD_Toast) {
                window.PD_Toast.mostrarToast(
                    '⚠️ Lectura en voz alta no disponible en este dispositivo.',
                    'aviso', 3500
                );
            }
            return;
        }
        var panelVoz = document.getElementById('panel-voz');
        var vozActiva = panelVoz && panelVoz.style.display !== 'none';
        if (vozActiva) {
            window.PD_Speech.detener();
        } else {
            window.PD_Speech.iniciar();
        }
    }

    // ─────────────────────────────────────────────────────
    // SVGs INLINE PROPIOS — sin dependencias externas
    // ─────────────────────────────────────────────────────

    // Ícono ISA (International Symbol of Access) moderno:
    // figura humana con brazos extendidos.
    var SVG_ACCESIBILIDAD =
        '<svg width="26" height="26" viewBox="0 0 26 26" fill="none"' +
        ' xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        // Cabeza
        '<circle cx="13" cy="5" r="2.4" fill="white"/>' +
        // Tronco
        '<path d="M13 7.8V15.5" stroke="white" stroke-width="2.4" stroke-linecap="round"/>' +
        // Brazos extendidos
        '<path d="M7.5 11.5L13 9.8L18.5 11.5" stroke="white" stroke-width="2.4"' +
        ' stroke-linecap="round" stroke-linejoin="round"/>' +
        // Piernas
        '<path d="M13 15.5L10.2 22" stroke="white" stroke-width="2.4" stroke-linecap="round"/>' +
        '<path d="M13 15.5L15.8 22" stroke="white" stroke-width="2.4" stroke-linecap="round"/>' +
        '</svg>';

    var SVG_CERRAR =
        '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">' +
        '<path d="M3.5 3.5L14.5 14.5M14.5 3.5L3.5 14.5"' +
        ' stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>' +
        '</svg>';

    // ─────────────────────────────────────────────────────
    // BUILDER — HTML de una opción del panel
    // ─────────────────────────────────────────────────────

    function buildOpcion(id, modoData, emoji, label) {
        // Si modoData es 'modo-voz', no se usa data-modo para evitar
        // que aplicarModo() intente togglear una clase CSS inexistente.
        var dataAttr = modoData ? (' data-modo="' + modoData + '"') : '';
        return (
            '<button id="' + id + '" class="acc-opcion"' + dataAttr +
            ' aria-pressed="false" aria-label="' + label + '">' +
            '<span class="acc-opcion-emoji" aria-hidden="true">' + emoji + '</span>' +
            '<span class="acc-opcion-label">' + label + '</span>' +
            '<span class="acc-estado" aria-hidden="true">OFF</span>' +
            '</button>'
        );
    }

    // ─────────────────────────────────────────────────────
    // INYECCIÓN — FAB + Panel en el DOM
    // ─────────────────────────────────────────────────────

    function inyectarBotonFlotante() {
        if (document.getElementById('btn-acc-flotante')) return;

        // ── FAB ──────────────────────────────────────────
        var fab = document.createElement('button');
        fab.id = 'btn-acc-flotante';
        fab.setAttribute('aria-label', 'Abrir herramientas de accesibilidad');
        fab.setAttribute('aria-expanded', 'false');
        fab.setAttribute('aria-controls', 'panel-acc');
        fab.setAttribute('title', 'Accesibilidad');
        fab.innerHTML = SVG_ACCESIBILIDAD;
        document.body.appendChild(fab);

        // ── Panel ─────────────────────────────────────────
        var panel = document.createElement('div');
        panel.id = 'panel-acc';
        panel.setAttribute('role', 'region');
        panel.setAttribute('aria-label', 'Herramientas de accesibilidad');
        panel.setAttribute('hidden', '');

        panel.innerHTML =
            '<div class="acc-panel-header">' +
                '<span class="acc-panel-titulo">♿ Accesibilidad</span>' +
                '<button id="btn-acc-cerrar" class="acc-btn-cerrar"' +
                    ' aria-label="Cerrar panel de accesibilidad">' +
                    SVG_CERRAR +
                '</button>' +
            '</div>' +
            '<div class="acc-panel-opciones">' +
                buildOpcion('acc-btn-letra',     'modo-lectura-grande', '🔠', 'Letra Grande')   +
                buildOpcion('acc-btn-contraste', 'modo-alto-contraste', '🌑', 'Alto Contraste') +
                buildOpcion('acc-btn-ultra',     'modo-ultra',          '👓', 'Modo Ultra')      +
                // btn-voz: id="btn-voz" para compatibilidad con speech.js
                // No usa data-modo porque voz no es un modo CSS persistido.
                '<button id="btn-voz" class="acc-opcion"' +
                    ' aria-pressed="false" aria-label="Leer tutorial en voz alta">' +
                    '<span class="acc-opcion-emoji" aria-hidden="true">🔊</span>' +
                    '<span class="acc-opcion-label">Leer en voz alta</span>' +
                    '<span class="acc-estado" aria-hidden="true">OFF</span>' +
                '</button>' +
            '</div>';

        document.body.appendChild(panel);

        // ── Eventos FAB ──────────────────────────────────
        fab.addEventListener('click', function (e) {
            e.stopPropagation();
            panelVisible ? cerrarPanel() : abrirPanel();
        });

        // ── Cerrar con X ──────────────────────────────────
        document.getElementById('btn-acc-cerrar').addEventListener('click', cerrarPanel);

        // ── Cerrar al hacer clic fuera ────────────────────
        document.addEventListener('click', function (e) {
            if (!panelVisible) return;
            if (!panel.contains(e.target) && e.target !== fab && !fab.contains(e.target)) {
                cerrarPanel();
            }
        });

        // ── Cerrar con Escape ─────────────────────────────
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && panelVisible) {
                cerrarPanel();
                fab.focus();
            }
        });

        // ── Bindings de cada opción ───────────────────────
        var bindings = [
            { id: 'acc-btn-letra',     fn: toggleLecturaGrande },
            { id: 'acc-btn-contraste', fn: toggleAltoContraste  },
            { id: 'acc-btn-ultra',     fn: toggleModoUltra      },
            { id: 'btn-voz',           fn: toggleVoz            },
        ];
        bindings.forEach(function (b) {
            var el = document.getElementById(b.id);
            if (el) el.addEventListener('click', b.fn);
        });
    }

    // ─────────────────────────────────────────────────────
    // ABRIR / CERRAR PANEL (con animación CSS)
    // ─────────────────────────────────────────────────────

    function abrirPanel() {
        var panel = document.getElementById('panel-acc');
        var fab   = document.getElementById('btn-acc-flotante');
        if (!panel) return;

        panel.removeAttribute('hidden');
        void panel.getBoundingClientRect(); // forzar reflow para CSS transition
        panel.classList.add('acc-panel-visible');
        panelVisible = true;

        if (fab) {
            fab.setAttribute('aria-expanded', 'true');
            fab.classList.add('acc-fab-abierto');
        }

        // Foco accesible al primer botón del panel
        setTimeout(function () {
            var primero = panel.querySelector('.acc-opcion, .acc-btn-cerrar');
            if (primero) primero.focus();
        }, 80);
    }

    function cerrarPanel() {
        var panel = document.getElementById('panel-acc');
        var fab   = document.getElementById('btn-acc-flotante');
        if (!panel) return;

        panel.classList.remove('acc-panel-visible');
        panelVisible = false;

        if (fab) {
            fab.setAttribute('aria-expanded', 'false');
            fab.classList.remove('acc-fab-abierto');
        }

        // Ocultar tras la transición CSS (250ms)
        setTimeout(function () {
            if (!panelVisible) panel.setAttribute('hidden', '');
        }, 260);
    }

    // ─────────────────────────────────────────────────────
    // RESTAURAR PREFERENCIAS
    // ─────────────────────────────────────────────────────

    function restaurarPreferencias() {
        if (!window.PD_Storage) return;
        var c = window.PD_Storage.obtenerConfiguracion();

        // Orden: Ultra primero porque activa los otros dos.
        if (c.modoUltra) {
            aplicarModoUltra(true);
        } else {
            if (c.lecturaGrande) aplicarLecturaGrande(true, c.lecturaGrandeManual);
            if (c.altoContraste) aplicarAltoContraste(true, c.altoContrasteManual);
        }
    }

    // ─────────────────────────────────────────────────────
    // REDUCED MOTION
    // ─────────────────────────────────────────────────────

    function aplicarReducedMotion() {
        var prefiere = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.documentElement.classList.toggle('reduced-motion', prefiere);
    }

    // ─────────────────────────────────────────────────────
    // INIT
    // ─────────────────────────────────────────────────────

    function init() {
        inyectarBotonFlotante();    // primero, para que restaurarPreferencias pueda sincronizar los botones
        restaurarPreferencias();
        aplicarReducedMotion();

        var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mq.addEventListener) {
            mq.addEventListener('change', aplicarReducedMotion);
        } else if (mq.addListener) {
            mq.addListener(aplicarReducedMotion);
        }
    }

    // ─────────────────────────────────────────────────────
    // API PÚBLICA
    // ─────────────────────────────────────────────────────

    window.toggleLecturaGrande = toggleLecturaGrande;
    window.toggleAltoContraste = toggleAltoContraste;
    window.toggleModoUltra     = toggleModoUltra;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
