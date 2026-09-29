import { ICONS } from "./icons.js";
import { esc } from "./util.js";

// Skills as they exist in this repo's .claude/skills/ (source of truth: each skill's own
// SKILL.md). This is a curated subset scoped to the Meridian engagement, not the full Claude
// Code / plugin catalog available in a session.
const SKILL_GROUPS = [
  {
    label: "Engagement strategy",
    skills: [
      { cmd: "/genai-poc-strategy", desc: "The Align → Assess → Design lifecycle: client intake, use-case scoring, personas and journeys, value measurement. Run it end to end or one phase at a time." },
      { cmd: "/discovery", desc: "A go/no-go call on one specific problem or feature idea, backed by evidence." },
      { cmd: "/presentation-builder", desc: "Locks a deck's narrative arc into an outline before anyone writes slide HTML." },
      { cmd: "/research-synthesis", desc: "Turns raw research (call transcripts, verbatims, tickets) into themes backed by cited quotes." },
    ],
  },
  {
    label: "Meetings",
    skills: [
      { cmd: "/meeting-prep", desc: "A structured prep document for an upcoming meeting." },
      { cmd: "/interview-guide", desc: "A structured guide for a discovery or stakeholder interview." },
      { cmd: "/meeting-summary", desc: "Turns a transcript or rough notes into a summary saved to meeting-notes/." },
      { cmd: "/meeting-followup", desc: "Drafts the follow-up email and tickets after a call, and confirms both before sending." },
    ],
  },
  {
    label: "Reporting",
    skills: [
      { cmd: "/status-update", desc: "A weekly status update saved to status-updates/." },
      { cmd: "/stakeholder-digest", desc: "Any stakeholder write-up, tuned to a specific audience and moment." },
      { cmd: "/week-ahead", desc: "A Monday prep plan built from the upcoming week's calendar." },
    ],
  },
  {
    label: "Utility",
    skills: [
      { cmd: "/stop-slop", desc: "Strips AI writing tells out of new prose before you publish it to this site." },
    ],
  },
];

const NAV_GUIDE = [
  { label: "Case File", folder: "case-file/", desc: "Who Meridian is and what happened, exactly as the brief gives it." },
  { label: "Discovery", folder: "discovery/", desc: "Pain points, discovery questions, the value charter, and the session design." },
  { label: "Research", folder: "research/", desc: "The full-prose point of view behind the deck." },
  { label: "Deliverables", folder: "deliverables/", desc: "Final engagement artifacts — empty until one ships." },
  { label: "Presentations", folder: "presentations/", desc: "The kickoff deck itself, compressed for the room." },
  { label: "Meeting Notes", folder: "meeting-notes/", desc: "Call recaps, added after each session." },
  { label: "Status Updates", folder: "status-updates/", desc: "Weekly progress, added after kickoff." },
];

let mounted = false;

export function initHelpModal() {
  if (mounted) return;
  mounted = true;

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
          <p>
            This is a simulated client engagement workspace, built around a fictional client:
            Meridian Capital Services, a PE-backed investment management firm. Its FP&amp;A team
            bought Claude licenses six months ago and barely uses them. The team isn't resistant,
            just uncertain where a chat tool fits work that "requires judgment." David Okafor,
            their Director of FP&amp;A, hired Caylent to figure that out with him.
          </p>
          <p>
            Everything here is real work product for the engagement: the case file, the discovery
            plan, the strategy documents, and the deck all exist to get us ready for the kickoff
            call with David and two of his analysts.
          </p>
        </section>

        <section class="help-section">
          <h3>Where to find things</h3>
          <div class="help-grid">
            ${NAV_GUIDE.map(
              (item) => `
              <div class="help-tile">
                <div class="help-tile-head">
                  <span class="help-tile-label">${esc(item.label)}</span>
                  <code>${esc(item.folder)}</code>
                </div>
                <p>${esc(item.desc)}</p>
              </div>
            `,
            ).join("")}
          </div>
          <p class="help-note">
            Docs open in this in-app reader. The kickoff deck opens full-screen: arrow keys move
            between slides, and it prints to PDF.
          </p>
        </section>

        <section class="help-section">
          <h3>Skills available in this repo</h3>
          <p>
            These run as Claude Code slash commands scoped to this repo. Each one already knows
            the Meridian context: case file, discovery notes, research. You don't need to
            re-explain it.
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
                  </div>
                `,
                  )
                  .join("")}
              </div>
            </div>
          `,
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
