import { esc } from "../util.js";

export function renderPlaceholder(mount, { eyebrow, title, description, note }) {
  mount.innerHTML = `
    <section class="page-head">
      <div class="eyebrow">${esc(eyebrow)}</div>
      <h1>${esc(title)}</h1>
      <p class="page-desc">${esc(description)}</p>
    </section>

    <div class="empty-state">
      <h3>Nothing published here yet</h3>
      <p>${esc(note)}</p>
    </div>
  `;
}
