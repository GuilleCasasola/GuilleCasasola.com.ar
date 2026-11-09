/**
 * stack.js — renderiza "¿Qué hago?" desde data/services.json como dos filas
 * en movimiento (ver marquee.js): la primera mitad de los grupos va de
 * izquierda a derecha y la segunda, al revés. Cada grupo abre con una
 * etiqueta (globito con ícono + título) seguida de sus tecnologías.
 *
 * El contenido de cada fila se repite COPIES veces para que el loop no
 * tenga cortes; las copias quedan ocultas para lectores de pantalla.
 */

import { initMarquees } from "./marquee.js";

const DATA_URL = "/assets/js/data/services.json";
const COPIES = 4;

const label = (group) => `
  <li class="tech tech--group">
    <span class="tech__blob"><i class="bi ${group.icon}" aria-hidden="true"></i></span>${group.title}
  </li>`;

const item = (t) => `<li class="tech"><img src="${t.img}" alt="" draggable="false">${t.name}</li>`;

function row(groups, direction) {
  const items = groups.map((g) => label(g) + g.stack.map(item).join("")).join("");
  const copies = Array.from({ length: COPIES - 1 }, () => `<ul class="marquee__list" aria-hidden="true">${items}</ul>`);
  return `
    <div class="marquee" data-direction="${direction}">
      <div class="marquee__track">
        <ul class="marquee__list">${items}</ul>${copies.join("")}
      </div>
    </div>`;
}

export async function renderStack() {
  const el = document.getElementById("stack");
  if (!el) return;
  const groups = await (await fetch(DATA_URL)).json();
  const half = Math.ceil(groups.length / 2);
  el.innerHTML = row(groups.slice(0, half), "right") + row(groups.slice(half), "left");
  initMarquees(el);
}
