/**
 * projects.js — renderiza filtros y grilla desde data/projects.json.
 * Los filtros salen de las categorías presentes en el JSON: agregar una
 * categoría nueva sólo requiere sumar su etiqueta en LABELS (si no, se
 * muestra el nombre tal cual).
 */

const DATA_URL = "/assets/js/data/projects.json";

const LABELS = { academico: "Académico", pasatiempo: "Pasatiempo", sides: "Side Projects" };
const LINK_ICON = { site: "bi-box-arrow-up-right", post: "bi-journal-text" };

function link(l) {
  const external = l.type !== "post";
  return `<a href="${l.url}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>
    <i class="bi ${LINK_ICON[l.type] || "bi-link-45deg"}" aria-hidden="true"></i>${l.label}</a>`;
}

const card = (p, i) => `
  <article class="project" data-category="${p.categories.join(" ")}" data-reveal style="--delay:${(i % 3) * 100}ms">
    <div class="project__media"><img src="${p.image}" alt="" loading="lazy"></div>
    <div class="project__body">
      <span class="project__year">${p.year}</span>
      <h3 class="project__title">${p.title}</h3>
      ${p.links.length ? `<div class="project__links">${p.links.map(link).join("")}</div>` : ""}
    </div>
  </article>`;

export async function renderProjects() {
  const grid = document.getElementById("projects");
  const filters = document.getElementById("filters");
  if (!grid) return;

  const projects = await (await fetch(DATA_URL)).json();
  grid.innerHTML = projects.map(card).join("");

  if (!filters) return;
  const categories = [...new Set(projects.flatMap((p) => p.categories))];
  filters.innerHTML = [["*", "Todos"], ...categories.map((c) => [c, LABELS[c] || c])]
    .map(([value, label], i) => `<button type="button" data-filter="${value}" aria-pressed="${i === 0}">${label}</button>`)
    .join("");

  filters.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-filter]");
    if (!btn) return;
    filters.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    const value = btn.dataset.filter;
    grid.querySelectorAll(".project").forEach((el) => {
      el.hidden = value !== "*" && !el.dataset.category.split(" ").includes(value);
    });
  });
}
