# Sitio web estático — Costa Azul Distribuidora

## Contexto

Sitio web informativo de una sola página (one-pager) para Costa Azul Distribuidora, una distribuidora de bebidas (y almacén en general) con app móvil propia. El sitio debe:

- Publicarse gratis en GitHub Pages, sin build step (HTML/CSS/JS plano).
- Estar inspirado en la estructura de [capi.com.au](https://www.capi.com.au/) (hero, grid de categorías, bloques informativos alternados imagen+texto, footer con columnas), pero condensado en una sola página con scroll, ya que no hay un catálogo de productos navegable, sino contenido institucional.
- Usar la identidad visual de la marca (logo, paleta, tipografía) tal como aparece en los archivos de `Imagenes/`.
- Promocionar la app móvil (capturada en `Imagenes/WhatsApp Video 2026-08-20 at 11.43.20 PM.mp4`) dentro de un mockup de celular, con enlaces de descarga a App Store y Google Play.
- Ser responsive: mobile-first, funcional en teléfonos y en escritorio.
- Tener animaciones/movimiento sutil (reveals on scroll, hovers, mockup de celular con leve efecto flotante) sin resultar recargado.

## Identidad visual (de las imágenes provistas)

- **Isotipo**: monograma "CA" (C envolviendo una A triangular), con una variante circular para ícono/favicon.
- **Colores**:
  - Azul marino primario: `#152a63` aprox. (fondo de marca, header, hero, footer)
  - Blanco: `#ffffff` (texto sobre azul, fondos de sección alternos)
  - Azul acento más claro para hovers/detalles (derivado del primario, ej. `#2f4d9e`)
- **Tipografía**: geométrica, bold, condensada — se usará **Poppins** (Google Fonts) como equivalente cercano y libre a la fuente del logo, en pesos 600/700 para títulos y 400/500 para texto de cuerpo.
- **Motivo gráfico**: triángulos/formas geométricas angulares (tomadas del trazo de la "A" del logo) usables como detalles decorativos sutiles en fondos.

## Estructura de la página (single-page, scroll)

1. **Header** (sticky): logo CA + "Costa Azul Distribuidora", nav con anclas a Inicio / Nosotros / App / Contacto. Transparente sobre el hero, fondo sólido azul al hacer scroll. Menú hamburguesa en mobile.

2. **Hero / Inicio**: fondo azul marino, logo grande, headline + subcopy institucional, CTA que ancla a la sección de descarga de la app. Detalle geométrico decorativo con animación sutil (parallax/float leve). Fade-in de entrada.

3. **Categorías**: grid responsive de 7 tarjetas (Vinos y espumantes, Aperitivos y destilados, Whisky, Cerveza, Licores, Energizantes, Almacén), con ícono simple por categoría, hover con elevación/sombra. Reveal on scroll.

4. **Nosotros / Información de la empresa**: 2-3 bloques alternados imagen/gráfico + texto (estilo capi "Our Story"), copy institucional redactado (variedad de catálogo, cobertura, atención vía app). Contenido editable, marcado claramente como texto de ejemplo para que el usuario lo ajuste luego.

5. **Descargá la app**: sección destacada, mockup de celular (CSS) con el video de la app reproduciéndose en loop, muteado, recortado/encuadrado dentro del marco vía `object-fit` (sin re-encodear, ya que no hay ffmpeg disponible en el entorno). Texto promocional + dos botones de descarga:
   - App Store → `https://apps.apple.com/uy/app/costa-azul-distribuidora/id6766330549?l=es-MX`
   - Google Play → `https://play.google.com/store/apps/details?id=fatesistemas.com.costaazul&pcampaignid=web_share`
   Mockup con efecto de entrada tipo tilt/float sutil (CSS animation en loop lento).

6. **Contacto**: WhatsApp directo (`+598 95 212 926`, botón a `wa.me/59895212926`). Sin email ni dirección física por ahora (no provistos) — no se inventan datos.

7. **Footer**: logo, © año actual, espacio para redes sociales (oculto/comentado hasta tener los links).

## Stack técnico

- HTML5 + CSS3 + JS vanilla, sin frameworks ni bundlers — compatible tal cual con GitHub Pages.
- Fuente vía Google Fonts (`Poppins`).
- Animaciones: CSS transitions/keyframes + `IntersectionObserver` para reveals al hacer scroll.
- Video: archivo `.mp4` copiado a `assets/`, servido con `<video autoplay muted loop playsinline>`.
- Imágenes del logo optimizadas/copiadas a `assets/img/`.
- Estructura de carpetas:
  ```
  /
  ├── index.html
  ├── css/styles.css
  ├── js/main.js
  ├── assets/img/ (logo, favicon)
  ├── assets/video/ (video de la app)
  └── docs/superpowers/specs/ (este documento)
  ```

## Fuera de alcance

- Catálogo de productos navegable / e-commerce.
- Backend, formularios con envío de datos (contacto es solo enlace a WhatsApp).
- Edición del contenido del video más allá de recorte/encuadre visual vía CSS (no hay herramienta de edición de video en el entorno).
- Email y dirección física en contacto (no provistos por el usuario).
- Multi-idioma.
