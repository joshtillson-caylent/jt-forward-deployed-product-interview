import { NUDGE } from "./workspace.config.js";
import { esc } from "./util.js";

// Floating nudge (Caylent's mascot, "Steve" / :caylien:) toward whatever NUDGE in
// site/workspace.config.js points at, usually the deck for the next meeting. Off when NUDGE is null.
const HIDDEN_ON_PATHS = ["/deck", "/presentations"];

export function mountNudge() {
  if (!NUDGE?.href) return;
  const el = document.createElement("div");
  el.className = "mascot-widget";
  el.innerHTML = `
    <a class="mascot-link" href="${esc(NUDGE.href)}" aria-label="${esc(NUDGE.text || "Open")}">
      <span class="mascot-avatar"><img src="site/assets/mascot-alien.png" alt="" /></span>
      <span class="mascot-bubble">${esc(NUDGE.text || "Take a look")}</span>
    </a>
    <button class="mascot-dismiss" type="button" aria-label="Dismiss">&times;</button>
  `;
  document.body.appendChild(el);

  let dismissed = false;
  const update = () => {
    const path = window.location.hash.replace(/^#/, "") || "/home";
    const hidden = HIDDEN_ON_PATHS.some((p) => path === p || path.startsWith(`${p}/`));
    el.style.display = dismissed || hidden ? "none" : "flex";
  };
  el.querySelector(".mascot-dismiss").addEventListener("click", () => {
    dismissed = true;
    update();
  });
  window.addEventListener("hashchange", update);
  update();
}
