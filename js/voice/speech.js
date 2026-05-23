// =========================================================
// voice/speech.js — Lectura guiada paso a paso
// Punto Digital Comunitario Morenense
//
// Dependencias en carga: ninguna.
// Dependencias en runtime: PD_Storage (velocidad), PD_UI/PD_Toast (feedback).
//   speechSynthesis se resuelve LAZY (en iniciar()), no en carga.
//   Razón: en Android WebView y Firefox Android, speechSynthesis
//   puede no estar inicializado cuando el script carga, pero sí
//   cuando el usuario toca el botón. Resolución en carga rompería
//   la detección de soporte en esos entornos.
//
// Side effects al iniciar():
//   - Agrega #panel-voz al DOM (al pie del body)
//   - Modifica #btn-voz en barra de accesibilidad
//   - Agrega clase .paso-leyendo a elementos .paso-tutorial
// =========================================================

(function () {
    'use strict';

    // ── Estado interno ────────────────────────────────────
    // synth es null hasta que iniciar() lo resuelve.
    // Esto permite detectar correctamente "no soportado"
    // en el momento de uso, no en tiempo de carga.
    var synth = null;

    var estado = {
        activo:     false,
        pausado:    false,
        pasoActual: 0,
        pasos:      [],
        velocidad:  0.88,
    };

    // ── Resolución lazy de speechSynthesis ───────────────
    function obtenerSynth() {
        if (synth) return synth;
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            synth = window.speechSynthesis;
        }
        return synth;
    }

    // ── Texto limpio de un elemento paso ─────────────────
    // Clona el nodo para no mutar el DOM visible.
    // Remueve botones embebidos (links a ANSES, etc.)
    // para que no se lean URLs o textos de botones.
    function textoLimpio(el) {
        if (!el) return '';
        var clone = el.cloneNode(true);
        var botones = clone.querySelectorAll('button, .btn-paso, a');
        for (var i = 0; i < botones.length; i++) {
            botones[i].parentNode.removeChild(botones[i]);
        }
        return (clone.innerText || clone.textContent || '').trim();
    }

    // ── Recolectar pasos del tutorial visible ────────────
    function recolectarPasos() {
        var elementos = document.querySelectorAll('#lista-pasos .paso-tutorial');
        var resultado = [];
        for (var i = 0; i < elementos.length; i++) {
            var el    = elementos[i];
            var h3    = el.querySelector('h3');
            var p     = el.querySelector('p');
            resultado.push({
                elemento: el,
                titulo:   h3 ? (h3.innerText || h3.textContent || ('Paso ' + (i + 1))) : ('Paso ' + (i + 1)),
                texto:    textoLimpio(p),
            });
        }
        return resultado;
    }

    // ── Resaltado visual del paso que se está leyendo ────
    function resaltarPaso(idx) {
        var todos = document.querySelectorAll('.paso-tutorial');
        for (var i = 0; i < todos.length; i++) {
            todos[i].classList.toggle('paso-leyendo', i === idx);
            if (i === idx) {
                todos[i].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }

    function quitarResaltado() {
        var todos = document.querySelectorAll('.paso-tutorial');
        for (var i = 0; i < todos.length; i++) {
            todos[i].classList.remove('paso-leyendo');
        }
    }

    // ── Leer un paso ─────────────────────────────────────
    function leerPaso(idx) {
        var s = obtenerSynth();
        if (!s || idx >= estado.pasos.length) {
            detener();
            return;
        }

        estado.pasoActual = idx;
        resaltarPaso(idx);
        actualizarControles();

        var paso      = estado.pasos[idx];
        var texto     = paso.titulo + '. ' + paso.texto;
        var utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang  = 'es-AR';
        utterance.rate  = estado.velocidad;
        utterance.pitch = 1;

        // Selección de voz: preferir español latinoamericano,
        // luego español genérico, luego lo que haya.
        var voces  = s.getVoices();
        var vozLat = null;
        var vozEs  = null;
        for (var i = 0; i < voces.length; i++) {
            if (voces[i].lang === 'es-AR' || voces[i].lang === 'es-419') {
                vozLat = voces[i]; break;
            }
            if (!vozEs && voces[i].lang.indexOf('es') === 0) {
                vozEs = voces[i];
            }
        }
        if (vozLat)      utterance.voice = vozLat;
        else if (vozEs)  utterance.voice = vozEs;

        utterance.onend = function () {
            if (!estado.activo || estado.pausado) return;
            if (idx + 1 < estado.pasos.length) {
                // Pausa breve entre pasos para que sea más natural
                setTimeout(function () { leerPaso(idx + 1); }, 650);
            } else {
                finalizarLectura();
            }
        };

        utterance.onerror = function (e) {
            // 'interrupted' ocurre cuando cancel() se llama internamente
            // (ej: al llamar siguiente/repetir). No es un error real.
            if (e.error === 'interrupted') return;
            detener();
        };

        // cancel() antes de speak() evita que se acumulen utterances
        // en la cola interna del browser (bug común en Android Chrome).
        s.cancel();
        s.speak(utterance);
    }

    // ── Controles públicos ────────────────────────────────
    function iniciar() {
        var s = obtenerSynth();
        if (!s) {
            if (window.PD_Toast) {
                window.PD_Toast.mostrarToast(
                    '⚠️ Tu dispositivo no tiene la función de lectura en voz alta.',
                    'aviso',
                    4000
                );
            }
            return;
        }

        estado.pasos = recolectarPasos();
        if (estado.pasos.length === 0) {
            if (window.PD_Toast) {
                window.PD_Toast.mostrarToast(
                    '💡 Abrí un tutorial para activar la lectura en voz alta.',
                    'info',
                    3000
                );
            }
            return;
        }

        // Leer velocidad guardada
        if (window.PD_Storage) {
            var cfg = window.PD_Storage.obtenerConfiguracion();
            if (cfg.velocidadVoz) estado.velocidad = cfg.velocidadVoz;
        }

        estado.activo  = true;
        estado.pausado = false;

        mostrarPanel();
        leerPaso(estado.pasoActual);
    }

    function pausarReanudar() {
        var s = obtenerSynth();
        if (!s || !estado.activo) return;
        if (estado.pausado) {
            s.resume();
            estado.pausado = false;
        } else {
            s.pause();
            estado.pausado = true;
        }
        actualizarControles();
    }

    function siguiente() {
        var s = obtenerSynth();
        if (!s || !estado.activo) return;
        s.cancel();
        var sig = estado.pasoActual + 1;
        if (sig < estado.pasos.length) {
            leerPaso(sig);
        } else {
            finalizarLectura();
        }
    }

    function repetir() {
        var s = obtenerSynth();
        if (!s || !estado.activo) return;
        s.cancel();
        leerPaso(estado.pasoActual);
    }

    function detener() {
        var s = obtenerSynth();
        if (s) s.cancel();
        estado.activo     = false;
        estado.pausado    = false;
        estado.pasoActual = 0;
        estado.pasos      = [];
        quitarResaltado();
        ocultarPanel();
        sincronizarBtnVozExterno(false);
    }

    function cambiarVelocidad(val) {
        estado.velocidad = parseFloat(val) || 0.88;
        if (window.PD_Storage) {
            window.PD_Storage.guardarConfiguracion({ velocidadVoz: estado.velocidad });
        }
        if (estado.activo) {
            var s = obtenerSynth();
            if (s) s.cancel();
            leerPaso(estado.pasoActual);
        }
    }

    function finalizarLectura() {
        estado.activo     = false;
        estado.pasoActual = 0;
        quitarResaltado();
        ocultarPanel();
        sincronizarBtnVozExterno(false);
        if (window.PD_Toast) {
            window.PD_Toast.mostrarToast('✅ ¡Lectura terminada! Bien hecho.', 'exito', 3000);
        }
    }

    // ── Panel de controles ────────────────────────────────
    function mostrarPanel() {
        var panel = document.getElementById('panel-voz');
        if (panel) {
            panel.style.display = 'block';
            actualizarControles();
            return;
        }

        panel = document.createElement('div');
        panel.id = 'panel-voz';
        panel.setAttribute('role',       'toolbar');
        panel.setAttribute('aria-label', 'Controles de lectura en voz alta');

        // Construir HTML sin template literals para máxima
        // compatibilidad con Android WebView 4.x.
        var velVal  = estado.velocidad.toFixed(1);
        panel.innerHTML =
            '<div class="panel-voz-inner">' +
                '<span class="panel-voz-titulo">🔊 Leyendo en voz alta</span>' +
                '<div class="panel-voz-controles">' +
                    '<button id="btn-voz-pausar"    class="btn-voz-ctrl" aria-label="Pausar lectura">⏸ Pausar</button>' +
                    '<button id="btn-voz-siguiente" class="btn-voz-ctrl" aria-label="Ir al siguiente paso">⏭ Siguiente</button>' +
                    '<button id="btn-voz-repetir"   class="btn-voz-ctrl" aria-label="Repetir paso actual">🔁 Repetir</button>' +
                    '<button id="btn-voz-detener"   class="btn-voz-ctrl btn-voz-detener" aria-label="Detener lectura">✖ Detener</button>' +
                '</div>' +
                '<div class="panel-voz-velocidad">' +
                    '<label for="control-velocidad-voz">Velocidad:</label>' +
                    '<input type="range" id="control-velocidad-voz"' +
                        ' min="0.5" max="1.5" step="0.1" value="' + velVal + '"' +
                        ' aria-label="Velocidad de lectura">' +
                    '<span id="valor-velocidad-voz">' + velVal + 'x</span>' +
                '</div>' +
            '</div>';

        document.body.appendChild(panel);

        document.getElementById('btn-voz-pausar')
            .addEventListener('click', pausarReanudar);
        document.getElementById('btn-voz-siguiente')
            .addEventListener('click', siguiente);
        document.getElementById('btn-voz-repetir')
            .addEventListener('click', repetir);
        document.getElementById('btn-voz-detener')
            .addEventListener('click', detener);
        document.getElementById('control-velocidad-voz')
            .addEventListener('input', function () {
                var v = parseFloat(this.value).toFixed(1);
                document.getElementById('valor-velocidad-voz').textContent = v + 'x';
                cambiarVelocidad(this.value);
            });

        actualizarControles();
        sincronizarBtnVozExterno(true);
    }

    function ocultarPanel() {
        var panel = document.getElementById('panel-voz');
        if (panel) panel.style.display = 'none';
    }

    // ── Sincronizar botón de voz en barra accesibilidad ──
    // Dependencia inversa documentada: speech.js actualiza
    // un botón que vive en accesibilidad.js. Es la única
    // dependencia cruzada en dirección "inversa". Se acepta
    // porque es solo visual/aria, y es null-safe.
    function sincronizarBtnVozExterno(activo) {
        var btn = document.getElementById('btn-voz');
        if (!btn) return;
        btn.textContent = activo ? '🔇 Detener' : '🔊 Leer';
        btn.setAttribute('aria-pressed', activo ? 'true' : 'false');
    }

    function actualizarControles() {
        var btnPausar = document.getElementById('btn-voz-pausar');
        if (btnPausar) {
            btnPausar.textContent = estado.pausado ? '▶ Reanudar' : '⏸ Pausar';
            btnPausar.setAttribute(
                'aria-label',
                estado.pausado ? 'Reanudar lectura' : 'Pausar lectura'
            );
        }
        sincronizarBtnVozExterno(estado.activo);
    }

    // ── API pública ───────────────────────────────────────
    window.PD_Speech = {
        iniciar:        iniciar,
        pausarReanudar: pausarReanudar,
        siguiente:      siguiente,
        repetir:        repetir,
        detener:        detener,
        cambiarVelocidad: cambiarVelocidad,
    };

})();
