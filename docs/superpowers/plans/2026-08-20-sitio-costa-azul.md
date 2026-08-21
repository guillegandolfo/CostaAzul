# Sitio Costa Azul Distribuidora — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, responsive one-page website for Costa Azul Distribuidora and get it running locally, ready to push to `https://github.com/guillegandolfo/CostaAzul.git` and publish via GitHub Pages.

**Architecture:** Single `index.html` with sections built incrementally (header, hero, categorías, nosotros, app, contacto, footer), one shared `css/styles.css`, one `js/main.js` for nav/menu/scroll-reveal/video behavior. No build step — plain HTML/CSS/JS so GitHub Pages can serve it directly from the repo root.

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox/grid, keyframe animations), vanilla JS (`IntersectionObserver`), Google Fonts (Poppins). No frameworks, no npm, no bundler.

## Global Constraints

- No build step — final artifact must be servable as static files straight from the repo root (GitHub Pages requirement).
- Brand colors: navy primary `#152a63`, accent `#2f4d9e`, white `#ffffff` (from spec `docs/superpowers/specs/2026-08-20-sitio-costa-azul-design.md`).
- Font: Poppins (Google Fonts), weights 400/500/600/700.
- Mobile-first responsive: must work correctly at ≥320px width and up through desktop (≥1200px).
- App Store link: `https://apps.apple.com/uy/app/costa-azul-distribuidora/id6766330549?l=es-MX`
- Google Play link: `https://play.google.com/store/apps/details?id=fatesistemas.com.costaazul&pcampaignid=web_share`
- WhatsApp contact: `+598 95 212 926` → link `https://wa.me/59895212926`
- Categories (exact list, in this order): Vinos y espumantes, Aperitivos y destilados, Whisky, Cerveza, Licores, Energizantes, Almacén.
- Do not invent email or physical address — not provided by the user.
- Video source file: `Imagenes/WhatsApp Video 2026-08-20 at 11.43.20 PM.mp4` (2.3MB, no re-encoding tool available — used as-is, cropped/framed via CSS only).
- Logo source files: `Imagenes/WhatsApp Image 2026-08-20 at 10.58.42 AM.jpeg` (horizontal lockup, navy bg), `...(1).jpeg` (app-icon style, navy bg white rounded square), `...(2).jpeg` (lockup on navy, tighter crop), `...43 AM.jpeg` (lockup + circular mark on white bg — best source for a transparent-friendly navy-on-white or white-on-navy mark).

---

## File Structure

```
CostaAzul/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── img/
│   │   ├── logo-lockup-navy.jpg      (copied from "WhatsApp Image ...43 AM.jpeg", navy lockup on white)
│   │   ├── logo-mark-white.png       (isolated circular white mark, cropped from "...(1).jpeg" if feasible; otherwise reuse jpeg crop)
│   │   └── favicon.png
│   └── video/
│       └── app-demo.mp4              (copied from Imagenes video)
├── docs/superpowers/specs/2026-08-20-sitio-costa-azul-design.md   (already committed)
└── docs/superpowers/plans/2026-08-20-sitio-costa-azul.md          (this file)
```

---

### Task 1: Project scaffold, assets, and base HTML/CSS skeleton

**Files:**
- Create: `assets/img/logo-lockup-navy.jpg`, `assets/img/favicon.png`
- Create: `assets/video/app-demo.mp4`
- Create: `css/styles.css`
- Create: `index.html`

**Interfaces:**
- Produces: CSS custom properties on `:root` — `--color-navy: #152a63`, `--color-navy-dark: #0e1c47`, `--color-accent: #2f4d9e`, `--color-white: #ffffff`, `--font-heading: 'Poppins', sans-serif`, `--font-body: 'Poppins', sans-serif`, `--container-max: 1200px`. All later tasks use these variables and must not hardcode colors/fonts.
- Produces: base `<body>` structure in `index.html` with `<header>`, `<main>` (empty, sections added in later tasks), `<footer>` (empty, filled in Task 6), and `<script src="js/main.js" defer></script>` before `</body>`.

