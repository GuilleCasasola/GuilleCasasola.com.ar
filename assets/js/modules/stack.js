/**
 * stack.js — renderiza "¿Qué hago?" desde data/services.json.
 */

const DATA_URL = "/assets/js/data/services.json";

const card = (group, i) => `
  <article class="stack-card" data-reveal style="--delay:${i * 120}ms">
    <span class="stack-card__index" aria-hidden="true">${group.index}</span>
    <div class="stack-card__icon"><i class="bi ${group.icon}" aria-hidden="true"></i></div>
    <h3>${group.title}</h3>
    <ul class="chips">
      ${group.stack
        .map((t) => `<li class="chip"><img src="${t.img}" alt="" loading="lazy">${t.name}</li>`)
        .join("")}
    </ul>
  </article>`;

export async function renderStack() {
  const el = document.getElementById("stack");
  if (!el) return;
  const groups = await (await fetch(DATA_URL)).json();
  el.innerHTML = groups.map(card).join("");
}
