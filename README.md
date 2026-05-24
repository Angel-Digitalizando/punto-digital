# 🌐 Punto Digital Comunitario Morenense

**Tutoriales digitales accesibles para vecinos de Moreno, Buenos Aires.**

Guía paso a paso para hacer trámites online: ANSES, CUIL, correo electrónico, Mi Argentina, y más. Diseñada especialmente para adultos mayores y personas con baja experiencia tecnológica.

---

## ✨ ¿Qué es esto?

Una Progressive Web App (PWA) educativa que:

- funciona **sin internet** después de la primera visita
- se puede **instalar en el celular** como si fuera una app
- tiene **lectura en voz alta** paso a paso
- tiene **modo de letra grande** y **alto contraste**
- guarda tu **progreso y favoritos** en el dispositivo
- está diseñada para **Android económicos** y conexiones lentas

No requiere Play Store. No requiere cuenta. No guarda datos en servidores.

---

## 📱 Para los vecinos — cómo acceder

Desde el celular, abrí el navegador y entrá a la dirección del sitio.
Cuando cargue, el navegador va a ofrecer **"Agregar a la pantalla de inicio"** — tocá que sí para instalarlo como app.

A partir de ahí funciona sin internet.

---

## 🗂️ Estructura del proyecto

```
punto-digital/
│
├── index.html              # Página principal (shell de la app)
├── offline.html            # Página amigable cuando no hay internet
├── service-worker.js       # Lógica de cache y funcionamiento offline
├── manifest.json           # Configuración de la PWA (nombre, íconos)
├── netlify.toml            # Configuración de deploy para Netlify
├── _headers                # Headers HTTP (Cloudflare Pages / Netlify)
├── .gitignore
├── README.md
│
├── css/
│   └── style.css           # Estilos únicos — sin frameworks
│
├── js/
│   ├── storage.js          # Persistencia local (localStorage)
│   ├── tutoriales.js       # Base de datos de tutoriales (contenido)
│   ├── ui.js               # Lógica de interfaz principal
│   ├── accesibilidad.js    # Modos: letra grande, contraste, ultra
│   ├── script.js           # Saludo, footer, copiar al portapapeles
│   ├── pwa.js              # Registro SW, indicador online/offline
│   │
│   ├── components/
│   │   ├── toast.js        # Notificaciones visuales (sistema único)
│   │   ├── progressBar.js  # Progreso global y badges
│   │   └── tutorialCard.js # Favoritos, completado, acciones
│   │
│   └── voice/
│       └── speech.js       # Lectura en voz alta paso a paso
│
└── assets/
    └── icons/
        ├── icon.svg                 # Ícono vectorial (fallback)
        ├── icon-192.png             # Requerido para Android (ver nota)
        ├── icon-512.png             # Requerido para splash screen
        └── ICONOS_PENDIENTES.md     # Instrucciones para generar los PNG
```

> **Nota sobre los íconos PNG:** el repositorio incluye `icon.svg` como fallback. Para que el ícono aparezca en la pantalla de inicio del celular, hay que generar los PNG. Las instrucciones están en `assets/icons/ICONOS_PENDIENTES.md`.

---

## 💻 Instalación local (para desarrollar)

No hace falta instalar nada.

### Opción A — Live Server (VS Code)

1. Instalar la extensión **Live Server** en VS Code
2. Clonar el repositorio:
   ```bash
   git clone https://github.com/TU_USUARIO/punto-digital.git
   cd punto-digital
   ```
3. Abrir la carpeta en VS Code
4. Click derecho en `index.html` → **"Open with Live Server"**
5. Se abre en `http://127.0.0.1:5500/`

> El Service Worker requiere HTTPS o `localhost`/`127.0.0.1`. Live Server cumple con esto.

### Opción B — Python (sin instalar nada extra)

```bash
# Python 3
python3 -m http.server 8000

# Python 2 (si es lo que hay)
python -m SimpleHTTPServer 8000
```

Abrir `http://localhost:8000` en el navegador.

### Opción C — Node.js

```bash
npx serve .
```

---

## 🚀 Despliegue

### GitHub Pages (recomendado — gratis)

1. Subir el proyecto a un repositorio en GitHub
2. Ir a **Settings → Pages**
3. En "Source", elegir **"Deploy from a branch"**
4. Rama: `main`, carpeta: `/ (root)`
5. Guardar — en unos minutos el sitio estará en:
   `https://TU_USUARIO.github.io/punto-digital/`

> **Importante:** El `service-worker.js` en GitHub Pages se sirve sin el header `Service-Worker-Allowed`. Esto no es problema porque el SW vive en la raíz del proyecto y su scope predeterminado (`./`) cubre toda la app.

### Netlify (alternativa — también gratis)

