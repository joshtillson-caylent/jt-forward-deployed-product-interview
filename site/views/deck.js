const DECK_PATH = "presentations/kickoff-deck/index.html";

// The deck is its own self-contained page. It runs full-screen in an iframe over the workspace,
// so its styles and keyboard handling stay isolated. The Evo bundle embeds the deck's HTML as
// window.__MERIDIAN_DECK (srcdoc), since Evo serves a single index.html; locally it loads the file.
export function renderDeck(mount) {
  mount.innerHTML = `<div class="deck-frame"><iframe title="Meridian FP&amp;A kickoff deck" allow="fullscreen" allowfullscreen></iframe></div>`;
  const frame = mount.querySelector("iframe");

  if (typeof window.__MERIDIAN_DECK === "string") frame.srcdoc = window.__MERIDIAN_DECK;
  else frame.src = DECK_PATH;

  frame.addEventListener("load", () => frame.focus());
}

// The deck's "Hub" link posts this message when it runs inside the frame.
window.addEventListener("message", (event) => {
  if (event.data?.type === "meridian:deck-back") window.location.hash = "#/presentations";
});
