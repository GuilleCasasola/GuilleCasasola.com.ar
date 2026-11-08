/**
 * reading-time.js — estimates reading time (Spanish, ~200 wpm) for blog
 * articles and fills any `.reading-time` element.
 */

export function initReadingTime() {
  const content = document.querySelector(".blog-content");
  const target = document.querySelector(".reading-time");
  if (!content || !target) return;

  const words = content.innerText.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  target.textContent = `${minutes} min de lectura`;
}
