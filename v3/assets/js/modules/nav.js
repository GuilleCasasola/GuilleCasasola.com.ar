/**
 * nav.js — menú mobile + link activo.
 * El nav vive en /v3/partials/nav.html con rutas absolutas
 * ("/v3/index.html#proyectos"). En la home, esos links se convierten a
 * "#proyectos" para scrollear sin recargar, y se resalta la sección visible.
 * En el blog se resalta "Blog".
 */

const normalize = (path) => path.replace(/index\.html$/, "");

export function initNav() {
  const nav = document.querySelector(".nav");
  if (!nav) return;

  const menuBtn = nav.querySelector(".nav__menu-btn");
  const closeMenu = () => {
    nav.classList.remove("is-open");
    menuBtn?.setAttribute("aria-expanded", "false");
  };
  menuBtn?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  const here = normalize(location.pathname);
  const sectionLinks = new Map();

  nav.querySelectorAll("a[href]").forEach((a) => {
    a.addEventListener("click", closeMenu);
    const url = new URL(a.href);
    const path = normalize(url.pathname);

    if (path === here && url.hash) {
      a.setAttribute("href", url.hash);
      sectionLinks.set(url.hash.slice(1), a);
    } else if (!url.hash && path !== "/v3/" && here.startsWith(path)) {
      a.classList.add("is-active");
    }
  });

  if (!sectionLinks.size) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach((a) => a.classList.remove("is-active"));
        sectionLinks.get(entry.target.id)?.classList.add("is-active");
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sectionLinks.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
}
