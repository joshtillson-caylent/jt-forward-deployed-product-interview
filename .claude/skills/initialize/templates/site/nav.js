import { IDENTITY, NAV_HIGHLIGHT } from "./workspace.config.js";
import { visibleSections } from "./sections.js";
import { ICONS } from "./icons.js";
import { esc, initials } from "./util.js";
import { openHelpModal } from "./help.js";

function navItems() {
  const items = [{ id: "home", label: "Home", icon: "home" }, ...visibleSections()];
  const hi = items.findIndex((item) => item.id === NAV_HIGHLIGHT?.section);
  if (hi > 0) items.unshift(...items.splice(hi, 1)); // the highlighted item leads the list
  return items;
}

export function renderSidebar(el, user) {
  const name = user?.name || "Guest";
  const dept = user?.department || user?.email || "Not signed in via Evo";
  const brand = IDENTITY.brand || {};

  el.innerHTML = `
    <div class="brand">
      <div class="brand-mark" aria-hidden="true"><span>${esc(brand.mark || "EW")}</span></div>
      <div class="brand-text">
        <span class="brand-name">${esc(brand.name || "Workspace")}</span>
        <span class="brand-sub">${esc(brand.sub || "Engagement")}</span>
      </div>
    </div>

    <nav class="nav" aria-label="Primary">
      ${navItems()
        .map((item) => {
          const highlight = item.id === NAV_HIGHLIGHT?.section;
          return `
        <a class="nav-link${highlight ? " nav-link--highlight" : ""}" href="#/${esc(item.id)}">
          <span class="nav-icon">${ICONS[item.icon] || ICONS["file-text"]}</span>
          <span>${esc(item.label)}</span>
          ${highlight && NAV_HIGHLIGHT.badge ? `<span class="nav-badge">${esc(NAV_HIGHLIGHT.badge)}</span>` : ""}
        </a>`;
        })
        .join("")}
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
