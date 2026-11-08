/**
 * blog-list.js — listado del blog desde posts.json (el mismo de v2),
 * ordenado del más nuevo al más viejo. El primero se destaca.
 */
import { DATA, toV3 } from "./paths.js";

function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("es-AR", { year: "numeric", month: "long", day: "numeric" });
}

const card = (post, i) => `
  <article class="post${i === 0 ? " post--featured" : ""}" data-reveal style="--delay:${Math.min(i, 3) * 100}ms">
    <a class="post__media" href="${toV3(post.url)}" tabindex="-1" aria-hidden="true">
      <img src="${post.imageUrl}" alt="" loading="lazy">
    </a>
    <div class="post__body">
      <time class="post__date" datetime="${post.date}">${formatDate(post.date)}</time>
      <h2 class="post__title"><a href="${toV3(post.url)}">${post.title}</a></h2>
      <p class="post__summary">${post.summary}</p>
      <span class="post__more" aria-hidden="true">Leer más <i class="bi bi-arrow-right"></i></span>
    </div>
  </article>`;

export async function renderPostList() {
  const el = document.getElementById("posts");
  if (!el) return;
  const posts = await (await fetch(`${DATA}/posts.json`)).json();
  posts.sort((a, b) => b.date.localeCompare(a.date));
  el.innerHTML = posts.map(card).join("");
}
