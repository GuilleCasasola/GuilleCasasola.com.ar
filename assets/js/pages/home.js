// home.js — entry point de la home.
import { initTypewriter } from "../modules/typewriter.js";
import { initYearsOfExperience } from "../modules/years-of-experience.js";
import { initLayout } from "../modules/layout.js";
import { initReveal } from "../modules/reveal.js";
import { initBlobDialogs } from "../modules/blob-dialog.js";
import { renderStack } from "../modules/stack.js";
import { renderProjects } from "../modules/projects.js";
import { initContact } from "../modules/contact.js";

initYearsOfExperience();
initBlobDialogs();
initContact();
initTypewriter(".hero__role-text", ["Soy Lic. en Computación…", "Soy desarrollador…", "Soy Guille Casasola."]);

await initLayout();
await Promise.all([renderStack(), renderProjects()]);
initReveal();
