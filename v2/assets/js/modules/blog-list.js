/**
 * blog-list.js — renders the blog index page (post grid + "recent posts"
 * sidebar) from data/posts.json. Add a new blog post by editing that JSON
 * file only; no markup changes required.
 */

function parseLocalDate(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDate(dateStr, options) {
  return parseLocalDate(dateStr).toLocaleDateString("es-AR", options);
}

function renderPostCard(post) {
  return `
    <article class="post-card" data-reveal>
      <a class="post-card__image" href="${post.url}">
        <img src="${post.imageUrl}" alt="${post.title}" loading="lazy">
      </a>
      <div class="post-card__body">
        <span class="post-card__date">${formatDate(post.date, { year: "numeric", month: "long", day: "numeric" })}</span>
        <h2 class="post-card__title">${post.title}</h2>
        <p class="post-card__summary">${post.summary}</p>
        <a class="post-card__link" href="${post.url}">Leer más <i class="bi bi-arrow-right"></i></a>
      </div>
    </article>`;
}

function renderPostListItem(post) {
  const shortTitle = post.title.split(":")[0];
  return `
    <li>
      <a href="${post.url}">${shortTitle}</a>
      <div class="text-muted" style="font-size: var(--fs-100);">${formatDate(post.date, { year: "numeric", month: "long" })}</div>
    </li>`;
}

export async function initBlogList() {
  const grid = document.getElementById("post-grid");
  const list = document.getElementById("post-list");
  if (!grid && !list) return;

  const res = await fetch("/v2/assets/js/data/posts.json");
  const posts = (await res.json()).sort((a, b) => new Date(b.date) - new Date(a.date));

  if (grid) grid.innerHTML = posts.map(renderPostCard).join("");
  if (list) list.innerHTML = posts.map(renderPostListItem).join("");

  document.dispatchEvent(new CustomEvent("posts:rendered"));
}
