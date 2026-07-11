# Doctor IA

Orientador de salud educativo. **No realiza diagnósticos médicos.** Esta edición se publica gratuitamente con GitHub Pages: los datos y el historial se guardan únicamente en el navegador de cada usuario.

## Inicio

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`.

## Publicación gratuita en GitHub Pages

Después de subir el repositorio a GitHub, vaya a **Settings → Pages → Build and deployment** y seleccione **GitHub Actions**. Cada envío a la rama `main` publicará automáticamente la web en `https://USUARIO.github.io/NOMBRE-REPOSITORIO/`.

## Administración

Ruta `/admin` — usuario `admin`, contraseña `admin123`. Cambie estas credenciales antes de publicar una instancia real.

## Arquitectura

React/Vite en `src`; el catálogo clínico y la lógica local están en `src/data` y `src/services/localApi.js`. La carpeta `server` se conserva como referencia para una futura edición con backend.

## Aviso

Este software es demostrativo y no sustituye atención médica profesional ni servicios de emergencia.
