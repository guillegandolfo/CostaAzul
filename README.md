# Costa Azul Distribuidora — Sitio Web

Sitio estático (HTML/CSS/JS, sin build step) para Costa Azul Distribuidora.

## Estructura del repo

```
index.html        Página principal (una sola página)
css/styles.css     Estilos
js/main.js         Comportamiento (nav, scroll header, año del footer, scroll-reveal)
assets/img/        Imágenes (capturas, logos, etc.)
assets/video/      Video de la app
```

## Publicar en GitHub Pages

1. Pushear este repo a `master`:
   ```bash
   git push -u origin master
   ```
2. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
3. Elegir branch `master`, carpeta `/ (root)`, guardar.
4. GitHub Pages publicará el sitio en `https://guillegandolfo.github.io/CostaAzul/` en unos minutos.

## Desarrollo local

Servir la carpeta con cualquier servidor estático, por ejemplo:

```bash
python -m http.server 8080
```

Luego abrir `http://localhost:8080/`.
