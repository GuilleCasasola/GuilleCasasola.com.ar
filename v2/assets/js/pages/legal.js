import { initIncludes } from "../modules/include.js";
import { initNavbarScroll } from "../modules/navbar-scroll.js";
import "../modules/theme.js";

async function init() {
  await initIncludes();
  initNavbarScroll();
}

document.addEventListener("DOMContentLoaded", init);