- [ ] **Step 1: Copy image and video assets into the repo**

```bash
mkdir -p "assets/img" "assets/video"
cp "Imagenes/WhatsApp Image 2026-08-20 at 10.58.43 AM.jpeg" "assets/img/logo-lockup-navy.jpg"
cp "Imagenes/WhatsApp Video 2026-08-20 at 11.43.20 PM.mp4" "assets/video/app-demo.mp4"
cp "Imagenes/WhatsApp Image 2026-08-20 at 10.58.42 AM (1).jpeg" "assets/img/favicon.png"
```

- [ ] **Step 2: Verify files copied**

Run: `ls -la assets/img assets/video`
Expected: `logo-lockup-navy.jpg`, `favicon.png` in `assets/img`; `app-demo.mp4` in `assets/video`.

- [ ] **Step 3: Create `css/styles.css` with reset and design tokens**

```css
:root {
  --color-navy: #152a63;
  --color-navy-dark: #0e1c47;
  --color-accent: #2f4d9e;
  --color-white: #ffffff;
  --color-offwhite: #f4f6fb;
  --color-text: #1c1c1c;
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Poppins', sans-serif;
  --container-max: 1200px;
  --radius: 12px;
  --transition-fast: 0.2s ease;
  --transition-mid: 0.4s ease;
}

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: var(--font-body);
  color: var(--color-text);
  background: var(--color-white);
  line-height: 1.5;
}
img, video { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
h1, h2, h3 { font-family: var(--font-heading); margin: 0 0 0.5em; font-weight: 700; }
p { margin: 0 0 1em; }
.container {
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 1.25rem;
}
.section { padding: 5rem 0; }
.section-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  text-align: center;
  margin-bottom: 2.5rem;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.75rem;
  border-radius: 999px;
  font-weight: 600;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}
.btn:hover { transform: translateY(-2px); }
.btn-primary { background: var(--color-white); color: var(--color-navy); }
.btn-primary:hover { box-shadow: 0 8px 20px rgba(0,0,0,0.15); }

/* Scroll-reveal base state, activated by js/main.js */
.reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal.is-visible { opacity: 1; transform: translateY(0); }
```

- [ ] **Step 4: Create `index.html` skeleton with Google Fonts, header shell, empty main/footer**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Costa Azul Distribuidora</title>
  <meta name="description" content="Costa Azul Distribuidora: bebidas, vinos, cervezas, licores y almacén. Pedí desde la app." />
  <link rel="icon" type="image/png" href="assets/img/favicon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
  <header class="site-header" id="site-header">
    <!-- filled in Task 2 -->
  </header>

  <main>
    <!-- sections filled in Tasks 2-6 -->
  </main>

  <footer class="site-footer">
    <!-- filled in Task 6 -->
  </footer>

  <script src="js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 5: Create empty `js/main.js` placeholder**

```js
document.addEventListener('DOMContentLoaded', () => {
  // behavior added in Task 5 (nav/menu) and Task 7 (scroll reveal)
});
```

- [ ] **Step 6: Verify the page loads with no console errors**

Run: `python -m http.server 8080` (or any static server) from the repo root, then open `http://localhost:8080/` in a browser.
Expected: blank white page, no 404s in the network tab for `styles.css`, `main.js`, or the Google Fonts request; favicon loads.

- [ ] **Step 7: Commit**

```bash
git add index.html css/styles.css js/main.js assets/img/logo-lockup-navy.jpg assets/img/favicon.png assets/video/app-demo.mp4
git commit -m "Scaffold static site: base HTML/CSS/JS and brand assets"
```

---

### Task 2: Header + Hero section

**Files:**
- Modify: `index.html` (fill `<header>`, add hero `<section>` as first child of `<main>`)
- Modify: `css/styles.css` (append header + hero styles)
- Modify: `js/main.js` (append sticky-header and mobile-menu-toggle behavior)

