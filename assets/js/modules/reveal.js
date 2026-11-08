/**
 * reveal.js — agrega .is-in a los [data-reveal] cuando entran en pantalla.
 * Se puede llamar varias veces (p. ej. después de renderizar desde JSON).
 */

let observer;

export function initReveal(root = document) {
  observer ??= new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  root.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => observer.observe(el));
}
