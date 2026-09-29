import { esc } from "../util.js";

const DECKS = [
  {
    href: "#/deck",
    title: "Meridian FP&A Kickoff: Point of View",
    desc: "Eight slides: where FP&A stands today, what David needs, the discovery motion, and the first 30 days.",
    status: "first pass",
    audience: "Interview panel",
  },
];

export function renderPresentations(mount) {
  mount.innerHTML = `
    <section class="page-head">
      <div class="eyebrow">Presentations</div>
      <h1>The deck <span class="accent-text">and the demo</span></h1>
      <p class="page-desc">
        One deck for this engagement, hand-built as plain HTML. Arrow keys move between slides,
        and it prints to PDF.
      </p>
    </section>

    <div class="grid grid-3">
      ${DECKS.map(
        (deck) => `
        <a class="card deck-card" href="${esc(deck.href)}">
          <div>
            <span class="badge-pill${deck.status !== "final" ? " warm" : ""}">${esc(deck.status)}</span>
          </div>
          <h3>${esc(deck.title)}</h3>
          <p>${esc(deck.desc)}</p>
          <div class="card-foot">${esc(deck.audience)}</div>
        </a>
      `,
      ).join("")}
    </div>
  `;
}
