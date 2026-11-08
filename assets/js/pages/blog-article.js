// blog-article.js — artículo del blog.
import { initReadingTime } from "../modules/reading-time.js";
import { initLayout } from "../modules/layout.js";
import { initGiscus } from "../modules/giscus.js";

initReadingTime();
await initLayout();
initGiscus();
