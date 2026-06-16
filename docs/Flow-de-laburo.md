# Flow de laburo — Punto Digital

## Editar archivos
Usá Acode u otro editor desde el gestor de archivos.
Carpeta: /sdcard/punto-digital/

## Subir cambios a GitHub
```bash
cd /sdcard/punto-digital
git add .
git commit -m "descripción breve del cambio"
git push origin main
```
Usuario: Angel-Digitalizando
Contraseña: Personal Access Token (no la contraseña de GitHub)

## Si git se queja de permisos
```bash
git config --global --add safe.directory /storage/emulated/0/punto-digital
```

## Si querés ver qué cambió antes de commitear
```bash
git status
git diff
```

