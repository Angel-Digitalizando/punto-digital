// =========================================================
// components/tutorialCard.js — Favoritos + completado
// Punto Digital Comunitario Morenense
// =========================================================

(function () {
    'use strict';

    // ─── Inyectar barra de acciones en tutorial abierto ──
    function inyectarAccionesTutorial(idClave) {
        if (!window.PD_Storage) return;
        if (document.getElementById('acciones-tutorial')) return;

        const barra = document.createElement('div');
        barra.id = 'acciones-tutorial';
        barra.className = 'acciones-tutorial';
        barra.setAttribute('role', 'toolbar');
        barra.setAttribute('aria-label', 'Acciones del tutorial');

        const esFav   = window.PD_Storage.esFavorito(idClave);
        const esComp  = window.PD_Storage.estaCompletado(idClave);

        barra.innerHTML = `
            <button id="btn-favorito" class="btn-accion ${esFav ? 'activo' : ''}"
                aria-pressed="${esFav}" aria-label="${esFav ? 'Quitar de favoritos' : 'Guardar en favoritos'}">
                ${esFav ? '⭐ Guardado' : '☆ Guardar'}
            </button>
            <button id="btn-completado" class="btn-accion ${esComp ? 'activo' : ''}"
                aria-pressed="${esComp}" aria-label="${esComp ? 'Tutorial ya completado' : 'Marcar como completado'}">
                ${esComp ? '✅ Completado' : '○ Marcar listo'}
            </button>
            <button id="btn-voz-tutorial" class="btn-accion"
                aria-pressed="false" aria-label="Leer tutorial en voz alta">
                🔊 Leer en voz alta
            </button>
        `;

        // Insertar antes del bloque de pasos
        const listaPasos = document.getElementById('lista-pasos');
        if (listaPasos) {
            listaPasos.parentNode.insertBefore(barra, listaPasos);
        }

        // Eventos
        document.getElementById('btn-favorito').addEventListener('click', () => {
            toggleFavorito(idClave);
        });
        document.getElementById('btn-completado').addEventListener('click', () => {
            toggleCompletado(idClave);
        });
        document.getElementById('btn-voz-tutorial').addEventListener('click', () => {
            if (window.PD_Speech) window.PD_Speech.iniciar();
        });
    }

    function toggleFavorito(idClave) {
        const store = window.PD_Storage;
        if (!store) return;

        const eraFav = store.esFavorito(idClave);
        eraFav ? store.quitarFavorito(idClave) : store.guardarFavorito(idClave);

        const btn = document.getElementById('btn-favorito');
        if (btn) {
            const ahora = store.esFavorito(idClave);
            btn.textContent = ahora ? '⭐ Guardado' : '☆ Guardar';
            btn.setAttribute('aria-pressed', ahora.toString());
            btn.classList.toggle('activo', ahora);
            btn.setAttribute('aria-label', ahora ? 'Quitar de favoritos' : 'Guardar en favoritos');
        }

        if (window.PD_Toast) {
            window.PD_Toast.mostrarToast(
                store.esFavorito(idClave) ? '⭐ Tutorial guardado en favoritos' : '☆ Quitado de favoritos',
                'info'
            );
        }

        if (window.PD_Progress) window.PD_Progress.actualizarBotonesMenu();
    }

    function toggleCompletado(idClave) {
        const store = window.PD_Storage;
        if (!store) return;

        store.marcarCompletado(idClave);

        const btn = document.getElementById('btn-completado');
        if (btn) {
            btn.textContent = '✅ Completado';
            btn.setAttribute('aria-pressed', 'true');
            btn.classList.add('activo');
            btn.disabled = true;
        }

        if (window.PD_Toast) {
            window.PD_Toast.mostrarToast('✅ ¡Muy bien! Tutorial completado.', 'exito');
        }

        if (window.PD_Progress) {
            window.PD_Progress.actualizarProgreso();
            window.PD_Progress.actualizarBotonesMenu();
        }
    }

    // ─── Sección de favoritos en el menú ─────────────────
    function renderizarSeccionFavoritos() {
        const store = window.PD_Storage;
        const db    = window.baseDeTutoriales;
        if (!store || !db) return;

        let seccion = document.getElementById('seccion-favoritos');

        const favs = store.obtenerFavoritos().filter(id => db[id]);
        if (favs.length === 0) {
            if (seccion) seccion.remove();
            return;
        }

        if (!seccion) {
            seccion = document.createElement('section');
            seccion.id = 'seccion-favoritos';
            seccion.className = 'seccion-favoritos';
            seccion.setAttribute('aria-label', 'Tus tutoriales guardados');

            const menu = document.getElementById('menu-tutoriales');
            if (menu) menu.parentNode.insertBefore(seccion, menu);
        }

        seccion.innerHTML = `<h2 class="favoritos-titulo">⭐ Tus tutoriales guardados</h2>
            <div class="favoritos-grid" role="list"></div>`;

        const grid = seccion.querySelector('.favoritos-grid');
        favs.forEach(id => {
            const info = db[id];
            const btn = document.createElement('button');
            btn.className = 'btn-favorito-item';
            btn.setAttribute('role', 'listitem');
            btn.setAttribute('aria-label', `Abrir tutorial: ${info.titulo}`);
            btn.innerHTML = `${info.icono} ${info.titulo}`;
            btn.addEventListener('click', () => {
                if (window.mostrarTutorial) window.mostrarTutorial(id);
            });
            grid.appendChild(btn);
        });
    }

    window.PD_TutorialCard = { inyectarAccionesTutorial, renderizarSeccionFavoritos };

})();
