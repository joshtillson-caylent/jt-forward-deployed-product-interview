import { ICONS } from "./icons.js";
import { esc, initials } from "./util.js";
import { openHelpModal } from "./help.js";

export const NAV_ITEMS = [
  { path: "/home", label: "Home", icon: "home" },
  { path: "/case-file", label: "Case File", icon: "folder" },
  { path: "/discovery", label: "Discovery", icon: "compass" },
  { path: "/deliverables", label: "Deliverables", icon: "file-text" },
  { path: "/presentations", label: "Presentations", icon: "monitor" },
  { path: "/meeting-notes", label: "Meeting Notes", icon: "calendar" },
  { path: "/status-updates", label: "Status Updates", icon: "list" },
];

export function renderSidebar(el, user) {
  const name = user?.name || "Guest";
  const dept = user?.department || user?.email || "Not signed in via Evo";

  el.innerHTML = `
    <div class="brand">
      <div class="brand-mark" aria-hidden="true"><span>MC</span></div>
      <div class="brand-text">
        <span class="brand-name">Meridian</span>
        <span class="brand-sub">Engagement</span>
      </div>
    </div>

    <nav class="nav" aria-label="Primary">
      ${NAV_ITEMS.map(
        (item) => `
        <a class="nav-link" href="#${item.path}">
          <span class="nav-icon">${ICONS[item.icon]}</span>
          <span>${esc(item.label)}</span>
        </a>
      `,
      ).join("")}
    </nav>

    <button class="guide-trigger" id="guide-trigger" type="button">
      <span class="nav-icon">${ICONS["help-circle"]}</span>
      <span>Workspace guide</span>
    </button>

    <div class="user-badge" role="button" tabindex="0" aria-label="Signed in as ${esc(name)}">
      <div class="user-avatar" aria-hidden="true">${esc(initials(user?.name))}</div>
      <div class="user-meta">
        <div class="user-name">${esc(name)}</div>
        <div class="user-dept">${esc(dept)}</div>
      </div>
    </div>
  `;

  el.querySelector("#guide-trigger").addEventListener("click", openHelpModal);
}
