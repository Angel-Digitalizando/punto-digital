<<<<<<< HEAD
// ============================
// ui.js - Lógica de interfaz principal
// Punto Digital Comunitario Morenense
// v3 (Junio 2026) — Navegación guiada + Acordeón
//
// Dependencias en runtime:
//   - window.baseDeTutoriales (tutoriales.js) — obligatorio
//   - window.PD_Storage, PD_TutorialCard, PD_Progress, PD_Speech — lazy
// ==============================
=======
// =========================================================
// ui.js — Lógica de interfaz principal
// Punto Digital Comunitario Morenense
//
// v3 (Junio 2026) — Navegación guiada + Acordeón
//
// CAMBIOS PRINCIPALES:
//   - Sistema de "vistas" (HOME → CATEGORIA → TUTORIAL)
//     con transición de panel en lugar de scroll acumulativo.
//   - Categorías como acordeón: se expanden/cierran al tocar.
//   - Feedback inmediato en cada interacción (clase .entrando).
//   - Buscador conectado al acordeón.
//   - API pública invariante mantenida.
//
// Dependencias en runtime:
//   - window.baseDeTutoriales (tutoriales.js) — obligatorio
//   - window.PD_Storage, PD_TutorialCard, PD_Progress, PD_Speech — lazy
// =========================================================
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7

