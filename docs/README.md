# 🌐 Punto Digital Comunitario Morenense

> **Una guía práctica para resolver trámites y emergencias en Moreno, sin depender de internet.**

Este proyecto es una herramienta educativa creada por estudiantes. Su objetivo es cerrar la **brecha digital** en nuestra comunidad, permitiendo que cualquier persona realice trámites del gobierno y llame a emergencias incluso si no tiene datos móviles o WiFi.

---

## ✨ ¿Por qué es especial?

Es una **Aplicación Web Progresiva (PWA)** diseñada para funcionar en cualquier celular, incluso los más antiguos:

- 🚫 **Sin Internet:** Una vez que la abres, funciona totalmente offline.
- 📱 **Como una App:** Se instala en la pantalla de inicio de tu celular.
- 🔊 **Accesible:** Tiene opción de "Lectura en voz alta", letras grandes y alto contraste.
- 🔒 **Privada:** Tus datos (favoritos, progreso) se guardan solo en tu teléfono, no se envían a nadie.
- 🏛️ **Local:** Incluye números de emergencia de Moreno y enlaces a la Municipalidad.

---

## 📱 Funciones Principales

### 1. Trámites Paso a Paso
Guías visuales para realizar gestiones en:
- ANSES
- CUIL / CUIT
- Mi Argentina

### 2. Atención e Emergencias
Botones grandes para llamar con un solo toque a:
- 🚑 **107** (SAME)
- 🚒 **911** (Policía / Emergencias)
- 🚺 **144** (Violencia de Género)
- 🗑️ **Denuncias:** Enlaces para reportar basurales y ver farmacias de turno en Moreno.

---

## 🛠️ Para Desarrolladores (Cómo mantenerlo)

Si querés agregar nuevos tutoriales o arreglar cosas:

1.  **Agregar un Tutorial:**
    Todo el contenido está en el archivo `js/tutoriales.js`.
    - Si es una categoría nueva, agregala en `js/ui.js`.
    - Copia la estructura de un tutorial existente en `tutoriales.js` y cambia el texto. La app lo detectará sola.

2.  **Estructura del Proyecto:**
    ```text
    punto-digital/
    ├── index.html          (Página principal)
    ├── js/
    │   ├── tutoriales.js   (Aquí están los textos y pasos)
    │   ├── ui.js           (Configuración de categorías)
    │   └── ...
    └── css/
        └── style.css       (Colores y diseño)
    ```

---

## ♿ Accesibilidad
Cumplimos con estándares internacionales para que todos puedan usarlo:
- **Diseño Responsivo:** Se adapta a pantallas pequeñas.
- **Contraste Alto:** Colores claros para mejor lectura.
- **Navegación Sencilla:** Botones claros y estructura fácil de entender.

---

## 📜 Notas de la Versión (Junio 2026)

- ✅ **Nuevo:** Módulo "Atención a la Comunidad" con enlaces oficiales.
- 🔧 **Correcciones:** Arreglos en el código y optimización de velocidad.
- 🎨 **Diseño:** Colores y estilo actualizados a la identidad de la Municipalidad de Moreno.

---

## 👨‍💻 Créditos y Licencia

- **Autor:** Angel Nicolás Villegas.
- **Licencia:** MIT (Código abierto).
- **Contexto:** Proyecto Escolar.
- **Eje Problemático:** Desigualdades en el acceso a la tecnología como herramienta de organización social.

> **Misión:** Apropiarse de la tecnología para empoderar a la comunidad.
