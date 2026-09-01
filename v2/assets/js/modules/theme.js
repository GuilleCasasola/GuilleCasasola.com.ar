/**
 * Theme module — persists the user's light/dark preference in localStorage
 * and toggles the `data-theme` attribute on <html>, which every color token
 * in tokens.css reacts to.
 */

const STORAGE_KEY = "theme";
const DEFAULT_THEME = "dark";

export function getTheme() {
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
}

export function setTheme(theme) {
  if (theme !== "light" && theme !== "dark") return;
  localStorage.setItem(STORAGE_KEY, theme);
  document.documentElement.setAttribute("data-theme", theme);
  document.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
}

export function initTheme() {
  setTheme(getTheme());
}

export function toggleTheme() {
  const next = getTheme() === "dark" ? "light" : "dark";
  setTheme(next);
}

// Apply immediately so toggle buttons wired up later reflect the right icon.
initTheme();

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-theme-toggle]");
  if (trigger) toggleTheme();
});
