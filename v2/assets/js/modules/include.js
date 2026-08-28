/**
 * include.js — zero-build "partials" loader.
 *
 * Add `<div data-include="/partials/header.html"></div>` anywhere in an HTML
 * page and this module will fetch that fragment and swap it in. This keeps
 * the navbar/footer/contact-modal defined once and reused everywhere,
 * without needing a build step or server-side templating.
 *
 * Elements can also set `data-include-active="work"` to mark the matching
 * nav link (by `data-nav`) as active once the header partial is loaded.
 */

async function loadInclude(el) {
  const url = el.getAttribute("data-include");
  if (!url) return;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
    const html = await res.text();
    el.outerHTML = html;
  } catch (err) {
    console.error("[include] could not load partial", url, err);
  }
}

export async function initIncludes() {
  const targets = Array.from(document.querySelectorAll("[data-include]"));
  await Promise.all(targets.map(loadInclude));
  document.dispatchEvent(new CustomEvent("includes:loaded"));

  const activeKey = document.body.getAttribute("data-nav-active");
  if (activeKey) {
    document
      .querySelectorAll(`[data-nav="${activeKey}"]`)
      .forEach((link) => link.classList.add("is-active"));
  }
}
