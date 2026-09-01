# GuilleCasasola.com.ar — 2.0

This folder contains a from-scratch, **zero-build** modernization of the site
that lives at the repository root (referred to below as **1.0**). It is a
side-by-side rewrite so the two versions can be compared before `v2/`
replaces the root.

## Why this exists

The 1.0 site is a single giant `index.html` (750+ lines) styled with
Bootstrap 5 + custom CSS, and scripted with jQuery + several small plugins
(isotope, magnific-popup, typed.js, GSAP, SweetAlert2). `2.0` keeps the same
real content (bio, projects, blog posts, legal pages) but:

- Splits markup/styles/scripts into small, single-purpose files so an agent
  (or a human) can find and change one thing without reading a 700-line file.
- Moves editable content (blog posts, projects, tech stack) into small JSON
  files instead of hard-coded HTML/inline `<script>` arrays.
- Drops jQuery, Bootstrap, isotope, magnific-popup, typed.js, GSAP and
  SweetAlert2 in favor of small vanilla JS modules and native HTML
  (`<dialog>`, `IntersectionObserver`, CSS custom properties).
- Refreshes the visual design: an editorial serif (Fraunces) for headings
  paired with Inter for body copy, a refined dark theme (default) with the
  original terracotta brand color, a light theme, subtle scroll-reveal
  animations, and a redesigned hero/about/projects layout.
- Still requires **no build step** — plain HTML/CSS/JS, deployable as static
  files exactly like 1.0.

## Folder structure

```
v2/
  index.html                     Landing page
  blog/
    index.html                   Blog listing (renders from posts.json)
    tecnologia-beneficios-y-castigos.html
    triviar.html
    triviar-ia.html
  apps/my-year-recap/
    private-policy.html          (English)
    private-policy-es.html       (Spanish)
  partials/                      HTML fragments loaded at runtime via fetch()
    header.html                  Site nav (shared by every page)
    footer.html                  Site footer (shared by every page)
    contact-modal.html           Contact <dialog> (home page only)
  assets/
    css/
      tokens.css                 Design tokens: color, type, spacing, shadows
      base.css                   Reset + base element styles
      layout.css                 Container/grid/section utilities
      components/*.css           One file per UI component (navbar, buttons,
                                  hero, cards, services, projects, footer,
                                  blog, policy)
      main.css                   Single entry point, @imports everything else
    js/
      modules/*.js                Small, focused ES modules (theme, includes,
                                  navbar scroll, typewriter, project filter,
                                  about-card dialogs, contact form, toast,
                                  reading time, blog/project/service renderers…)
      pages/*.js                  Per-page entry scripts that wire up only the
                                  modules that page needs (home.js,
                                  blog-index.js, blog-article.js, legal.js)
      data/*.json                 Editable content: posts.json, projects.json,
                                  services.json
```

## Editing content (no HTML changes needed)

- **Add a blog post**: create the article `.html` file in `v2/blog/` (copy an
  existing one as a template) and add an entry to
  `v2/assets/js/data/posts.json`. The listing page and "recent posts" sidebar
  update automatically.
- **Add/remove a project**: edit `v2/assets/js/data/projects.json`. Fields:
  `title`, `year`, `image`, `categories` (used by the filter buttons — one of
  `academico`, `pasatiempo`, `sides`), `links` (`type` is `site` or `post`).
- **Add/remove a tech stack entry**: edit `v2/assets/js/data/services.json`.
- **Change colors/fonts/spacing**: edit `v2/assets/css/tokens.css` only —
  every component consumes these CSS custom properties.
- **Change the nav or footer**: edit `v2/partials/header.html` or
  `v2/partials/footer.html` once; every page picks it up automatically via
  `<div data-include="/v2/partials/header.html"></div>`.

## Running locally

Because partials are loaded with `fetch()` and pages use ES modules
(`<script type="module">`), you need a local static server — opening the HTML
files directly via `file://` will not work (browsers block `fetch` for local
files). From the repository root:

```powershell
python -m http.server 8123
# then open http://localhost:8123/v2/index.html
```

Any static file server works (`npx serve`, VS Code's Live Server, etc.) as
long as it serves the **repository root** (so `/images/`, `/favicon.svg`,
`/v2/...` all resolve).

## Promoting v2 to production

`v2` currently uses root-relative paths like `/v2/assets/css/main.css` and
`/v2/partials/header.html` so it can live side-by-side with 1.0. When you're
ready to make it the live site:

1. Move everything from `v2/` to the repository root (replacing the 1.0
   files), keeping the shared `/images`, `/fonts`, `/favicon*` assets.
2. Find-and-replace the `/v2/` prefix with `/` across the moved HTML/CSS/JS
   files (partial includes, script `src`, `fetch()` calls, nav links).
3. Update any absolute URLs in metadata (`og:url`, sitemaps, etc.) if the
   deployed path changes.
4. Delete the old 1.0 files (`index.html`, `css/`, `js/`, `blog/`,
   `apps/my-year-recap/*` at the root) once you've confirmed parity.

## What intentionally was not changed

- Third-party integrations are preserved as-is: Google Analytics (gtag),
  Cookiebot consent banner, the Google Apps Script contact-form endpoint, and
  the Giscus comments widget on blog articles.
- Blog article and legal-page **text content is verbatim** from 1.0 — only
  the markup/CSS wrapping it was modernized.
