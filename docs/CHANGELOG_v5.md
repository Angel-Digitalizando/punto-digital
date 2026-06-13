# Punto Digital Comunitario Morenense — Changelog v5

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `style.css` | Sistema de escala tipográfica, alto contraste completo, acordeón, visor modal, drawer, responsive |
| `ui.js` | Visor modal de categoría, renderizarMenu con acordeones, buscador corregido |
| `accesibilidad.js` | Nuevo control de escala tipográfica −/Normal/+ |
| `script.js` | Drawer v5: cierre corregido, buscador interno, pointer-events |
| `index.html` | Drawer con buscador, filtros y navegación completa |

---

## Sistema de Escalado Tipográfico

### Problema anterior
- `modo-lectura-grande` y `modo-ultra` usaban `font-size: Npx !important` en cada componente
- Resultado: algunos textos crecían mucho, otros poco, botones se deformaban

### Solución implementada
Se reemplazó por una **variable CSS única** en `:root`:

```css
:root {
  --fs-scale: 1;
  --fs-xs:  calc(0.82rem * var(--fs-scale));
  --fs-md:  calc(1.1rem  * var(--fs-scale));
  /* ... todos los tamaños escalan juntos */
}
```

El control en el panel de accesibilidad escribe `data-fs` en `<html>`:

```css
html[data-fs="+1"] { --fs-scale: 1.15; }
html[data-fs="+2"] { --fs-scale: 1.32; }
html[data-fs="-1"] { --fs-scale: 0.91; }
```

**Los iconos y FABs tienen tamaños fijos en `px` y no escalan.**

### Controles del usuario
- `−` Reducir texto (hasta 2 pasos)
- `Normal` Restablecer
- `+` Aumentar texto (hasta 2 pasos)

---

## Responsive Global

Todos los textos usan `clamp()` o variables `--fs-*`:

```css
body { font-size: clamp(18px, 4.2vw, 22px); }
.header h1 { font-size: clamp(1.5rem, 6.5vw, 3rem); }
```

**No existen tamaños fijos arbitrarios en componentes de texto.**

---

## Iconos y elementos fijos

Los siguientes elementos **nunca escalan** (usan `px` o `var(--btn-fab)`):

- `.btn-hamburger` — 48×48px
- `.btn-volver-arriba` — 50×50px
- `.btn-compartir-flotante` — 50×50px
- `#btn-acc-flotante` — 50×50px
- Todos los SVG inline tienen `width/height` en px

---

## Alto Contraste

Modo activado con `.modo-alto-contraste` en `<html>`.

Regla única y completa cubre:
- Header, footer
- Todos los contenedores y secciones
- Drawer completo (header, items, buscador, filtros)
- Visor modal de categoría
- Panel de accesibilidad
- Acordeones
- FABs y hamburger
- Sección atención a la comunidad
- Tabs de categoría

**Esquema:** fondo `#111`, texto `#fff`, acentos `#FFD700`, borders `#FFD700`

---

## Navegación — Visor Modal de Categoría

### Problema anterior
Tocar una categoría agregaba contenido debajo de la página sin feedback visible.

### Solución implementada
Tocar un acordeón de categoría abre un **bottom-sheet modal** (mobile) o **modal centrado** (desktop):

- Animación de entrada desde abajo (mobile) o fade-in (desktop)
- Overlay oscuro confirma que se abrió un nuevo contexto
- Botón ✕ para cerrar
- Touch fuera del panel cierra el modal
- Escape cierra el modal
- Foco automático al primer tutorial al abrirse
- Al tocar un tutorial: cierra el visor y abre el tutorial con transición

---

## Drawer — Fixes de Cierre

### Problema anterior
El botón ✕ del drawer no cerraba en algunos casos.

### Causas encontradas y corregidas
1. **Sin `pointer-events: none`** cuando el drawer estaba cerrado → clicks fantasma
2. **Bubbling del click** del botón ✕ llegaba al overlay → doble disparo
3. **`btn.focus()`** al cerrar causaba re-scroll en mobile → eliminado
4. **Guard flag `_procesando`** agrega debounce de 120ms al toggle

### Fix aplicado en CSS
```css
.drawer-nav { pointer-events: none; }
.drawer-nav.drawer-visible { pointer-events: auto; }
```

### Fix aplicado en JS
```js
btnCerrar.addEventListener('click', function(e) {
    e.stopPropagation(); // impide bubbling al overlay
    cerrarDrawer();
});
```

---

## Buscador Interno del Drawer

- Input con ícono SVG de lupa
- Filtra en tiempo real contra título, detalle y categoría
- Muestra hasta 6 resultados
- Resultado vacío muestra mensaje "Sin resultados"
- Al tocar un resultado: cierra el drawer y abre el tutorial

