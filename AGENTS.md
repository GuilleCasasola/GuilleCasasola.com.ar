# Repository guide for AI agents

This repo hosts **guillecasasola.com.ar**: a personal portfolio/blog site,
served as plain static files (no build step, no server-side rendering).

## Two versions currently in the repo

- **Repository root** (`index.html`, `css/`, `js/`, `blog/`,
  `apps/my-year-recap/`) — the **live 1.0 site**. Built with Bootstrap 5,
  jQuery, and a handful of small plugins (isotope, magnific-popup, typed.js,
  GSAP, SweetAlert2). Treat this as legacy/stable: prefer fixing content bugs
  here only, avoid large refactors.
- **[v2/](/v2)** — a from-scratch, zero-build modernization (vanilla
  JS/CSS, componentized, content-as-JSON). See [v2/README.md](/v2/README.md)
  for its structure and conventions. This is where new structural/visual work
  should happen going forward. Once it's promoted to replace the root (see
  the "Promoting v2 to production" section in that README), this file should
  be updated to drop the "two versions" distinction.

## General conventions (apply to both versions)

- **No build tools.** Everything is static HTML/CSS/JS served as-is. Don't
  introduce a bundler/framework without explicit user sign-off.
- **Content vs. presentation**: in `v2/`, editable content (blog post
  metadata, project list, tech stack) lives in `v2/assets/js/data/*.json` —
  edit those instead of hard-coding new markup when adding a post/project.
- **Small, single-purpose files**: prefer adding a new small CSS/JS module
  over growing an existing large file. In `v2/`, one CSS file per UI
  component (`v2/assets/css/components/`) and one JS module per concern
  (`v2/assets/js/modules/`).
- **Shared layout via partials**: `v2/partials/header.html` and
  `footer.html` are fetched at runtime and injected into every page
  (`v2/assets/js/modules/include.js`). Edit those once instead of duplicating
  nav/footer markup across pages.
- **Don't remove real content**: blog article text, bio content, and legal
  page text are the site owner's actual words — preserve them verbatim when
  restyling; only change markup/CSS/structure around them.
- **Third-party integrations to keep intact**: Google Analytics (gtag),
  Cookiebot consent banner, the Google Apps Script contact-form endpoint, and
  the Giscus comments widget on blog articles.

## Testing changes locally

Both versions are static files. Serve the **repository root** with any
static file server and browse to the relevant path, e.g.:

```powershell
python -m http.server 8123
# 1.0: http://localhost:8123/index.html
# 2.0: http://localhost:8123/v2/index.html
```

`v2/` specifically requires a server (not `file://`) because it loads
partials via `fetch()` and uses ES modules.
