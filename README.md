# 🌐 Punto Digital Comunitario Morenense

**Tutoriales digitales accesibles para vecinos de Moreno, Buenos Aires.**

Guía paso a paso para hacer trámites online: ANSES, CUIL, correo electrónico, Mi Argentina, y más. Diseñada especialmente para adultos mayores y personas con baja experiencia tecnológica.

---

## ✨ ¿Qué es esto?

Una Progressive Web App (PWA) educativa que:

- Funciona **sin internet** después de la primera visita.
- Se puede **instalar en el celular** como si fuera una app nativa.
- Cuenta con **lectura en voz alta** paso a paso para personas con dificultades de lectura.
- Incluye un **modo de letra grande** y **alto contraste** (Lupa Digital de accesibilidad).
- Guarda de forma 100% local tu **progreso y favoritos** en el dispositivo.
- Está optimizada para **dispositivos Android económicos** y conexiones lentas (3G/4G intermitente).
- **Barra horizontal para compartir:** Incluye el icono universal (triángulo de tres puntos) que aprovecha la compartición nativa de tu teléfono o copia el enlace al portapapeles.
- **Navegación inteligente:** Al tocar "Volver al inicio" o completar un tutorial, la app limpia automáticamente cualquier filtro y te muestra **todos los tutoriales juntos** de nuevo.

No requiere descargas de Play Store. No requiere creación de cuentas. No guarda datos personales en servidores.

---

## 📱 Para los vecinos — cómo acceder

Desde el celular, abrí el navegador (Google Chrome) y entrá a la dirección del sitio.
Cuando cargue, el navegador va a ofrecer un cartel flotante que dice **"Agregar a la pantalla de inicio"** — tocá que sí para instalarlo como app en tu escritorio.

A partir de ahí, la app funcionará por completo aunque te quedes sin datos o sin señal.

---

## 🗂️ Estructura del proyecto
punto-digital/
│
├── index.html              # Página principal (shell de la app)
├── offline.html            # Página amigable cuando no hay internet
├── service-worker.js       # Lógica de cache y funcionamiento offline
├── manifest.json           # Configuración de la PWA
├── netlify.toml            # Configuración de deploy para Netlify
├── _headers                # Headers HTTP
├── README.md
│
├── css/
│   └── style.css           # Estilos únicos — sin frameworks
│
├── js/
│   ├── storage.js          # Persistencia local (localStorage)
│   ├── tutoriales.js       # Base de datos de tutoriales
│   ├── ui.js               # Lógica de interfaz, buscador, menú y compartir
│   ├── accesibilidad.js    # Modos: letra grande, contraste
│   ├── script.js           # Saludo, footer, utilidades
│   ├── pwa.js              # Registro SW, indicador online/offline
│   │
│   ├── components/
│   │   ├── toast.js        # Notificaciones visuales
│   │   ├── progressBar.js  # Progreso global
│   │   └── tutorialCard.js # Gestión de favoritos y completados
│   │
│   └── voice/
│       └── speech.js       # Síntesis de voz (lectura paso a paso)


---

## 💻 Instalación local (para desarrollar)

### Opción A — Live Server (VS Code)
1. Abrir la carpeta en VS Code.
2. Click derecho en `index.html` → **"Open with Live Server"**.
3. Se abrirá en `http://127.0.0.1:5500/`.

### Opción B — Servidor rápido
Si tenés Python: `python3 -m http.server 8000` y abrir `http://localhost:8000`.

---

## 🚀 Despliegue

### GitHub Pages (Recomendado y Gratis)
1. Subí el proyecto a un repositorio.
2. En **Settings → Pages**, seleccioná `main` y `/ (root)`.
3. Tu sitio estará listo en: `https://TU_USUARIO.github.io/punto-digital/`

### Netlify (Automático)
Arrastrá la carpeta al panel de Netlify o conectá tu cuenta de GitHub. El `netlify.toml` ya incluye toda la configuración necesaria.

---

## 🛠️ Cómo agregar o editar tutoriales

Los tutoriales se gestionan en: **`js/tutoriales.js`**.

1. **Registrar categoría:** Si es nueva, declarala en el objeto `CATEGORIAS` dentro de `js/ui.js` para que la app sepa mostrarla.
2. **Escribir el contenido:** Abrí `js/tutoriales.js`, copiá un bloque existente y editalo. La app detecta los cambios automáticamente.

---

## ♿ Accesibilidad

Cumple con **WCAG 2.1**:
- **Zoom y escalado:** `user-scalable=yes`.
- **Contraste:** Ratios superiores a 4.5:1.
- **Teclado:** Navegación completa mediante la tecla Tab.
- **Lector de pantalla:** Compatible con TalkBack (Android) y VoiceOver (iOS).

---

## 🏗️ Decisiones de arquitectura

- **Vanilla JS:** Sin frameworks ni compilación.
- **Cache-First:** Funcionamiento offline garantizado tras la primera carga.
- **LocalStorage:** Privacidad total, sin servidores de base de datos.
- **Actualización Mayo 2026:** Integración de API Web Share y limpieza automática de estados de navegación.

---

## 🤝 Cómo colaborar

1. **Fork** del repositorio.
2. Rama: `git checkout -b mejora/nombre-del-cambio`.
3. **Commit** claro y directo.
4. **Pull Request** detallando el cambio.

Contribuciones bienvenidas: nuevos tutoriales, correcciones de redacción, pruebas en dispositivos reales y accesibilidad.

---

## 📜 Licencia

**MIT** — Libre para usar, modificar y distribuir con atribución.
Contenido desarrollado por **Ángel Nicolás Villegas**.

---

## 📞 Contacto

📍 **Moreno, Escuela 1, Uruguay 53**
Espacios de Alfabetización y Educación Digital Comunitaria.