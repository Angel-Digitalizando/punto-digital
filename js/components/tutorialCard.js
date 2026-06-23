// components/tutorialCard.js — Favoritos + completado
// Punto Digital Comunitario Morenense

(function () {
    'use strict';

    // ─── Inyectar barra de acciones en tutorial abierto ──────────────────────
    function inyectarAccionesTutorial(idClave) {
        if (!window.PD_Storage) return;
        if (document.getElementById('acciones-tutorial')) return;

        const barra = document.createElement('div');
        barra.id = 'acciones-tutorial';
        barra.className = 'acciones-tutorial';
        barra.setAttribute('role', 'toolbar');
        barra.setAttribute('aria-label', 'Acciones del tutorial');

        // Botones vaciados — se mantiene la barra por compatibilidad con el layout
        barra.innerHTML = '';

        const listaPasos = document.getElementById('lista-pasos');
        if (listaPasos) {
            listaPasos.parentNode.insertBefore(barra, listaPasos);
        }

        // Los botones no existen en el DOM, los if los saltan silenciosamente
        const btnFav  = document.getElementById('btn-favorito');
        if (btnFav)  btnFav.addEventListener('click',  () => toggleFavorito(idClave));

        const btnComp = document.getElementById('btn-completado');
        if (btnComp) btnComp.addEventListener('click', () => toggleCompletado(idClave));

        const btnVoz  = document.getElementById('btn-voz-tutorial');
        if (btnVoz)  btnVoz.addEventListener('click',  () => {
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

        renderSeccionFavoritosDinamica();
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

    // ─── Renderizar sección de favoritos ─────────────────────────────────────
    function renderSeccionFavoritosDinamica() {
        const contenedor = document.getElementById('contenedor-favoritos');
        if (!contenedor) return;

        const store      = window.PD_Storage;
        const fuenteDatos = window.baseDeTutoriales;
        if (!store || !fuenteDatos) return;

        contenedor.innerHTML = '';

        const listaTutoriales = Object.keys(fuenteDatos).map(clave => ({
            id: clave,
            ...fuenteDatos[clave],
        }));

        const favs = listaTutoriales.filter(t => store.esFavorito(t.id));

        if (favs.length === 0) {
            contenedor.innerHTML = '<p class="texto-vacio">No tenés tutoriales guardados todavía. ¡Explorá las categorías para agregar uno!</p>';
            return;
        }

        favs.forEach(t => {
            const card = document.createElement('div');
            card.className = 'tarjeta-tutorial';
            card.innerHTML = `
                <div class="tarjeta-icono">${t.icono || '📖'}</div>
                <div class="tarjeta-info">
                    <h3>${t.titulo}</h3>
                    <p>${t.detalle || ''}</p>
                </div>
            `;

            const btnAbrir = document.createElement('button');
            btnAbrir.className = 'btn-primario';
            btnAbrir.textContent = 'Ver tutorial 📖';
            btnAbrir.setAttribute('aria-label', `Ver tutorial sobre ${t.titulo}`);
            btnAbrir.addEventListener('click', () => {
                if (typeof window.mostrarTutorial === 'function') {
                    window.mostrarTutorial(t.id);
                }
            });

            card.querySelector('.tarjeta-info').appendChild(btnAbrir);
            contenedor.appendChild(card);
        });
    }

    // ─── API pública ──────────────────────────────────────────────────────────
    if (typeof window !== 'undefined') {
        window.PD_TutorialCard = {
            inyectarAccionesTutorial,
            renderizarSeccionFavoritos: renderSeccionFavoritosDinamica,
        };
    }

})();
