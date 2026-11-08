import { initIncludes } from "../modules/include.js";
import { initNavbarScroll } from "../modules/navbar-scroll.js";
import { initScrollReveal } from "../modules/scroll-reveal.js";
import { initBlogList } from "../modules/blog-list.js";
import "../modules/theme.js";

async function init() {
  await initIncludes();
  initNavbarScroll();
  await initBlogList();
  initScrollReveal();
}

document.addEventListener("DOMContentLoaded", init);
