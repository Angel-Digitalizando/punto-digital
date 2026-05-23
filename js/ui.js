// =========================================================
// ui.js — Lógica de interfaz principal
// Punto Digital Comunitario Morenense
//
// Dependencias en carga: ninguna.
// Dependencias en runtime:
//   - window.baseDeTutoriales (tutoriales.js) — obligatorio
//   - window.PD_Storage       (storage.js)    — lazy
//   - window.PD_TutorialCard  (tutorialCard.js)— lazy
//   - window.PD_Progress      (progressBar.js) — lazy
//   - window.PD_Speech        (speech.js)      — lazy
//
// Side effects en init():
//   - Renderiza botones en #menu-tutoriales
//   - Inicializa buscador en #input-buscador
//   - Puede inyectar #btn-reciente en #introduccion
//   - Expone filtrarPorCategoria en window.PD_UI
// =========================================================

(function () {
    'use strict';

    // ── Mapa de categorías: clave → etiqueta y color ──────
    var CATEGORIAS = {
        tramites: {
            etiqueta: '🏛️ Trámites del Estado',
            descripcion: 'ANSES, CUIL, Mi Argentina y más',
            color: '#0B5AA2',
        },
        cuidado: {
            etiqueta: '🛡️ Cuidado Digital',
            descripcion: 'Estafas, contraseñas, páginas oficiales',
            color: '#C62828',
        },
        inteligencia_artificial: {
            etiqueta: '🤖 Inteligencia Artificial',
            descripcion: 'Qué es, cómo usarla con criterio',
            color: '#6f42c1',
        },
        acompanar: {
            etiqueta: '🤝 Acompañar a Otros',
            descripcion: 'Para quienes enseñan o ayudan',
            color: '#198754',
        },
    };

    var tutorialActualId  = null;
    var categoriaActiva   = null; // null = todas

    // ── Renderizar menú con categorías ───────────────────
    function renderizarMenu() {
        var db   = window.baseDeTutoriales;
        var menu = document.getElementById('menu-tutoriales');
        if (!db || !menu) return;

        menu.innerHTML = '';

        // Agrupar tutoriales por categoría
        var grupos = {};
        Object.entries(db).forEach(function (entrada) {
            var clave = entrada[0];
            var info  = entrada[1];
            var cat   = info.categoria || 'tramites';
            if (!grupos[cat]) grupos[cat] = [];
            grupos[cat].push({ clave: clave, info: info });
        });

        // Renderizar cada grupo en orden definido en CATEGORIAS
        Object.keys(CATEGORIAS).forEach(function (catClave) {
            var items = grupos[catClave];
            if (!items || items.length === 0) return;

            var catInfo = CATEGORIAS[catClave];

            // Encabezado de categoría
            var encabezado = document.createElement('div');
            encabezado.className = 'categoria-encabezado';
            encabezado.dataset.categoria = catClave;
            encabezado.innerHTML =
                '<h3 class="categoria-titulo" style="border-color:' + catInfo.color + '">' +
                    catInfo.etiqueta +
                '</h3>' +
                '<p class="categoria-desc">' + catInfo.descripcion + '</p>';
            menu.appendChild(encabezado);

            // Grid de botones para esta categoría
            var grid = document.createElement('div');
            grid.className = 'categoria-grid';
            grid.dataset.categoria = catClave;

            items.forEach(function (item) {
                var btn = document.createElement('button');
                btn.className = 'btn-menu';
                btn.dataset.clave     = item.clave;
                btn.dataset.categoria = catClave;
                btn.setAttribute('aria-label', 'Abrir tutorial: ' + item.info.titulo);
                btn.innerHTML =
                    item.info.icono + ' ' + item.info.titulo +
                    '<span class="btn-badge" aria-hidden="true"></span>';
                btn.addEventListener('click', function () {
                    mostrarTutorial(item.clave);
                });
                grid.appendChild(btn);
            });

            menu.appendChild(grid);
        });

        if (window.PD_Progress) window.PD_Progress.actualizarBotonesMenu();
    }

    // ── Filtrar menú por categoría ────────────────────────
    // Llamado por onboarding.js y deeplink.js.
    // null o 'todos' muestra todo.
    function filtrarPorCategoria(catClave) {
        categoriaActiva = (catClave === 'todos' || !catClave) ? null : catClave;

        document.querySelectorAll('.categoria-encabezado, .categoria-grid').forEach(function (el) {
            if (!categoriaActiva) {
                el.style.display = '';
            } else {
                el.style.display = (el.dataset.categoria === categoriaActiva) ? '' : 'none';
            }
        });

        // Actualizar tabs si existen
        document.querySelectorAll('.tab-categoria').forEach(function (tab) {
            tab.classList.toggle('tab-activo', tab.dataset.categoria === (categoriaActiva || 'todos'));
        });
    }

    // ── Renderizar tabs de categoría (sobre el menú) ──────
    function renderizarTabs() {
        var menu = document.getElementById('menu-tutoriales');
        if (!menu || document.getElementById('tabs-categorias')) return;

        var wrapper = document.createElement('div');
        wrapper.id = 'tabs-categorias';
        wrapper.setAttribute('role', 'tablist');
        wrapper.setAttribute('aria-label', 'Filtrar tutoriales por categoría');

        // Tab "Todos"
        var tabTodos = document.createElement('button');
        tabTodos.className = 'tab-categoria tab-activo';
        tabTodos.dataset.categoria = 'todos';
        tabTodos.setAttribute('role', 'tab');
        tabTodos.setAttribute('aria-selected', 'true');
        tabTodos.setAttribute('aria-label', 'Ver todos los tutoriales');
        tabTodos.textContent = '📋 Todos';
        tabTodos.addEventListener('click', function () {
            filtrarPorCategoria(null);
        });
        wrapper.appendChild(tabTodos);

        // Tab por categoría
        Object.keys(CATEGORIAS).forEach(function (catClave) {
            var db = window.baseDeTutoriales || {};
            var tieneItems = Object.values(db).some(function (t) {
                return t.categoria === catClave;
            });
            if (!tieneItems) return;

            var cat = CATEGORIAS[catClave];
            var tab = document.createElement('button');
            tab.className = 'tab-categoria';
            tab.dataset.categoria = catClave;
            tab.setAttribute('role', 'tab');
            tab.setAttribute('aria-selected', 'false');
            tab.setAttribute('aria-label', 'Ver tutoriales de ' + cat.etiqueta);
            tab.textContent = cat.etiqueta;
            tab.addEventListener('click', function () {
                // Actualizar aria-selected
                document.querySelectorAll('.tab-categoria').forEach(function (t) {
                    t.setAttribute('aria-selected', 'false');
                    t.classList.remove('tab-activo');
                });
                tab.setAttribute('aria-selected', 'true');
                tab.classList.add('tab-activo');
                filtrarPorCategoria(catClave);
            });
            wrapper.appendChild(tab);
        });

        menu.parentNode.insertBefore(wrapper, menu);
    }

    // ── Mostrar tutorial ──────────────────────────────────
    function mostrarTutorial(idClave) {
        var db = window.baseDeTutoriales;
        if (!db || !db[idClave]) return;

        tutorialActualId = idClave;
        var info       = db[idClave];
        var totalPasos = info.pasos.length;

        if (window.PD_Storage) window.PD_Storage.guardarTutorialReciente(idClave);

        // Ocultar secciones del menú
        ['menu-tutoriales', 'tabs-categorias', 'introduccion',
         'seccion-buscador', 'seccion-favoritos', 'seccion-progreso']
            .forEach(function (id) {
                var el = document.getElementById(id);
                if (el) el.classList.add('oculto');
            });

        // Construir pasos
        var pasosHtml = '';
        info.pasos.forEach(function (texto, idx) {
            pasosHtml +=
                '<div class="paso-tutorial" id="paso-' + idx + '"' +
                    ' role="listitem"' +
                    ' aria-label="Paso ' + (idx + 1) + ' de ' + totalPasos + '">' +
                    '<h3>Paso ' + (idx + 1) + '</h3>' +
                    '<p>' + texto + '</p>' +
                '</div>';
        });

        // Nota de cierre (opcional por tutorial)
        var notaHtml = '';
        if (info.nota) {
            notaHtml =
                '<div class="nota-tutorial" role="note">' +
                    info.nota +
                '</div>';
        }

        var contenedor = document.getElementById('contenido-dinamico');
        if (!contenedor) return;

        contenedor.innerHTML =
            '<h2 id="titulo-tutorial" tabindex="-1"' +
                ' style="color:var(--azul-oscuro);font-size:2rem;margin-bottom:10px;">' +
                info.icono + ' ' + info.titulo +
            '</h2>' +
            '<p id="detalle-tutorial"' +
                ' style="margin-bottom:20px;font-style:italic;color:#555;">' +
                info.detalle +
            '</p>' +
            '<div id="indicador-progreso" role="status" aria-live="polite"></div>' +
            '<hr style="border:0;height:2px;background:var(--celeste-arg);margin:18px 0;">' +
            '<div role="list" id="lista-pasos">' + pasosHtml + '</div>' +
            notaHtml +
            '<button id="btn-finalizar-tutorial" class="btn-menu"' +
                ' style="margin-top:25px;text-align:center;display:block;width:100%;' +
                        'background:var(--azul-oscuro);color:white;"' +
                ' aria-label="Terminé el tutorial, volver al inicio">' +
                '✅ Entendí todo, volver al inicio' +
            '</button>';

        renderizarBarraPasos(1, totalPasos);

        if (window.PD_TutorialCard) {
            window.PD_TutorialCard.inyectarAccionesTutorial(idClave);
        }

        document.getElementById('btn-finalizar-tutorial')
            .addEventListener('click', ocultarTutorial);

        var zona = document.getElementById('zona-tutorial');
        if (zona) zona.classList.remove('oculto');

        // Foco accesible al título del tutorial
        setTimeout(function () {
            var titulo = document.getElementById('titulo-tutorial');
            if (titulo) titulo.focus();
        }, 80);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ── Ocultar tutorial y volver al menú ────────────────
    function ocultarTutorial() {
        if (window.PD_Speech) window.PD_Speech.detener();

        var zona = document.getElementById('zona-tutorial');
        if (zona) zona.classList.add('oculto');

        ['menu-tutoriales', 'tabs-categorias', 'introduccion',
         'seccion-buscador', 'seccion-favoritos', 'seccion-progreso']
            .forEach(function (id) {
                var el = document.getElementById(id);
                if (el) el.classList.remove('oculto');
            });

        var accionesEl = document.getElementById('acciones-tutorial');
        if (accionesEl) accionesEl.parentNode.removeChild(accionesEl);

        if (window.PD_TutorialCard) window.PD_TutorialCard.renderizarSeccionFavoritos();
        if (window.PD_Progress)     window.PD_Progress.actualizarBotonesMenu();

        // Restaurar filtro de categoría activo
        if (categoriaActiva) filtrarPorCategoria(categoriaActiva);

        tutorialActualId = null;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        lanzarConfeti();
    }

    // ── Barra de progreso de pasos ────────────────────────
    function renderizarBarraPasos(paso, total) {
        var cont = document.getElementById('indicador-progreso');
        if (!cont) return;
        var pct = Math.round((paso / total) * 100);
        cont.innerHTML =
            '<span class="texto-progreso">Paso ' + paso + ' de ' + total + '</span>' +
            '<div class="barra-progreso-wrap" aria-hidden="true">' +
                '<div class="barra-progreso-fill" style="width:' + pct + '%"></div>' +
            '</div>';
    }

    // ── Buscador ──────────────────────────────────────────
    function inicializarBuscador() {
        var input    = document.getElementById('input-buscador');
        var contador = document.getElementById('contador-resultados');
        if (!input) return;

        input.addEventListener('input', function () {
            var t   = this.value.trim().toLowerCase();
            var vis = 0;

            document.querySelectorAll('#menu-tutoriales .btn-menu').forEach(function (btn) {
                // Respetar filtro de categoría activo
                var enCategoria = !categoriaActiva || btn.dataset.categoria === categoriaActiva;
                var enBusqueda  = !t || btn.textContent.toLowerCase().indexOf(t) !== -1;
                var mostrar     = enCategoria && enBusqueda;
                btn.style.display = mostrar ? '' : 'none';
                if (mostrar) vis++;
            });

            // Ocultar encabezados de categorías vacías
            document.querySelectorAll('.categoria-encabezado').forEach(function (enc) {
                var cat   = enc.dataset.categoria;
                var grid  = document.querySelector('.categoria-grid[data-categoria="' + cat + '"]');
                var tieneVisibles = grid && grid.querySelector('.btn-menu:not([style*="none"])');
                enc.style.display = tieneVisibles ? '' : 'none';
                if (grid) grid.style.display = tieneVisibles ? '' : 'none';
            });

            if (contador) {
                contador.textContent = t
                    ? vis + ' resultado' + (vis !== 1 ? 's' : '') + ' encontrado' + (vis !== 1 ? 's' : '')
                    : '';
            }
        });

        input.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                this.value = '';
                this.dispatchEvent(new Event('input'));
            }
        });
    }

    // ── Tutorial reciente ─────────────────────────────────
    function mostrarBotonReciente() {
        var store = window.PD_Storage;
        var db    = window.baseDeTutoriales;
        if (!store || !db) return;

        var reciente = store.obtenerTutorialReciente();
        if (!reciente || !db[reciente.id]) return;

        var intro = document.getElementById('introduccion');
        if (!intro || document.getElementById('btn-reciente')) return;

        var info = db[reciente.id];
        var div  = document.createElement('div');
        div.id = 'btn-reciente';
        div.className = 'reciente-wrap';

        var p   = document.createElement('p');
        p.className   = 'reciente-label';
        p.textContent = '📌 Continuaste recientemente:';

        var btn = document.createElement('button');
        btn.className = 'btn-reciente-item';
        btn.setAttribute('aria-label', 'Retomar tutorial: ' + info.titulo);
        btn.textContent = info.icono + ' Retomar: ' + info.titulo;
        btn.addEventListener('click', function () { mostrarTutorial(reciente.id); });

        div.appendChild(p);
        div.appendChild(btn);
        intro.appendChild(div);
    }

    // ── Confeti ───────────────────────────────────────────
    function lanzarConfeti() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        for (var i = 0; i < 70; i++) {
            (function () {
                var p = document.createElement('div');
                p.style.cssText =
                    'position:fixed;width:9px;height:9px;border-radius:50%;' +
                    'background:hsl(' + Math.round(Math.random() * 360) + ',100%,55%);' +
                    'left:' + (Math.random() * 100) + 'vw;top:-10px;z-index:9999;pointer-events:none';
                document.body.appendChild(p);
                var a = p.animate([
                    { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                    { transform: 'translateY(' + (window.innerHeight + 20) + 'px) rotate(' + Math.round(Math.random() * 360) + 'deg)', opacity: 0 }
                ], { duration: Math.round(Math.random() * 1000) + 900, easing: 'ease-in', fill: 'forwards' });
                a.onfinish = function () { if (p.parentNode) p.parentNode.removeChild(p); };
            })();
        }
    }

    // ── Inicialización ────────────────────────────────────
    function init() {
        renderizarMenu();
        renderizarTabs();
        inicializarBuscador();
        mostrarBotonReciente();

        if (window.PD_TutorialCard) window.PD_TutorialCard.renderizarSeccionFavoritos();

        if (window.PD_Progress) {
            window.PD_Progress.inyectarProgresoGlobal();
            window.PD_Progress.actualizarProgreso();
        }

        var btnVolver = document.getElementById('btn-volver');
        if (btnVolver) btnVolver.addEventListener('click', ocultarTutorial);
    }

    // ── API pública ───────────────────────────────────────
    window.mostrarTutorial   = mostrarTutorial;
    window.ocultarTutorial   = ocultarTutorial;
    window.lanzarConfeti     = lanzarConfeti;

    if (!window.PD_UI) window.PD_UI = {};
    window.PD_UI.filtrarPorCategoria = filtrarPorCategoria;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
