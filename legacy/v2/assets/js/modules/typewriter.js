/**
 * typewriter.js — small dependency-free typing/erasing effect.
 * Vanilla replacement for the old typed.js dependency.
 */

export function initTypewriter(selector, strings, options = {}) {
  const el = document.querySelector(selector);
  if (!el || !strings?.length) return;

  const { typeSpeed = 45, eraseSpeed = 30, pauseAfterType = 1600, pauseAfterErase = 400 } = options;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = strings[strings.length - 1];
    return;
  }

  const cursor = document.createElement("span");
  cursor.className = "cursor";
  cursor.setAttribute("aria-hidden", "true");
  const textNode = document.createElement("span");
  el.textContent = "";
  el.append(textNode, cursor);

  let stringIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = strings[stringIndex];

    if (!deleting) {
      charIndex++;
      textNode.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        return setTimeout(tick, pauseAfterType);
      }
      return setTimeout(tick, typeSpeed);
    }

    charIndex--;
    textNode.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      stringIndex = (stringIndex + 1) % strings.length;
      return setTimeout(tick, pauseAfterErase);
    }
    return setTimeout(tick, eraseSpeed);
  }

  tick();
}
