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
//   - Inicializa la Lupa Digital de accesibilidad
//   - Expone filtrarPorCategoria en window.PD_UI
// =========================================================

(() => {
    'use strict';

    // ── Mapa de categorías: clave → etiqueta y color ──────
    const CATEGORIAS = {
        tramites: {
            etiqueta: '🏛️ Trámites del Estado',
            descripcion: 'ANSES, CUIL, Mi Argentina y más',
            color: '#0B5AA2',
        },

        personalizacion: {
            etiqueta: '🎨 Organizar mi Celular'
            descripcion: 'Ajustes visuales, orden y pantallas',
            color: '#00838F',                                           
        },

        usos_tecnologia: {
            etiqueta: '📱 Usos del Teléfono',
            descripcion: 'Herramientas del día a día para sacarle el jugo al celu',
            color: '#E65100', // Naranja oscuro para buena visibilidad
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

    let tutorialActualId = null;
    let categoriaActiva  = null; // null = todas

    // ── Renderizar menú con categorías ───────────────────
    const renderizarMenu = () => {
        const db = window.baseDeTutoriales;
        const menu = document.getElementById('menu-tutoriales');
        if (!db || !menu) return;

        menu.innerHTML = '';

        // Agrupar tutoriales por categoría
        const grupos = {};
        Object.entries(db).forEach(([clave, info]) => {
            const cat = info.categoria || 'tramites';
            if (!grupos[cat]) grupos[cat] = [];
            grupos[cat].push({ clave, info });
        });

        // Renderizar cada grupo en orden definido en CATEGORIAS
        Object.keys(CATEGORIAS).forEach((catClave) => {
            const items = grupos[catClave];
            if (!items || items.length === 0) return;

            const catInfo = CATEGORIAS[catClave];

            // Encabezado de categoría
            const encabezado = document.createElement('div');
            encabezado.className = 'categoria-encabezado';
            encabezado.dataset.categoria = catClave;
            encabezado.innerHTML = `
                <h3 class="categoria-titulo" style="border-color:${catInfo.color}">
                    ${catInfo.etiqueta}
                </h3>
                <p class="categoria-desc">${catInfo.descripcion}</p>
            `;
            menu.appendChild(encabezado);

            // Grid de botones para esta categoría
            const grid = document.createElement('div');
            grid.className = 'categoria-grid';
            grid.dataset.categoria = catClave;

            items.forEach((item) => {
                const btn = document.createElement('button');
                btn.className = 'btn-menu';
                btn.dataset.clave = item.clave;
                btn.dataset.categoria = catClave;
                btn.setAttribute('aria-label', `Abrir tutorial: ${item.info.titulo}`);
                btn.innerHTML = `
                    ${item.info.icono} ${item.info.titulo}
                    <span class="btn-badge" aria-hidden="true"></span>
                `;
                btn.addEventListener('click', () => mostrarTutorial(item.clave));
                grid.appendChild(btn);
            });

            menu.appendChild(grid);
        });

        window.PD_Progress?.actualizarBotonesMenu();
    };

    // ── Filtrar menú por categoría ────────────────────────
    const filtrarPorCategoria = (catClave) => {
        categoriaActiva = (catClave === 'todos' || !catClave) ? null : catClave;

        document.querySelectorAll('.categoria-encabezado, .categoria-grid').forEach((el) => {
            if (!categoriaActiva) {
                el.style.display = '';
            } else {
                el.style.display = (el.dataset.categoria === categoriaActiva) ? '' : 'none';
            }
        });

        // Actualizar tabs si existen
        document.querySelectorAll('.tab-categoria').forEach((tab) => {
            tab.classList.toggle('tab-activo', tab.dataset.categoria === (categoriaActiva || 'todos'));
        });
    };

    // ── Renderizar tabs de categoría (sobre el menú) ──────
    const renderizarTabs = () => {
        const menu = document.getElementById('menu-tutoriales');
        if (!menu || document.getElementById('tabs-categorias')) return;

        const wrapper = document.createElement('div');
        wrapper.id = 'tabs-categorias';
        wrapper.setAttribute('role', 'tablist');
        wrapper.setAttribute('aria-label', 'Filtrar tutoriales por categoría');

        // Tab "Todos"
        const tabTodos = document.createElement('button');
        tabTodos.className = 'tab-categoria tab-activo';
        tabTodos.dataset.categoria = 'todos';
        tabTodos.setAttribute('role', 'tab');
        tabTodos.setAttribute('aria-selected', 'true');
        tabTodos.setAttribute('aria-label', 'Ver todos los tutoriales');
        tabTodos.textContent = '📋 Todos';
        tabTodos.addEventListener('click', () => filtrarPorCategoria(null));
        wrapper.appendChild(tabTodos);

        // Tab por categoría
        Object.keys(CATEGORIAS).forEach((catClave) => {
            const db = window.baseDeTutoriales || {};
            const tieneItems = Object.values(db).some((t) => t.categoria === catClave);
            if (!tieneItems) return;

            const cat = CATEGORIAS[catClave];
            const tab = document.createElement('button');
            tab.className = 'tab-categoria';
            tab.dataset.categoria = catClave;
            tab.setAttribute('role', 'tab');
            tab.setAttribute('aria-selected', 'false');
            tab.setAttribute('aria-label', `Ver tutoriales de ${cat.etiqueta}`);
            tab.textContent = cat.etiqueta;
            
            tab.addEventListener('click', () => {
                document.querySelectorAll('.tab-categoria').forEach((t) => {
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
    };

    // ── Lógica nativa de Compartir ────────────────────────
    const compartirTutorial = (idClave, info) => {
        const urlCompartir = `${window.location.origin}${window.location.pathname}?tutorial=${idClave}`;
        
        if (navigator.share) {
            navigator.share({
                title: info.titulo,
                text: `Te comparto este tutorial útil del Punto Digital: "${info.titulo}" (${info.detalle})`,
                url: urlCompartir
            }).catch((err) => console.log('Error al compartir:', err));
        } else {
            navigator.clipboard.writeText(urlCompartir).then(() => {
                alert('📌 ¡Enlace copiado! Ya podés pegarlo en WhatsApp o redes sociales para compartirlo con un vecino.');
            }).catch(() => {
                alert(`Compartir enlace: ${urlCompartir}`);
            });
        }
    };

    // ── Mostrar tutorial ──────────────────────────────────
    const mostrarTutorial = (idClave) => {
        const db = window.baseDeTutoriales;
        if (!db || !db[idClave]) return;

        tutorialActualId = idClave;
        const info = db[idClave];
        const totalPasos = info.pasos.length;

        window.PD_Storage?.guardarTutorialReciente(idClave);

        // Ocultar secciones del menú
        ['menu-tutoriales', 'tabs-categorias', 'introduccion', 'seccion-buscador', 'seccion-favoritos', 'seccion-progreso']
            .forEach((id) => {
                document.getElementById(id)?.classList.add('oculto');
            });

        // Construir pasos
        const pasosHtml = info.pasos.map((texto, idx) => `
            <div class="paso-tutorial" id="paso-${idx}" role="listitem" aria-label="Paso ${idx + 1} de ${totalPasos}">
                <h3>Paso ${idx + 1}</h3>
                <p>${texto}</p>
            </div>
        `).join('');

        // Nota de cierre (opcional por tutorial)
        const notaHtml = info.nota ? `<div class="nota-tutorial" role="note">${info.nota}</div>` : '';

        const contenedor = document.getElementById('contenido-dinamico');
        if (!contenedor) return;

        contenedor.innerHTML = `
            <h2 id="titulo-tutorial" tabindex="-1" style="color:var(--azul-oscuro);font-size:2rem;margin-bottom:10px;">
                ${info.icono} ${info.titulo}
            </h2>
            <p id="detalle-tutorial" style="margin-bottom:15px;font-style:italic;color:#555;">
                ${info.detalle}
            </p>
            
            <div class="barra-compartir-horizontal" style="display:flex; flex-direction:row; gap:12px; align-items:center; margin-bottom:20px; flex-wrap:wrap;">
                <button id="btn-compartir-tutorial" class="btn-compartir-accion" style="display:inline-flex; align-items:center; gap:8px; padding:10px 16px; background:#e9ecef; border:1px solid #ced4da; border-radius:8px; font-weight:bold; cursor:pointer;" aria-label="Compartir este tutorial con un vecino">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#212529" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                    Compartir tutorial
                </button>
            </div>

            <div id="indicador-progreso" role="status" aria-live="polite"></div>
            <hr style="border:0;height:2px;background:var(--celeste-arg);margin:18px 0;">
            <div role="list" id="lista-pasos">${pasosHtml}</div>
            ${notaHtml}
            <button id="btn-finalizar-tutorial" class="btn-menu" style="margin-top:25px;text-align:center;display:block;width:100%;background:var(--azul-oscuro);color:white;" aria-label="Terminé el tutorial, volver al inicio">
                ✅ Entendí todo, volver al inicio
            </button>
        `;

        renderizarBarraPasos(1, totalPasos);

        window.PD_TutorialCard?.inyectarAccionesTutorial(idClave);

        // Listeners del tutorial
        document.getElementById('btn-compartir-tutorial').addEventListener('click', () => compartirTutorial(idClave, info));
        document.getElementById('btn-finalizar-tutorial').addEventListener('click', ocultarTutorial);

        document.getElementById('zona-tutorial')?.classList.remove('oculto');

        // Foco accesible al título del tutorial
        setTimeout(() => {
            document.getElementById('titulo-tutorial')?.focus();
        }, 80);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ── Ocultar tutorial y volver al menú ────────────────
    const ocultarTutorial = () => {
        window.PD_Speech?.detener();

        document.getElementById('zona-tutorial')?.classList.add('oculto');

        ['menu-tutoriales', 'tabs-categorias', 'introduccion', 'seccion-buscador', 'seccion-favoritos', 'seccion-progreso']
            .forEach((id) => {
                document.getElementById(id)?.classList.remove('oculto');
            });

        const accionesEl = document.getElementById('acciones-tutorial');
        if (accionesEl) accionesEl.remove();

        window.PD_TutorialCard?.renderizarSeccionFavoritos();
        window.PD_Progress?.actualizarBotonesMenu();

        // Volver a la pantalla principal reseteando los filtros (Muestra TODO)
        filtrarPorCategoria(null);

        tutorialActualId = null;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ── Barra de progreso de pasos ────────────────────────
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

    // ── Buscador ──────────────────────────────────────────
    const inicializarBuscador = () => {
        const input = document.getElementById('input-buscador');
        const contador = document.getElementById('contador-resultados');
        if (!input) return;

        input.addEventListener('input', (e) => {
            const t = e.target.value.trim().toLowerCase();
            let vis = 0;

            document.querySelectorAll('#menu-tutoriales .btn-menu').forEach((btn) => {
                // Respetar filtro de categoría activo
                const enCategoria = !categoriaActiva || btn.dataset.categoria === categoriaActiva;
                const enBusqueda = !t || btn.textContent.toLowerCase().includes(t);
                const mostrar = enCategoria && enBusqueda;
                btn.style.display = mostrar ? '' : 'none';
                if (mostrar) vis++;
            });

            // Ocultar encabezados de categorías vacías
            document.querySelectorAll('.categoria-encabezado').forEach((enc) => {
                const cat = enc.dataset.categoria;
                const grid = document.querySelector(`.categoria-grid[data-categoria="${cat}"]`);
                const tieneVisibles = grid && grid.querySelector('.btn-menu:not([style*="none"])');
                enc.style.display = tieneVisibles ? '' : 'none';
                if (grid) grid.style.display = tieneVisibles ? '' : 'none';
            });

            if (contador) {
                contador.textContent = t ? `${vis} resultado${vis !== 1 ? 's' : ''} encontrado${vis !== 1 ? 's' : ''}` : '';
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                e.target.value = '';
                e.target.dispatchEvent(new Event('input'));
            }
        });
    };

    // ── Tutorial reciente ─────────────────────────────────
    const mostrarBotonReciente = () => {
        const store = window.PD_Storage;
        const db = window.baseDeTutoriales;
        if (!store || !db) return;

        const reciente = store.obtenerTutorialReciente();
        if (!reciente || !db[reciente.id]) return;

        const intro = document.getElementById('introduccion');
        if (!intro || document.getElementById('btn-reciente')) return;

        const info = db[reciente.id];
        const div = document.createElement('div');
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

    // ── Lupa Digital (Accesibilidad Visual) ────────────────
    const inicializarLupa = () => {
        const btnLupa = document.getElementById('btn-lupa');
        if (!btnLupa) return;

        // Comprobar si ya estaba activa en una sesión anterior
        const lupaPrevia = localStorage.getItem('pd_lupa_activa') === 'true';
        if (lupaPrevia) {
            document.body.classList.add('lupa-activa');
            btnLupa.classList.add('lupa-on');
            btnLupa.setAttribute('aria-pressed', 'true');
        }

        btnLupa.addEventListener('click', () => {
            const estaActiva = document.body.classList.toggle('lupa-activa');
            btnLupa.classList.toggle('lupa-on', estaActiva);
            btnLupa.setAttribute('aria-pressed', estaActiva ? 'true' : 'false');
            
            // Guardar preferencia del vecino
            localStorage.setItem('pd_lupa_activa', estaActiva);
        });
    };
// ── Inicialización Segura ────────────────────────────────────
    const init = () => {
        if (!window.baseDeTutoriales) {
            console.warn("Esperando baseDeTutoriales...");
            setTimeout(init, 100);
            return;
        }

        renderizarMenu();
        renderizarTabs();
        inicializarBuscador();
        mostrarBotonReciente();
        inicializarLupa();

        window.PD_TutorialCard?.renderizarSeccionFavoritos();

        if (window.PD_Progress) {
            window.PD_Progress.inyectarProgresoGlobal();
            window.PD_Progress.actualizarProgreso();
        }

        document.getElementById('btn-volver')?.addEventListener('click', ocultarTutorial);
    };

    // ── API pública ───────────────────────────────────────
    window.mostrarTutorial   = mostrarTutorial;
    window.ocultarTutorial   = ocultarTutorial;

    if (!window.PD_UI) window.PD_UI = {};
    window.PD_UI.filtrarPorCategoria = filtrarPorCategoria;

    // Lanza la inicialización
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();