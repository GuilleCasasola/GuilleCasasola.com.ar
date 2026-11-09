/**
 * marquee.js — filas que se desplazan solas en loop y que el usuario
 * también puede mover a mano.
 *
 * Cada .marquee es un contenedor con scroll horizontal real (scrollbar
 * oculta) cuyo contenido son N copias idénticas (.marquee__list). Un loop
 * con requestAnimationFrame avanza el scroll; al llegar a una copia de
 * distancia se "teletransporta" una copia atrás, así nunca se termina.
 *
 * - Mouse encima: se pausa y se puede scrollear con el trackpad / Shift +
 *   rueda o arrastrar con el mouse.
 * - Touch: se pausa al tocar y se desliza con el dedo; retoma solo un rato
 *   después de soltar.
 * - Fuera de pantalla no corre (IntersectionObserver).
 * - Con "reducir movimiento" no se activa (el CSS muestra los chips quietos).
 *
 * Dirección: data-direction="right" mueve el contenido hacia la derecha.
 */

const SPEED = 40; // px por segundo
const RESUME_AFTER_TOUCH = 2500; // ms

export function initMarquees(root = document) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  root.querySelectorAll(".marquee").forEach(setup);
}

function setup(el) {
  const first = el.querySelector(".marquee__list");
  if (!first) return;
  const dir = el.dataset.direction === "right" ? -1 : 1; // signo del avance de scrollLeft

  let copy = first.offsetWidth; // ancho de una copia
  let pos = copy; // arrancamos en la 2.ª copia: hay margen hacia los dos lados
  let hover = false;
  let dragging = false;
  let touchUntil = 0;
  let visible = true;
  let last = 0;

  el.scrollLeft = pos;

  // Mantener la posición dentro de [copy, 2·copy): el salto es invisible
  // porque las copias son idénticas.
  const wrap = () => {
    if (pos < copy) pos += copy;
    else if (pos >= copy * 2) pos -= copy;
  };

  const paused = () => hover || dragging || performance.now() < touchUntil;

  function tick(now) {
    const dt = last ? Math.min(now - last, 100) / 1000 : 0;
    last = now;
    if (visible && !paused()) {
      pos += dir * SPEED * dt;
      wrap();
      el.scrollLeft = pos;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // Scroll del usuario (trackpad, rueda con Shift, dedo): seguirlo y
  // mantener el loop infinito.
  el.addEventListener(
    "scroll",
    () => {
      if (!paused()) return;
      pos = el.scrollLeft;
      const before = pos;
      wrap();
      if (pos !== before) el.scrollLeft = pos;
    },
    { passive: true }
  );

  // Pausa con el mouse encima.
  el.addEventListener("pointerenter", (e) => {
    if (e.pointerType === "mouse") hover = true;
  });
  el.addEventListener("pointerleave", (e) => {
    if (e.pointerType === "mouse") hover = false;
  });

  // Touch: pausa mientras se toca y un rato después.
  const touchPause = () => (touchUntil = performance.now() + RESUME_AFTER_TOUCH);
  el.addEventListener("touchstart", () => (touchUntil = Infinity), { passive: true });
  el.addEventListener("touchend", touchPause, { passive: true });
  el.addEventListener("touchcancel", touchPause, { passive: true });

  // Arrastrar con el mouse.
  let startX = 0;
  let startPos = 0;
  el.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    dragging = true;
    startX = e.clientX;
    startPos = el.scrollLeft;
    el.classList.add("is-dragging");
    el.setPointerCapture(e.pointerId);
  });
  el.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    pos = startPos - (e.clientX - startX);
    wrap();
    el.scrollLeft = pos;
  });
  const endDrag = () => {
    dragging = false;
    el.classList.remove("is-dragging");
  };
  el.addEventListener("pointerup", endDrag);
  el.addEventListener("pointercancel", endDrag);

  // No correr fuera de pantalla.
  new IntersectionObserver(([entry]) => (visible = entry.isIntersecting)).observe(el);

  // Recalcular el ancho de una copia si cambia el layout (fuentes, logos, resize).
  new ResizeObserver(() => {
    const ratio = copy ? pos / copy : 1;
    copy = first.offsetWidth;
    pos = copy * ratio;
    wrap();
    el.scrollLeft = pos;
  }).observe(first);
}
