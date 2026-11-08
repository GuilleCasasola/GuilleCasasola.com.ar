/**
 * blob-dialog.js — cada globito de "Sobre mí" se transforma en su <dialog>:
 * el diálogo arranca exactamente sobre el globo (misma posición, tamaño y
 * border-radius orgánico) y crece hasta el panel centrado mientras la forma
 * se "endereza". Al cerrar, vuelve a encogerse sobre el globo.
 *
 * Técnica FLIP con transiciones CSS nativas; sin librerías.
 */

const DURATION = 650;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const PROPS = ["top", "left", "width", "height", "border-radius"];
const OPEN_RADIUS = "32px";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function targetRect() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const width = Math.min(680, vw - 32);
  const height = Math.min(600, vh * 0.86);
  return { top: (vh - height) / 2, left: (vw - width) / 2, width, height };
}

function place(dialog, rect, radius) {
  Object.assign(dialog.style, {
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    borderRadius: radius,
  });
}

function setTransition(dialog, on) {
  dialog.style.transition = on ? PROPS.map((p) => `${p} ${DURATION}ms ${EASE}`).join(", ") : "none";
}

/** Espera el fin de la transición del propio diálogo (no de sus hijos), con un respaldo por timeout. */
function afterTransition(dialog, done) {
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    dialog.removeEventListener("transitionend", onEnd);
    done();
  };
  const onEnd = (e) => {
    if (e.target === dialog && e.propertyName === "width") finish();
  };
  dialog.addEventListener("transitionend", onEnd);
  setTimeout(finish, DURATION + 120);
}

function open(card, dialog) {
  if (dialog.open) return;

  const rect = card.getBoundingClientRect();
  const radius = getComputedStyle(card).borderRadius;

  setTransition(dialog, false);
  place(dialog, rect, radius);
  dialog.classList.add("is-start");
  dialog.showModal();
  card.classList.add("is-expanded");
  document.documentElement.style.overflow = "hidden";

  if (reducedMotion()) {
    place(dialog, targetRect(), OPEN_RADIUS);
    dialog.classList.remove("is-start");
    dialog.classList.add("is-open");
    return;
  }

  dialog.getBoundingClientRect(); // fuerza layout con el tamaño del globo
  requestAnimationFrame(() => {
    setTransition(dialog, true);
    dialog.classList.remove("is-start");
    dialog.classList.add("is-growing");
    place(dialog, targetRect(), OPEN_RADIUS);
  });

  afterTransition(dialog, () => {
    dialog.classList.remove("is-growing");
    dialog.classList.add("is-open");
  });
}

function close(card, dialog) {
  if (!dialog.open || dialog.classList.contains("is-closing")) return;

  const finish = () => {
    dialog.close();
    dialog.classList.remove("is-closing", "is-open", "is-growing");
    dialog.removeAttribute("style");
    card.classList.remove("is-expanded");
    document.documentElement.style.overflow = "";
    card.focus({ preventScroll: true });
  };

  if (reducedMotion()) return finish();

  dialog.classList.remove("is-open");
  dialog.classList.add("is-closing");
  setTransition(dialog, true);
  place(dialog, card.getBoundingClientRect(), getComputedStyle(card).borderRadius);
  afterTransition(dialog, finish);
}

export function initBlobDialogs() {
  document.querySelectorAll("[data-blob-dialog]").forEach((card) => {
    const dialog = document.getElementById(card.dataset.blobDialog);
    if (!dialog) return;

    card.addEventListener("click", () => open(card, dialog));
    dialog.querySelector("[data-close]")?.addEventListener("click", () => close(card, dialog));
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) close(card, dialog); // click en el backdrop
    });
    dialog.addEventListener("cancel", (e) => {
      e.preventDefault(); // Escape también anima
      close(card, dialog);
    });
  });

  window.addEventListener("resize", () => {
    const openDialog = document.querySelector(".blob-dialog.is-open");
    if (openDialog) place(openDialog, targetRect(), OPEN_RADIUS);
  });
}
