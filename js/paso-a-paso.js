// punto-digital/js/paso-a-paso.js
// Controlador de la vista de tutorial individual.
// Ubicacion del HTML que lo consume: punto-digital/page/paso-a-paso.html
(function () {
    'use strict';

    // ─── Leer ?id= de la URL ──────────────────────────────
    function obtenerIdTutorial() {
        try {
            return new URLSearchParams(window.location.search).get('id');
        } catch (_) {
            // Fallback para WebView Android muy antiguo sin URLSearchParams
            var m = window.location.search.match(/[?&]id=([^&]+)/);
            return m ? decodeURIComponent(m[1]) : null;
        }
    }

    // ─── Mostrar error en el contenedor ───────────────────
    function mostrarError(contenedor, titulo, cuerpo) {
        contenedor.innerHTML =
            notaHtml;
    }
    
    // ── Tostada de orientación al usuario 
        setTimeout(function () {
            if (window.PD_Toast) {
                window.PD_Toast.mostrarToast(
                    '💡 Tocá el logo "Punto Digital" arriba para volver al inicio.',
                    'info',
                    5000
                );
            }
        }, 800);

    // ─── Copiar URL al portapapeles ─
    function copiarURL(url) {
        function fallback() {
            var ta = document.createElement('textarea');
            ta.value = url;
            ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;';
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            try { document.execCommand('copy'); } catch (_) {}
            document.body.removeChild(ta);
            if (window.PD_Toast) {
                window.PD_Toast.mostrarToast('📋 Enlace copiado', 'exito', 2500);
            }
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url)
                .then(function () {
                    if (window.PD_Toast) {
                        window.PD_Toast.mostrarToast('📋 Enlace copiado — podés pegarlo en WhatsApp', 'exito', 3000);
                    }
                })
                .catch(fallback);
        } else {
            fallback();
        }
    }

    // ─── Render principal ──────────────────────────────────
    function renderTutorial() {
        var tutorialId = obtenerIdTutorial();
        var contenedor = document.getElementById('contenido-dinamico');

        // Defensa: el contenedor debe existir
        if (!contenedor) {
            console.error('[paso-a-paso.js] No se encontró #contenido-dinamico en el DOM.');
            return;
        }

        // Sin ID en la URL
        if (!tutorialId) {
            document.title = 'Error - Punto Digital';
            mostrarError(
                contenedor,
                '⚠️ Falta el ID del tutorial',
                'Accedé desde el menú principal para elegir un tutorial.'
            );
            return;
        }

        var db   = window.baseDeTutoriales;
        var info = db[tutorialId];

        // ID no encontrado en la base de datos
        if (!info) {
            document.title = 'No encontrado - Punto Digital';
            mostrarError(
                contenedor,
                '⚠️ Tutorial no encontrado',
                'El tutorial <strong>' + tutorialId + '</strong> no existe o fue movido.'
            );
            return;
        }

        // ── Título de pestaña ──────────────────────────────
        document.title = info.titulo + ' - Punto Digital';

        // ── Construir HTML de pasos ────────────────────────
        var totalPasos = info.pasos.length;
        var pasosHtml  = '';
        for (var i = 0; i < totalPasos; i++) {
            pasosHtml +=
                '<div class="paso-tutorial" id="paso-' + i + '"' +
                ' role="listitem"' +
                ' aria-label="Paso ' + (i + 1) + ' de ' + totalPasos + '">' +
                '<h3>Paso ' + (i + 1) + '</h3>' +
                '<p>' + info.pasos[i] + '</p>' +
                '</div>';
        }

        // ── Nota al pie (opcional) ─────────────────────────
        var notaHtml = info.nota
            ? '<div class="nota-tutorial" role="note">' + info.nota + '</div>'
            : '';

        // ── Inyección ──────────────────────────────────────
        contenedor.innerHTML =
            // Título
            '<h2 id="titulo-tutorial" class="tutorial-titulo" tabindex="-1">' +
                info.icono + ' ' + info.titulo +
            '</h2>' +

            // Subtítulo / detalle
            '<p id="detalle-tutorial" class="tutorial-detalle">' +
                info.detalle +
            '</p>' +

            // Barra de acciones (compartir + voz)
            '<div class="barra-compartir-horizontal">' +
                '<button id="btn-compartir-tutorial" class="btn-compartir-accion"' +
                ' type="button" aria-label="Compartir este tutorial">' +
                    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"' +
                    ' stroke="currentColor" stroke-width="2.5"' +
                    ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
                        '<circle cx="18" cy="5" r="3"/>' +
                        '<circle cx="6" cy="12" r="3"/>' +
                        '<circle cx="18" cy="19" r="3"/>' +
                        '<line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>' +
                        '<line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>' +
                    '</svg>' +
                    ' Compartir' +
                '</button>' +
                '<button id="btn-voz-tutorial" class="btn-compartir-accion"' +
                ' type="button" aria-label="Leer en voz alta" aria-pressed="false">' +
                    '🔊 Leer en voz alta' +
                '</button>' +
            '</div>' +

            // Indicador de progreso (lo llena progressBar.js si está cargado)
            '<div id="indicador-progreso" role="status" aria-live="polite"></div>' +

            '<hr class="tutorial-separador">' +

            // Lista de pasos
            '<div role="list" id="lista-pasos">' + pasosHtml + '</div>' +

            notaHtml +

            // Botón volver al inicio
            '<a href="../index-punto-digital.html"' +
            ' id="btn-finalizar-tutorial"' +
            ' class="btn-finalizar"' +
            ' aria-label="Terminé de leer este tutorial, volver al inicio">' +
                '✅ Volver a Inicio' +
            '</a>';

        // ── Foco accesible al título ───────────────────────
        var elTitulo = document.getElementById('titulo-tutorial');
        if (elTitulo) {
            // requestAnimationFrame garantiza que el DOM ya fue pintado
            requestAnimationFrame(function () { elTitulo.focus(); });
        }

        // ── Botón compartir ────────────────────────────────
        var btnCompartir = document.getElementById('btn-compartir-tutorial');
        if (btnCompartir) {
            btnCompartir.addEventListener('click', function (e) {
                e.stopPropagation();
                var url = window.location.href;
                if (navigator.share) {
                    navigator.share({
                        title: 'Punto Digital — ' + info.titulo,
                        text:  'Aprendé paso a paso: ' + info.titulo,
                        url:   url
                    }).catch(function (err) {
                        if (err.name !== 'AbortError') copiarURL(url);
                    });
                } else {
                    copiarURL(url);
                }
            });
        }

        // ── Botón voz ──────────────────────────────────────
        var btnVoz = document.getElementById('btn-voz-tutorial');
        if (btnVoz) {
            btnVoz.addEventListener('click', function (e) {
                e.stopPropagation();
                if (!window.PD_Speech) {
                    if (window.PD_Toast) {
                        window.PD_Toast.mostrarToast(
                            '⚠️ Tu dispositivo no soporta lectura en voz alta.',
                            'aviso', 3500
                        );
                    }
                    return;
                }
                var panelVoz = document.getElementById('panel-voz');
                var vozActiva = panelVoz && panelVoz.style.display !== 'none';
                if (vozActiva) {
                    window.PD_Speech.detener();
                    btnVoz.textContent = '🔊 Leer en voz alta';
                    btnVoz.setAttribute('aria-pressed', 'false');
                } else {
                    window.PD_Speech.iniciar();
                    btnVoz.textContent = '🔇 Detener';
                    btnVoz.setAttribute('aria-pressed', 'true');
                }
            });
        }

        // ── Botón flotante compartir ───────────────────────
        var btnFlotante = document.getElementById('btn-compartir-flotante');
        if (btnFlotante) {
            btnFlotante.addEventListener('click', function (e) {
                e.stopPropagation();
                var url = window.location.href;
                if (navigator.share) {
                    navigator.share({
                        title: 'Punto Digital — ' + info.titulo,
                        text:  'Aprendé paso a paso: ' + info.titulo,
                        url:   url
                    }).catch(function (err) {
                        if (err.name !== 'AbortError') copiarURL(url);
                    });
                } else {
                    copiarURL(url);
                }
            });
        }

        // ── Complementos opcionales ────────────────────────
        if (window.PD_Storage) {
            window.PD_Storage.guardarTutorialReciente(tutorialId);
        }

        // Año en el footer
        var spanAnio = document.getElementById('anio-actual');
        if (spanAnio) spanAnio.textContent = String(new Date().getFullYear());

        // Copiar autor en el footer
        var spanAutor = document.getElementById('texto-autor');
        if (spanAutor) {
            spanAutor.addEventListener('click', function () {
                copiarURL('Angel Nicolás Villegas (CENS 453, Moreno)');
            });
        }
    }

    // ─── Espera activa hasta que baseDeTutoriales esté listo ──
    // Razón: aunque tutoriales.js se carga sin defer, en algunos
    // WebView Android la ejecución de scripts es secuencial pero
    // la asignación a window puede llegar tarde. El polling resuelve
    // cualquier condición de carrera sin depender del orden del parser.
    function esperarDBYRenderizar(intentos) {
        intentos = intentos || 0;

        if (window.baseDeTutoriales) {
            renderTutorial();
            return;
        }

        if (intentos >= 40) {
            // 4 segundos de espera máxima — algo salió muy mal
            var contenedor = document.getElementById('contenido-dinamico');
            if (contenedor) {
                mostrarError(
                    contenedor,
                    '⚠️ Error al cargar los tutoriales',
                    'No se pudo acceder a la base de datos. ' +
                    'Intentá recargar la página o volver al inicio.'
                );
            }
            return;
        }

        setTimeout(function () {
            esperarDBYRenderizar(intentos + 1);
        }, 100);
    }

    // ─── Arranque ──────────────────────────────────────────
    // Usar DOMContentLoaded si el DOM aún no terminó de parsear,
    // o ejecutar directo si ya terminó (caso normal con defer).
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            esperarDBYRenderizar();
        });
    } else {
        esperarDBYRenderizar();
    }

}());
