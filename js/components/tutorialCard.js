<<<<<<< HEAD
// components/tutorialCard.js — Favoritos + completado
// Punto Digital Comunitario Morenense
=======
// =========================================================
// components/tutorialCard.js — Favoritos + completado
// Punto Digital Comunitario Morenense
// =========================================================
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7

(function () {
    'use strict';

<<<<<<< HEAD
    // ─── Inyectar barra de acciones en tutorial abierto ──────────────────────
=======
    // ─── Inyectar barra de acciones en tutorial abierto ──
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
    function inyectarAccionesTutorial(idClave) {
        if (!window.PD_Storage) return;
        if (document.getElementById('acciones-tutorial')) return;

        const barra = document.createElement('div');
        barra.id = 'acciones-tutorial';
        barra.className = 'acciones-tutorial';
        barra.setAttribute('role', 'toolbar');
        barra.setAttribute('aria-label', 'Acciones del tutorial');

<<<<<<< HEAD
        // Botones vaciados — se mantiene la barra por compatibilidad con el layout
        barra.innerHTML = '';

=======
        const esFav  = window.PD_Storage.esFavorito(idClave);
        const esComp = window.PD_Storage.estaCompletado(idClave);

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
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
        const listaPasos = document.getElementById('lista-pasos');
        if (listaPasos) {
            listaPasos.parentNode.insertBefore(barra, listaPasos);
        }

<<<<<<< HEAD
        // Los botones no existen en el DOM, los if los saltan silenciosamente
        const btnFav  = document.getElementById('btn-favorito');
        if (btnFav)  btnFav.addEventListener('click',  () => toggleFavorito(idClave));

        const btnComp = document.getElementById('btn-completado');
        if (btnComp) btnComp.addEventListener('click', () => toggleCompletado(idClave));

        const btnVoz  = document.getElementById('btn-voz-tutorial');
        if (btnVoz)  btnVoz.addEventListener('click',  () => {
=======
        // Eventos
        document.getElementById('btn-favorito').addEventListener('click', () => {
            toggleFavorito(idClave);
        });
        document.getElementById('btn-completado').addEventListener('click', () => {
            toggleCompletado(idClave);
        });
        document.getElementById('btn-voz-tutorial').addEventListener('click', () => {
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
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

<<<<<<< HEAD
=======
        // Actualizar la sección dinámicamente
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
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

<<<<<<< HEAD
    // ─── Renderizar sección de favoritos ─────────────────────────────────────
=======
    // ── Adaptador para renderizar la lista de favoritos ──
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
    function renderSeccionFavoritosDinamica() {
        const contenedor = document.getElementById('contenedor-favoritos');
        if (!contenedor) return;

<<<<<<< HEAD
        const store      = window.PD_Storage;
        const fuenteDatos = window.baseDeTutoriales;
=======
        const store = window.PD_Storage;
        const fuenteDatos = window.baseDeTutoriales; // Conectado directo a tutoriales.js
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
        if (!store || !fuenteDatos) return;

        contenedor.innerHTML = '';

<<<<<<< HEAD
        const listaTutoriales = Object.keys(fuenteDatos).map(clave => ({
            id: clave,
            ...fuenteDatos[clave],
=======
        // Normalizar los datos: convertimos el objeto de tutoriales a una lista iterable
        const listaTutoriales = Object.keys(fuenteDatos).map(clave => ({ 
            id: clave, 
            ...fuenteDatos[clave] 
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
        }));

        const favs = listaTutoriales.filter(t => store.esFavorito(t.id));

        if (favs.length === 0) {
            contenedor.innerHTML = '<p class="texto-vacio">No tenés tutoriales guardados todavía. ¡Explorá las categorías para agregar uno!</p>';
            return;
        }

        favs.forEach(t => {
<<<<<<< HEAD
            const card = document.createElement('div');
            card.className = 'tarjeta-tutorial';
=======
            const textoDetalle = t.detalle || '';
            
            const card = document.createElement('div');
            card.className = 'tarjeta-tutorial';
            
            // Estructura HTML de la tarjeta
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
            card.innerHTML = `
                <div class="tarjeta-icono">${t.icono || '📖'}</div>
                <div class="tarjeta-info">
                    <h3>${t.titulo}</h3>
<<<<<<< HEAD
                    <p>${t.detalle || ''}</p>
                </div>
            `;

=======
                    <p>${textoDetalle}</p>
                </div>
            `;

            // Botón seguro para abrir el tutorial conectado a ui.js
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
            const btnAbrir = document.createElement('button');
            btnAbrir.className = 'btn-primario';
            btnAbrir.textContent = 'Ver tutorial 📖';
            btnAbrir.setAttribute('aria-label', `Ver tutorial sobre ${t.titulo}`);
<<<<<<< HEAD
            btnAbrir.addEventListener('click', () => {
                if (typeof window.mostrarTutorial === 'function') {
                    window.mostrarTutorial(t.id);
                }
            });

=======
            
            btnAbrir.addEventListener('click', () => {
                if (typeof window.mostrarTutorial === 'function') {
                    window.mostrarTutorial(t.id);
                } else {
                    console.error('La función mostrarTutorial no está disponible.');
                }
            });

            // Agregamos el botón dentro de la info de la tarjeta
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
            card.querySelector('.tarjeta-info').appendChild(btnAbrir);
            contenedor.appendChild(card);
        });
    }

<<<<<<< HEAD
    // ─── API pública ──────────────────────────────────────────────────────────
    if (typeof window !== 'undefined') {
        window.PD_TutorialCard = {
            inyectarAccionesTutorial,
            renderizarSeccionFavoritos: renderSeccionFavoritosDinamica,
        };
    }

})();
=======
    // Exponer las funciones globalmente
    if (typeof window !== 'undefined') {
        window.PD_TutorialCard = { 
            inyectarAccionesTutorial,
            renderizarSeccionFavoritos: renderSeccionFavoritosDinamica
        };
    }

})();
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