**Interfaces:**
- Consumes: `.container`, `.btn`, `.btn-primary`, `--color-navy` etc. from Task 1.
- Produces: `#site-header` gets class `.is-scrolled` via JS when `window.scrollY > 40` — later tasks/CSS may rely on this class existing for header background transition. Nav links use anchor hrefs `#categorias`, `#nosotros`, `#app`, `#contacto` which Tasks 3–6 must provide matching `id` attributes for.

- [ ] **Step 1: Add header markup to `index.html`**

```html
<header class="site-header" id="site-header">
  <div class="container header-inner">
    <a href="#top" class="logo-link">
      <img src="assets/img/logo-lockup-navy.jpg" alt="Costa Azul Distribuidora" class="logo-img" />
    </a>
    <nav class="site-nav" id="site-nav">
      <a href="#categorias">Categorías</a>
      <a href="#nosotros">Nosotros</a>
      <a href="#app">App</a>
      <a href="#contacto">Contacto</a>
    </nav>
    <button class="nav-toggle" id="nav-toggle" aria-label="Abrir menú" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
```

- [ ] **Step 2: Add hero section as first child of `<main>` in `index.html`**

```html
<section class="hero" id="top">
  <div class="hero-shape" aria-hidden="true"></div>
  <div class="container hero-inner reveal">
    <img src="assets/img/logo-lockup-navy.jpg" alt="Costa Azul Distribuidora" class="hero-logo" />
    <h1>Todo lo que tu negocio necesita, en un solo lugar</h1>
    <p class="hero-subtitle">Vinos, cervezas, licores, energizantes y almacén — distribución rápida y variedad para tu comercio, a un pedido de distancia desde la app.</p>
    <a href="#app" class="btn btn-primary">Descargá la app</a>
  </div>
</section>
```

- [ ] **Step 3: Append header + hero CSS to `css/styles.css`**

```css
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: transparent;
  transition: background var(--transition-mid), box-shadow var(--transition-mid);
}
.site-header.is-scrolled {
  background: var(--color-navy);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
}
.logo-img { height: 40px; width: auto; border-radius: 8px; }
.site-nav { display: none; gap: 2rem; }
.site-nav a { color: var(--color-white); font-weight: 500; transition: opacity var(--transition-fast); }
.site-nav a:hover { opacity: 0.75; }
.nav-toggle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
}
.nav-toggle span { display: block; height: 2px; background: var(--color-white); border-radius: 2px; }
.site-nav.is-open {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--color-navy);
  padding: 1.5rem;
  gap: 1.25rem;
}

.hero {
  position: relative;
  background: linear-gradient(160deg, var(--color-navy) 0%, var(--color-navy-dark) 100%);
  color: var(--color-white);
  overflow: hidden;
  padding-top: 2rem;
}
.hero-shape {
  position: absolute;
  right: -10%;
  top: -20%;
  width: 60vw;
  height: 60vw;
  max-width: 600px;
  max-height: 600px;
  background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);
  animation: float-shape 8s ease-in-out infinite;
}
@keyframes float-shape {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(20px) rotate(8deg); }
}
.hero-inner {
  text-align: center;
  padding: 4rem 1.25rem 6rem;
  position: relative;
  z-index: 1;
}
.hero-logo { height: 90px; width: auto; margin: 0 auto 2rem; }
.hero h1 { font-size: clamp(1.9rem, 5vw, 3.25rem); max-width: 800px; margin-left: auto; margin-right: auto; }
.hero-subtitle { max-width: 600px; margin: 0 auto 2rem; font-size: 1.05rem; opacity: 0.9; }

@media (min-width: 768px) {
  .site-nav { display: flex; }
  .nav-toggle { display: none; }
}
```

- [ ] **Step 4: Append sticky-header and mobile-menu JS to `js/main.js`**

```js
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');

  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  });

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
});
```

