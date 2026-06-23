// ============================
// ui.js - Lógica de interfaz principal
// Punto Digital Comunitario Morenense
// v3 (Junio 2026) — Navegación guiada + Acordeón
//
// Dependencias en runtime:
//   - window.baseDeTutoriales (tutoriales.js) — obligatorio
//   - window.PD_Storage, PD_TutorialCard, PD_Progress, PD_Speech — lazy
// ==============================

(() => {
    'use strict';

    // ─── Mapa de categorías ───────
    const CATEGORIAS = {
        tramites: {
            etiqueta:    '🏛️ Trámites del Capital Humano',
            descripcion: 'ANSES, CUIL, Mi Argentina y más',
            color:       '#0B5AA2',
        },
        usos_tecnologia: {
            etiqueta:    '📱 Usos del Celular',
            descripcion: 'Herramientas del día a día para sacarle el jugo al celu',
            color:       '#E65100',
        },
        cuidado: {
            etiqueta:    '🛡️ Cuidado Digital',
            descripcion: 'Estafas, contraseñas, páginas oficiales',
            color:       '#C62828',
        },
        brecha_digital: {
            etiqueta:    '🌐 Brecha Digital',
            descripcion: 'Lectura introductoria sobre tecnología, acceso al conocimiento y ciudadanía digital.',
            color:       '#00796B',
            esArticulo:  true,
            url:         './page/brecha-digital.html',
        },
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
    let categoriaActiva  = null;

    // ─── Sistema de vistas (home / tutorial) 
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

    // ─── Acordeón de categorías ─
    const acordeonAbierto = new Set();

    function toggleAcordeon(catClave, forzarAbrir) {
        const grid   = document.querySelector(`.categoria-grid[data-categoria="${catClave}"]`);
        const header = document.querySelector(`.acord-header[data-categoria="${catClave}"]`);
        if (!grid || !header) return;
        const abrir = forzarAbrir !== undefined ? forzarAbrir : !acordeonAbierto.has(catClave);
        if (abrir) {
            acordeonAbierto.add(catClave);
            grid.classList.remove('acord-cerrado');
            grid.classList.add('acord-abierto');
            header.classList.add('acord-header-activo');
            header.setAttribute('aria-expanded', 'true');
            setTimeout(() => header.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
        } else {
            acordeonAbierto.delete(catClave);
            grid.classList.remove('acord-abierto');
            grid.classList.add('acord-cerrado');
            header.classList.remove('acord-header-activo');
            header.setAttribute('aria-expanded', 'false');
        }
    }

    // ─── Visor modal de categoría ─
    let visorAbierto = false;

    function inyectarVisor() {
        if (document.getElementById('visor-categoria')) return;
        const visor   = document.createElement('div');
        visor.id = 'visor-categoria';
        visor.setAttribute('role', 'dialog');
        visor.setAttribute('aria-modal', 'true');
        visor.setAttribute('aria-label', 'Tutoriales de la categoría');
        const overlay = document.createElement('div');
        overlay.id = 'visor-overlay-cat';
        overlay.addEventListener('click', cerrarVisor);
        const panel = document.createElement('div');
        panel.className = 'visor-panel';
        panel.id = 'visor-panel';
        visor.appendChild(overlay);
        visor.appendChild(panel);
        document.body.appendChild(visor);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && visorAbierto) cerrarVisor();
        });
    }

    function abrirVisor(catClave, items, catInfo) {
        inyectarVisor();
        const visor = document.getElementById('visor-categoria');
        const panel = document.getElementById('visor-panel');
        if (!visor || !panel) return;

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

        panel.querySelectorAll('.visor-btn-tutorial').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const clave = btn.dataset.clave;
                cerrarVisor();
                setTimeout(() => mostrarTutorial(clave), 60);
            });
        });

        visorAbierto = true;
        document.body.style.overflow = 'hidden';
        visor.classList.add('visor-visible');
    }

    function cerrarVisor() {
        const visor = document.getElementById('visor-categoria');
        if (!visor) return;
        visor.classList.remove('visor-visible');
        visorAbierto = false;
        document.body.style.overflow = '';
    }

    // ─── Renderizar menú (acordeones que abren el visor modal) ─
    const renderizarMenu = () => {
        const db   = window.baseDeTutoriales;
        const menu = document.getElementById('menu-tutoriales');
        if (!db || !menu) return;
        menu.innerHTML = '';
        inyectarVisor();

        const grupos = {};
        Object.entries(db).forEach(([clave, info]) => {
            const cat = info.categoria || 'tramites';
            if (!grupos[cat]) grupos[cat] = [];
            grupos[cat].push({ clave, info });
        });

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
            header.addEventListener('click', () => {
                abrirVisor(catClave, items, catInfo);
            });
            menu.appendChild(header);

            // Grid oculto para el buscador
            const grid = document.createElement('div');
            grid.className = 'categoria-grid acord-cerrado';
            grid.id = `acord-grid-${catClave}`;
            grid.dataset.categoria = catClave;
            grid.style.display = 'none';

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
            menu.appendChild(grid);
        });

        window.PD_Progress?.actualizarBotonesMenu();
    };

    // ─── Filtrar por categoría (compatible con tabs externos y deeplink) ──────
    const filtrarPorCategoria = (catClave) => {
        categoriaActiva = (catClave === 'todos' || !catClave) ? null : catClave;

        if (categoriaActiva) {
            const catInfo = CATEGORIAS[categoriaActiva];

            // Categoría tipo-artículo: redirección directa
            if (catInfo?.esArticulo) {
                if (catInfo.url) window.location.href = catInfo.url;
                return;
            }

            // Abrir el visor modal para la categoría seleccionada
            const db = window.baseDeTutoriales;
            if (db && catInfo) {
                const grupos = {};
                Object.entries(db).forEach(([clave, info]) => {
                    const cat = info.categoria || 'tramites';
                    if (!grupos[cat]) grupos[cat] = [];
                    grupos[cat].push({ clave, info });
                });
                const items = grupos[categoriaActiva] || [];
                if (items.length > 0) {
                    abrirVisor(categoriaActiva, items, catInfo);
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

    // ─── Renderizar tabs externos (encima del menú) 
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
                menu.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            return tab;
        };

        wrapper.appendChild(crearTab('todos', '📋 Todos', true));
        Object.keys(CATEGORIAS).forEach((catClave) => {
            if (CATEGORIAS[catClave].esArticulo) return;
            const db = window.baseDeTutoriales || {};
            if (!Object.values(db).some(t => t.categoria === catClave)) return;
            wrapper.appendChild(crearTab(catClave, CATEGORIAS[catClave].etiqueta, false));
        });

        menu.parentNode.insertBefore(wrapper, menu);
    };

    // ─── Mostrar tutorial (navega a paso-a-paso.html)
    const mostrarTutorial = (idClave) => {
        const db = window.baseDeTutoriales;
        if (!db || !db[idClave]) return;

        window.PD_Storage?.guardarTutorialReciente(idClave);
        window.location.href = `./page/paso-a-paso.html?id=${idClave}`;
    };

    // ─── Ocultar tutorial — volver a home 
    const ocultarTutorial = () => {
        window.PD_Speech?.detener();
        document.getElementById('acciones-tutorial')?.remove();
        document.getElementById('nav-tutorial')?.remove();
        irAVistaHome();
        window.PD_TutorialCard?.renderizarSeccionFavoritos();
        window.PD_Progress?.actualizarBotonesMenu();
        tutorialActualId = null;
    };

    // ─── Tutorial reciente 
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

    // ─── Inicialización 
    const init = () => {
        if (!window.baseDeTutoriales) {
            setTimeout(init, 100);
            return;
        }
        renderizarMenu();
        renderizarTabs();
        // inicializarBuscador(); // deshabilitado
        // mostrarBotonReciente(); // deshabilitado
        window.PD_TutorialCard?.renderizarSeccionFavoritos();

        if (window.PD_Progress) {
            window.PD_Progress.inyectarProgresoGlobal();
            window.PD_Progress.actualizarProgreso();
        }

        document.getElementById('btn-volver')?.addEventListener('click', ocultarTutorial);
    };

    // ─── API pública ─
    window.mostrarTutorial = mostrarTutorial;
    window.ocultarTutorial = ocultarTutorial;
    if (!window.PD_UI) window.PD_UI = {};
    window.PD_UI.filtrarPorCategoria = filtrarPorCategoria;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
