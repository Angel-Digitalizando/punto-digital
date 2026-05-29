//// =========================================================
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

        // Actualizar la sección dinámicamente si el usuario está mirando los favoritos
        renderizarSeccionFavoritos();
        if (window.PD_Progress) window.PD_Progress.actualizarBotonesMenu();
    }

    function toggleCompletado(idClave) {
        const store = window.PD_Storage;
        if (!store) return;

        store.marcarCompletado(idClave);

        const btn = document.getElementById('btn-completado');
        if (btn) {
            const ahora = store.estaCompletado(idClave);
            btn.textContent = ahora ? '✅ Completado' : '○ Marcar listo';
            btn.setAttribute('aria-pressed', ahora.toString());
            btn.classList.toggle('activo', ahora);
            btn.setAttribute('aria-label', ahora ? 'Tutorial ya completado' : 'Marcar como completado');
        }

        if (window.PD_Toast) {
            window.PD_Toast.mostrarToast(
                store.estaCompletado(idClave) ? '✅ ¡Buenísimo! Completaste este tutorial' : '○ Tutorial marcado como pendiente',
                'success'
            );
        }

        if (window.PD_Progress) window.PD_Progress.actualizarBotonesMenu();
    }

    // ─── Función que requería tu sistema para dibujar los favoritos ───
    function renderizarSeccionFavoritos() {
        const contenedor = document.getElementById('contenedor-favoritos');
        if (!contenedor) return; // Si no estamos en la pantalla de favoritos, salir pacíficamente

        const store = window.PD_Storage;
        const data = window.PD_TutorialesData;
        if (!store || !data) return;

        contenedor.innerHTML = '';
        const favs = data.filter(t => store.esFavorito(t.id));

        if (favs.length === 0) {
            contenedor.innerHTML = '<p class="texto-vacio">No tenés tutoriales guardados todavía. ¡Explorá las secciones para agregar uno!</p>';
            return;
        }

        favs.forEach(t => {
            const card = document.createElement('div');
            card.className = 'tarjeta-tutorial';
            card.innerHTML = `
                <div class="tarjeta-icono">${t.icono}</div>
                <div class="tarjeta-info">
                    <h3>${t.titulo}</h3>
                    <p>${t.descripcion}</p>
                    <button onclick="window.PD_Deeplink.irATutorial('${t.id}')" class="btn-primario">Ver tutorial 🛡️</button>
                </div>
            `;
            contenedor.appendChild(card);
        });
    }

    // Exponer las funciones globalmente de forma segura
    if (typeof window !== 'undefined') {
        window.PD_TutorialCard = { 
            inyectarAccionesTutorial,
            renderizarSeccionFavoritos
        };
    }

})();