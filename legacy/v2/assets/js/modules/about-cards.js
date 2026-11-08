/**
 * about-cards.js — opens the matching <dialog> with a "card expands into
 * the dialog" animation: the dialog is placed exactly over the clicked
 * card, then animated (via plain CSS transitions, a FLIP technique) to a
 * centered panel size, and its content fades in once fully expanded.
 * Closing reverses the animation back down onto the card.
 *
 * This recreates the effect originally built with GSAP + card cloning,
 * using only the native <dialog> element and CSS transitions — no
 * animation library required.
 */

const TRANSITION_PROPS = ["top", "left", "width", "height"];
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const DURATION = 500; // ms, kept in sync with the CSS transition below.

let activeDialog = null;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function expandedRect() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const width = Math.min(640, vw * 0.92);
  const height = Math.min(560, vh * 0.8);
  return { top: (vh - height) / 2, left: (vw - width) / 2, width, height };
}

function placeAt(dialog, rect) {
  dialog.style.top = `${rect.top}px`;
  dialog.style.left = `${rect.left}px`;
  dialog.style.width = `${rect.width}px`;
  dialog.style.height = `${rect.height}px`;
}

function clearInlineStyles(dialog) {
  ["position", "margin", "maxWidth", "transition", ...TRANSITION_PROPS].forEach((prop) => {
    dialog.style[prop] = "";
  });
}

/**
 * Waits for the dialog's own geometry transition to finish. `transitionend`
 * bubbles up from descendants too (e.g. the inner content's opacity fade),
 * so we must ignore any event whose target isn't the dialog itself —
 * otherwise the shorter inner-content fade would end the animation early.
 */
function onOwnTransitionEnd(dialog, callback) {
  function handler(event) {
    if (event.target !== dialog) return;
    dialog.removeEventListener("transitionend", handler);
    callback();
  }
  dialog.addEventListener("transitionend", handler);
}

function openCard(card, dialog) {
  if (activeDialog && activeDialog !== dialog) return;
  if (dialog.open || dialog.classList.contains("is-animating")) return;

  const startRect = card.getBoundingClientRect();

  dialog.style.position = "fixed";
  dialog.style.margin = "0";
  dialog.style.maxWidth = "none";
  dialog.style.transition = "none";
  placeAt(dialog, startRect);

  dialog.showModal();
  activeDialog = dialog;
  document.body.classList.add("has-open-dialog");
  dialog.classList.add("is-animating");

  if (prefersReducedMotion()) {
    placeAt(dialog, expandedRect());
    dialog.classList.remove("is-animating");
    dialog.classList.add("is-open");
    return;
  }

  // Force layout so the browser registers the card-sized starting rect
  // before we flip the target values — otherwise the transition has
  // nothing to animate from.
  // eslint-disable-next-line no-unused-expressions
  dialog.getBoundingClientRect();

  requestAnimationFrame(() => {
    dialog.style.transition = TRANSITION_PROPS.map((prop) => `${prop} ${DURATION}ms ${EASE}`).join(", ");
    placeAt(dialog, expandedRect());
  });

  onOwnTransitionEnd(dialog, () => {
    dialog.classList.remove("is-animating");
    dialog.classList.add("is-open");
  });
}

function finishClose(dialog) {
  dialog.classList.remove("is-animating");
  dialog.close();
  activeDialog = null;
  document.body.classList.remove("has-open-dialog");
  clearInlineStyles(dialog);
}

function closeCard(card, dialog) {
  if (!dialog.open || dialog.classList.contains("is-animating")) return;

  dialog.classList.remove("is-open");
  dialog.classList.add("is-animating");

  if (prefersReducedMotion()) {
    finishClose(dialog);
    return;
  }

  const endRect = card.getBoundingClientRect();
  dialog.style.transition = TRANSITION_PROPS.map((prop) => `${prop} ${DURATION}ms ${EASE}`).join(", ");
  placeAt(dialog, endRect);

  onOwnTransitionEnd(dialog, () => finishClose(dialog));
}

export function initAboutCards() {
  document.querySelectorAll(".about-card").forEach((card) => {
    const dialogId = card.getAttribute("data-dialog-target");
    const dialog = dialogId && document.getElementById(dialogId);
    if (!dialog) return;

    card.addEventListener("click", () => openCard(card, dialog));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openCard(card, dialog);
      }
    });

    dialog.querySelector("[data-dialog-close]")?.addEventListener("click", () => closeCard(card, dialog));

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeCard(card, dialog);
    });

    // Animate the Escape-key close too, instead of letting the browser
    // close the dialog instantly.
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeCard(card, dialog);
    });
  });
}
