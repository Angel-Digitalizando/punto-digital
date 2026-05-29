# 🌐 Punto Digital Comunitario Morenense

**Tutoriales digitales accesibles para vecinos de Moreno, Buenos Aires.**

Guía paso a paso para hacer trámites online: ANSES, CUIL, correo electrónico, Mi Argentina, y más. Diseñada especialmente para adultos mayores y personas con baja experiencia tecnológica.

---

## ✨ ¿Qué es esto?

Una Progressive Web App (PWA) educativa que:
- Funciona sin internet después de la primera visita.
- Se puede instalar en el celular como una aplicación nativa.
- Incluye lectura en voz alta paso a paso.
- Ofrece modo de letra grande y alto contraste (Lupa Digital).
- Guarda tu progreso y favoritos 100% en tu dispositivo.
- Está optimizada para celulares de gama baja y conexiones lentas.
- Permite compartir tutoriales fácilmente con un botón de acceso directo.
- Posee una navegación inteligente que reinicia el menú al volver al inicio.

---

## 📱 Acceso para Vecinos

Desde tu celular, abre el navegador (ej. Google Chrome) y entra al sitio web. Cuando la página cargue, verás un aviso para "Agregar a la pantalla de inicio". Al aceptar, tendrás el icono en tu escritorio para acceder sin necesidad de internet.

---

## 🗂️ Estructura del Proyecto

punto-digital/
├── index.html           # Interfaz principal
├── offline.html         # Página para acceso sin conexión
├── service-worker.js    # Lógica de caché PWA
├── manifest.json        # Configuración de la app
├── css/style.css        # Estilos accesibles
└── js/
    ├── tutoriales.js    # Base de datos de tutoriales
    ├── ui.js            # Lógica de interfaz y navegación
    ├── storage.js       # Guardado local
    └── voice/speech.js  # Lectura en voz alta

---

## 🚀 Despliegue y Desarrollo

### Instalación local
1. Clona el repositorio.
2. Si usas VS Code, utiliza la extensión "Live Server" sobre index.html.
3. Alternativamente, usa Python: `python3 -m http.server 8000`.

### Despliegue Público
- GitHub Pages o Netlify son las opciones recomendadas.
- Ambos servicios proveen HTTPS automáticamente, lo cual es obligatorio para que el Service Worker (funcionamiento offline) trabaje correctamente.

---

## 🛠️ Cómo agregar tutoriales

Toda la información se encuentra en **js/tutoriales.js**.

1. Si es una categoría nueva, regístrala primero en el objeto `CATEGORIAS` dentro de **js/ui.js**.
2. Agrega el nuevo tutorial en **js/tutoriales.js** siguiendo la estructura de objeto (titulo, icono, detalle y array de pasos).
3. La aplicación detectará automáticamente el cambio y lo mostrará en el menú.

---

## ♿ Accesibilidad

Cumplimos con las pautas WCAG 2.1:
- Texto redimensionable y zoom habilitado.
- Contraste superior a 4.5:1.
- Navegación completa por teclado (Tab).
- Compatibilidad total con TalkBack (Android) y VoiceOver (iOS).

---

## 🏗️ Notas técnicas (Mayo 2026)

- **Vanilla JS:** Sin frameworks pesados.
- **Persistencia:** LocalStorage para máxima privacidad.
- **Navegación:** Se corrigió el flujo para que, al regresar al inicio, se eliminen los filtros activos y se visualice todo el catálogo.
- **Compartir:** Implementada API nativa de Web Share con fallback a portapapeles.

---

## 📜 Licencia y Contacto

Licencia MIT.
Desarrollado por: **Ángel Nicolás Villegas**.
📍 Moreno, Escuela 1, Uruguay 53.