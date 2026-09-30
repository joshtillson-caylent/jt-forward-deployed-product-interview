import { CONTENT_INDEX } from "../content-index.js";
import { esc } from "../util.js";

export function renderPresentations(mount, section) {
  const decks = CONTENT_INDEX.decks;
  mount.innerHTML = `
    <section class="page-head">
      <div class="eyebrow">${esc(section.label)}</div>
      <h1>${esc(section.title || section.label)}</h1>
      <p class="page-desc">${esc(section.description || "")}</p>
    </section>
    ${
      decks.length
        ? `<div class="grid grid-3">${decks
            .map(
              (deck) => `
        <a class="card deck-card" href="#/deck/${esc(deck.slug)}">
          ${deck.status ? `<div><span class="badge-pill${deck.status !== "final" ? " warm" : ""}">${esc(deck.status)}</span></div>` : ""}
          <h3>${esc(deck.title)}</h3>
          ${deck.desc ? `<p>${esc(deck.desc)}</p>` : ""}
          <div class="card-foot">${esc(deck.audience || deck.path)}</div>
        </a>`,
            )
            .join("")}</div>`
        : `<div class="empty-state"><h3>No decks yet</h3><p>${esc(section.empty || "")}</p></div>`
    }
  `;
}
