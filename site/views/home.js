import { ICONS } from "../icons.js";
import { esc, timeGreeting, firstName } from "../util.js";

const QUICK_LINKS = [
  { path: "/case-file", icon: "folder", title: "Case File", desc: "Who they are, what happened, who's in the room." },
  { path: "/discovery", icon: "compass", title: "Discovery", desc: "How the pain gets surfaced, not just asserted." },
  { path: "/deliverables", icon: "file-text", title: "Deliverables", desc: "The point of view behind the deck." },
  { path: "/presentations", icon: "monitor", title: "Presentations", desc: "The kickoff deck and the demo." },
  { path: "/meeting-notes", icon: "calendar", title: "Meeting Notes", desc: "Call recaps and discovery interviews." },
  { path: "/status-updates", icon: "list", title: "Status Updates", desc: "What shipped, what's next." },
];

export function renderHome(mount, user) {
  const greet = timeGreeting();
  const name = firstName(user?.name);

  mount.innerHTML = `
    <section class="page-head">
      <div class="eyebrow">${esc(greet)}</div>
      <h1>${esc(name)}, <span class="accent-text">where should we pick up?</span></h1>
      <p class="page-desc">
        Meridian Capital Services — turning a board-level "AI-enabled operations" mandate into
        something FP&amp;A actually uses. Everything from the case file to the kickoff deck lives
        one click away.
      </p>
    </section>

    <section class="section" style="margin-top: 0;">
      <div class="section-head">
        <h2>This engagement, in one place</h2>
      </div>
      <p class="section-sub">Jump into any part of the workspace.</p>
      <div class="grid grid-3">
        ${QUICK_LINKS.map(
          (item) => `
          <a class="card tile-card" href="#${item.path}">
            <span class="tile-icon">${ICONS[item.icon]}</span>
            <h3>${esc(item.title)}</h3>
            <p>${esc(item.desc)}</p>
          </a>
        `,
        ).join("")}
      </div>
    </section>
  `;
}
