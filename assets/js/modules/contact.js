/**
 * contact.js — envía el formulario al Google Apps Script de siempre
 * (mismos campos: Nombre, Email, Suscribirse, Comentario).
 */

import { showToast } from "./toast.js";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxSxHVwvgQjOWaIvh1c0i7x3mGAUS_corwEDZ4_jn3q_YnuXkSwj1epRGn9Lcm5UQ/exec";

export function initContact() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const submit = form.querySelector('button[type="submit"]');
  const label = submit.innerHTML;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("Nombre", form.nombre.value);
    data.append("Email", form.email.value);
    data.append("Suscribirse", form.newsletter.checked);
    data.append("Comentario", form.comentario.value);

    submit.disabled = true;
    submit.innerHTML = '<span class="spinner" aria-hidden="true"></span> Enviando…';

    try {
      await fetch(SCRIPT_URL, { method: "POST", mode: "no-cors", body: data });
      showToast({
        icon: "bi-check-circle-fill",
        title: "¡Mensaje enviado!",
        message: "Gracias por contactarte. Te mando un abrazo 🤗",
      });
      form.reset();
    } catch {
      showToast({
        icon: "bi-exclamation-circle-fill",
        title: "No se pudo enviar",
        message: "Revisá tu conexión e intentá de nuevo.",
      });
    } finally {
      submit.disabled = false;
      submit.innerHTML = label;
    }
  });
}
