/**
 * giscus.js — inserta los comentarios de Giscus con el tema que coincide
 * con el del sitio, y lo actualiza en vivo al cambiar de tema.
 * Configuración idéntica a la de las versiones anteriores (mismo repo y categoría).
 */
import { currentTheme } from "./theme.js";

const THEMES = { light: "light", dark: "dark_dimmed" };

const CONFIG = {
  "data-repo": "GuilleCasasola/GuilleCasasola.com.ar",
  "data-repo-id": "MDEwOlJlcG9zaXRvcnkzMzQyMTk2ODg=",
  "data-category": "Comentarios Web",
  "data-category-id": "DIC_kwDOE-vJqM4Ckma3",
  "data-mapping": "pathname",
  "data-strict": "0",
  "data-reactions-enabled": "1",
  "data-emit-metadata": "0",
  "data-input-position": "top",
  "data-lang": "es",
};

export function initGiscus() {
  const container = document.querySelector(".giscus");
  if (!container) return;

  const script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.async = true;
  script.crossOrigin = "anonymous";
  Object.entries(CONFIG).forEach(([k, v]) => script.setAttribute(k, v));
  script.setAttribute("data-theme", THEMES[currentTheme()]);
  container.after(script);

  document.addEventListener("themechange", (e) => {
    const frame = document.querySelector("iframe.giscus-frame");
    frame?.contentWindow.postMessage(
      { giscus: { setConfig: { theme: THEMES[e.detail.theme] } } },
      "https://giscus.app"
    );
  });
}
