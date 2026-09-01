/**
 * toast.js — minimal, dependency-free toast notification.
 * Vanilla replacement for SweetAlert2.
 */

export function showToast({ icon = "bi-info-circle-fill", title, message, duration = 5000 }) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.innerHTML = `
    <i class="bi ${icon}" aria-hidden="true"></i>
    <div>
      <strong>${title}</strong>
      <p class="text-muted" style="margin:0.25rem 0 0;">${message}</p>
    </div>
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("is-visible"));

  setTimeout(() => {
    toast.classList.remove("is-visible");
    toast.addEventListener("transitionend", () => toast.remove(), { once: true });
  }, duration);
}
