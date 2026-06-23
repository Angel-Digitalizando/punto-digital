# Arquitectura del Proyecto — Punto Digital

## Estado Actual

Proyecto educativo-comunitario orientado a:

- alfabetización digital
- accesibilidad
- ciudadanía digital
- tutoriales guiados
- aprendizaje de tecnologías e IA

---

# Estructura de Carpetas

punto-digital
├── _headers
├── assets
│   └── icons
│       ├── another-icons
│       │   ├── AI_ChatGPT_icon.svg
│       │   ├── AI_Claude_icon.svg
│       │   └── AI_Gemini_icon.svg
│       ├── icon-192.png
│       ├── icon-512.png
│       └── icon.svg
├── css
│   └── style.css
├── docs
│   ├── CHANGELOG_v5.md
│   ├── Flow-de-laburo.md
│   ├── README.md
│   ├── arquitectura.md
│   ├── decisiones.md
│   └── mapa-de-ruta.md
├── index-punto-digital.html
├── js
│   ├── accesibilidad.js
│   ├── components
│   │   ├── progressBar.js
│   │   ├── toast.js
│   │   └── tutorialCard.js
│   ├── deeplink.js
│   ├── onboarding.js
│   ├── paso-a-paso.js
│   ├── pwa.js
│   ├── script.js
│   ├── storage.js
│   ├── tutoriales.js
│   ├── ui.js
│   └── voice
│       └── speech.js
├── manifest.json
├── netlify.toml
├── offline.html
├── page
│   ├── brecha-digital.html
│   ├── humanos-e-ias-aprendices.html
│   └── paso-a-paso.html
└── service-worker.js

10 directories, 35 files

---

# Flujo de Navegación

index-punto-digital.html -> paso-a-paso.html
    ↓
brecha-digital.html
    ↓
humanos-e-ias-aprendices.html

desde todas se puede volver al punto digital

---

## tutoriales.js -> [migrar a paso-a-paso.html]

Base de datos de los pasos (tutoriales).

Contiene:

- categorías
- niveles
- contenido

---

## ui.js [...]
