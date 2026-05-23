# Iconos PNG pendientes

Este directorio necesita dos archivos PNG para que la PWA funcione
correctamente en Android e iOS.

## Archivos requeridos

| Archivo        | Tamaño   | Uso                                     |
|---------------|----------|-----------------------------------------|
| icon-192.png  | 192×192  | Ícono en pantalla de inicio (Android)   |
| icon-512.png  | 512×512  | Splash screen y tiendas de apps         |

## Cómo generarlos (opciones gratuitas)

### Opción A — RealFaviconGenerator (recomendada)
1. Ir a https://realfavicongenerator.net
2. Subir el archivo `icon.svg` de esta carpeta
3. Descargar el paquete y copiar los PNG aquí

### Opción B — Squoosh o cualquier editor
1. Abrir `icon.svg` en Inkscape, GIMP, o similar
2. Exportar como PNG en 192×192 y 512×512
3. Guardar en esta carpeta con los nombres exactos de arriba

### Opción C — Desde terminal (requiere ImageMagick)
```bash
convert -background none icon.svg -resize 192x192 icon-192.png
convert -background none icon.svg -resize 512x512 icon-512.png
```

## Mientras tanto
El SVG `icon.svg` sirve como fallback en navegadores modernos.
La PWA instala correctamente sin los PNG, pero sin ícono visible
en la pantalla de inicio del celular.