- [ ] **Step 5: Verify in browser**

Run: static server as in Task 1 Step 6, open `http://localhost:8080/`.
Expected: hero renders full-width navy with centered logo/headline/CTA; header is transparent at top and turns solid navy with shadow after scrolling ~40px; below 768px width, hamburger icon shows and toggles the nav list open/closed; above 768px, horizontal nav shows and hamburger is hidden.

- [ ] **Step 6: Commit**

```bash
git add index.html css/styles.css js/main.js
git commit -m "Add sticky header with mobile menu and hero section"
```

---

### Task 3: Categorías section

**Files:**
- Modify: `index.html` (add `<section id="categorias">` after hero)
- Modify: `css/styles.css` (append categories grid styles)

**Interfaces:**
- Consumes: `.section`, `.section-title`, `.container`, `.reveal` from Task 1.
- Produces: `#categorias` id target for header nav link from Task 2.

- [ ] **Step 1: Add categories markup to `index.html`**

```html
<section class="section categories" id="categorias">
  <div class="container">
    <h2 class="section-title reveal">Nuestras categorías</h2>
    <div class="categories-grid">
      <div class="category-card reveal">
        <span class="category-icon">🍷</span>
        <h3>Vinos y espumantes</h3>
      </div>
      <div class="category-card reveal">
        <span class="category-icon">🥃</span>
        <h3>Aperitivos y destilados</h3>
      </div>
      <div class="category-card reveal">
        <span class="category-icon">🥃</span>
        <h3>Whisky</h3>
      </div>
      <div class="category-card reveal">
        <span class="category-icon">🍺</span>
        <h3>Cerveza</h3>
      </div>
      <div class="category-card reveal">
        <span class="category-icon">🍸</span>
        <h3>Licores</h3>
      </div>
      <div class="category-card reveal">
        <span class="category-icon">⚡</span>
        <h3>Energizantes</h3>
      </div>
      <div class="category-card reveal">
        <span class="category-icon">🛒</span>
        <h3>Almacén</h3>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append categories CSS to `css/styles.css`**

```css
.categories { background: var(--color-offwhite); }
.categories-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}
.category-card {
  background: var(--color-white);
  border-radius: var(--radius);
  padding: 2rem 1rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}
.category-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(21,42,99,0.15);
}
.category-icon { font-size: 2.25rem; display: block; margin-bottom: 0.75rem; }
.category-card h3 { font-size: 1rem; margin: 0; color: var(--color-navy); }