---

## Acordeones en el Menú Principal

Cada categoría es un acordeón con:
- Ícono de categoría
- Nombre y descripción
- Badge con cantidad de tutoriales
- Chevron animado (rota al expandir)
- Al tocar → abre el **Visor Modal** (no expande inline)

---

## Decisiones UX

| Decisión | Motivo |
|---|---|
| Visor modal en lugar de acordeón inline | Feedback inmediato y visible — el usuario sabe que algo pasó |
| Bottom-sheet en mobile | Patrón familiar de apps nativas |
| Escala tipográfica con variable única | Consistencia garantizada — imposible tener texto grande junto a texto pequeño |
| Sin `btn.focus()` al cerrar drawer | En mobile forzaba scroll y comportamiento errático |
| `pointer-events: none` en drawer cerrado | Previene clicks en área fuera de pantalla en browsers antiguos |

---

## Correcciones posteriores a v5

### X del tooltip — bug de propagación de eventos

**Causa raíz:** El `div#tooltip-nav` estaba en `position:fixed` con `pointer-events:auto`, superpuesto sobre el `btn-hamburger`. El click en la ✕ ejecutaba `cerrarTooltip()` correctamente, pero el evento también burbjeaba al `btn-hamburger` porque ambos comparten la misma zona de la pantalla.

**Solución aplicada:**
- El `div.tooltip-nav` ahora tiene `pointer-events: none` — es completamente pass-through
- Solo `.tooltip-cerrar` tiene `pointer-events: auto`
- El listener de la ✕ usa `stopPropagation()` + `preventDefault()` + listener en fase de captura para `mousedown` y `touchstart`

### Nueva cabecera con logo SVG

- `h1` reducido a "Punto Digital" (sin "Comunitario Morenense")
- Logo SVG de globo terráqueo inline (reemplaza el emoji 🌐)
- Tamaño fijo 40×40px — no escala con el sistema tipográfico
- Layout horizontal: `[logo] Punto Digital`
- `clamp(1.6rem, 5vw, 2.4rem)` en el h1 para evitar overflow en mobile

### Flecha del tooltip corregida

- Reordenado: ✕ a la izquierda, texto al centro, flecha a la derecha
- SVG de flecha redibujado apuntando hacia arriba-derecha (hacia el hamburger)
- Tamaño fijo 28×28px desacoplado del font-size

### Iconos que se deformaban

- `.btn-hamburger`, `.btn-volver-arriba`, `.btn-compartir-flotante`, `#btn-acc-flotante`: `width/height` fijos via `var(--btn-fab)` y `!important`
- `font-size: 0 !important` en FABs — el contenido es SVG, no texto
- Todos los SVG inline tienen `width/height` en px explícitos con `!important`
- `.hamburger-linea`: 22×2.5px fijo, nunca cambia

### Limpieza de contenido municipal

Eliminado de la sección "Atención a la Comunidad":
- Dirección "Asconapé 51 | Palacio Municipal"
- Número secundario "0237 466 9100"

Mantenido:
- Farmacias de turno
- Teléfonos de emergencia (100, 911, 107, 144, 148, 103)
- Línea ciudadana 0237 466 9200
- Enlace a denuncia de basurales

---

## Ajustes finales posteriores a v5

### Corrección definitiva del cierre del tooltip

**Causa raíz:** La animación CSS `tooltip-entrada` usa `animation-fill-mode: both`. En browsers móviles (Chrome Android), el estado final de la animación (`opacity:1`) sobreescribe el `opacity:0` de la clase `.tooltip-oculto`, dejando el tooltip visible.

**Solución:** `cerrarTooltip()` ahora cancela la animación explícitamente antes de ocultar:
```js
tooltip.style.animation    = 'none';
tooltip.style.opacity      = '0';
tooltip.style.transform    = 'translateY(-8px)';
tooltip.style.pointerEvents = 'none';
```
Luego de 320ms setea `display:none` para removerlo del flujo completamente.

### Corrección de orientación de flecha del tooltip

- Path SVG redibujado: parte de `(5,23)` abajo-izquierda y curva hasta `(24,4)` arriba-derecha
- Punta de flecha en `(19,2)-(24,4)-(22,9)` — apunta al hamburger en la esquina superior derecha
- La flecha conecta visualmente el tooltip (izquierda) con el botón hamburguesa (arriba-derecha)

### Eliminación de autofocus en el buscador del drawer

**Comportamiento anterior:** Al abrir el drawer, un `setTimeout` hacía `focus()` sobre el input del buscador, abriendo el teclado virtual automáticamente en mobile.

**Solución:** Eliminado el bloque completo. El usuario decide si toca el buscador o navega manualmente. No se usa `focus()` sobre ningún elemento al abrir el drawer.
