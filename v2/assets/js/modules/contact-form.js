/**
 * contact-form.js — submits the contact form to the same Google Apps Script
 * endpoint used in 1.0, but replaces jQuery + SweetAlert2 with a native
 * <dialog>, fetch(), and a small toast component (toast.js).
 */

import { showToast } from "./toast.js";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxSxHVwvgQjOWaIvh1c0i7x3mGAUS_corwEDZ4_jn3q_YnuXkSwj1epRGn9Lcm5UQ/exec";

export function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const dialog = document.getElementById("contactModal");
  const statusEl = form.querySelector("#form-status");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("Nombre", form.nombre.value);
    formData.append("Email", form.email.value);
    formData.append("Suscribirse", form.newsletter.checked);
    formData.append("Comentario", form.comentario.value);

    form.hidden = true;
    if (statusEl) statusEl.hidden = false;

    try {
      await fetch(SCRIPT_URL, { method: "POST", mode: "no-cors", body: formData });
    } finally {
      dialog?.close();
      showToast({
        icon: "bi-check-circle-fill",
        title: "¡Mensaje enviado!",
        message: "Gracias por contactarte. Te mando un abrazo 🤗",
      });
      form.reset();
      form.hidden = false;
      if (statusEl) statusEl.hidden = true;
    }
  });
}