1. Ir a [netlify.com](https://netlify.com) y crear cuenta gratuita
2. Arrastrar la carpeta del proyecto al panel de Netlify, **o**
3. Conectar el repositorio de GitHub para deploy automático

El archivo `netlify.toml` ya tiene toda la configuración necesaria.
La app queda en `https://tu-nombre.netlify.app`

### Dominio propio (opcional)

Tanto GitHub Pages como Netlify permiten conectar un dominio propio.
La PWA requiere HTTPS — ambas plataformas lo proveen automáticamente.

---

## 🛠️ Cómo agregar o editar tutoriales

Los tutoriales están en un solo archivo: **`js/tutoriales.js`**

Cada tutorial tiene esta estructura:

```javascript
nombreClave: {
    titulo:  "Título que ve el usuario",
    icono:   "📱",   // Emoji que aparece en el botón
    detalle: "Descripción breve del tutorial",
    pasos:   [
        "Texto del paso 1...",
        "Texto del paso 2...",
        // Se puede incluir HTML limitado: <strong>, <em>, botones .btn-paso
    ]
}
```

Para agregar un tutorial nuevo:

1. Abrir `js/tutoriales.js`
2. Copiar un bloque existente y pegarlo al final (antes del `}`  final)
3. Cambiar la clave (`nombreClave`), título, icono, detalle y pasos
4. El nuevo tutorial aparece automáticamente en el menú — no hay que tocar el HTML

---

## ♿ Accesibilidad

El proyecto cumple con las siguientes pautas de WCAG 2.1:

- **1.4.4** — Texto redimensionable (zoom habilitado, `user-scalable=yes`)
- **1.4.3** — Contraste mínimo (ratios verificados en modos normal y alto contraste)
- **2.1.1** — Teclado (todos los elementos interactivos son accesibles por teclado)
- **2.4.1** — Saltear bloques (skip link presente)
- **4.1.2** — Nombre, función, valor (`aria-label`, `aria-pressed`, `role` en todos los controles)

Funciona con **TalkBack** (Android) y **VoiceOver** (iOS).

---

## 🏗️ Decisiones de arquitectura

### Sin frameworks, sin build step

HTML, CSS y JavaScript vanilla. Sin React, sin npm, sin Webpack.
El proyecto se puede abrir directamente en cualquier browser sin compilar nada.

### Módulos ES3/ES5 compatible

Los módulos JS usan el patrón IIFE con `'use strict'`. Compatible con Android 4.4+ (Chrome 49+). Las API modernas (`clipboard`, `speechSynthesis`, etc.) tienen degradación progresiva con `if (window.X)`.

### Service Worker: Cache-First con Stale-While-Revalidate

La app funciona offline desde la segunda visita. En background, actualiza el cache sin interrumpir al usuario. Un bump en `CACHE_VERSION` en `service-worker.js` fuerza reinstalación completa.

### Persistencia: localStorage

Se usa `localStorage` para guardar configuración de accesibilidad, favoritos, progreso y tutorial reciente. La arquitectura de `storage.js` está preparada para migrar a IndexedDB en el futuro sin cambiar la API pública.

### Sistema de toast unificado

Todo el feedback visual pasa por `PD_Toast` (`components/toast.js`). No hay sistemas paralelos de notificaciones.

---

## 📋 Checklist antes de publicar

- [x] Generar `icon-192.png` e `icon-512.png` (ver `assets/icons/ICONOS_PENDIENTES.md`)
- [x] Actualizar `og:image` en `index.html` con la URL absoluta del ícono publicado
- [x] Verificar que el sitio abre correctamente en Chrome Android
- [x] Instalar como PWA desde Chrome Android y probar offline
- [x] Revisar la dirección en el footer (actualmente: Moreno, Escuela 1, Uruguay 53)
- [x] Revisar el nombre del autor en el footer

---

## 🤝 Cómo colaborar

1. Hacer fork del repositorio, significa crear una copia completa y personal de un repositorio de código (por ejemplo, en GitHub) en tu propia cuenta.
2. Crear una rama: `git checkout -b mejora/nombre-del-cambio`
3. Hacer los cambios
4. Commit: `git commit -m "descripcion clara del cambio"`
5. Push: `git push origin mejora/nombre-del-cambio`
6. Abrir un Pull Request describiendo qué cambiaste y por qué

### Tipos de contribuciones bienvenidas

- **Tutoriales nuevos** — agregar trámites que faltan
- **Correcciones de texto** — mejorar la claridad de los pasos
- **Accesibilidad** — reportar problemas con lectores de pantalla
- **Testing en Android** — probar en dispositivos reales y reportar bugs
- **Traducción** — adaptar a otras variantes del español o idiomas

---

## 📜 Licencia

MIT — libre para usar, modificar y distribuir con atribución.

Contenido educativo desarrollado por **Ángel Nicolás Villegas**.

---

## 📞 Contacto

📍 Moreno, Escuela 1, Uruguay 53
Espacios de Alfabetización y Educación Digital Comunitaria
