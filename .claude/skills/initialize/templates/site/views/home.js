import { IDENTITY } from "../workspace.config.js";
import { visibleSections, docsFor } from "../sections.js";
import { CONTENT_INDEX } from "../content-index.js";
import { ICONS } from "../icons.js";
import { esc, timeGreeting, firstName } from "../util.js";

function countLabel(section) {
  const n = section.kind === "decks" ? CONTENT_INDEX.decks.length : docsFor(section).length;
  if (!n) return "";
  const noun = section.kind === "decks" ? "deck" : "doc";
  return `<span class="tile-count">${n} ${noun}${n === 1 ? "" : "s"}</span>`;
}

export function renderHome(mount, user) {
  const onboarded = IDENTITY.status === "onboarded";
  const glance = (IDENTITY.glance || []).filter((g) => g && g.value);

  mount.innerHTML = `
    <section class="page-head">
      <div class="eyebrow">${esc(timeGreeting())}</div>
      <h1>${esc(firstName(user?.name))}, <span class="accent-text">${esc(IDENTITY.home?.headline || "where should we pick up?")}</span></h1>
      <p class="page-desc">${esc(IDENTITY.home?.description || "")}</p>
      ${
        glance.length
          ? `<div class="meta-row">${glance
              .map((g) => `<span class="meta-dot"><span class="meta-label">${esc(g.label)}</span>${esc(g.value)}</span>`)
              .join("")}</div>`
          : ""
      }
    </section>

    ${
      onboarded
        ? ""
        : `<div class="notice-card">
      <span class="notice-icon">${ICONS.info}</span>
      <div>
        <h3>This workspace isn't fitted to a client yet</h3>
        <p>Open it in Claude Code and run <code>/onboard-client</code> with the SOW or proposal attached.
        It fills in the client, the engagement, and this page.</p>
      </div>
    </div>`
    }

    <section class="section" style="margin-top: 0;">
      <div class="section-head"><h2>This engagement, in one place</h2></div>
      <p class="section-sub">Jump into any part of the workspace.</p>
      <div class="grid grid-3">
        ${visibleSections()
          .map(
            (s) => `
          <a class="card tile-card" href="#/${esc(s.id)}">
            <span class="tile-icon">${ICONS[s.icon] || ICONS["file-text"]}</span>
            <h3>${esc(s.label)}</h3>
            <p>${esc(s.tile || s.description || "")}</p>
            ${countLabel(s)}
          </a>`,
          )
          .join("")}
      </div>
    </section>

    <section class="section">
      <div class="section-head"><h2>The engagement record</h2></div>
      <p class="section-sub">The canonical profile and team every Claude session reads first.</p>
      <div class="grid grid-2">
        <a class="card doc-card" href="#/doc/context/engagement-profile.md">
          <h3>Engagement profile</h3>
          <p>Level, scope, deliverables, timeline, success criteria, constraints, and the change log.</p>
          <div class="card-foot">context/engagement-profile.md</div>
        </a>
        <a class="card doc-card" href="#/doc/context/engagement-team.md">
          <h3>Team &amp; ways of working</h3>
          <p>Both teams, stakeholders, cadence, glossary, and key links.</p>
          <div class="card-foot">context/engagement-team.md</div>
        </a>
      </div>
    </section>
  `;
}
