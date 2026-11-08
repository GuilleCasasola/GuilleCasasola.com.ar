import { initIncludes } from "../modules/include.js";
import { initNavbarScroll } from "../modules/navbar-scroll.js";
import { initScrollReveal } from "../modules/scroll-reveal.js";
import { initTypewriter } from "../modules/typewriter.js";
import { initAboutCards } from "../modules/about-cards.js";
import { renderServices } from "../modules/services.js";
import { renderProjectGrid } from "../modules/project-grid.js";
import { initProjectFilter } from "../modules/project-filter.js";
import { initContactModal } from "../modules/contact-modal.js";
import { initContactForm } from "../modules/contact-form.js";
import { initYearsOfExperience } from "../modules/years-of-experience.js";
import "../modules/theme.js";

async function init() {
  await initIncludes();
  initNavbarScroll();
  initContactModal();
  initContactForm();
  initYearsOfExperience();

  initTypewriter(".hero__role-text", [
    "Soy Lic. en Computación…",
    "Soy desarrollador…",
    "Soy Guille Casasola.",
  ]);

  initAboutCards();

  await Promise.all([renderServices(), renderProjectGrid()]);
  initProjectFilter();

  initScrollReveal();
}

document.addEventListener("DOMContentLoaded", init);
