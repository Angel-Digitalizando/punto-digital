// =========================================================
// script.js — Saludo dinámico, año actual, footer interactivo
// Punto Digital Comunitario Morenense
// =========================================================

(function () {
    'use strict';

    // ─── Saludo dinámico y subtítulo aleatorio ─────────────
    function aplicarSaludo() {
        var h2 = document.querySelector('.intro h2');
        if (!h2) return;

        var hora   = new Date().getHours();
        var saludo = '¡Hola Vecino, Hola Vecina! 👋';

        if      (hora >= 5  && hora < 12) saludo = '¡Buenos días, vecino! ☀️';
        else if (hora >= 12 && hora < 19) saludo = '¡Buenas tardes, vecino! 🌤️';
        else                               saludo = '¡Buenas noches, vecino! 🌙';

        // BANCO DE VARIACIONES DE SUBTÍTULOS
        var variaciones = [
            '¿Listo para aprender algo nuevo hoy? 😊',
            'Qué bueno verte por acá. ¿Qué descubrimos hoy? ✨',
            'Paso a paso, sin miedo ni apuro. ¡El conocimiento es tuyo!',
            'Un día más para domar la tecnología juntos. 🤝',
            'Tomate tu tiempo, acá nadie te apura. ☕',
            'No se rompe nada por tocar la pantalla. ¡Animate a explorar! 🚀',
            'La tecnología es para todos, sin importar la edad. 💙',
            'Si te equivocás, volvemos a empezar. ¡No pasa nada!',
            'Un espacio pensado para acompañarte en cada clic.',
            'Hoy es un gran día para perderle el miedo al celular. 📱',
            'Mate en mano y listos para hacer ese trámite pendiente. 🧉',
            'Acá no hay preguntas tontas. ¡Estamos para aprender!',
            'Hoy, lectura instructiva sobre asuntos digitales.',
            'Herramientas prácticas para tu autonomía tecnológica diaria.',
            'Capacitación digital abierta para toda la comunidad.',
            'El acceso a la información es tu derecho. Ejerzamoslo.',
            'Guías paso a paso para facilitar tus trámites cotidianos.',
            'Educación tecnológica para la inclusión social de Moreno.',
            'Construyendo soberanía y autonomía digital desde el barrio.',
            'Información clara y precisa para navegar la red con seguridad.',
            'Recordá: Ningún banco te va a pedir tu clave por teléfono. 🛡️',
            'Navegar seguros es tan importante como saber buscar.',
            'Cuidá tus datos. Ante la duda, preguntale a alguien de confianza. 🛑',
            'Las urgencias en internet suelen ser trampas. Respirá y leé bien.',
            '> ejecutar: aprender_algo_nuevo.sh',
            '// Conectando saberes comunitarios...',
            '> PuntoDigital_ inicializado correctamente',
            '// Rompiendo la brecha digital, un vecino a la vez.',
            '> cargando_modulo_autonomia_digital...',
            '// status: listo_para_aprender (100%)',
            '> ping a_la_comunidad_morenense -t',
            '// TODO: Perderle el miedo a la tecnología.',
            '> sudo apt-get install conocimiento_digital',
            '// Compilando guías paso a paso para el usuario...',
            '> systemctl start confianza_en_uno_mismo.service',
            '// Renderizando interfaz amigable para el vecino.'
        ];

        var fraseAleatoria = variaciones[Math.floor(Math.random() * variaciones.length)];

        // 1. Vaciamos el H2 por completo para evitar que queden textos previos o basura del HTML
        h2.innerHTML = ''; 

        // 2. Creamos un span exclusivo para el saludo principal
        var spanSaludo = document.createElement('span');
        spanSaludo.textContent = saludo;
        spanSaludo.style.display = 'block'; // Asegura que quede arriba
        h2.appendChild(spanSaludo);

        // 3. Creamos el span para el subtítulo aleatorio (tu código original)
        var sub  = document.createElement('span');
        sub.textContent = fraseAleatoria;
        sub.style.cssText = 'font-size:0.8em;color:#555;display:block;margin-top:5px;';

        // Aplicamos el Easter Egg tecnológico
        if (fraseAleatoria.indexOf('>') === 0 || fraseAleatoria.indexOf('//') === 0) {
            sub.style.fontFamily = 'monospace, Courier New, serif';
            sub.style.color = '#00838F'; 
            sub.style.fontWeight = 'bold';
        }

        h2.appendChild(sub);
    }

    // ─── Año actual ───────────────────────────────────────
    function aplicarAnio() {
        var span = document.getElementById('anio-actual');
        if (span) span.textContent = String(new Date().getFullYear());
    }

    // ─── Copiar al portapapeles ───────────────────────────
    function copiar(texto, mensajeExito) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(texto)
                .then(function ()  { feedback(mensajeExito); })
                .catch(function () { copiarFallback(texto, mensajeExito); });
            return;
        }
        copiarFallback(texto, mensajeExito);
    }

    function copiarFallback(texto, mensajeExito) {
        var ta = document.createElement('textarea');
        ta.value       = texto;
        ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();

        var exito = false;
        try {
            exito = document.execCommand('copy');
        } catch (_) { /* silenciar */ }

        document.body.removeChild(ta);

        if (exito) {
            feedback(mensajeExito);
        } else {
            alert('No se pudo copiar automáticamente.\nTexto: ' + texto);
        }
    }

    function feedback(mensaje) {
        if (window.PD_Toast && window.PD_Toast.mostrarToast) {
            window.PD_Toast.mostrarToast('✅ ' + mensaje, 'exito', 2500);
        }
    }

    // ─── Footer interactivo (BUG DE COMAS CORREGIDO AQUÍ) ───
    function inicializarFooter() {
        activarBotonCopia(
            'texto-direccion',
            'Argentina, Buenos Aires, Moreno, Escuela Pública Nº1, Uruguay 53.',
            'Dirección copiada al portapapeles'
        );
        
        // Corregido: Se unificaron las cadenas separadas que hacían romper el código
        activarBotonCopia(
            'texto-autor',
            'Angel Nicolás Villegas (CENS 453, Moreno)',
            'Nombre del autor copiado.\nPodés buscarlo en redes sociales o preguntarle a tu IA favorita sobre él.'
        );
    }

    function activarBotonCopia(id, texto, mensaje) {
        var el = document.getElementById(id);
        if (!el) return;

        el.setAttribute('role',     'button');
        el.setAttribute('tabindex', '0');

        el.addEventListener('click', function () {
            copiar(texto, mensaje);
        });

        el.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                copiar(texto, mensaje);
            }
        });
    }

    // ─── Header → volver al inicio ────────────────────────
    function inicializarHeaderInicio() {
        var btn = document.getElementById('btn-inicio-header');
        if (!btn) return;
        btn.addEventListener('click', function () {
            if (typeof window.ocultarTutorial === 'function') {
                window.ocultarTutorial();
            }
            if (window.PD_UI && typeof window.PD_UI.filtrarPorCategoria === 'function') {
                window.PD_UI.filtrarPorCategoria(null);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ─── Botón flotante compartir ─────────────────────────
    function inicializarCompartirFlotante() {
        var btn = document.getElementById('btn-compartir-flotante');
        if (!btn) return;
        btn.addEventListener('click', function () {
            var url   = window.location.href.split('?')[0];
            var titulo = '🌐 Punto Digital Comunitario Morenense';
            var texto  = 'Tutoriales digitales diversos, para hacer trámites por internet o simplemente personalizar.';

            if (navigator.share) {
                navigator.share({ title: titulo, text: texto, url: url })
                    .catch(function (err) {
                        if (err.name !== 'AbortError') copiarURLFallback(url);
                    });
                return;
            }
            copiarURLFallback(url);
        });
    }

    function copiarURLFallback(url) {
        var toast = window.PD_Toast && window.PD_Toast.mostrarToast ? window.PD_Toast : null;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url)
                .then(function () {
                    if (toast) toast.mostrarToast('📋 Enlace URL copiado y listo para pegar', 'exito', 3000);
                })
                .catch(function () { copiarConExecCommand(url); });
            return;
        }
        copiarConExecCommand(url);
    }

    function copiarConExecCommand(url) {
        var ta = document.createElement('textarea');
        ta.value = url;
        ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;';
        document.body.appendChild(ta);
        ta.focus(); ta.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (_) {}
        document.body.removeChild(ta);
        if (window.PD_Toast && window.PD_Toast.mostrarToast) {
            window.PD_Toast.mostrarToast(
                ok ? '📋 Enlace URL copiado y listo para pegar' : '⚠️ No se pudo copiar el enlace',
                ok ? 'exito' : 'aviso',
                3000
            );
        }
    }

    // ─── Inicialización Segura ────────────────────────────
    function init() {
        aplicarAnio();
        aplicarSaludo();
        inicializarFooter();
        inicializarHeaderInicio();
        inicializarCompartirFlotante();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
