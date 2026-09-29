// Floating nudge toward the deck, using Caylent's own mascot ("Steve" / :caylien:).
const HIDDEN_ON_PATHS = ["/deck", "/presentations"];

export function mountMascotWidget() {
  const el = document.createElement("div");
  el.className = "mascot-widget";
  el.id = "mascot-widget";
  el.innerHTML = `
    <a class="mascot-link" href="#/deck" aria-label="Go to the presentation">
      <span class="mascot-avatar"><img src="site/assets/mascot-alien.png" alt="" /></span>
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
