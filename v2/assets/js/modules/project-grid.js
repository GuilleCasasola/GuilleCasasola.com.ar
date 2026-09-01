/**
 * project-grid.js — renders the "Proyectos" grid + filter buttons from
 * data/projects.json. Add a new project by editing that JSON file only.
 */

const FILTERS = [
  { label: "Todos", value: "*" },
  { label: "Académico", value: "academico" },
  { label: "Pasatiempo", value: "pasatiempo" },
  { label: "Side Projects", value: "sides" },
];

const LINK_ICON = { site: "bi-link-45deg", post: "bi-file-earmark-text" };

function renderLinks(links) {
  return links
    .map(
      (link) => `
      <a href="${link.url}" target="_blank" rel="noopener noreferrer" aria-label="${link.label}">
        <i class="bi ${LINK_ICON[link.type] || "bi-link-45deg"}"></i>
      </a>`
    )
    .join("");
}

function renderCard(project) {
  return `
    <article class="project-card" data-category="${project.categories.join(" ")}" data-reveal>
      <img src="${project.image}" alt="${project.title}" loading="lazy">
      <div class="project-card__overlay">
        <p class="project-card__year">${project.year}</p>
        <h3 class="project-card__title">${project.title}</h3>
        <div class="project-card__links">${renderLinks(project.links)}</div>
      </div>
    </article>`;
}

export async function renderProjectGrid() {
  const filtersEl = document.getElementById("project-filters");
  const gridEl = document.getElementById("project-grid");
  if (!gridEl) return;

  const res = await fetch("/v2/assets/js/data/projects.json");
  const projects = await res.json();

  if (filtersEl) {
    filtersEl.innerHTML = FILTERS.map(
      (f, i) =>
        `<button type="button" data-filter="${f.value}" class="${i === 0 ? "is-active" : ""}">${f.label}</button>`
    ).join("");
  }

  gridEl.innerHTML = projects.map(renderCard).join("");
  document.dispatchEvent(new CustomEvent("projects:rendered"));
}
