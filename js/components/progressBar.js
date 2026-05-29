// =========================================================
// components/progressBar.js — Progreso global y badges
// Punto Digital Comunitario Morenense
// =========================================================

(function () {
    'use strict';

    function totalTutoriales() {
        return window.baseDeTutoriales ? Object.keys(window.baseDeTutoriales).length : 8;
    }

    // ─── Inyectar sección de avance global ─────────────
    function inyectarProgresoGlobal() {
        if (document.getElementById('seccion-progreso')) return;

        const seccion = document.createElement('section');
        seccion.id = 'seccion-progreso';
        seccion.className = 'seccion-progreso';
        seccion.setAttribute('aria-label', 'Tu avance general');
        seccion.innerHTML = `
            <h2 class="progreso-titulo">📊 Tu avance</h2>
            <div class="progreso-global-wrap">
                <div class="progreso-global-barra-bg">
                    <div id="progreso-global-fill" class="progreso-global-fill" 
                         role="progressbar" aria-valuemin="0" aria-valuemax="${totalTutoriales()}"
                         aria-valuenow="0"></div>
                </div>
                <p id="progreso-texto" class="progreso-texto">Ya terminaste 0 de ${totalTutoriales()} tutoriales</p>
            </div>
            <div id="badges-contenedor" class="badges-contenedor" aria-label="Tus medallas conseguidas"></div>
        `;

        // Insertar antes de los consejos
        const consejos = document.querySelector('.consejos');
        if (consejos) {
            consejos.parentNode.insertBefore(seccion, consejos);
        }
    }

    // ─── Actualizar la barra y texto ─────────────────────
    function actualizarProgreso() {
        if (!window.PD_Storage) return;

        const completados = window.PD_Storage.contarCompletados();
        const total = totalTutoriales();
        const pct = Math.round((completados / total) * 100);

        const fill = document.getElementById('progreso-global-fill');
        const texto = document.getElementById('progreso-texto');

        if (fill) {
            fill.style.width = pct + '%';
            fill.setAttribute('aria-valuenow', completados);
        }
        if (texto) {
            texto.textContent = `Ya terminaste ${completados} de ${total} tutorial${completados !== 1 ? 'es' : ''}`;
        }

        actualizarBadges(completados, total);
    }

    // ─── Medallas (Badges) con lenguaje sencillo ─────────
    const BADGES = [
        { min: 1,  icono: '⭐', texto: '¡Primer paso!' },
        { min: 3,  icono: '🌟', texto: '¡Venís bárbaro!' },
        { min: 5,  icono: '🏅', texto: '¡Ya estás por la mitad!' },
        { min: 8,  icono: '🏆', texto: '¡Hiciste todos, felicitaciones!' },
    ];

    function actualizarBadges(completados) {
        const cont = document.getElementById('badges-contenedor');
        if (!cont) return;
        cont.innerHTML = '';

        BADGES.forEach(badge => {
            if (completados >= badge.min) {
                const span = document.createElement('span');
                span.className = 'badge';
                span.setAttribute('title', badge.texto);
                span.setAttribute('aria-label', badge.texto);
                span.textContent = `${badge.icono} ${badge.texto}`;
                cont.appendChild(span);
            }
        });
    }

    // ─── Actualizar estado del botón en el menú ──────────
    function actualizarBotonesMenu() {
        if (!window.PD_Storage || !window.baseDeTutoriales) return;
        document.querySelectorAll('#menu-tutoriales .btn-menu[data-clave]').forEach(btn => {
            const clave = btn.dataset.clave;
            const completado = window.PD_Storage.estaCompletado(clave);
            const fav = window.PD_Storage.esFavorito(clave);

            // Indicador completado
            let badge = btn.querySelector('.btn-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'btn-badge';
                btn.appendChild(badge);
            }
            
            // Mantenemos los íconos visuales pero actualizamos qué leen los lectores de pantalla
            badge.textContent = completado ? ' ✅' : (fav ? ' ⭐' : '');
            badge.setAttribute('aria-label', completado ? 'Terminado' : (fav ? 'Guardado' : ''));
        });
    }

    window.PD_Progress = { inyectarProgresoGlobal, actualizarProgreso, actualizarBotonesMenu };

})();