@media (min-width: 600px) {
  .categories-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (min-width: 992px) {
  .categories-grid { grid-template-columns: repeat(4, 1fr); }
}
```

- [ ] **Step 3: Verify in browser**

Refresh `http://localhost:8080/`.
Expected: 7 cards in a 2-column grid on mobile widths, 3-column at ≥600px, 4-column at ≥992px; hovering a card on desktop lifts it with a shadow; clicking "Categorías" in the header nav scrolls smoothly to this section.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "Add categorías grid section"
```

---

### Task 4: Nosotros section

**Files:**
- Modify: `index.html` (add `<section id="nosotros">` after categorías)
- Modify: `css/styles.css` (append alternating image/text block styles)

**Interfaces:**
- Consumes: `.section`, `.section-title`, `.container`, `.reveal`, `--color-navy` from Task 1.
- Produces: `#nosotros` id target for header nav link from Task 2.

- [ ] **Step 1: Add nosotros markup to `index.html`**

```html
<section class="section about" id="nosotros">
  <div class="container">
    <h2 class="section-title reveal">Quiénes somos</h2>

    <div class="about-block reveal">
      <div class="about-media" style="background-color: var(--color-navy);">
        <img src="assets/img/logo-lockup-navy.jpg" alt="Costa Azul Distribuidora" />
      </div>
      <div class="about-text">
        <h3>Un solo pedido, todo tu catálogo</h3>
        <p>Costa Azul Distribuidora reúne en un mismo lugar vinos y espumantes, aperitivos y destilados, whisky, cerveza, licores, energizantes y productos de almacén. Trabajamos para que los comercios tengan acceso rápido a la variedad que necesitan, sin depender de múltiples proveedores.</p>
      </div>
    </div>

    <div class="about-block about-block-reverse reveal">
      <div class="about-media about-media-alt">
        <span class="about-media-emoji">📱</span>
      </div>
      <div class="about-text">
        <h3>Pedidos simples, desde el celular</h3>
        <p>Nuestra app está pensada para que hacer un pedido sea tan simple como abrir el teléfono: elegís tus productos por categoría, seguís tu pedido y mantenés tu negocio siempre abastecido.</p>
      </div>
    </div>

    <div class="about-block reveal">
      <div class="about-media" style="background-color: var(--color-accent);">
        <span class="about-media-emoji">🚚</span>
      </div>
      <div class="about-text">
        <h3>Cerca de tu comercio</h3>
        <p>Distribuimos de forma ágil para que la reposición de tu local nunca sea un problema. Variedad, disponibilidad y atención pensadas para el día a día de tu negocio.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append about CSS to `css/styles.css`**

```css
.about-block {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 3rem;
}
.about-block:last-child { margin-bottom: 0; }
.about-media {
  border-radius: var(--radius);
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.about-media img { width: 60%; }
.about-media-alt { background: var(--color-offwhite); border: 2px solid var(--color-navy); }
.about-media-emoji { font-size: 4rem; }
.about-text h3 { color: var(--color-navy); font-size: 1.5rem; }

@media (min-width: 768px) {
  .about-block { grid-template-columns: 1fr 1fr; gap: 3rem; }
  .about-block-reverse .about-media { order: 2; }
  .about-block-reverse .about-text { order: 1; }
}
```

- [ ] **Step 3: Verify in browser**

Refresh `http://localhost:8080/`.
Expected: three stacked image/text blocks on mobile; on desktop (≥768px) they sit side-by-side, alternating which side the image is on for the second block; clicking "Nosotros" in the nav scrolls here.

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "Add nosotros (about) section with alternating blocks"
```

---

### Task 5: Descargá la app section (phone mockup + video + store links)

**Files:**
- Modify: `index.html` (add `<section id="app">` after nosotros)
- Modify: `css/styles.css` (append phone-mockup and store-button styles)

**Interfaces:**
- Consumes: `.section`, `.section-title`, `.container`, `.reveal`, `--color-navy`/`--color-accent` from Task 1.
- Produces: `#app` id target for header nav link and hero CTA from Task 2.

- [ ] **Step 1: Add app-download markup to `index.html`**

```html
<section class="section app-download" id="app">
  <div class="container app-download-inner">
    <div class="phone-mockup reveal">
      <div class="phone-frame">
        <video class="phone-video" src="assets/video/app-demo.mp4" autoplay muted loop playsinline></video>
      </div>
    </div>
    <div class="app-download-text reveal">
      <h2 class="section-title" style="text-align:left;">Descargá la app de Costa Azul</h2>
      <p>Hacé tus pedidos desde el celular: elegí entre vinos, cervezas, whisky, licores, energizantes y almacén, y recibí todo directo en tu comercio.</p>
      <div class="store-buttons">
        <a class="store-btn" href="https://apps.apple.com/uy/app/costa-azul-distribuidora/id6766330549?l=es-MX" target="_blank" rel="noopener">
          <span class="store-icon"></span>
          <span>Descargar en App Store</span>
        </a>
        <a class="store-btn" href="https://play.google.com/store/apps/details?id=fatesistemas.com.costaazul&pcampaignid=web_share" target="_blank" rel="noopener">
          <span class="store-icon"></span>
          <span>Descargar en Google Play</span>
        </a>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append phone-mockup and store-button CSS to `css/styles.css`**

```css
.app-download { background: var(--color-navy); color: var(--color-white); overflow: hidden; }
.app-download-inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}
.phone-mockup { display: flex; justify-content: center; }
.phone-frame {
  width: 240px;
  height: 490px;
  background: #0a0a0a;
  border-radius: 36px;
  padding: 12px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.4);
  animation: phone-float 6s ease-in-out infinite;
}
.phone-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 26px;
}
@keyframes phone-float {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50% { transform: translateY(-14px) rotate(2deg); }
}
.app-download-text .section-title { color: var(--color-white); }
.store-buttons { display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem; }
.store-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--color-white);
  color: var(--color-navy);
  padding: 0.9rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}