(() => {
    'use strict';

<<<<<<< HEAD
    // ─── Mapa de categorías ───────────────────────────────────────────────────
    const CATEGORIAS = {
        tramites: {
            etiqueta:    '🏛️ Trámites del Capital Humano',
=======
    // ── Mapa de categorías ────────────────────────────────
    const CATEGORIAS = {
        tramites: {
            etiqueta:    '🏛️ Trámites del Estado',
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
            descripcion: 'ANSES, CUIL, Mi Argentina y más',
            color:       '#0B5AA2',
        },
        usos_tecnologia: {
<<<<<<< HEAD
            etiqueta:    '📱 Usos del Celular',
=======
            etiqueta:    '📱 Usos del Teléfono',
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
            descripcion: 'Herramientas del día a día para sacarle el jugo al celu',
            color:       '#E65100',
        },
        cuidado: {
            etiqueta:    '🛡️ Cuidado Digital',
            descripcion: 'Estafas, contraseñas, páginas oficiales',
            color:       '#C62828',
        },
<<<<<<< HEAD
        brecha_digital: {
            etiqueta:    '🌐 Brecha Digital',
            descripcion: 'Lectura introductoria sobre tecnología, acceso al conocimiento y ciudadanía digital.',
            color:       '#00796B',
            esArticulo:  true,
            url:         './page/brecha-digital.html',
        },
=======
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
        inteligencia_artificial: {
            etiqueta:    '🤖 Inteligencia Artificial',
            descripcion: 'Qué es, cómo usarla con criterio',
            color:       '#6f42c1',
        },
        acompanar: {
            etiqueta:    '🤝 Acompañar a Otros',
            descripcion: 'Para quienes enseñan o ayudan',
            color:       '#198754',
        },
    };

    let tutorialActualId = null;
<<<<<<< HEAD
    let categoriaActiva  = null;

    // ─── Sistema de vistas (home / tutorial) ─────────────────────────────────
=======
    let categoriaActiva  = null;  // solo para buscador/tabs externo

    // ─────────────────────────────────────────────────────
    // SISTEMA DE VISTAS
    // home → muestra intro + menú acordeón
    // tutorial → muestra zona-tutorial, oculta el resto
    // ─────────────────────────────────────────────────────

>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
    const SECCIONES_MENU = [
        'menu-tutoriales', 'tabs-categorias', 'introduccion',
        'seccion-buscador', 'seccion-favoritos', 'seccion-progreso',
    ];

    function irAVistaTutorial() {
        SECCIONES_MENU.forEach(id => {
            document.getElementById(id)?.classList.add('oculto');
        });
        const zona = document.getElementById('zona-tutorial');
        zona?.classList.remove('oculto');
<<<<<<< HEAD
=======
        // Feedback visual: pequeño flash de entrada
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
        zona?.classList.add('vista-entrando');
        setTimeout(() => zona?.classList.remove('vista-entrando'), 400);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function irAVistaHome() {
        document.getElementById('zona-tutorial')?.classList.add('oculto');
        SECCIONES_MENU.forEach(id => {
            document.getElementById(id)?.classList.remove('oculto');
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

<<<<<<< HEAD
    // ─── Acordeón de categorías ───────────────────────────────────────────────
    const acordeonAbierto = new Set();

    function toggleAcordeon(catClave, forzarAbrir) {
        const grid   = document.querySelector(`.categoria-grid[data-categoria="${catClave}"]`);
        const header = document.querySelector(`.acord-header[data-categoria="${catClave}"]`);
        if (!grid || !header) return;
        const abrir = forzarAbrir !== undefined ? forzarAbrir : !acordeonAbierto.has(catClave);
=======
    // ─────────────────────────────────────────────────────
    // ACORDEÓN DE CATEGORÍAS
    // ─────────────────────────────────────────────────────

    // Estado: qué categorías están abiertas
    const acordeonAbierto = new Set();

    function toggleAcordeon(catClave, forzarAbrir) {
        const grid = document.querySelector(`.categoria-grid[data-categoria="${catClave}"]`);
        const header = document.querySelector(`.acord-header[data-categoria="${catClave}"]`);
        if (!grid || !header) return;

        const estaAbierto = acordeonAbierto.has(catClave);
        const abrir = forzarAbrir !== undefined ? forzarAbrir : !estaAbierto;

>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
        if (abrir) {
            acordeonAbierto.add(catClave);
            grid.classList.remove('acord-cerrado');
            grid.classList.add('acord-abierto');
            header.classList.add('acord-header-activo');
            header.setAttribute('aria-expanded', 'true');
<<<<<<< HEAD
            setTimeout(() => header.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
=======
            // Scroll suave hacia la categoría abierta
            setTimeout(() => {
                header.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 80);
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
        } else {
            acordeonAbierto.delete(catClave);
            grid.classList.remove('acord-abierto');
            grid.classList.add('acord-cerrado');
            header.classList.remove('acord-header-activo');
            header.setAttribute('aria-expanded', 'false');
        }
    }

<<<<<<< HEAD
    // ─── Visor modal de categoría ─────────────────────────────────────────────
=======
    // ─────────────────────────────────────────────────────
    // VISOR MODAL DE CATEGORÍA
    // Se abre como bottom-sheet (mobile) / modal centrado (desktop)
    // cuando el usuario toca un acordeón de categoría.
    // ─────────────────────────────────────────────────────

>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
    let visorAbierto = false;

    function inyectarVisor() {
        if (document.getElementById('visor-categoria')) return;
<<<<<<< HEAD
        const visor   = document.createElement('div');
=======

        const visor = document.createElement('div');
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
        visor.id = 'visor-categoria';
        visor.setAttribute('role', 'dialog');
        visor.setAttribute('aria-modal', 'true');
        visor.setAttribute('aria-label', 'Tutoriales de la categoría');
<<<<<<< HEAD
        const overlay = document.createElement('div');
        overlay.id = 'visor-overlay-cat';
        overlay.addEventListener('click', cerrarVisor);
        const panel = document.createElement('div');
        panel.className = 'visor-panel';
        panel.id = 'visor-panel';
        visor.appendChild(overlay);
        visor.appendChild(panel);
        document.body.appendChild(visor);
=======

        const overlay = document.createElement('div');
        overlay.id = 'visor-overlay-cat';
        overlay.addEventListener('click', cerrarVisor);

        const panel = document.createElement('div');
        panel.className = 'visor-panel';
        panel.id = 'visor-panel';

        visor.appendChild(overlay);
        visor.appendChild(panel);
        document.body.appendChild(visor);

        // Cerrar con Escape
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && visorAbierto) cerrarVisor();
        });
    }

    function abrirVisor(catClave, items, catInfo) {
        inyectarVisor();
        const visor = document.getElementById('visor-categoria');
        const panel = document.getElementById('visor-panel');
        if (!visor || !panel) return;

<<<<<<< HEAD
=======
        // Construir contenido del panel
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
        const botonesHtml = items.map(({ clave, info }) => `
            <button class="visor-btn-tutorial" data-clave="${clave}"
                    aria-label="Ver tutorial: ${info.titulo}">
                <span class="visor-tut-icono">${info.icono}</span>
                <span class="visor-tut-texto">
                    <span class="visor-tut-titulo">${info.titulo}</span>
                    <span class="visor-tut-detalle">${info.detalle || ''}</span>
                </span>
                <span class="visor-tut-flecha" aria-hidden="true">›</span>
            </button>
        `).join('');

        panel.innerHTML = `
            <div class="visor-header">
                <span class="visor-titulo">${catInfo.etiqueta}</span>
                <button class="visor-btn-cerrar" id="visor-btn-cerrar"
                        aria-label="Cerrar panel de tutoriales">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <path d="M3.5 3.5L14.5 14.5M14.5 3.5L3.5 14.5"
                              stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
            <p class="visor-desc">${catInfo.descripcion}</p>
            <div class="visor-lista">${botonesHtml}</div>
        `;

<<<<<<< HEAD
        const btnCerrarVisor = document.getElementById('visor-btn-cerrar');
        if (btnCerrarVisor) {
            btnCerrarVisor.addEventListener('click', (e) => {
                e.stopImmediatePropagation();
                e.preventDefault();
                cerrarVisor();
            }, true);
            btnCerrarVisor.addEventListener('touchend', (e) => {
                e.stopImmediatePropagation();
                e.preventDefault();
                cerrarVisor();
            }, { passive: false, capture: true });
        }
=======
        // Eventos dentro del visor
                const btnCerrarVisor = document.getElementById('visor-btn-cerrar');
                if (btnCerrarVisor) {
                    btnCerrarVisor.addEventListener('click', (e) => {
                        e.stopImmediatePropagation();
                        e.preventDefault();
                        cerrarVisor();
                    }, true);
                    btnCerrarVisor.addEventListener('touchend', (e) => {
                        e.stopImmediatePropagation();
                        e.preventDefault();
                        cerrarVisor();
                    }, { passive: false, capture: true });
                }
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7

        panel.querySelectorAll('.visor-btn-tutorial').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const clave = btn.dataset.clave;
                cerrarVisor();
                setTimeout(() => mostrarTutorial(clave), 60);
            });
        });

<<<<<<< HEAD
        visorAbierto = true;
        document.body.style.overflow = 'hidden';
        visor.classList.add('visor-visible');
=======
        // Mostrar
        visorAbierto = true;
        document.body.style.overflow = 'hidden';
        visor.classList.add('visor-visible');

        // No se hace focus() automático al abrir el visor.
        // El usuario decide qué tutorial tocar.
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
    }

    function cerrarVisor() {
        const visor = document.getElementById('visor-categoria');
        if (!visor) return;
        visor.classList.remove('visor-visible');
        visorAbierto = false;
        document.body.style.overflow = '';
    }

<<<<<<< HEAD
    // ─── Renderizar menú (acordeones que abren el visor modal) ───────────────
=======
    // ─────────────────────────────────────────────────────
    // RENDERIZAR MENÚ — Acordeones que abren el visor modal
    // ─────────────────────────────────────────────────────

>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
    const renderizarMenu = () => {
        const db   = window.baseDeTutoriales;
        const menu = document.getElementById('menu-tutoriales');
        if (!db || !menu) return;
<<<<<<< HEAD
=======

>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
        menu.innerHTML = '';
        inyectarVisor();

        const grupos = {};
        Object.entries(db).forEach(([clave, info]) => {
            const cat = info.categoria || 'tramites';
            if (!grupos[cat]) grupos[cat] = [];
            grupos[cat].push({ clave, info });
        });

<<<<<<< HEAD
        Object.keys(CATEGORIAS).forEach((catClave) => {
            const catInfo = CATEGORIAS[catClave];

            // Categorías tipo-artículo: redirección directa, sin tutoriales propios
            if (catInfo.esArticulo) {
                const headerArticulo = document.createElement('button');
                headerArticulo.className = 'acord-header';
                headerArticulo.dataset.categoria = catClave;
                headerArticulo.setAttribute('aria-label', `${catInfo.etiqueta} — Ir a la sección`);
                headerArticulo.style.setProperty('--cat-color', catInfo.color);
                headerArticulo.innerHTML = `
                    <span class="acord-icono-cat">${catInfo.etiqueta.split(' ')[0]}</span>
                    <span class="acord-texto">
                        <span class="acord-titulo-cat">${catInfo.etiqueta.replace(/^\S+\s/, '')}</span>
                        <span class="acord-desc-cat">${catInfo.descripcion}</span>
                    </span>
                    <span class="acord-chevron" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M4 6.5L9 11.5L14 6.5" stroke="currentColor" stroke-width="2.2"
                                  stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                `;
                headerArticulo.addEventListener('click', () => {
                    if (catInfo.url) window.location.href = catInfo.url;
                });
                menu.appendChild(headerArticulo);
                return;
            }

            const items = grupos[catClave];
            if (!items || items.length === 0) return;

=======
        // También construir un grid oculto para el buscador de página
        Object.keys(CATEGORIAS).forEach((catClave) => {
            const items   = grupos[catClave];
            if (!items || items.length === 0) return;
            const catInfo = CATEGORIAS[catClave];

            // ── Acordeón header — toca → abre el visor modal ──
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
            const header = document.createElement('button');
            header.className = 'acord-header';
            header.dataset.categoria = catClave;
            header.setAttribute('aria-expanded', 'false');
            header.setAttribute('aria-label',
                `${catInfo.etiqueta} — ${items.length} tutorial${items.length > 1 ? 'es' : ''}. Tocá para ver`
            );
            header.style.setProperty('--cat-color', catInfo.color);
            header.innerHTML = `
                <span class="acord-icono-cat">${catInfo.etiqueta.split(' ')[0]}</span>
                <span class="acord-texto">
                    <span class="acord-titulo-cat">${catInfo.etiqueta.replace(/^\S+\s/, '')}</span>
                    <span class="acord-desc-cat">${catInfo.descripcion}</span>
                </span>
                <span class="acord-badge">${items.length}</span>
                <span class="acord-chevron" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M4 6.5L9 11.5L14 6.5"
                              stroke="currentColor" stroke-width="2.2"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
            `;
<<<<<<< HEAD
            header.addEventListener('click', () => {
                abrirVisor(catClave, items, catInfo);
            });
            menu.appendChild(header);

            // Grid oculto para el buscador
=======

            header.addEventListener('click', () => {
                abrirVisor(catClave, items, catInfo);
            });

            menu.appendChild(header);

            // Grid oculto — solo para que el buscador de página encuentre los .btn-menu
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
            const grid = document.createElement('div');
            grid.className = 'categoria-grid acord-cerrado';
            grid.id = `acord-grid-${catClave}`;
            grid.dataset.categoria = catClave;
<<<<<<< HEAD
            grid.style.display = 'none';
=======
            grid.style.display = 'none'; // visible solo al buscar
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7

            items.forEach(({ clave, info }) => {
                const btn = document.createElement('button');
                btn.className = 'btn-menu';
                btn.dataset.clave     = clave;
                btn.dataset.categoria = catClave;
                btn.setAttribute('aria-label', `Abrir tutorial: ${info.titulo}`);
                btn.innerHTML = `
                    <span class="btn-menu-icono">${info.icono}</span>
                    <span class="btn-menu-texto">
                        <span class="btn-menu-titulo">${info.titulo}</span>
                        <span class="btn-menu-detalle">${info.detalle || ''}</span>
                    </span>
                    <span class="btn-badge" aria-hidden="true"></span>
                `;
                btn.addEventListener('click', () => mostrarTutorial(clave));
                grid.appendChild(btn);
            });
<<<<<<< HEAD
=======

>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
            menu.appendChild(grid);
        });

        window.PD_Progress?.actualizarBotonesMenu();
    };

<<<<<<< HEAD
    // ─── Filtrar por categoría (compatible con tabs externos y deeplink) ──────
=======
    // ─────────────────────────────────────────────────────
    // FILTRAR — compatible con tabs externos y deeplink
    // ─────────────────────────────────────────────────────

>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
    const filtrarPorCategoria = (catClave) => {
        categoriaActiva = (catClave === 'todos' || !catClave) ? null : catClave;

        if (categoriaActiva) {
<<<<<<< HEAD
            const catInfo = CATEGORIAS[categoriaActiva];

            // Categoría tipo-artículo: redirección directa
            if (catInfo?.esArticulo) {
                if (catInfo.url) window.location.href = catInfo.url;
                return;
            }

            // Abrir el visor modal para la categoría seleccionada
            const db = window.baseDeTutoriales;
            if (db && catInfo) {
=======
            // Abrir el visor modal directamente para la categoría seleccionada
            const db = window.baseDeTutoriales;
            if (db && CATEGORIAS[categoriaActiva]) {
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
                const grupos = {};
                Object.entries(db).forEach(([clave, info]) => {
                    const cat = info.categoria || 'tramites';
                    if (!grupos[cat]) grupos[cat] = [];
                    grupos[cat].push({ clave, info });
                });
                const items = grupos[categoriaActiva] || [];
                if (items.length > 0) {
<<<<<<< HEAD
                    abrirVisor(categoriaActiva, items, catInfo);
=======
                    abrirVisor(categoriaActiva, items, CATEGORIAS[categoriaActiva]);
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
                }
            }
        }

        // Sincronizar tabs externos
        document.querySelectorAll('.tab-categoria').forEach((tab) => {
            const activo = tab.dataset.categoria === (categoriaActiva || 'todos');
            tab.classList.toggle('tab-activo', activo);
            tab.setAttribute('aria-selected', String(activo));
        });
    };

<<<<<<< HEAD
    // ─── Renderizar tabs externos (encima del menú) ───────────────────────────
=======
    // ─────────────────────────────────────────────────────
    // RENDERIZAR TABS externos (encima del menú)
    // ─────────────────────────────────────────────────────

>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
    const renderizarTabs = () => {
        const menu = document.getElementById('menu-tutoriales');
        if (!menu || document.getElementById('tabs-categorias')) return;

        const wrapper = document.createElement('div');
        wrapper.id = 'tabs-categorias';
        wrapper.setAttribute('role', 'tablist');
        wrapper.setAttribute('aria-label', 'Filtrar tutoriales por categoría');

        const crearTab = (clave, texto, activo) => {
            const tab = document.createElement('button');
            tab.className = `tab-categoria${activo ? ' tab-activo' : ''}`;
            tab.dataset.categoria = clave;
            tab.setAttribute('role', 'tab');
            tab.setAttribute('aria-selected', String(activo));
            tab.setAttribute('aria-label', `Ver tutoriales: ${texto}`);
            tab.textContent = texto;
            tab.addEventListener('click', () => {
                document.querySelectorAll('.tab-categoria').forEach(t => {
                    t.classList.remove('tab-activo');
                    t.setAttribute('aria-selected', 'false');
                });
                tab.classList.add('tab-activo');
                tab.setAttribute('aria-selected', 'true');
                filtrarPorCategoria(clave === 'todos' ? null : clave);
<<<<<<< HEAD
=======
                // Scroll al menú
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
                menu.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            return tab;
        };

        wrapper.appendChild(crearTab('todos', '📋 Todos', true));
        Object.keys(CATEGORIAS).forEach((catClave) => {
<<<<<<< HEAD
            if (CATEGORIAS[catClave].esArticulo) return;
=======
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
            const db = window.baseDeTutoriales || {};
            if (!Object.values(db).some(t => t.categoria === catClave)) return;
            wrapper.appendChild(crearTab(catClave, CATEGORIAS[catClave].etiqueta, false));
        });

        menu.parentNode.insertBefore(wrapper, menu);
    };

<<<<<<< HEAD
    // ─── Mostrar tutorial (navega a paso-a-paso.html) ────────────────────────
=======
    // ─────────────────────────────────────────────────────
    // MOSTRAR TUTORIAL — con feedback visual
    // ─────────────────────────────────────────────────────

    const compartirTutorial = (idClave, info) => {
        const urlCompartir = `${window.location.origin}${window.location.pathname}?tutorial=${idClave}`;
        if (navigator.share) {
            navigator.share({
                title: info.titulo,
                text:  `Punto Digital: "${info.titulo}" — ${info.detalle}`,
                url:   urlCompartir,
            }).catch(() => {});
        } else {
            navigator.clipboard?.writeText(urlCompartir)
                .then(() => {
                    window.PD_Toast?.mostrarToast('📋 Enlace copiado', 'exito', 2500);
                })
                .catch(() => {
                    alert(`Enlace: ${urlCompartir}`);
                });
        }
    };

>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
    const mostrarTutorial = (idClave) => {
        const db = window.baseDeTutoriales;
        if (!db || !db[idClave]) return;

<<<<<<< HEAD
        window.PD_Storage?.guardarTutorialReciente(idClave);
        window.location.href = `./page/paso-a-paso.html?id=${idClave}`;
    };

    // ─── Ocultar tutorial — volver a home ────────────────────────────────────
    const ocultarTutorial = () => {
        window.PD_Speech?.detener();
        document.getElementById('acciones-tutorial')?.remove();
        document.getElementById('nav-tutorial')?.remove();
        irAVistaHome();
        window.PD_TutorialCard?.renderizarSeccionFavoritos();
        window.PD_Progress?.actualizarBotonesMenu();
        tutorialActualId = null;
    };

    // ─── Tutorial reciente ────────────────────────────────────────────────────
=======
        tutorialActualId = idClave;
        const info       = db[idClave];
        const totalPasos = info.pasos.length;

        window.PD_Storage?.guardarTutorialReciente(idClave);

        // Construir HTML del tutorial
        const pasosHtml = info.pasos.map((texto, idx) => `
            <div class="paso-tutorial" id="paso-${idx}" role="listitem"
                 aria-label="Paso ${idx + 1} de ${totalPasos}">
                <h3>Paso ${idx + 1}</h3>
                <p>${texto}</p>
            </div>
        `).join('');

        const notaHtml = info.nota
            ? `<div class="nota-tutorial" role="note">${info.nota}</div>`
            : '';

        const contenedor = document.getElementById('contenido-dinamico');
        if (!contenedor) return;

        contenedor.innerHTML = `
            <h2 id="titulo-tutorial" class="tutorial-titulo" tabindex="-1">
                ${info.icono} ${info.titulo}
            </h2>
            <p id="detalle-tutorial" class="tutorial-detalle">
                ${info.detalle}
            </p>
            <div class="barra-compartir-horizontal">
                <button id="btn-compartir-tutorial" class="btn-compartir-accion"
                    aria-label="Compartir este tutorial">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                         stroke-linejoin="round" aria-hidden="true">
                        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/>
                        <circle cx="18" cy="19" r="3"/>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                    Compartir
                </button>
            </div>
            <div id="indicador-progreso" role="status" aria-live="polite"></div>
            <hr class="tutorial-separador">
            <div role="list" id="lista-pasos">${pasosHtml}</div>
            ${notaHtml}
            <button id="btn-finalizar-tutorial" class="btn-finalizar"
                aria-label="Terminé el tutorial, volver al inicio">
                ✅ Entendí todo, volver al inicio
            </button>
        `;

        renderizarBarraPasos(1, totalPasos);
        window.PD_TutorialCard?.inyectarAccionesTutorial(idClave);
        inyectarNavTutorial(idClave);

        document.getElementById('btn-compartir-tutorial')
            .addEventListener('click', () => compartirTutorial(idClave, info));
        document.getElementById('btn-finalizar-tutorial')
            .addEventListener('click', ocultarTutorial);

        // ← Transición de vista (en lugar de solo quitar oculto)
        irAVistaTutorial();

        setTimeout(() => {
            document.getElementById('titulo-tutorial')?.focus();
        }, 120);
    };

    // ─────────────────────────────────────────────────────
    // OCULTAR TUTORIAL — volver a home
    // ─────────────────────────────────────────────────────

    const ocultarTutorial = () => {
        window.PD_Speech?.detener();

        document.getElementById('acciones-tutorial')?.remove();
        document.getElementById('nav-tutorial')?.remove();

        irAVistaHome();

        window.PD_TutorialCard?.renderizarSeccionFavoritos();
        window.PD_Progress?.actualizarBotonesMenu();

        // Mantener el estado de los acordeones (no resetear)
        tutorialActualId = null;
    };

    // ─────────────────────────────────────────────────────
    // BARRA DE PROGRESO DE PASOS
    // ─────────────────────────────────────────────────────

    const renderizarBarraPasos = (paso, total) => {
        const cont = document.getElementById('indicador-progreso');
        if (!cont) return;
        const pct = Math.round((paso / total) * 100);
        cont.innerHTML = `
            <span class="texto-progreso">Paso ${paso} de ${total}</span>
            <div class="barra-progreso-wrap" aria-hidden="true">
                <div class="barra-progreso-fill" style="width:${pct}%"></div>
            </div>
        `;
    };

    // ─────────────────────────────────────────────────────
    // LISTA ORDENADA DE TUTORIALES (para nav anterior/siguiente)
    // ─────────────────────────────────────────────────────

    const obtenerOrdenTutoriales = () => {
        const db = window.baseDeTutoriales;
        if (!db) return [];
        const orden = [];
        Object.keys(CATEGORIAS).forEach(catClave => {
            Object.entries(db).forEach(([clave, info]) => {
                if ((info.categoria || 'tramites') === catClave) orden.push(clave);
            });
        });
        Object.keys(db).forEach(clave => {
            if (!orden.includes(clave)) orden.push(clave);
        });
        return orden;
    };

    // ─────────────────────────────────────────────────────
    // NAVEGACIÓN ANTERIOR / SIGUIENTE
    // ─────────────────────────────────────────────────────

    const inyectarNavTutorial = (idClave) => {
        if (document.getElementById('nav-tutorial')) return;
        const db    = window.baseDeTutoriales;
        const orden = obtenerOrdenTutoriales();
        const idx   = orden.indexOf(idClave);
        if (idx === -1 || !db) return;

        const nav = document.createElement('div');
        nav.id = 'nav-tutorial';
        nav.className = 'nav-tutorial';
        nav.setAttribute('aria-label', 'Navegar entre tutoriales');

        const contador = document.createElement('p');
        contador.className = 'nav-tutorial-contador';
        contador.textContent = `Tutorial ${idx + 1} de ${orden.length}`;
        nav.appendChild(contador);

        const btnsRow = document.createElement('div');
        btnsRow.className = 'nav-tutorial-btns';

        if (idx > 0) {
            const ant    = db[orden[idx - 1]];
            const btnAnt = document.createElement('button');
            btnAnt.className = 'btn-nav btn-nav-anterior';
            btnAnt.setAttribute('aria-label', `Tutorial anterior: ${ant.titulo}`);
            const t = ant.titulo.length > 28 ? ant.titulo.substring(0, 26) + '…' : ant.titulo;
            btnAnt.innerHTML = `← ${ant.icono} ${t}`;
            btnAnt.addEventListener('click', () => mostrarTutorial(orden[idx - 1]));
            btnsRow.appendChild(btnAnt);
        } else {
            const ph = document.createElement('span');
            ph.className = 'nav-placeholder';
            btnsRow.appendChild(ph);
        }

        if (idx < orden.length - 1) {
            const sig    = db[orden[idx + 1]];
            const btnSig = document.createElement('button');
            btnSig.className = 'btn-nav btn-nav-siguiente';
            btnSig.setAttribute('aria-label', `Tutorial siguiente: ${sig.titulo}`);
            const t = sig.titulo.length > 28 ? sig.titulo.substring(0, 26) + '…' : sig.titulo;
            btnSig.innerHTML = `${sig.icono} ${t} →`;
            btnSig.addEventListener('click', () => mostrarTutorial(orden[idx + 1]));
            btnsRow.appendChild(btnSig);
        }

        nav.appendChild(btnsRow);

        const btnFinalizar = document.getElementById('btn-finalizar-tutorial');
        if (btnFinalizar) {
            btnFinalizar.parentNode.insertBefore(nav, btnFinalizar);
        } else {
            document.getElementById('contenido-dinamico')?.appendChild(nav);
        }
    };

    // ─────────────────────────────────────────────────────
    // BUSCADOR PRINCIPAL (en la página)
    // ─────────────────────────────────────────────────────

    const inicializarBuscador = () => {
        const input    = document.getElementById('input-buscador');
        const contador = document.getElementById('contador-resultados');
        if (!input) return;

        input.addEventListener('input', (e) => {
            const t = e.target.value.trim().toLowerCase();
            let vis = 0;

            if (!t) {
                // Sin texto: ocultar todos los grids (el visor modal se abre por click)
                document.querySelectorAll('#menu-tutoriales .categoria-grid').forEach(g => {
                    g.style.display = 'none';
                });
                document.querySelectorAll('#menu-tutoriales .acord-header').forEach(h => {
                    h.style.display = '';
                });
                if (contador) contador.textContent = '';
                return;
            }

            // Con texto: mostrar grids con resultados, ocultar los vacíos
            document.querySelectorAll('#menu-tutoriales .btn-menu').forEach((btn) => {
                const enCategoria = !categoriaActiva || btn.dataset.categoria === categoriaActiva;
                const enBusqueda  = btn.textContent.toLowerCase().includes(t);
                btn.style.display = (enCategoria && enBusqueda) ? '' : 'none';
                if (enCategoria && enBusqueda) vis++;
            });

            document.querySelectorAll('#menu-tutoriales .acord-header').forEach((h) => {
                const cat  = h.dataset.categoria;
                const grid = document.querySelector(`#menu-tutoriales .categoria-grid[data-categoria="${cat}"]`);
                const tieneVisibles = grid && grid.querySelector('.btn-menu:not([style*="none"])');
                h.style.display = tieneVisibles ? '' : 'none';
                if (grid) grid.style.display = tieneVisibles ? '' : 'none';
            });

            if (contador) {
                contador.textContent = `${vis} resultado${vis !== 1 ? 's' : ''} encontrado${vis !== 1 ? 's' : ''}`;
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                e.target.value = '';
                e.target.dispatchEvent(new Event('input'));
            }
        });
    };

    // ─────────────────────────────────────────────────────
    // TUTORIAL RECIENTE
    // ─────────────────────────────────────────────────────

>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
    const mostrarBotonReciente = () => {
        const store = window.PD_Storage;
        const db    = window.baseDeTutoriales;
        if (!store || !db) return;

        const reciente = store.obtenerTutorialReciente();
        if (!reciente || !db[reciente.id]) return;

        const intro = document.getElementById('introduccion');
        if (!intro || document.getElementById('btn-reciente')) return;

        const info = db[reciente.id];
        const div  = document.createElement('div');
        div.id = 'btn-reciente';
        div.className = 'reciente-wrap';

        const p = document.createElement('p');
        p.className = 'reciente-label';
        p.textContent = '📌 Continuaste recientemente:';

        const btn = document.createElement('button');
        btn.className = 'btn-reciente-item';
        btn.setAttribute('aria-label', `Retomar tutorial: ${info.titulo}`);
        btn.textContent = `${info.icono} Retomar: ${info.titulo}`;
        btn.addEventListener('click', () => mostrarTutorial(reciente.id));

        div.appendChild(p);
        div.appendChild(btn);
        intro.appendChild(div);
    };

<<<<<<< HEAD
    // ─── Inicialización ───────────────────────────────────────────────────────
=======
    // ─────────────────────────────────────────────────────
    // INICIALIZACIÓN
    // ─────────────────────────────────────────────────────

>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
    const init = () => {
        if (!window.baseDeTutoriales) {
            setTimeout(init, 100);
            return;
        }
<<<<<<< HEAD
        renderizarMenu();
        renderizarTabs();
        // inicializarBuscador(); // deshabilitado
        // mostrarBotonReciente(); // deshabilitado
=======

        renderizarMenu();
        renderizarTabs();
        inicializarBuscador();
        mostrarBotonReciente();

>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
        window.PD_TutorialCard?.renderizarSeccionFavoritos();

        if (window.PD_Progress) {
            window.PD_Progress.inyectarProgresoGlobal();
            window.PD_Progress.actualizarProgreso();
        }

        document.getElementById('btn-volver')?.addEventListener('click', ocultarTutorial);
    };

<<<<<<< HEAD
    // ─── API pública ──────────────────────────────────────────────────────────
    window.mostrarTutorial = mostrarTutorial;
    window.ocultarTutorial = ocultarTutorial;
=======
    // ── API pública ───────────────────────────────────────
    window.mostrarTutorial = mostrarTutorial;
    window.ocultarTutorial = ocultarTutorial;

>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
    if (!window.PD_UI) window.PD_UI = {};
    window.PD_UI.filtrarPorCategoria = filtrarPorCategoria;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
<<<<<<< HEAD

=======
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
})();
