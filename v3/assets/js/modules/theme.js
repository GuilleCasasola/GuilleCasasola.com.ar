/**
 * theme.js — tema claro/oscuro. Usa su propia clave ("theme-v3") para no
 * pisar la preferencia guardada por la 1.0 / v2. Sin preferencia guardada,
 * sigue al sistema operativo. Emite "themechange" (lo usa giscus.js).
 */

const KEY = "theme-v3";

export function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

export function initTheme() {
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = currentTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem(KEY, next);
      } catch {
        /* almacenamiento bloqueado: el tema dura sólo esta visita */
      }
      document.dispatchEvent(new CustomEvent("themechange", { detail: { theme: next } }));
    });
  });
}
