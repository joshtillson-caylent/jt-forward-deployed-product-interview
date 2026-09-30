import { IDENTITY } from "./workspace.config.js";
import { visibleSections } from "./sections.js";
import { ICONS } from "./icons.js";
import { esc } from "./util.js";

// Skills that ship in every workspace (.claude/skills/). Keep in step with the template's
// manifests/skills.txt: /initialize's verify.sh warns when a shipped skill is missing here.
const SKILL_GROUPS = [
  {
    label: "Workspace",
    skills: [
      { cmd: "/onboard-client", desc: "Fits this workspace to its client: reads the SOW and proposal, asks what kind of engagement it is, and writes the client context every other skill uses. Re-run it for a change order." },
      { cmd: "/publish", desc: "Commits, pushes, and publishes this site to Evo, in that order, after one confirmation." },
    ],
  },
  {
    label: "Engagement strategy",
    skills: [
      { cmd: "/genai-poc-strategy", desc: "The Align → Assess → Design lifecycle: pain points, use-case scoring, personas and journeys, value measurement." },
      { cmd: "/discovery", desc: "A go/no-go call on one specific problem or idea, backed by evidence." },
      { cmd: "/research-synthesis", desc: "Turns raw research (transcripts, verbatims, tickets) into themes backed by cited quotes." },
      { cmd: "/presentation-builder", desc: "Locks a deck's narrative arc into an outline before anyone writes slide HTML." },
    ],
  },
  {
    label: "Meetings",
    skills: [
      { cmd: "/meeting-prep", desc: "A prep document for an upcoming meeting." },
      { cmd: "/interview-guide", desc: "A structured guide for a discovery or stakeholder interview." },
      { cmd: "/meeting-summary", desc: "Turns a transcript or rough notes into a summary in meeting-notes/." },
      { cmd: "/meeting-followup", desc: "Drafts the follow-up email and tickets after a call, and confirms both before sending." },
    ],
  },
  {
    label: "Reporting",
    skills: [
      { cmd: "/status-update", desc: "A status update in status-updates/." },
      { cmd: "/stakeholder-digest", desc: "Any stakeholder write-up, tuned to a specific audience and moment." },
      { cmd: "/week-ahead", desc: "A Monday prep plan built from the upcoming week's calendar." },
    ],
  },
  {
    label: "Planning & utility",
    skills: [
      { cmd: "/task-planning", desc: "A context doc and step plan for work that won't fit in one session." },
      { cmd: "/step-execution", desc: "Runs one step of a task plan end to end." },
      { cmd: "/step-loop", desc: "Runs every remaining step of a task plan." },
      { cmd: "/stop-slop", desc: "Strips AI writing tells from prose before it goes in front of the client." },
    ],
  },
];

let mounted = false;

export function initHelpModal() {
  if (mounted) return;
  mounted = true;

  const where = visibleSections().map((s) => ({
    label: s.label,
    folder: s.folder ? `${s.folder}/` : "presentations/",
    desc: s.description || "",
  }));

  const overlay = document.createElement("div");
  overlay.className = "help-overlay";
  overlay.id = "help-overlay";
  overlay.innerHTML = `
    <div class="help-modal" role="dialog" aria-modal="true" aria-labelledby="help-title">
      <div class="help-head">
        <div>
          <div class="eyebrow">Workspace guide</div>
          <h2 id="help-title">What this is, and what's here</h2>
        </div>
        <button class="help-close" id="help-close" type="button" aria-label="Close">${ICONS.x}</button>
      </div>
      <div class="help-body">
        <section class="help-section">
          <h3>About this workspace</h3>
          ${(IDENTITY.about || []).map((p) => `<p>${esc(p)}</p>`).join("")}
        </section>

        <section class="help-section">
          <h3>Where to find things</h3>
          <div class="help-grid">
            ${where
              .map(
                (item) => `
              <div class="help-tile">
                <div class="help-tile-head">
                  <span class="help-tile-label">${esc(item.label)}</span>
                  <code>${esc(item.folder)}</code>
                </div>
                <p>${esc(item.desc)}</p>
              </div>`,
              )
              .join("")}
          </div>
          <p class="help-note">
            Docs open in this in-app reader. Decks open full-screen: arrow keys move between slides,
            and every deck prints to PDF. The engagement profile in <code>context/</code> is the
            canonical record.
          </p>
        </section>

        <section class="help-section">
          <h3>Skills in this workspace</h3>
          <p>
            These run as Claude Code slash commands inside this repo. Each one reads the engagement
            profile and case file first, so you don't need to re-explain the engagement.
          </p>
          ${SKILL_GROUPS.map(
            (group) => `
            <div class="help-skill-group">
              <div class="help-skill-group-label">${esc(group.label)}</div>
              <div class="help-skill-list">
                ${group.skills
                  .map(
                    (s) => `
                  <div class="help-skill">
                    <code>${esc(s.cmd)}</code>
                    <p>${esc(s.desc)}</p>
                  </div>`,
                  )
                  .join("")}
              </div>
            </div>`,
          ).join("")}
        </section>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeHelpModal();
  });
  overlay.querySelector("#help-close").addEventListener("click", closeHelpModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay.classList.contains("is-open")) closeHelpModal();
  });
}

export function openHelpModal() {
  initHelpModal();
  document.getElementById("help-overlay").classList.add("is-open");
  document.body.classList.add("help-open");
}

export function closeHelpModal() {
  document.getElementById("help-overlay")?.classList.remove("is-open");
  document.body.classList.remove("help-open");
}
