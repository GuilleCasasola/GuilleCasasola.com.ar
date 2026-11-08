/**
 * contact-modal.js — wires the `<dialog>`-based contact modal open/close
 * triggers. Vanilla replacement for Bootstrap's modal JS.
 */

export function initContactModal() {
  const dialog = document.getElementById("contactModal");
  if (!dialog) return;

  document.querySelectorAll("[data-open-contact]").forEach((btn) => {
    btn.addEventListener("click", () => dialog.showModal());
  });

  dialog.querySelectorAll("[data-dialog-close]").forEach((btn) => {
    btn.addEventListener("click", () => dialog.close());
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}
