/**
 * layout.js — lo que comparten todas las páginas: carga los partials
 * (nav + footer) y recién después activa tema, nav y animaciones de entrada.
 */
import { initIncludes } from "./include.js";
import { initTheme } from "./theme.js";
import { initNav } from "./nav.js";
import { initReveal } from "./reveal.js";

export async function initLayout() {
  await initIncludes();
  initTheme();
  initNav();
  initReveal();
}
