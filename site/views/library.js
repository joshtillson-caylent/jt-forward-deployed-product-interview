import { esc } from "../util.js";

export const CASE_FILE_DOCS = [
  {
    path: "case-file/company-profile.md",
    title: "Company profile",
    desc: "Meridian's size, ownership, and the FP&A team's workload, as the brief describes them.",
  },
  {
    path: "case-file/stakeholders.md",
    title: "Stakeholders",
    desc: "David, the PE sponsor, and the analysts: what each needs and where each stands.",
  },
  {
    path: "case-file/00-engagement-brief.md",
    title: "Engagement brief",
    desc: "Scope, contacts, known pains, and the evidence ledger we started with.",
  },
];

export const DISCOVERY_DOCS = [
  {
    path: "discovery/discovery-session-design.md",
    title: "Discovery session design",
    desc: "The session agenda, built around a live first pass on a task the team did this week.",
  },
  {
    path: "discovery/align/discovery-questions.md",
    title: "Kickoff question bank",
    desc: "Questions for David and the two analysts, grouped by what each one surfaces.",
  },
  {
    path: "discovery/align/pain-points.md",
    title: "Pain point inventory",
    desc: "Pains cited in the brief, and the hypotheses we'll test at kickoff.",
  },
  {
    path: "discovery/align/discovery-notes.md",
    title: "Discovery themes",
    desc: "Three themes on why the team can't see its own workload.",
  },
  {
    path: "discovery/align/value-charter.md",
    title: "Value charter",
    desc: "Engagement intent, value levers, and draft success criteria to confirm with David.",
  },
];

/** A section page listing documents that open in the in-app reader (#/doc/<path>). */
export function renderLibrary(mount, { eyebrow, title, description, docs }) {
  mount.innerHTML = `
    <section class="page-head">
      <div class="eyebrow">${esc(eyebrow)}</div>
      <h1>${esc(title)}</h1>
      <p class="page-desc">${esc(description)}</p>
    </section>

    <div class="grid grid-3">
      ${docs.map(docCard).join("")}
    </div>
  `;
}

export function docCard(doc) {
  return `
    <a class="card doc-card" href="#/doc/${esc(doc.path)}">
      <h3>${esc(doc.title)}</h3>
      <p>${esc(doc.desc)}</p>
      <div class="card-foot">${esc(doc.path)}</div>
    </a>
  `;
}
