/**
 * project-filter.js — vanilla replacement for isotope.js. Filters
 * `.project-card` elements by their `data-category` attribute (space
 * separated list) using simple show/hide plus a subtle fade.
 */

export function initProjectFilter() {
  const buttons = document.querySelectorAll(".project-filters button");
  const cards = document.querySelectorAll(".project-card");
  if (!buttons.length || !cards.length) return;

  function applyFilter(filter) {
    cards.forEach((card) => {
      const categories = (card.getAttribute("data-category") || "").split(" ");
      const matches = filter === "*" || categories.includes(filter);
      card.hidden = !matches;
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("is-active"));
      button.classList.add("is-active");
      applyFilter(button.getAttribute("data-filter"));
    });
  });

  const initial = document.querySelector(".project-filters button.is-active");
  applyFilter(initial ? initial.getAttribute("data-filter") : "*");
}
