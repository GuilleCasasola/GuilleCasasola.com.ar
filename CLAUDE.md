@AGENTS.md

# Notas de trabajo para Claude

El dueño del sitio valora que siga siendo **HTML, CSS y JS plano**: sin build,
sin frameworks, sin npm. Respetar eso en cualquier cambio. Escribe en español.

## Preview local

`.claude/launch.json` define `static-site` (`python3 -m http.server 8123`
desde la raíz). El navegador cachea agresivamente CSS/JS: al verificar un
cambio, forzar recarga (`fetch(url, {cache: 'reload'})` + `location.reload()`).

## Gotchas

- `apps/my-year-recap/*.html` son URLs públicas: no moverlas ni renombrarlas.
- Las URLs de `blog/` tampoco: Giscus asocia los comentarios por pathname.
- En `legacy/` las rutas se reescribieron a `/legacy/v1/…` y `/legacy/v2/…`;
  `images/` y favicons se comparten desde la raíz.
- Cookiebot muestra warnings en localhost (dominio no autorizado): es esperado.
