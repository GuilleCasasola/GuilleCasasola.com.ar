# GuilleCasasola.com.ar

Página personal / portfolio / blog. HTML, CSS y JavaScript planos: sin build,
sin frameworks.

Ver en local: `python3 -m http.server 8123` en la raíz → http://localhost:8123/

## Diseño: "mate y papel"

Toma la estructura ordenada de la v2 (módulos ES, contenido en JSON, un CSS
por componente) y conserva la personalidad de la 1.0: los globitos de
"Sobre mí" son el sello visual de todo el sitio.

- **Globitos como lenguaje visual**: los tres de "Sobre mí" (formas y hover
  originales de la 1.0) se transforman en el modal *conservando la forma*:
  el diálogo arranca con el border-radius orgánico del globo y se endereza
  mientras crece; al cerrar vuelve a encogerse sobre el globo
  (`assets/js/modules/blob-dialog.js`).
- El mismo motivo se repite: retrato, logo, íconos del stack, contacto y
  subtítulos del blog.
- **Paleta cálida**: crema + terracota + verde yerba, con modo claro y
  oscuro. Sin preferencia guardada, sigue al sistema operativo.
- **Contacto en la página** (no modal).

## Estructura

```
index.html                 home
blog/                      index.html + un .html por artículo
apps/my-year-recap/        políticas de privacidad (URLs públicas: no mover)
partials/                  nav.html, footer.html (se inyectan con include.js)
assets/css/main.css        único stylesheet; importa tokens, base y components/*
assets/js/pages/           un entry por tipo de página (home, blog-index, blog-article, legal)
assets/js/modules/         un módulo por concern
assets/js/data/            posts.json, projects.json, services.json
images/, favicons          compartidos por todas las versiones
legacy/v1/, legacy/v2/     versiones anteriores archivadas (noindex)
```

Todas las páginas cargan `layout.js` (partials → tema → nav → reveal).

## Agregar un post

1. Copiar un artículo de `blog/` y cambiar `<title>`, metas (incluido
   `og:url`), breadcrumb, `<h1>`, bajada, fecha,
   `<article class="blog-content">` y la imagen del aside. Los comentarios
   (Giscus) se insertan solos desde `giscus.js`.
2. Imagen en `images/blogs/`.
3. Agregar la entrada en `assets/js/data/posts.json`
   (`title, summary, date "YYYY-MM-DD", url, imageUrl`).

## Agregar un proyecto

Agregar la entrada en `assets/js/data/projects.json`. Los filtros salen de
las categorías del JSON; para una categoría nueva, sumar su etiqueta en
`LABELS` (`assets/js/modules/projects.js`).

## Versiones anteriores

- [legacy/v1/](/legacy/v1) — el sitio 1.0 original (Bootstrap + jQuery).
- [legacy/v2/](/legacy/v2) — la modernización hecha con Copilot.

Están congeladas y marcadas con `noindex` para que no compitan en buscadores
con el sitio actual.
