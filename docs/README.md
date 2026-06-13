# 🌐 Punto Digital Comunitario Morenense

**Tutoriales digitales accesibles y servicios municipales para vecinos de Moreno, Buenos Aires.**

Guía paso a paso para hacer trámites online (ANSES, CUIL, Mi Argentina) y acceso directo a servicios de emergencia y gestión municipal. Diseñada especialmente para adultos mayores y personas con baja experiencia tecnológica.

---

## ✨ ¿Qué es esto?

Una Progressive Web App (PWA) educativa que:
- **Funciona offline:** Acceso total sin internet después de la primera visita.
- **Nativa:** Se puede instalar en la pantalla de inicio del celular.
- **Accesible:** Incluye lectura en voz alta (TTS), modo de letra grande y alto contraste.
- **Privada:** Guarda favoritos y progreso 100% en el dispositivo (LocalStorage).
- **Municipal:** Integración directa con teléfonos de emergencia (SAME, Bomberos, Violencia de Género) y sedes administrativas (Palacio Municipal, anexos).

---

## 📱 Sección: Atención a la Comunidad

La plataforma ahora incluye un módulo integrado de servicios municipales esenciales:
- **Llamadas rápidas:** Marcación directa con un toque a servicios de emergencia (107, 911, 144, etc).
- **Gestión diaria:** Enlaces directos a denuncias de basurales y farmacias de turno en Moreno.
- **Referencias geográficas:** Información clara sobre la ubicación del Palacio Municipal, Anexos (España y Bv. Evita) y Av. Victorica.

---

## 🗂️ Estructura del Proyecto

punto-digital/
├── index.html
├── offline.html
├── service-worker.js
├── manifest.json
├── netlify.toml
├── _headers
├── README.md
├── css/
│   └── style.css
└── js/
├── tutoriales.js
├── ui.js
├── storage.js
├── pwa.js
├── script.js
├── components/
│   ├── toast.js
│   ├── progressBar.js
│   └── tutorialCard.js
└── voice/
└── speech.js

---

## 🛠️ Cómo mantener y ampliar

### 1. Agregar Tutoriales

Toda la información reside en `js/tutoriales.js`.

* **Categoría:** Si es nueva, regístrala en el objeto `CATEGORIAS` de `js/ui.js`.
* **Tutorial:** Añade el objeto siguiendo la estructura (título, pasos, icono). La App lo detectará automáticamente.

### 2. Actualizar Servicios Municipales

Para cambiar números o direcciones, edita la sección en `index.html` (antes del footer).

* **Importante:** Al usar enlaces `tel:`, asegúrate de mantener el formato sin espacios para que los navegadores móviles lo reconozcan correctamente como llamada.

---

## ♿ Accesibilidad y UX

Cumplimos con pautas WCAG 2.1:

* **Alto contraste:** Colores institucionales para visibilidad clara.
* **Responsive:** Diseño adaptado a dispositivos de gama baja.
* **Navegación intuitiva:** Botón "Volver arriba" y estructura de bloques tipo "gobierno" para facilitar la orientación del vecino.

---

## 🏗️ Bitácora de Desarrollo (Junio 2026)

* **Feat:** Integración de módulo "Atención a la Comunidad" con enlaces a servicios oficiales.
* **Fix:** Corrección de sintaxis en `ui.js` y optimización del flujo de carga de secciones.
* **Style:** Re-diseño de menús basado en la identidad visual de la Municipalidad de Moreno.
* **UX:** Implementación de referencias geográficas en el footer para facilitar la presencialidad.

---

## 📜 Licencia y Contacto

Licencia MIT.
Desarrollado por: **Angel Nicolás Villegas (CENS 453, Moreno)**.
📍 **Contacto:** Escuela N°1, Uruguay 53, Moreno.

```

```
