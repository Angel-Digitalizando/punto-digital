// =========================================================
// script.js — Saludo dinámico, año actual, footer interactivo
// Punto Digital Comunitario Morenense
//
// FIX v2 (Junio 2026):
//   - Eliminado código huérfano (btn-menu, btn-cerrar-menu, panel-menu,
//     botonesCategorias) que existía fuera del scope del IIFE en el
//     bloque else { init(); ...código suelto... }.
//     Esos elementos no existen en el HTML y causaban un SyntaxError
//     que impedía la carga correcta del archivo.
// =========================================================

(function () {
    'use strict';

    // ─── Saludo dinámico y subtítulo aleatorio ────────────
    function aplicarSaludo() {
        var h2 = document.querySelector('.intro h2');
        if (!h2) return;

        var hora   = new Date().getHours();
        var saludo = '¡Hola Vecino, Hola Vecina! 👋';

        if      (hora >= 5  && hora < 12) saludo = '¡Buenos días, vecino! ☀️';
        else if (hora >= 12 && hora < 19) saludo = '¡Buenas tardes, vecino! 🌤️';
        else                               saludo = '¡Buenas noches, vecino! 🌙';

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
            '// Renderizando interfaz amigable para el vecino.',
        ];

        var fraseAleatoria = variaciones[Math.floor(Math.random() * variaciones.length)];

        h2.innerHTML = '';

        var spanSaludo = document.createElement('span');
        spanSaludo.textContent = saludo;
        spanSaludo.style.display = 'block';
        h2.appendChild(spanSaludo);

        var sub = document.createElement('span');
        sub.textContent = fraseAleatoria;
        sub.style.cssText = 'font-size:0.8em;color:#555;display:block;margin-top:5px;';

        if (fraseAleatoria.indexOf('>') === 0 || fraseAleatoria.indexOf('//') === 0) {
            sub.style.fontFamily = 'monospace, Courier New, serif';
            sub.style.color      = '#00838F';
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
        ta.value = texto;
        ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        var exito = false;
        try { exito = document.execCommand('copy'); } catch (_) {}
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

    // ─── Footer interactivo ───────────────────────────────
    function inicializarFooter() {
        activarBotonCopia(
            'texto-direccion',
            'Argentina, Buenos Aires, Moreno, Escuela Pública Nº1, Uruguay 53.',
            'Dirección copiada al portapapeles'
        );
        activarBotonCopia(
            'texto-autor',
            'Angel Nicolás Villegas (CENS 453, Moreno)',
            'Nombre del autor copiado. Podés buscarlo en redes sociales o preguntarle a tu IA favorita sobre él.'
        );
    }

    function activarBotonCopia(id, texto, mensaje) {
        var el = document.getElementById(id);
        if (!el) return;
        el.setAttribute('role',     'button');
        el.setAttribute('tabindex', '0');
        el.addEventListener('click', function () { copiar(texto, mensaje); });
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
            var url    = window.location.href.split('?')[0];
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

    // ─── Inicialización ───────────────────────────────────
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

// =========================================================
// MENÚ HAMBURGUESA + DRAWER + BUSCADOR INTERNO + TOOLTIP
// + VOLVER ARRIBA
// v5 (Junio 2026) — reescritura completa del módulo
//
// FIXES aplicados:
//   - pointer-events:none en drawer cerrado (evita clicks fantasma)
//   - e.stopPropagation() en btn-cerrar-drawer (evita bubbling al overlay)
//   - Removido btn.focus() en cerrarDrawer() (causaba re-scroll en mobile)
//   - Guard flag procesando para evitar doble disparo
//   - Buscador interno en el drawer con resultados en tiempo real
// =========================================================

(function () {
    'use strict';

    var CLAVE_TOOLTIP = 'pd_tooltip_nav_visto';
    var _procesando   = false; // guard anti-doble-disparo

    // ── Refs cacheadas (se resuelven en init, no en cada llamada) ──
    var $drawer, $overlay, $btnHam, $inputDrawer, $listaResultados;

    // ─────────────────────────────────────────────────────
    // DRAWER — abrir / cerrar
    // ─────────────────────────────────────────────────────

    function abrirDrawer() {
        if (!$drawer) return;
        $drawer.classList.add('drawer-visible');
        $drawer.setAttribute('aria-hidden', 'false');
        $overlay.classList.add('drawer-visible');
        $btnHam.classList.add('ham-abierto');
        $btnHam.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        // No uses focus() sobre ningún elemento al abrir el drawer.
        // El usuario decide si toca el buscador o navega manualmente.
    }

    function cerrarDrawer() {
        if (!$drawer) return;
        $drawer.classList.remove('drawer-visible');
        $drawer.setAttribute('aria-hidden', 'true');
        $overlay.classList.remove('drawer-visible');
        $btnHam.classList.remove('ham-abierto');
        $btnHam.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        // NO llamamos focus() aquí — en mobile causa scroll indeseado
        // El foco vuelve naturalmente al elemento anterior
    }

    function toggleDrawer() {
        if (_procesando) return;
        _procesando = true;
        setTimeout(function () { _procesando = false; }, 120);

        if ($btnHam.classList.contains('ham-abierto')) {
            cerrarDrawer();
        } else {
            abrirDrawer();
        }
    }

    // ─────────────────────────────────────────────────────
    // BUSCADOR INTERNO DEL DRAWER
    // Filtra tutoriales en tiempo real, muestra hasta 6 resultados
    // ─────────────────────────────────────────────────────

    function buscarEnDrawer(texto) {
        if (!$listaResultados) return;
        $listaResultados.innerHTML = '';

        var t = texto.trim().toLowerCase();
        if (!t) {
            $listaResultados.style.display = 'none';
            return;
        }

        var db = window.baseDeTutoriales;
        if (!db) return;

        var encontrados = Object.keys(db).filter(function (clave) {
            var info = db[clave];
            return (
                info.titulo.toLowerCase().includes(t) ||
                (info.detalle || '').toLowerCase().includes(t) ||
                (info.categoria || '').toLowerCase().includes(t)
            );
        }).slice(0, 6);

        if (encontrados.length === 0) {
            $listaResultados.innerHTML =
                '<li class="drawer-sin-resultado">Sin resultados para "' + texto + '"</li>';
            $listaResultados.style.display = 'block';
            return;
        }

        encontrados.forEach(function (clave) {
            var info = db[clave];
            var li   = document.createElement('li');
            var btn  = document.createElement('button');
            btn.className = 'drawer-resultado-item';
            btn.setAttribute('aria-label', 'Ver tutorial: ' + info.titulo);
            btn.innerHTML =
                '<span class="dr-icono">' + info.icono + '</span>' +
                '<span class="dr-titulo">' + info.titulo + '</span>';

            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                cerrarDrawer();
                setTimeout(function () {
                    if (typeof window.mostrarTutorial === 'function') {
                        window.mostrarTutorial(clave);
                    }
                }, 60);
            });

            li.appendChild(btn);
            $listaResultados.appendChild(li);
        });

        $listaResultados.style.display = 'block';
    }

    // ─────────────────────────────────────────────────────
    // ACCIONES DEL DRAWER (items de navegación)
    // ─────────────────────────────────────────────────────

    var ACCIONES = {
        inicio: function () {
            cerrarDrawer();
            if (typeof window.ocultarTutorial === 'function') window.ocultarTutorial();
            if (window.PD_UI && window.PD_UI.filtrarPorCategoria) {
                window.PD_UI.filtrarPorCategoria(null);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        tutoriales: function () {
            cerrarDrawer();
            if (typeof window.ocultarTutorial === 'function') window.ocultarTutorial();
            setTimeout(function () {
                var el = document.getElementById('menu-tutoriales');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 60);
        },
        favoritos: function () {
            cerrarDrawer();
            setTimeout(function () {
                var el = document.getElementById('seccion-favoritos');
                if (el) {
                    el.classList.remove('oculto');
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 60);
        },
        seguridad: function () {
            cerrarDrawer();
            setTimeout(function () {
                if (typeof window.mostrarTutorial === 'function') {
                    window.mostrarTutorial('mensajes_raros');
                }
            }, 60);
        },
        atencion: function () {
            cerrarDrawer();
            setTimeout(function () {
                var el = document.getElementById('atencion-comunidad');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 60);
        },
        onboarding: function () {
            cerrarDrawer();
            setTimeout(function () {
                if (window.PD_Onboarding) {
                    window.PD_Onboarding.resetear();
                    window.PD_Onboarding.mostrar();
                }
            }, 60);
        },
    };

    // ─────────────────────────────────────────────────────
    // INICIALIZAR DRAWER
    // ─────────────────────────────────────────────────────

    function initDrawer() {
        $drawer          = document.getElementById('drawer-nav');
        $overlay         = document.getElementById('drawer-overlay');
        $btnHam          = document.getElementById('btn-hamburger');
        $inputDrawer     = document.getElementById('drawer-buscador-input');
        $listaResultados = document.getElementById('drawer-resultados');

        if (!$drawer || !$btnHam) return;

        // ── Hamburger toggle ──────────────────────────────
        $btnHam.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleDrawer();
        });

        // ── Botón X dentro del drawer ─────────────────────
        var btnCerrar = document.getElementById('btn-cerrar-drawer');
        if (btnCerrar) {
            btnCerrar.addEventListener('click', function (e) {
                e.stopPropagation(); // ← impide que el click suba al overlay
                cerrarDrawer();
            });
        }

        // ── Overlay (clic fuera del panel) ────────────────
        if ($overlay) {
            $overlay.addEventListener('click', function (e) {
                // Solo cerrar si el clic es directamente en el overlay,
                // no en un hijo (el panel del drawer)
                if (e.target === $overlay) cerrarDrawer();
            });
        }

        // ── Escape ────────────────────────────────────────
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && $btnHam.classList.contains('ham-abierto')) {
                cerrarDrawer();
            }
        });

        // ── Focus trap ────────────────────────────────────
        $drawer.addEventListener('keydown', function (e) {
            if (e.key !== 'Tab' || !$btnHam.classList.contains('ham-abierto')) return;
            var focusables = Array.from(
                $drawer.querySelectorAll(
                    'button:not([disabled]), input:not([disabled]), [tabindex="0"]'
                )
            );
            if (!focusables.length) return;
            var first = focusables[0];
            var last  = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault(); last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault(); first.focus();
            }
        });

        // ── Items de navegación ────────────────────────────
        $drawer.querySelectorAll('.drawer-item[data-accion]').forEach(function (item) {
            item.addEventListener('click', function (e) {
                e.stopPropagation();
                var accion = item.dataset.accion;
                if (ACCIONES[accion]) ACCIONES[accion]();
            });
        });

        // ── Buscador interno ──────────────────────────────
        if ($inputDrawer) {
            $inputDrawer.addEventListener('input', function () {
                buscarEnDrawer($inputDrawer.value);
            });
            $inputDrawer.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') {
                    $inputDrawer.value = '';
                    buscarEnDrawer('');
                }
            });
        }

        // ── Filtros de categoría en el drawer ─────────────
        $drawer.querySelectorAll('.drawer-cat-btn').forEach(function (catBtn) {
            catBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                var cat = catBtn.dataset.cat;
                cerrarDrawer();
                setTimeout(function () {
                    if (typeof window.ocultarTutorial === 'function') {
                        window.ocultarTutorial();
                    }
                    if (window.PD_UI && window.PD_UI.filtrarPorCategoria) {
                        window.PD_UI.filtrarPorCategoria(cat);
                    }
                    var menu = document.getElementById('menu-tutoriales');
                    if (menu) menu.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 60);
            });
        });
    }

    // ─────────────────────────────────────────────────────
    // HERRAMIENTA DE CONSEJO DE PRIMERA VEZ
    // ─────────────────────────────────────────────────────

    // Idempotente: puede llamarse N veces sin efecto extra.
    // No depende de estado externo — busca el elemento cada vez.
    function cerrarConsejoInicial() {
        var el = document.getElementById('tooltip-nav');
        if (!el || el.style.display === 'none') return;
        // 1. Cancelar animación CSS (evita que fill-mode:both pise opacity:0)
        el.style.animation    = 'none';
        el.style.opacity      = '0';
        el.style.transform    = 'translateY(-8px)';
        el.style.pointerEvents = 'none';
        el.setAttribute('aria-hidden', 'true');
        // 2. Persistir para no volver a mostrar
        try { localStorage.setItem(CLAVE_TOOLTIP, '1'); } catch (_) {}
        // 3. Remover del flujo completamente tras la transición
        setTimeout(function () {
            if (el) el.style.display = 'none';
        }, 300);
    }

    // Alias interno — conserva compatibilidad con llamadas previas
    var cerrarTooltip = cerrarConsejoInicial;

    function initConsejoInicial() {
        var el = document.getElementById('tooltip-nav');
        if (!el) return;

        // Si ya fue visto: ocultar de inmediato sin animar
        var yaVisto = false;
        try { yaVisto = localStorage.getItem(CLAVE_TOOLTIP) === '1'; } catch (_) {}
        if (yaVisto) {
            el.style.display = 'none';
            el.setAttribute('aria-hidden', 'true');
            return;
        }

        // ── Botón X ───────────────────────────────────────
        // Se busca el elemento en el momento de registrar el listener,
        // NO se depende de variables externas ($btnHam puede no existir aún).
        var btnX = document.getElementById('btn-cerrar-tooltip');
        if (btnX) {
            // Fase de captura: intercepta antes que cualquier otro listener
            btnX.addEventListener('click', function (e) {
                e.stopPropagation();
                e.preventDefault();
                cerrarConsejoInicial();
            }, true);
            // Bloquear mousedown/touchstart para que no lleguen al hamburger
            btnX.addEventListener('mousedown',  function (e) { e.stopPropagation(); }, true);
            btnX.addEventListener('touchstart', function (e) { e.stopPropagation(); },
                { passive: false, capture: true });
            btnX.addEventListener('touchend',   function (e) {
                e.stopPropagation();
                e.preventDefault();
                cerrarConsejoInicial();
            }, { passive: false, capture: true });
        }

        // ── Auto-cerrar a los 6s ──────────────────────────
        var timer6s = setTimeout(cerrarConsejoInicial, 6000);

        // ── Cerrar al primer scroll ───────────────────────
        window.addEventListener('scroll', function onScroll() {
            window.removeEventListener('scroll', onScroll);
            clearTimeout(timer6s);
            cerrarConsejoInicial();
        }, { passive: true });

        // ── Cerrar cuando se abre el drawer ──────────────
        // Se usa delegación en document para no depender de $btnHam
        document.addEventListener('click', function onHamClick(e) {
            if (e.target && e.target.closest('#btn-hamburger')) {
                document.removeEventListener('click', onHamClick, true);
                cerrarConsejoInicial();
            }
        }, true);
    }

    // Alias para compatibilidad con llamadas externas
    var initTooltip = initConsejoInicial;

    // ─────────────────────────────────────────────────────
    // BOTÓN VOLVER ARRIBA
    // ─────────────────────────────────────────────────────

    function initVolverArriba() {
        var btn = document.getElementById('btn-volver-arriba');
        if (!btn) return;

        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        var raf = null;
        window.addEventListener('scroll', function () {
            if (raf) return;
            raf = requestAnimationFrame(function () {
                raf = null;
                btn.classList.toggle('visible', window.scrollY > 300);
            });
        }, { passive: true });
    }

    // ─────────────────────────────────────────────────────
    // INIT
    // ─────────────────────────────────────────────────────

    function initNavExtras() {
        initDrawer();
        initConsejoInicial();   // Herramienta de Consejo de Primera Vez
        initVolverArriba();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavExtras);
    } else {
        initNavExtras();
    }

})();
