// =========================================================
// onboarding.js — Primera visita: bienvenida y orientación
// Punto Digital Comunitario Morenense
//
// Dependencias en carga: ninguna.
// Dependencias en runtime: PD_Storage (detectar primera visita).
//
// Cuándo se muestra:
//   Solo en la primera visita (storage vacío).
//   Después se puede reactivar desde el footer con un link.
//
// Diseño pedagógico:
//   El onboarding no es un tutorial técnico.
//   Es una bienvenida emocional que:
//   1. valida que estar acá tiene sentido,
//   2. explica en 3 líneas qué ofrece la app,
//   3. orienta por dónde empezar según la necesidad,
//   4. da permiso explícito de tomarse el tiempo necesario.
//
// Side effects en mostrar():
//   - Inserta #overlay-onboarding en el body
//   - Bloquea scroll del body mientras está visible
//   - Libera scroll al cerrar
// =========================================================

(function () {
    'use strict';

    var CLAVE_STORAGE = 'pd_onboarding_visto';

    // ── ¿Ya vio el onboarding? ────────────────────────────
    function yaVio() {
        try {
            return localStorage.getItem(CLAVE_STORAGE) === '1';
        } catch (_) {
            return true; // Si localStorage falla, no mostrar
        }
    }

    function marcarVisto() {
        try { localStorage.setItem(CLAVE_STORAGE, '1'); } catch (_) {}
    }

    // ── Construir el overlay ──────────────────────────────
    function construirOverlay() {
        var overlay = document.createElement('div');
        overlay.id = 'overlay-onboarding';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'Bienvenida al Punto Digital Comunitario');

        overlay.innerHTML =
            '<div class="onb-panel" id="panel-onboarding">' +

                // Paso 1: Bienvenida emocional
                '<div class="onb-paso" id="onb-paso-1">' +
                    '<div class="onb-icono" aria-hidden="true">👋</div>' +
                    '<h2 class="onb-titulo">¡Bienvenida, bienvenido!</h2>' +
                    '<p class="onb-texto">Este espacio es para vos, sin importar cuánto sabés de tecnología.</p>' +
                    '<p class="onb-texto">Acá vas a encontrar tutoriales paso a paso para hacer trámites por internet, cuidar tus datos y entender el mundo digital — todo en lenguaje simple.</p>' +
                    '<p class="onb-texto"><strong>No hace falta saber nada de antemano. Empezás desde cero y a tu ritmo.</strong></p>' +
                    '<button class="onb-btn-siguiente" id="onb-btn-1" aria-label="Siguiente paso de bienvenida">Seguir →</button>' +
                '</div>' +

                // Paso 2: Orientación por necesidad
                '<div class="onb-paso oculto" id="onb-paso-2">' +
                    '<div class="onb-icono" aria-hidden="true">🗂️</div>' +
                    '<h2 class="onb-titulo">¿Por dónde empezás?</h2>' +
                    '<p class="onb-texto">Los tutoriales están organizados en grupos. Elegí el que más te interese ahora:</p>' +
                    '<div class="onb-opciones">' +
                        '<button class="onb-opcion" data-categoria="tramites">' +
                            '<span class="onb-opcion-icono" aria-hidden="true">🏛️</span>' +
                            '<span><strong>Trámites del Estado</strong><br>ANSES, CUIL, Mi Argentina y más</span>' +
                        '</button>' +
                        '<button class="onb-opcion" data-categoria="cuidado">' +
                            '<span class="onb-opcion-icono" aria-hidden="true">🛡️</span>' +
                            '<span><strong>Cuidado Digital</strong><br>Estafas, contraseñas, páginas oficiales</span>' +
                        '</button>' +
                        '<button class="onb-opcion" data-categoria="inteligencia_artificial">' +
                            '<span class="onb-opcion-icono" aria-hidden="true">🤖</span>' +
                            '<span><strong>Inteligencia Artificial</strong><br>Qué es y cómo usarla con criterio</span>' +
                        '</button>' +
                        '<button class="onb-opcion" data-categoria="todos">' +
                            '<span class="onb-opcion-icono" aria-hidden="true">📋</span>' +
                            '<span><strong>Ver todo</strong><br>Quiero explorar por mi cuenta</span>' +
                        '</button>' +
                    '</div>' +
                '</div>' +

                // Paso 3: Recordatorio de acompañamiento
                '<div class="onb-paso oculto" id="onb-paso-3">' +
                    '<div class="onb-icono" aria-hidden="true">🧡</div>' +
                    '<h2 class="onb-titulo">Una cosa más</h2>' +
                    '<p class="onb-texto">Si algo no se entiende, está bien volver a intentarlo.</p>' +
                    '<p class="onb-texto">Si necesitás ayuda, podés venir al espacio comunitario o pedirle a alguien de confianza que te acompañe. <strong>Aprender con otra persona es perfectamente válido.</strong></p>' +
                    '<p class="onb-texto">Esta app también funciona sin internet, así que podés consultarla cuando quieras.</p>' +
                    '<button class="onb-btn-empezar" id="onb-btn-empezar" aria-label="Empezar a usar la app">¡Empezamos! →</button>' +
                '</div>' +

                // Indicador de paso
                '<div class="onb-indicador" aria-hidden="true">' +
                    '<span class="onb-punto onb-punto-activo" data-paso="1"></span>' +
                    '<span class="onb-punto" data-paso="2"></span>' +
                    '<span class="onb-punto" data-paso="3"></span>' +
                '</div>' +

            '</div>'; // /.onb-panel

        return overlay;
    }

    // ── Navegar entre pasos ───────────────────────────────
    var pasoActual = 1;
    var categoriaElegida = null;

    function irAPaso(n) {
        var anterior = document.getElementById('onb-paso-' + pasoActual);
        var siguiente = document.getElementById('onb-paso-' + n);
        if (anterior) anterior.classList.add('oculto');
        if (siguiente) siguiente.classList.remove('oculto');
        pasoActual = n;

        // Actualizar indicadores
        document.querySelectorAll('.onb-punto').forEach(function (p) {
            p.classList.toggle('onb-punto-activo', parseInt(p.dataset.paso) === n);
        });

        // Foco accesible al nuevo paso
        if (siguiente) {
            var titulo = siguiente.querySelector('.onb-titulo');
            if (titulo) { titulo.setAttribute('tabindex', '-1'); titulo.focus(); }
        }
    }

    // ── Cerrar y aplicar categoría ────────────────────────
    function cerrar() {
        marcarVisto();

        var overlay = document.getElementById('overlay-onboarding');
        if (overlay) {
            overlay.classList.add('onb-saliendo');
            setTimeout(function () {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                document.body.style.overflow = '';
            }, 300);
        }

        // Si eligió una categoría, filtrar el menú automáticamente
        if (categoriaElegida && categoriaElegida !== 'todos') {
            if (window.PD_UI && window.PD_UI.filtrarPorCategoria) {
                window.PD_UI.filtrarPorCategoria(categoriaElegida);
            }
        }
    }

    // ── Mostrar ───────────────────────────────────────────
    function mostrar() {
        if (document.getElementById('overlay-onboarding')) return;

        var overlay = construirOverlay();
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden'; // Bloquear scroll de fondo

        // Animación entrada
        requestAnimationFrame(function () {
            overlay.classList.add('onb-visible');
        });

        // Foco inicial al título del primer paso
        setTimeout(function () {
            var titulo = document.querySelector('#onb-paso-1 .onb-titulo');
            if (titulo) { titulo.setAttribute('tabindex', '-1'); titulo.focus(); }
        }, 100);

        // Paso 1 → 2
        var btn1 = document.getElementById('onb-btn-1');
        if (btn1) btn1.addEventListener('click', function () { irAPaso(2); });

        // Opciones del paso 2 → 3
        document.querySelectorAll('.onb-opcion').forEach(function (btn) {
            btn.addEventListener('click', function () {
                categoriaElegida = this.dataset.categoria;
                // Marcar visualmente la opción elegida
                document.querySelectorAll('.onb-opcion').forEach(function (b) {
                    b.classList.remove('onb-opcion-activa');
                });
                this.classList.add('onb-opcion-activa');
                setTimeout(function () { irAPaso(3); }, 200);
            });
        });

        // Paso 3 → cerrar
        var btnEmpezar = document.getElementById('onb-btn-empezar');
        if (btnEmpezar) btnEmpezar.addEventListener('click', cerrar);

        // Cerrar con Escape
        document.addEventListener('keydown', function onEsc(e) {
            if (e.key === 'Escape') {
                document.removeEventListener('keydown', onEsc);
                cerrar();
            }
        });
    }

    // ── Inicialización ────────────────────────────────────
    function init() {
        if (!yaVio()) {
            // Pequeño delay para que la página cargue primero
            setTimeout(mostrar, 600);
        }
    }

    // API pública — permite reabrir desde footer o ayuda
    window.PD_Onboarding = {
        mostrar:       mostrar,
        marcarVisto:   marcarVisto,
        resetear:      function () {
            try { localStorage.removeItem(CLAVE_STORAGE); } catch (_) {}
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
