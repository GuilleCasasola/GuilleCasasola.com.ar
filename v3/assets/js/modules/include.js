/**
 * include.js — reemplaza cada <div data-include="/v3/partials/x.html"> por
 * el contenido de ese partial. Así el nav y el footer se escriben una vez.
 */

export async function initIncludes() {
  const targets = [...document.querySelectorAll("[data-include]")];
  await Promise.all(
    targets.map(async (el) => {
      try {
        const res = await fetch(el.dataset.include);
        if (!res.ok) throw new Error(res.status);
        el.outerHTML = await res.text();
      } catch (err) {
        console.error("[include] no se pudo cargar", el.dataset.include, err);
      }
    })
  );
}
