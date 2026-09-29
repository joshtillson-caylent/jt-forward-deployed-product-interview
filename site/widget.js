// Floating nudge toward the deck. Stand-in illustration: Caylent's own mascot ("Steve" /
// :caylien:) lives in Drive/Notion, not in this repo, and Drive auth wasn't available this
// session — this is a simple line-illustrated alien in the brand green instead.
const MASCOT_SVG = `
<svg viewBox="0 0 64 64" aria-hidden="true">
  <path d="M33 6c3 0 5 2.5 5 5.5S36 15 33 15s-3-1.5-3-3.5S30 6 33 6Z" fill="#15803d"/>
  <path d="M32 40c-11 0-20-10-20-22C12 8 21 2 32 2s20 6 20 16c0 12-9 22-20 22Z" fill="#22c55e" stroke="#15803d" stroke-width="2"/>
  <ellipse cx="24" cy="20" rx="5.5" ry="7" fill="#fff"/>
  <ellipse cx="40" cy="20" rx="5.5" ry="7" fill="#fff"/>
  <circle cx="25" cy="22" r="2.4" fill="#0f0f10"/>
  <circle cx="41" cy="22" r="2.4" fill="#0f0f10"/>
  <path d="M25 31c3 2.5 11 2.5 14 0" stroke="#0f0f10" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M14 46c3-6 12-10 18-10s15 4 18 10c-3 8-33 8-36 0Z" fill="#22c55e" stroke="#15803d" stroke-width="2"/>
</svg>`;

const HIDDEN_ON_PATHS = ["/deck", "/presentations"];

export function mountMascotWidget() {
  const el = document.createElement("div");
  el.className = "mascot-widget";
  el.id = "mascot-widget";
  el.innerHTML = `
    <a class="mascot-link" href="#/deck" aria-label="Go to the presentation">
      <span class="mascot-avatar">${MASCOT_SVG}</span>
      <span class="mascot-bubble">Let me take you to the presentation</span>
    </a>
    <button class="mascot-dismiss" type="button" aria-label="Dismiss">&times;</button>
  `;
  document.body.appendChild(el);

  let dismissed = false;
  const update = () => {
    const path = window.location.hash.replace(/^#/, "") || "/home";
    const onDeckOrList = HIDDEN_ON_PATHS.some((p) => path === p || path.startsWith(`${p}/`));
    el.style.display = dismissed || onDeckOrList ? "none" : "flex";
  };

  el.querySelector(".mascot-dismiss").addEventListener("click", () => {
    dismissed = true;
    update();
  });

  window.addEventListener("hashchange", update);
  update();
}
