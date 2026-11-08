// blog-index.js — listado del blog v3.
import { initLayout } from "../modules/layout.js";
import { initReveal } from "../modules/reveal.js";
import { renderPostList } from "../modules/blog-list.js";

await initLayout();
await renderPostList();
initReveal();
