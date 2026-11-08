@AGENTS.md

# Notas de trabajo para Claude

El dueño del sitio valora que siga siendo **HTML, CSS y JS plano**: sin build,
sin frameworks, sin npm. Respetar eso en cualquier cambio.

## Preview local

`.claude/launch.json` define `static-site` (`python3 -m http.server 8123`
desde la raíz). Rutas útiles:

- 1.0: http://localhost:8123/index.html
- v2: http://localhost:8123/v2/index.html

## Mapa rápido de v2

- `v2/assets/js/pages/*.js` — un entry por tipo de página (`home`,
  `blog-index`, `blog-article`, `legal`). Todos hacen `await initIncludes()`
  antes de inicializar módulos.
- `v2/assets/js/modules/*.js` — un módulo por concern (theme, navbar-scroll,
  scroll-reveal, typewriter, project-grid/filter, contact-form, toast,
  blog-list, reading-time…).
- `v2/assets/js/data/` — `posts.json`, `projects.json`, `services.json`
  (el stack).
- `v2/assets/css/main.css` es el único stylesheet que se enlaza; importa
  `tokens.css` (variables, tema oscuro por defecto + `[data-theme="light"]`),
  `base.css`, `layout.css` y `components/*.css`.
- v2 reutiliza `/images`, favicons y `site.webmanifest` del root.

## Agregar un post (v2)

1. Copiar un artículo de `v2/blog/` y actualizar `<title>`, meta/og
   (`og:url` con `/v2/blog/…`), breadcrumb, header, `<article class="blog-content">`
   e imagen del aside. El bloque Giscus se copia tal cual.
2. Imagen en `/images/blogs/`.
3. Agregar la entrada en `v2/assets/js/data/posts.json`
   (`title, summary, date "YYYY-MM-DD", url, imageUrl`).

En 1.0: crear `blog/x.html` y agregar un `posts.push(new Post(...))` en el
`<script>` inline de `blog/index.html`.

## Gotchas conocidos

- Agregar una categoría de proyecto requiere tocar `FILTERS` en
  `v2/assets/js/modules/project-grid.js`, no solo el JSON.
- Todo lo que tenga `data-reveal` arranca con `opacity: 0`; la página debe
  llamar a `initScrollReveal()` o queda invisible (incluido el header partial).
- 1.0 y v2 comparten la clave `localStorage.theme`.
- No hay config de deploy en el repo (sin CNAME, workflows, etc.).
