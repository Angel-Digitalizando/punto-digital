<<<<<<< HEAD
// ==============================
// storage.js — Persistencia local (localStorage)
// Punto Digital Comunitario Morenense
// DEBE CARGARSE PRIMERO. Sin dependencias externas.
// ==============================
=======
// =========================================================
// storage.js — Persistencia local (localStorage)
// Punto Digital Comunitario Morenense
// ─── DEBE CARGARSE PRIMERO. Sin dependencias externas. ───
// =========================================================
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7

(function () {
    'use strict';

    const CLAVES = {
        CONFIG:    'pd_config',
        FAVORITOS: 'pd_favoritos',
        PROGRESO:  'pd_progreso',
        RECIENTE:  'pd_reciente',
    };

    // Defaults completos de configuración
    const CONFIG_DEFAULT = {
        lecturaGrande:       false,
        altoContraste:       false,
        modoUltra:           false,
        // Flag: qué modos activó el usuario INDEPENDIENTEMENTE del Modo Ultra.
        // Permite que desactivar Modo Ultra no apague lo que el usuario encendió solo.
        lecturaGrandeManual: false,
        altoContrasteManual: false,
        velocidadVoz:        0.88,
    };

<<<<<<< HEAD
    // Utilidades seguras 
=======
    // ─── Utilidades seguras ───────────────────────────────
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
    function leer(clave) {
        try {
            const raw = localStorage.getItem(clave);
            return raw ? JSON.parse(raw) : null;
        } catch (_) {
            return null;
        }
    }

    function escribir(clave, valor) {
        try {
            localStorage.setItem(clave, JSON.stringify(valor));
            return true;
        } catch (_) {
            // localStorage lleno o bloqueado (modo privado Android)
            return false;
        }
    }

<<<<<<< HEAD
    // Configuración 
=======
    // ─── Configuración ────────────────────────────────────
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
    function obtenerConfiguracion() {
        // Merge con defaults para tolerar keys faltantes en versiones viejas
        return Object.assign({}, CONFIG_DEFAULT, leer(CLAVES.CONFIG) || {});
    }

    function guardarConfiguracion(parcial) {
        const actual = obtenerConfiguracion();
        return escribir(CLAVES.CONFIG, Object.assign({}, actual, parcial));
    }

<<<<<<< HEAD
    // Favoritos 
=======
    // ─── Favoritos ────────────────────────────────────────
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
    function obtenerFavoritos() {
        return leer(CLAVES.FAVORITOS) || [];
    }

    function guardarFavorito(idClave) {
        const lista = obtenerFavoritos();
        if (!lista.includes(idClave)) {
            lista.push(idClave);
            escribir(CLAVES.FAVORITOS, lista);
        }
        return lista;
    }

    function quitarFavorito(idClave) {
        const lista = obtenerFavoritos().filter(id => id !== idClave);
        escribir(CLAVES.FAVORITOS, lista);
        return lista;
    }

    function esFavorito(idClave) {
        return obtenerFavoritos().includes(idClave);
    }

<<<<<<< HEAD
    //  Progreso 
=======
    // ─── Progreso ─────────────────────────────────────────
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
    function obtenerProgreso() {
        return leer(CLAVES.PROGRESO) || {};
    }

    function marcarCompletado(idClave) {
        const progreso = obtenerProgreso();
        progreso[idClave] = { completado: true, fecha: Date.now() };
        escribir(CLAVES.PROGRESO, progreso);
        return progreso;
    }

    function estaCompletado(idClave) {
        const p = obtenerProgreso();
        return !!(p[idClave] && p[idClave].completado);
    }

    function contarCompletados() {
        return Object.values(obtenerProgreso()).filter(p => p.completado).length;
    }

<<<<<<< HEAD
    //  Tutorial reciente 
=======
    // ─── Tutorial reciente ────────────────────────────────
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
    function guardarTutorialReciente(idClave) {
        escribir(CLAVES.RECIENTE, { id: idClave, fecha: Date.now() });
    }

    function obtenerTutorialReciente() {
        return leer(CLAVES.RECIENTE);
    }

<<<<<<< HEAD
    // API pública 
=======
    // ─── API pública ──────────────────────────────────────
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
    window.PD_Storage = {
        obtenerConfiguracion,
        guardarConfiguracion,
        obtenerFavoritos,
        guardarFavorito,
        quitarFavorito,
        esFavorito,
        obtenerProgreso,
        marcarCompletado,
        estaCompletado,
        contarCompletados,
        guardarTutorialReciente,
        obtenerTutorialReciente,
    };

})();