.store-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(0,0,0,0.25); }
.store-icon { width: 22px; height: 22px; flex-shrink: 0; }

@media (min-width: 768px) {
  .app-download-inner { grid-template-columns: 1fr 1fr; }
  .store-buttons { flex-direction: row; }
}
```

- [ ] **Step 3: Verify in browser**

Refresh `http://localhost:8080/`.
Expected: phone-shaped frame with the video looping muted inside it, gently floating; two store buttons stacked on mobile, side-by-side on desktop; App Store button opens the real Apple URL in a new tab; Google Play button opens the real Play Store URL in a new tab (both `target="_blank"`).

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "Add app download section with phone mockup video and store links"
```

---

### Task 6: Contacto section + footer

**Files:**
- Modify: `index.html` (add `<section id="contacto">` after app-download; fill `<footer>`)
- Modify: `css/styles.css` (append contact + footer styles)

**Interfaces:**
- Consumes: `.section`, `.section-title`, `.container`, `.reveal`, `--color-navy` from Task 1.
- Produces: `#contacto` id target for header nav link from Task 2. Final section of the page — no later task depends on this one.

- [ ] **Step 1: Add contact markup to `index.html`**

```html
<section class="section contact" id="contacto">
  <div class="container contact-inner reveal">
    <h2 class="section-title">Hablemos</h2>
    <p class="contact-subtitle">Escribinos por WhatsApp y te ayudamos con tu pedido.</p>
    <a class="btn btn-whatsapp" href="https://wa.me/59895212926" target="_blank" rel="noopener">
      <span class="whatsapp-icon">💬</span>
      +598 95 212 926
    </a>
  </div>
</section>
```

- [ ] **Step 2: Fill footer markup in `index.html`**

```html
<footer class="site-footer">
  <div class="container footer-inner">
    <img src="assets/img/logo-lockup-navy.jpg" alt="Costa Azul Distribuidora" class="footer-logo" />
    <p>&copy; <span id="footer-year"></span> Costa Azul Distribuidora. Todos los derechos reservados.</p>
  </div>
</footer>
```

- [ ] **Step 3: Append contact + footer CSS to `css/styles.css`**

```css
.contact { text-align: center; }
.contact-subtitle { max-width: 500px; margin: 0 auto 2rem; color: #555; }
.btn-whatsapp {
  background: #25D366;
  color: var(--color-white);
  padding: 1rem 2rem;
  border-radius: 999px;
  font-size: 1.1rem;
  font-weight: 600;
}
.btn-whatsapp:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(37,211,102,0.35); }
.whatsapp-icon { margin-right: 0.5rem; }

.site-footer { background: var(--color-navy-dark); color: var(--color-white); padding: 2.5rem 0; }
.footer-inner { text-align: center; }
.footer-logo { height: 32px; width: auto; margin: 0 auto 1rem; border-radius: 6px; }
.footer-inner p { margin: 0; font-size: 0.85rem; opacity: 0.75; }
```

- [ ] **Step 4: Append footer-year JS to `js/main.js`** (inside the existing `DOMContentLoaded` listener, after the nav code)

```js
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
```

- [ ] **Step 5: Verify in browser**

Refresh `http://localhost:8080/`.
Expected: contact section shows a green WhatsApp button that opens `https://wa.me/59895212926` in a new tab; footer shows logo and current year (2026) in the copyright line; clicking "Contacto" in the nav scrolls here.

