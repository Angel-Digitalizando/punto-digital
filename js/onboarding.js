// =============================
// onboarding.js - Primera visita: bienvenida y orientación
// Punto Digital Comunitario Morenense
//
// REESCRITURA ACCESIBLE Y ADAPTATIVA
// - Detección de dispositivo (Móvil vs. Escritorio).
// - Focus Trap (atrapa la navegación con Tab para lectores de pantalla).
// - Soporte ARIA mejorado (aria-live, roles, tabindexes).
// ===========================

(function () {
    'use strict';

    var CLAVE_STORAGE = 'pd_onboarding_visto';
    var pasoActual = 1;
    var categoriaElegida = null;
    var elementoPrevioAlFoco = null; // Para devolver el foco al cerrar
    // ── ¿Ya vio el onboarding? ────────────────────────────
    function yaVio() {
        try {
            return localStorage.getItem(CLAVE_STORAGE) === '1';
        } catch (_) {
            return true;
        }
    }
    function marcarVisto() {
        try { localStorage.setItem(CLAVE_STORAGE, '1'); } catch (_) {}
    }
    // Detección de Dispositivo 
    function esDispositivoMovil() {
        // Si la pantalla es chica o si el dispositivo primario es táctil
        return window.innerWidth < 768 || (window.matchMedia && window.matchMedia("(pointer: coarse)").matches);
    }

    //  Construir el overlay 
    function construirOverlay() {
        var overlay = document.createElement('div');
        overlay.id = 'overlay-onboarding';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-labelledby', 'onb-titulo-1'); // Lee el primer título al abrir

        var txtNavegacion = esDispositivoMovil() 
            ? '📱 <strong>Navegación:</strong> Deslizá hacia arriba o tocá el menú de tres rayitas (☰) arriba para buscar lo que necesites.'
            : '🖱️ <strong>Navegación:</strong> Usá el mouse y el teclado para explorar las categorías y usar el buscador en pantalla.';

        overlay.innerHTML =
            '<div class="onb-panel" id="panel-onboarding">' +

                // Paso 1: Bienvenida emocional
                '<div class="onb-paso" id="onb-paso-1" aria-live="polite">' +
                    '<div class="onb-icono" aria-hidden="true">👋</div>' +
                    '<h2 class="onb-titulo" id="onb-titulo-1" tabindex="-1">¡Buenas!</h2>' +
                    '<p class="onb-texto">Este espacio es para vos, sin importar cuánto sabés de tecnología.</p>' +
                    '<p class="onb-texto">Acá vas a encontrar diversos pasos a pasos para hacer trámites por internet, cuidar tus datos y entender el mundo digital en general, mayormente todo sencillo sin tantos tecnisismos.</p>' +
                    '<p class="onb-texto"><strong>Empezás de cero, a tu ritmo.</strong></p>' +
                    '<button class="onb-btn-siguiente onb-btn-foco" id="onb-btn-1" aria-label="Siguiente paso: elegir por dónde empezar">Seguir →</button>' +
                '</div>' +

                // Paso 2: Orientación por necesidad
                '<div class="onb-paso oculto" id="onb-paso-2" aria-live="polite">' +
                    '<div class="onb-icono" aria-hidden="true">🗂️</div>' +
                    '<h2 class="onb-titulo" id="onb-titulo-2" tabindex="-1">Categorías</h2>' +
                    '<p class="onb-texto">Tocá en una para ingresar:</p>' +
                    '<div class="onb-opciones" role="group" aria-label="Opciones de categorías">' +
                        '<button class="onb-opcion onb-btn-foco" data-categoria="todos">' +
                            '<span class="onb-opcion-icono" aria-hidden="true">📋</span>' +
                            '<span><strong>Ver todo</strong><br>Explorar libremente</span>' +
                        '</button>' +
                    '</div>' +
                        '<button class="onb-opcion onb-btn-foco" data-categoria="tramites">' +
                            '<span class="onb-opcion-icono" aria-hidden="true">🏛️</span>' +
                            '<span><strong>Capital Humano</strong><br>ANSES, CUIL, Mi Argentina</span>' +
                        '</button>' +
                        '<button class="onb-opcion onb-btn-foco" data-categoria="cuidado">' +
                            '<span class="onb-opcion-icono" aria-hidden="true">🛡️</span>' +
                            '<span><strong>Cuidado Digital</strong><br>Evitar estafas</span>' +
                        '</button>' +
                        '<button class="onb-opcion onb-btn-foco" data-categoria="inteligencia_artificial">' +
                            '<span class="onb-opcion-icono" aria-hidden="true">🤖</span>' +
                            '<span><strong>Inteligencia Artificial</strong><br>Qué es y cómo usarla</span>' +
                        '</button>' +
                '</div>' +
                // Paso 3: Recordatorio y Adaptación de Dispositivo
                '<div class="onb-paso oculto" id="onb-paso-3" aria-live="polite">' +
                    '<div class="onb-icono" aria-hidden="true">🧡</div>' +
                    '<h2 class="onb-titulo" id="onb-titulo-3" tabindex="-1">Una cosa más</h2>' +
                    '<p class="onb-texto" style="background:#f0f8ff; padding:10px; border-radius:8px; color:#0056b3;">' + txtNavegacion + '</p>' +
                    '<p class="onb-texto">Si algo no se entiende, está bien volver a intentarlo. Aprender con otra persona es perfectamente válido.</p>' +
                    '<button class="onb-btn-empezar onb-btn-foco" id="onb-btn-empezar" aria-label="Cerrar bienvenida y empezar a usar la aplicación">¡INICIAR! →</button>' +
                '</div>' +

                // Indicador de paso
                '<div class="onb-indicador" aria-hidden="true">' +
                    '<span class="onb-punto onb-punto-activo" data-paso="1"></span>' +
                    '<span class="onb-punto" data-paso="2"></span>' +
                    '<span class="onb-punto" data-paso="3"></span>' +
                '</div>' +
            '</div>';
        return overlay;
    }
    // Navegar entre pasos 
    function irAPaso(n) {
        var anterior = document.getElementById('onb-paso-' + pasoActual);
        var siguiente = document.getElementById('onb-paso-' + n);
        
        if (anterior) anterior.classList.add('oculto');
        if (siguiente) siguiente.classList.remove('oculto');
        
        pasoActual = n;

        document.querySelectorAll('.onb-punto').forEach(function (p) {
            p.classList.toggle('onb-punto-activo', parseInt(p.dataset.paso) === n);
        });

        // Foco accesible: forzamos a los lectores de pantalla a leer el nuevo título
        if (siguiente) {
            var titulo = siguiente.querySelector('.onb-titulo');
            if (titulo) {
                // Actualizar el label del dialog entero
                document.getElementById('overlay-onboarding').setAttribute('aria-labelledby', titulo.id);
                titulo.focus();
            }
        }
    }

    // Cerrar y aplicar categoría 
    function cerrar() {
        marcarVisto();
        var overlay = document.getElementById('overlay-onboarding');
        
        if (overlay) {
            overlay.classList.add('onb-saliendo');
            setTimeout(function () {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                document.body.style.overflow = '';
                // Devolver foco a donde estaba antes de abrir el onboarding
                if (elementoPrevioAlFoco) elementoPrevioAlFoco.focus();
            }, 300);
        }

        if (categoriaElegida && categoriaElegida !== 'todos') {
            if (window.PD_UI && window.PD_UI.filtrarPorCategoria) {
                window.PD_UI.filtrarPorCategoria(categoriaElegida);
            }
        }
    }

    //  Focus Trap (Trampa de Foco para Accesibilidad) ─
    function atraparFoco(e, overlay) {
        if (e.key !== 'Tab') return;

        var focusables = Array.from(overlay.querySelectorAll('.onb-btn-foco:not([disabled]), [tabindex="-1"]'));
        // Filtramos solo los que están visibles (no ocultos)
        var visibles = focusables.filter(function(el) {
            return el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0;
        });

        if (visibles.length === 0) return;

        var primerElemento = visibles[0];
        var ultimoElemento = visibles[visibles.length - 1];

        if (e.shiftKey && document.activeElement === primerElemento) {
            e.preventDefault();
            ultimoElemento.focus();
        } else if (!e.shiftKey && document.activeElement === ultimoElemento) {
            e.preventDefault();
            primerElemento.focus();
        }
    }

    // Mostrar 
    function mostrar() {
        if (document.getElementById('overlay-onboarding')) return;

        elementoPrevioAlFoco = document.activeElement; // Guardar estado
        pasoActual = 1;
        categoriaElegida = null;

        var overlay = construirOverlay();
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(function () {
            overlay.classList.add('onb-visible');
        });

        setTimeout(function () {
            var titulo = document.querySelector('#onb-paso-1 .onb-titulo');
            if (titulo) titulo.focus();
        }, 100);

        var btn1 = document.getElementById('onb-btn-1');
        if (btn1) btn1.addEventListener('click', function () { irAPaso(2); });

        document.querySelectorAll('.onb-opcion').forEach(function (btn) {
            btn.addEventListener('click', function () {
                categoriaElegida = this.dataset.categoria;
                document.querySelectorAll('.onb-opcion').forEach(function (b) {
                    b.classList.remove('onb-opcion-activa');
                    b.setAttribute('aria-pressed', 'false');
                });
                this.classList.add('onb-opcion-activa');
                this.setAttribute('aria-pressed', 'true');
                setTimeout(function () { irAPaso(3); }, 200);
            });
        });

        var btnEmpezar = document.getElementById('onb-btn-empezar');
        if (btnEmpezar) btnEmpezar.addEventListener('click', cerrar);

        overlay.addEventListener('keydown', function(e) {
            atraparFoco(e, overlay);
        });

        document.addEventListener('keydown', function onEsc(e) {
            if (e.key === 'Escape') {
                document.removeEventListener('keydown', onEsc);
                cerrar();
            }
        });
    }

    // Inicialización
    function init() {
        if (!yaVio()) {
            setTimeout(mostrar, 600);
        }
    }

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
