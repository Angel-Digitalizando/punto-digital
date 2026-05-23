// =========================================================
// accesibilidad.js — Modos accesibles, WCAG, reduced-motion
// Punto Digital Comunitario Morenense
// ─── Dependencias: PD_Storage (storage.js), PD_Speech (speech.js)
//     PD_Speech es opcional: se resuelve en runtime, no en carga.
// =========================================================

(function () {
    'use strict';

    // ─── Núcleo: aplicar/retirar un modo ─────────────────
    // Todos los modos pasan por acá. Única fuente de verdad.
    function aplicarModo(clase, activo, claveStorage) {
        document.documentElement.classList.toggle(clase, activo);

        // Persistir solo si storage está disponible
        if (window.PD_Storage) {
            window.PD_Storage.guardarConfiguracion({ [claveStorage]: activo });
        }

        // Sincronizar aria-pressed en TODOS los botones que controlan este modo
        document.querySelectorAll('[data-modo="' + clase + '"]').forEach(function (btn) {
            btn.setAttribute('aria-pressed', activo.toString());
        });
    }

    // ─── Lectura Grande ───────────────────────────────────
    function aplicarLecturaGrande(activo, esManual) {
        aplicarModo('modo-lectura-grande', activo, 'lecturaGrande');
        // Registrar si fue el usuario (no Modo Ultra) quien lo activó
        if (esManual !== undefined && window.PD_Storage) {
            window.PD_Storage.guardarConfiguracion({ lecturaGrandeManual: !!esManual });
        }
        var btn = document.getElementById('btn-lectura-grande');
        if (btn) btn.textContent = activo ? '🔡 Letra Normal' : '🔠 Letra Grande';
    }

    // ─── Alto Contraste ───────────────────────────────────
    function aplicarAltoContraste(activo, esManual) {
        aplicarModo('modo-alto-contraste', activo, 'altoContraste');
        if (esManual !== undefined && window.PD_Storage) {
            window.PD_Storage.guardarConfiguracion({ altoContrasteManual: !!esManual });
        }
        var btn = document.getElementById('btn-alto-contraste');
        if (btn) btn.textContent = activo ? '🌕 Contraste Normal' : '🌑 Alto Contraste';
    }

    // ─── Modo Ultra ───────────────────────────────────────
    // Al ACTIVAR: enciende Lectura Grande + Alto Contraste marcándolos
    //             como "activados por Ultra" (esManual = false).
    // Al DESACTIVAR: solo apaga los submodos que Ultra encendió.
    //                Respeta los que el usuario activó independientemente.
    function aplicarModoUltra(activo) {
        aplicarModo('modo-ultra', activo, 'modoUltra');

        var btn = document.getElementById('btn-ultra');
        if (btn) btn.textContent = activo ? '👓 Modo Normal' : '👓 Modo Ultra';

        if (activo) {
            // Activar submodos sin marcarlos como manuales
            aplicarLecturaGrande(true,  false);
            aplicarAltoContraste(true,  false);
        } else {
            // Al desactivar Ultra: solo apagar submodos que el usuario
            // NO activó por su cuenta antes o después de encender Ultra.
            var config = window.PD_Storage ? window.PD_Storage.obtenerConfiguracion() : {};
            if (!config.lecturaGrandeManual) aplicarLecturaGrande(false, false);
            if (!config.altoContrasteManual) aplicarAltoContraste(false, false);
        }
    }

    // ─── Toggles públicos ─────────────────────────────────
    function toggleLecturaGrande() {
        var activo = document.documentElement.classList.contains('modo-lectura-grande');
        // Si el usuario lo activa manualmente, marcar como manual
        aplicarLecturaGrande(!activo, true);
        // Si lo desactiva manualmente, limpiar flag manual también
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

    // ─── Inyectar barra de accesibilidad ─────────────────
    function inyectarBarra() {
        if (document.getElementById('barra-accesibilidad')) return;

        var barra = document.createElement('div');
        barra.id = 'barra-accesibilidad';
        barra.setAttribute('role', 'toolbar');
        barra.setAttribute('aria-label', 'Herramientas de accesibilidad');
        barra.innerHTML =
            '<div class="barra-acc-inner container">' +
                '<span class="barra-acc-label" aria-hidden="true">♿</span>' +
                '<button id="btn-lectura-grande" class="btn-acc"' +
                    ' data-modo="modo-lectura-grande" aria-pressed="false"' +
                    ' title="Activar letra más grande">' +
                    '🔠 Letra Grande' +
                '</button>' +
                '<button id="btn-alto-contraste" class="btn-acc"' +
                    ' data-modo="modo-alto-contraste" aria-pressed="false"' +
                    ' title="Activar alto contraste">' +
                    '🌑 Alto Contraste' +
                '</button>' +
                '<button id="btn-ultra" class="btn-acc btn-ultra"' +
                    ' data-modo="modo-ultra" aria-pressed="false"' +
                    ' title="Modo especial para máxima accesibilidad">' +
                    '👓 Modo Ultra' +
                '</button>' +
                '<button id="btn-voz" class="btn-acc"' +
                    ' aria-pressed="false"' +
                    ' aria-label="Activar lectura en voz alta del tutorial">' +
                    '🔊 Leer' +
                '</button>' +
            '</div>';

        // Insertar inmediatamente después del header
        var header = document.querySelector('.header');
        if (header && header.parentNode) {
            header.parentNode.insertBefore(barra, header.nextSibling);
        } else {
            // Fallback: primer hijo del body
            document.body.insertBefore(barra, document.body.firstChild);
        }

        // ── Eventos ──
        document.getElementById('btn-lectura-grande')
            .addEventListener('click', toggleLecturaGrande);

        document.getElementById('btn-alto-contraste')
            .addEventListener('click', toggleAltoContraste);

        document.getElementById('btn-ultra')
            .addEventListener('click', toggleModoUltra);

        document.getElementById('btn-voz')
            .addEventListener('click', function () {
                // PD_Speech se carga después: resolver en runtime
                if (!window.PD_Speech) {
                    if (window.PD_Toast) {
                        window.PD_Toast.mostrarToast(
                            '⚠️ La lectura en voz alta no está disponible en este momento.',
                            'aviso'
                        );
                    }
                    return;
                }
                var panel = document.getElementById('panel-voz');
                var panelVisible = panel && panel.style.display !== 'none';
                if (panelVisible) {
                    window.PD_Speech.detener();
                    this.textContent  = '🔊 Leer';
                    this.setAttribute('aria-pressed', 'false');
                } else {
                    window.PD_Speech.iniciar();
                    this.textContent  = '🔇 Detener';
                    this.setAttribute('aria-pressed', 'true');
                }
            });
    }

    // ─── Restaurar preferencias desde storage ────────────
    // Se llama DESPUÉS de inyectarBarra para que los botones existan.
    function restaurarPreferencias() {
        if (!window.PD_Storage) return;
        var c = window.PD_Storage.obtenerConfiguracion();

        // Restaurar en orden correcto: Ultra primero si estaba activo,
        // porque Ultra activa los otros dos. Si no estaba Ultra,
        // restaurar cada uno independientemente.
        if (c.modoUltra) {
            aplicarModoUltra(true);
        } else {
            if (c.lecturaGrande) aplicarLecturaGrande(true, c.lecturaGrandeManual);
            if (c.altoContraste) aplicarAltoContraste(true, c.altoContrasteManual);
        }
    }

    // ─── prefers-reduced-motion ───────────────────────────
    function aplicarReducedMotion() {
        var prefiere = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.documentElement.classList.toggle('reduced-motion', prefiere);
    }

    // ─── Inicialización ───────────────────────────────────
    function init() {
        inyectarBarra();
        restaurarPreferencias();
        aplicarReducedMotion();

        var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        // addEventListener con fallback para Android 4/5 que usa addListener
        if (mq.addEventListener) {
            mq.addEventListener('change', aplicarReducedMotion);
        } else if (mq.addListener) {
            mq.addListener(aplicarReducedMotion);
        }
    }

    // ─── API pública ──────────────────────────────────────
    window.toggleLecturaGrande = toggleLecturaGrande;
    window.toggleAltoContraste = toggleAltoContraste;
    window.toggleModoUltra     = toggleModoUltra;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
