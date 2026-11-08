/**
 * paths.js — el contenido (posts.json, projects.json) vive todavía en
 * /v2/assets/js/data y sus URLs apuntan a /v2/blog/. Mientras v3 sea una
 * versión en paralelo, las reescribimos a /v3/blog/ al renderizar.
 * Al promover v3 a la raíz, esto se puede borrar.
 */
export const DATA = "/v2/assets/js/data";

export function toV3(url) {
  return url.replace(/^\/v2\/blog\//, "/v3/blog/");
}
