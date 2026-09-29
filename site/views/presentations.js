import { esc } from "../util.js";

const DECKS = [
  {
    href: "presentations/kickoff-deck/index.html",
    title: "Meridian Capital Services — Approach & Point of View",
    desc: "The kickoff deck: the read on where FP&A actually is, and the first-30-days plan.",
    status: "draft",
    audience: "Interview panel",
  },
];

export function renderPresentations(mount) {
  mount.innerHTML = `
    <section class="page-head">
      <div class="eyebrow">Presentations</div>
      <h1>The deck <span class="accent-text">and the demo</span></h1>
      <p class="page-desc">
        The compressed artifact. One deck for this engagement, hand-built as plain HTML —
        keyboard-navigable and print-to-PDF friendly.
      </p>
    </section>

    <div class="grid grid-3">
      ${DECKS.map(
        (deck) => `
        <a class="card deck-card" href="${esc(deck.href)}">
          <div>
            <span class="badge-pill${deck.status === "draft" ? " warm" : ""}">${esc(deck.status)}</span>
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
