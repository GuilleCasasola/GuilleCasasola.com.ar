import { initIncludes } from "../modules/include.js";
import { initNavbarScroll } from "../modules/navbar-scroll.js";
import { initScrollReveal } from "../modules/scroll-reveal.js";
import { initReadingTime } from "../modules/reading-time.js";
import "../modules/theme.js";

async function init() {
  await initIncludes();
  initNavbarScroll();
  initReadingTime();
  initScrollReveal();
}

document.addEventListener("DOMContentLoaded", init);
