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

---

# Flujo de Navegación

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

Contiene:

- categorías
- niveles
- contenido

---

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