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

<<<<<<< HEAD
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
=======
punto-digital/

├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── accesibilidad.js
│   ├── tutoriales.js
│   ├── ui.js
│   ├── storage.js
│   └── pwa.js
│
├── assets/
│   ├── icons/
│   ├── images/
│   └── audio/
│
├── html/
│   ├── brecha-digital/
│   │   ├── index.html
│   │   └── humanos-ia-aprendices.html
│   │
│   └── futuras-secciones/
│
├── manifest.json
│
└── README.md
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7

---

# Flujo de Navegación

<<<<<<< HEAD
index-punto-digital.html -> paso-a-paso.html
    ↓
brecha-digital.html
    ↓
humanos-e-ias-aprendices.html

desde todas se puede volver al punto digital

---

## tutoriales.js -> [migrar a paso-a-paso.html]

Base de datos de los pasos (tutoriales).
=======
Punto Digital
    ↓
Brecha Digital
    ↓
Humanos e IA Aprendices

---

# Responsabilidad de cada archivo

## index.html

Landing principal.

Funciones:

- bienvenida
- acceso rápido
- tutoriales
- accesibilidad
- navegación principal

---

## brecha-digital/index.html

Puerta de entrada a:

- alfabetización digital
- ciudadanía digital
- inclusión tecnológica

---

## humanos-ia-aprendices.html

Contenido educativo.

Temas:

- internet
- archivos
- HTML
- CSS
- JavaScript
- IA
- software libre

---

# JavaScript

## accesibilidad.js

Responsable de:

- escalado tipográfico
- alto contraste
- preferencias visuales

---

## tutoriales.js

Base de datos de tutoriales.
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7

Contiene:

- categorías
- niveles
- contenido

---

<<<<<<< HEAD
## ui.js [...]
=======
## ui.js

Renderizado dinámico.

Responsable de:

- overlays
- modales
- tutoriales
- navegación visual

---

## storage.js

Persistencia local.

Responsable de:

- localStorage
- preferencias
- estados de usuario

---

## pwa.js

Funciones PWA.

Responsable de:

- manifest
- service worker

---

# Problemas conocidos

## Escalado tipográfico

Estado:
Pendiente.

Descripción:

Parte del contenido generado dinámicamente no respeta completamente la escala de accesibilidad.

Archivos candidatos:

- tutoriales.js
- ui.js

---

# Próxima fase visual

## Prioridad 1

Mejorar landing principal.

Objetivos:

- jerarquía visual
- animaciones suaves
- iconografía coherente
- CTA destacados

---

## Prioridad 2

Brecha Digital.

Objetivos:

- continuidad visual
- identidad educativa
- navegación clara

---

## Prioridad 3

Humanos e IA Aprendices.

Objetivos:

- lectura cómoda
- contenido pedagógico
- línea temporal tecnológica

---

# Decisiones de Diseño

- Accesibilidad primero
- Mobile first
- CSS centralizado
- Reutilización de componentes
- Evitar CSS embebido
- Evitar duplicación de lógica

---

# Futuras Expansiones

- audio educativo
- testimonios comunitarios
- grabaciones de campo
- recursos descargables
- mapas interactivos
- material docente
>>>>>>> 8230700b7d26817c0737ce86af4f707d9dca87c7
