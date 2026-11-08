/**
 * years-of-experience.js — fills every `.years-of-experience` element with
 * the number of full years since the author's first job.
 */

const FIRST_JOB_DATE = new Date("2019-10-01");

export function initYearsOfExperience() {
  const elements = document.querySelectorAll(".years-of-experience");
  if (!elements.length) return;

  const diffMs = Date.now() - FIRST_JOB_DATE.getTime();
  const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));
  elements.forEach((el) => (el.textContent = String(years)));
}
