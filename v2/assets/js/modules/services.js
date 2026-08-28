/**
 * services.js — renders the "¿Qué hago?" tech-stack boxes from
 * data/services.json. Add/remove a technology by editing that JSON file only.
 */

function renderStackImg(item) {
  return `<img src="${item.img}" alt="Logo ${item.name}" loading="lazy">`;
}

function renderServiceBox(service) {
  return `
    <div class="service-box" data-reveal>
      <div class="service-box__icon"><i class="bi ${service.icon}"></i></div>
      <div>
        <span class="service-box__index">${service.index}</span>
        <h4>${service.title}</h4>
        <div class="service-box__stack">${service.stack.map(renderStackImg).join("")}</div>
      </div>
    </div>`;
}

export async function renderServices() {
  const container = document.getElementById("services-grid");
  if (!container) return;

  const res = await fetch("/v2/assets/js/data/services.json");
  const services = await res.json();

  container.innerHTML = services.map(renderServiceBox).join("");
}
