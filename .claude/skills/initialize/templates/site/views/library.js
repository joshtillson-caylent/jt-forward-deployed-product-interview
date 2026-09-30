import { docsFor } from "../sections.js";
import { esc } from "../util.js";

/** A section page listing its documents, which open in the in-app reader (#/doc/<path>). */
export function renderLibrary(mount, section) {
  const docs = docsFor(section);
  mount.innerHTML = `
    <section class="page-head">
      <div class="eyebrow">${esc(section.label)}</div>
      <h1>${esc(section.title || section.label)}</h1>
      <p class="page-desc">${esc(section.description || "")}</p>
    </section>
    ${
      docs.length
        ? `<div class="grid grid-3">${docs.map(docCard).join("")}</div>`
        : `<div class="empty-state"><h3>Nothing here yet</h3><p>${esc(section.empty || "")}</p></div>`
    }
  `;
}

export function docCard(doc) {
  return `
    <a class="card doc-card" href="#/doc/${esc(doc.path)}">
      ${doc.pinned ? `<div><span class="badge-pill">Start here</span></div>` : ""}
      <h3>${esc(doc.title)}</h3>
      ${doc.desc ? `<p>${esc(doc.desc)}</p>` : ""}
      <div class="card-foot">${esc(doc.path)}</div>
    </a>
  `;
}
