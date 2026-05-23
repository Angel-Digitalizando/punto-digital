// =========================================================
// deeplink.js — URLs directas a tutoriales y compartir
// Punto Digital Comunitario Morenense
//
// Deploy: https://angel-digitalizando.github.io/punto-digital/
//
// Dependencias en runtime: window.mostrarTutorial (ui.js),
//   window.baseDeTutoriales (tutoriales.js), PD_Toast (lazy).
//
// Funciones:
//   1. Leer ?tutorial=clave y abrir ese tutorial directo
//   2. Leer ?categoria=nombre y filtrar el menú
//   3. PD_URLS.generarTutorialURL(id) → URL compartible
//   4. PD_URLS.compartir(id) → Web Share API o copiar
//
// Uso en QR para talleres:
//   Generar QR apuntando a:
//   https://angel-digitalizando.github.io/punto-digital/?tutorial=anses
//   Pegar en carteles del espacio o imprimir para el taller.
// =========================================================

(function () {
    'use strict';

    // ── Base URL del proyecto ─────────────────────────────
    // Se detecta en runtime para funcionar tanto en local
    // como en GitHub Pages sin cambiar el archivo.
    function obtenerBase() {
        var loc = window.location;
        // Construir base desde origen + pathname sin el archivo
        var path = loc.pathname;
        // Quitar index.html si está en la URL
        path = path.replace(/\/index\.html$/, '/');
        // Asegurar que termina en /
        if (path.charAt(path.length - 1) !== '/') path += '/';
        return loc.origin + path;
    }

    // ── Generar URL de tutorial ───────────────────────────
    function generarTutorialURL(idClave) {
        return obtenerBase() + '?tutorial=' + encodeURIComponent(idClave);
    }

    function generarCategoriaURL(catClave) {
        return obtenerBase() + '?categoria=' + encodeURIComponent(catClave);
    }

    // ── Compartir tutorial ────────────────────────────────
    // Usa Web Share API si está disponible (Android Chrome 61+).
    // Fallback: copiar al portapapeles con PD_Toast.
    function compartirTutorial(idClave) {
        var db = window.baseDeTutoriales;
        var url = generarTutorialURL(idClave);

        var titulo  = (db && db[idClave]) ? db[idClave].titulo : 'Tutorial';
        var mensaje = 'Punto Digital Comunitario — ' + titulo;
        var texto   = 'Aprendé ' + titulo.toLowerCase() + ' paso a paso, gratis y en español.';

        // Web Share API — soportada en Android Chrome, iOS Safari
        if (navigator.share) {
            navigator.share({
                title: mensaje,
                text:  texto,
                url:   url,
            }).catch(function (err) {
                // El usuario canceló o falló — no es error
                if (err.name !== 'AbortError') {
                    copiarURL(url);
                }
            });
            return;
        }

        // Fallback: copiar URL
        copiarURL(url);
    }

    function copiarURL(url) {
        var toast = window.PD_Toast || (window.PD_UI && { mostrarToast: window.PD_UI.mostrarToast });

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url)
                .then(function () {
                    if (toast) toast.mostrarToast('📋 Enlace copiado — podés pegarlo en WhatsApp', 'exito', 3500);
                })
                .catch(function () { copiarFallback(url); });
        } else {
            copiarFallback(url);
        }
    }

    function copiarFallback(url) {
        var ta = document.createElement('textarea');
        ta.value = url;
        ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;';
        document.body.appendChild(ta);
        ta.focus(); ta.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (_) {}
        document.body.removeChild(ta);
        var toast = window.PD_Toast;
        if (toast) {
            toast.mostrarToast(
                ok ? '📋 Enlace copiado — podés pegarlo en WhatsApp' : '⚠️ No se pudo copiar. URL: ' + url,
                ok ? 'exito' : 'aviso',
                4000
            );
        }
    }

    // ── Leer parámetros de URL ────────────────────────────
    function leerParametros() {
        var tutorial  = null;
        var categoria = null;
        try {
            var params = new URLSearchParams(window.location.search);
            tutorial  = params.get('tutorial');
            categoria = params.get('categoria');
        } catch (_) {
            // Fallback para Android WebView sin URLSearchParams
            var s = window.location.search;
            var mt = s.match(/[?&]tutorial=([^&]+)/);
            var mc = s.match(/[?&]categoria=([^&]+)/);
            if (mt) tutorial  = decodeURIComponent(mt[1]);
            if (mc) categoria = decodeURIComponent(mc[1]);
        }
        return { tutorial: tutorial, categoria: categoria };
    }

    // ── Aplicar deeplink al cargar ────────────────────────
    function aplicar() {
        var params = leerParametros();

        if (params.tutorial) {
            var db = window.baseDeTutoriales;
            // Validar que la clave exista antes de abrir
            if (db && db[params.tutorial] && window.mostrarTutorial) {
                setTimeout(function () {
                    window.mostrarTutorial(params.tutorial);
                }, 200);
            }
            return;
        }

        if (params.categoria) {
            if (window.PD_UI && window.PD_UI.filtrarPorCategoria) {
                setTimeout(function () {
                    window.PD_UI.filtrarPorCategoria(params.categoria);
                }, 200);
            }
        }
    }

    // ── Inyectar botón "Compartir" en acciones del tutorial ──
    // ui.js llama a PD_TutorialCard.inyectarAccionesTutorial(id).
    // Acá nos enganchamos del mismo elemento para agregar
    // el botón de compartir sin modificar tutorialCard.js.
    function inyectarBotonCompartir(idClave) {
        // Esperar a que acciones-tutorial exista en el DOM
        var intentos = 0;
        var intervalo = setInterval(function () {
            var barra = document.getElementById('acciones-tutorial');
            intentos++;
            if (barra || intentos > 20) {
                clearInterval(intervalo);
                if (!barra) return;
                // No duplicar
                if (document.getElementById('btn-compartir-tutorial')) return;

                var btn = document.createElement('button');
                btn.id = 'btn-compartir-tutorial';
                btn.className = 'btn-accion';
                btn.setAttribute('aria-label', 'Compartir este tutorial por WhatsApp u otra app');
                btn.innerHTML = '📤 Compartir';
                btn.addEventListener('click', function () {
                    compartirTutorial(idClave);
                });
                barra.appendChild(btn);
            }
        }, 80);
    }

    // ── API pública ───────────────────────────────────────
    window.PD_URLS = {
        generarTutorialURL:  generarTutorialURL,
        generarCategoriaURL: generarCategoriaURL,
        compartirTutorial:   compartirTutorial,
        obtenerBase:         obtenerBase,
    };

    // Extender mostrarTutorial para inyectar botón compartir
    // Esperar a que ui.js lo haya expuesto
    var originalMostrar = null;
    function parchearMostrarTutorial() {
        if (window.mostrarTutorial && !window.mostrarTutorial._deeplink) {
            originalMostrar = window.mostrarTutorial;
            window.mostrarTutorial = function (id) {
                originalMostrar(id);
                inyectarBotonCompartir(id);
            };
            window.mostrarTutorial._deeplink = true;
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            parchearMostrarTutorial();
            aplicar();
        });
    } else {
        setTimeout(function () {
            parchearMostrarTutorial();
            aplicar();
        }, 0);
    }

})();
