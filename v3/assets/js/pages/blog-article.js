// blog-article.js — artículo del blog v3.
import { initReadingTime } from "/v2/assets/js/modules/reading-time.js";
import { initLayout } from "../modules/layout.js";
import { initGiscus } from "../modules/giscus.js";

initReadingTime();
await initLayout();
initGiscus();
