# v3 — "mate y papel"

Propuesta de rediseño de la home. Toma la estructura ordenada de v2
(módulos ES, contenido en JSON, un CSS por componente, cero build) y le
devuelve la personalidad de la 1.0: los globitos de "Sobre mí" vuelven a ser
el sello visual de todo el sitio.

Ver en local: `python3 -m http.server 8123` en la raíz →
http://localhost:8123/v3/index.html

## Qué cambia respecto a v2

- **Globitos como lenguaje visual**: los tres de "Sobre mí" (formas y hover
  originales de la 1.0) se transforman en el modal *conservando la forma*:
  el diálogo arranca con el border-radius orgánico del globo y se endereza
  mientras crece; al cerrar vuelve a encogerse sobre el globo.
  Ver `assets/js/modules/blob-dialog.js`.
- El mismo motivo se repite: retrato dentro de un globo que se transforma,
  puntito del logo, íconos del stack, sección de contacto.
- **Paleta cálida**: crema + terracota + verde yerba. El tema claro es el
  default y, si no hay preferencia guardada, sigue al sistema operativo.
- **Contacto en la página** (no modal): un click menos para escribirte.
- Filtros de proyectos derivados del JSON (no hay que tocar JS para una
  categoría nueva, sólo su etiqueta en `LABELS`).

## Estructura

```
v3/
  index.html                home
  blog/                     index.html + un .html por artículo
  partials/                 nav.html, footer.html (se inyectan con include.js)
  assets/css/main.css       único stylesheet; importa tokens, base y components/*
  assets/js/pages/          un entry por tipo de página (home, blog-index, blog-article)
  assets/js/modules/        un módulo por concern
```

Todas las páginas cargan `layout.js` (partials → tema → nav → reveal).

## Agregar un post

1. Copiar un artículo de `v3/blog/` y cambiar `<title>`, metas, breadcrumb,
   `<h1>`, bajada, fecha, `<article class="blog-content">` y la imagen del aside.
   Los comentarios (Giscus) se insertan solos desde `giscus.js`.
2. Imagen en `/images/blogs/`.
3. Agregar la entrada en `/v2/assets/js/data/posts.json` (el listado de v3
   reescribe `/v2/blog/` → `/v3/blog/` con `paths.js`).

## Dependencias con v2

Reutiliza sin duplicar: `/v2/assets/js/data/*.json` (contenido) y los módulos
genéricos `typewriter.js`, `years-of-experience.js` y `toast.js`. Si v3 se
promueve, mover esos archivos junto con ella y actualizar las rutas.

Giscus usa `mapping=pathname`: mientras v3 viva en `/v3/blog/…`, sus
artículos tienen hilos de comentarios propios. Al promover v3 a la raíz
(`/blog/…`) vuelven a coincidir con los de la 1.0.
