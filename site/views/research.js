import { docCard } from "./library.js";

const RESEARCH_DOCS = [
  {
    path: "research/ai-relevance-position.md",
    title: "Is “AI isn't relevant” a legitimate read, or a misread?",
    desc: "The position on the team's core objection, and what it changes about the approach.",
  },
  {
    path: "research/david-okafor-first-two-weeks.md",
    title: "What David Okafor needs in the first two weeks",
    desc: "Where David stands today, and what that means for the sequence.",
  },
  {
    path: "research/first-30-days-plan.md",
    title: "First 30 days: sequence and rationale",
    desc: "The order of work and the reasons for it, from kickoff to a first workflow the team owns.",
  },
  {
    path: "research/anthropic-finance-evidence.md",
    title: "Evidence: Claude in finance teams",
    desc: "Customer results, Anthropic's own finance team, and the source for each number in the deck.",
  },
];

export function renderResearch(mount) {
  mount.innerHTML = `
    <section class="page-head">
      <div class="eyebrow">Research</div>
      <h1>The point of view <span class="accent-text">behind the deck</span></h1>
      <p class="page-desc">
        Full-prose strategy documents, one per required topic from the scenario brief, plus the
        evidence behind the deck. The deck in <code>presentations/</code> condenses them to slides.
      </p>
    </section>

    <div class="grid grid-3">
      ${RESEARCH_DOCS.map(docCard).join("")}
    </div>
  `;
}