- [ ] **Step 6: Commit**

```bash
git add index.html css/styles.css js/main.js
git commit -m "Add contact section (WhatsApp) and footer"
```

---

### Task 7: Scroll-reveal wiring, full responsive/animation QA, and GitHub Pages publish

**Files:**
- Modify: `js/main.js` (append `IntersectionObserver` wiring for all `.reveal` elements)
- Create: `README.md` (repo root — GitHub Pages instructions)

**Interfaces:**
- Consumes: every `.reveal` element added across Tasks 2–6; `.is-visible` class defined in Task 1 CSS.

- [ ] **Step 1: Append scroll-reveal JS to `js/main.js`** (inside the existing `DOMContentLoaded` listener, at the end)

```js
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => observer.observe(el));
```

- [ ] **Step 2: Verify reveal animations in browser**

Refresh `http://localhost:8080/`, scroll from top to bottom slowly.
Expected: each section's heading/blocks/cards fade+slide into view the first time they enter the viewport, and stay visible afterward (no flicker on repeated scroll up/down since `unobserve` fires after first reveal). Hero content is visible immediately without needing to scroll (it's in the initial viewport — if it doesn't reveal automatically, this is expected only if hero is fully in view on load; confirm it doesn't stay stuck at opacity 0).

- [ ] **Step 3: Responsive QA pass**

Using browser dev tools device toolbar, check at minimum: 375px (mobile), 768px (tablet), 1440px (desktop).
Expected at each width: no horizontal scrollbar; header nav correctly switches between hamburger and full nav at the 768px breakpoint; categories grid columns adjust (2/3/4); about blocks stack on mobile and go side-by-side on desktop; phone mockup + store buttons stack on mobile and go side-by-side on desktop; all text remains legible with no overlap.

- [ ] **Step 4: Create `README.md` with GitHub Pages publish instructions**

```markdown
# Costa Azul Distribuidora — Sitio Web

Sitio estático (HTML/CSS/JS, sin build step) para Costa Azul Distribuidora.

## Publicar en GitHub Pages

1. Pushear este repo a `main`:
   ```bash
   git push -u origin main
   ```
2. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
3. Elegir branch `main`, carpeta `/ (root)`, guardar.
4. GitHub Pages publicará el sitio en `https://guillegandolfo.github.io/CostaAzul/` en unos minutos.

## Desarrollo local

Servir la carpeta con cualquier servidor estático, por ejemplo:

```bash
python -m http.server 8080
```

Luego abrir `http://localhost:8080/`.
```

- [ ] **Step 5: Commit**

```bash
git add js/main.js README.md
git commit -m "Wire scroll-reveal animations and add GitHub Pages README"
```

- [ ] **Step 6: Push to GitHub** (only after explicit user go-ahead, since this is a shared/remote action)

```bash
git branch -M main
git push -u origin main
```

Expected: push succeeds; repo visible at `https://github.com/guillegandolfo/CostaAzul`.

---

## Self-Review Notes

- **Spec coverage:** header/nav ✓ (Task 2), hero ✓ (Task 2), categorías grid ✓ (Task 3), nosotros/about ✓ (Task 4), app download with phone mockup + video + store links ✓ (Task 5), contacto via WhatsApp ✓ (Task 6), footer ✓ (Task 6), scroll-reveal animations ✓ (Task 7), responsive ✓ (Task 7 QA + per-task breakpoints), GitHub Pages publish ✓ (Task 7 README + push).
- **No placeholders:** all steps contain complete, runnable HTML/CSS/JS; no TBDs.
- **Type/id consistency:** nav hrefs (`#categorias`, `#nosotros`, `#app`, `#contacto`) match the `id` attributes added in Tasks 3–6; `.reveal`/`.is-visible` classes defined once in Task 1 and consumed identically in Task 7; CSS custom properties defined once in Task 1 and reused (never redefined) in later tasks.
