import { esc } from "../util.js";

const DOCS = [
  {
    href: "deliverables/ai-relevance-position.md",
    title: "Is “AI isn't relevant” a legitimate read, or a misread?",
    desc: "The position on the team's core objection, and what it changes about the approach.",
  },
  {
    href: "deliverables/david-okafor-first-two-weeks.md",
    title: "What David Okafor needs in the first two weeks",
    desc: "Where he actually is (uncertain, not resistant) and what that means for the sequence.",
  },
  {
    href: "deliverables/first-30-days-plan.md",
    title: "First 30 days — sequence and rationale",
    desc: "What happens in what order, and why, from discovery through a proven lighthouse use case.",
  },
];

export function renderDeliverables(mount) {
  mount.innerHTML = `
    <section class="page-head">
      <div class="eyebrow">Deliverables</div>
      <h1>The point of view <span class="accent-text">behind the deck</span></h1>
      <p class="page-desc">
        The full-prose strategy documents, one per required topic from the scenario brief.
        <code>presentations/</code> is where this gets compressed to slides.
      </p>
    </section>

    <div class="grid grid-3">
      ${DOCS.map(
        (doc) => `
        <a class="card doc-card" href="${esc(doc.href)}">
          <h3>${esc(doc.title)}</h3>
          <p>${esc(doc.desc)}</p>
          <div class="card-foot">${esc(doc.href)}</div>
        </a>
      `,
      ).join("")}
    </div>
  `;
}
