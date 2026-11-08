/**
 * theme.js — tema claro/oscuro guardado en localStorage ("theme"). Sin
 * preferencia guardada, sigue al sistema operativo. Emite "themechange" (lo usa giscus.js).
 */

const KEY = "theme";

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
