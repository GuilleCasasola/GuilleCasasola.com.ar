# Repository guide for AI agents

This repo hosts **guillecasasola.com.ar**: a personal portfolio/blog site,
served as plain static files (no build step, no server-side rendering).

## Layout

- **Repository root** — the **live site** (the "mate y papel" redesign,
  formerly `v3/`). Vanilla HTML/CSS/JS, ES modules, content-as-JSON.
  This is where all new work happens. See [README.md](/README.md) for its
  structure and how to add a post.
  - `index.html`, `blog/`, `apps/my-year-recap/` (privacy policies — their
    URLs are public, e.g. linked from app stores: **never move them**).
  - `partials/` — `nav.html` and `footer.html`, injected at runtime by
    `assets/js/modules/include.js`.
  - `assets/css/` — `main.css` is the only linked stylesheet; it imports
    `tokens.css`, `base.css` and one file per component in `components/`.
  - `assets/js/pages/` — one entry per page type; `assets/js/modules/` — one
    module per concern; `assets/js/data/*.json` — posts, projects, tech stack.
  - Shared static files at the root (used by every version): `images/`,
    favicons, `site.webmanifest`.
- **[legacy/](/legacy)** — archived, frozen versions, kept for reference.
  Every page there has `<meta name="robots" content="noindex">`.
  - `legacy/v1/` — the original 1.0 site (Bootstrap 5 + jQuery + plugins).
  - `legacy/v2/` — the Copilot zero-build modernization.
  Don't do new work there; only fix something if it's outright broken.

## General conventions

- **No build tools.** Everything is static HTML/CSS/JS served as-is. Don't
  introduce a bundler/framework without explicit user sign-off. The owner
  values the site being plain HTML, CSS and JavaScript.
- **Content vs. presentation**: editable content (blog post metadata,
  project list, tech stack) lives in `assets/js/data/*.json` — edit those
  instead of hard-coding new markup when adding a post/project.
- **Small, single-purpose files**: one CSS file per UI component
  (`assets/css/components/`) and one JS module per concern
  (`assets/js/modules/`).
- **Shared layout via partials**: edit `partials/nav.html` / `footer.html`
  once instead of duplicating nav/footer markup across pages. Nav links are
  absolute (`/index.html#proyectos`); `nav.js` turns them into in-page
  hashes on the home page.
- **Blob motif**: the organic "globito" shapes (`--blob-a/b/c` in
  `tokens.css`) are the site's visual signature, designed by the owner.
  Keep shape changes as smooth `border-radius` transitions.
- **Scroll reveal uses `animation`, not `transition`** (`base.css`), so it
  never overrides a component's own transitions. Elements that already have
  their own `animation` (e.g. `.blob-card`) get `data-reveal` on a wrapper.
- **Don't remove real content**: blog article text, bio content, and legal
  page text are the site owner's actual words — preserve them verbatim when
  restyling; only change markup/CSS/structure around them.
- **Third-party integrations to keep intact**: Google Analytics (gtag),
  Cookiebot consent banner, the Google Apps Script contact-form endpoint, and
  the Giscus comments widget on blog articles (`mapping=pathname`, so blog
  URLs must stay stable to keep their comment threads).

## Testing changes locally

Serve the **repository root** with any static file server (a server is
required, not `file://`, because partials load via `fetch()` and pages use
ES modules):

```bash
python3 -m http.server 8123
# sitio:   http://localhost:8123/
# legacy:  http://localhost:8123/legacy/v1/  ·  http://localhost:8123/legacy/v2/
```
