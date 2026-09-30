import { CONTENT_INDEX } from "../content-index.js";
import { esc } from "../util.js";

// A deck is its own self-contained page. It runs full-screen in an iframe over the workspace, so its
// styles and keyboard handling stay isolated. The Evo bundle embeds each deck's HTML in
// window.__WS_DECKS (srcdoc), since Evo serves a single index.html. Locally it loads the file.
export function renderDeck(mount, slug) {
  const deck = CONTENT_INDEX.decks.find((d) => d.slug === slug);
  if (!deck) {
    mount.innerHTML = `<div class="empty-state"><h3>Deck not found</h3>
      <p>No deck "${esc(slug)}" in presentations/registry.md. <a href="#/presentations">Back to Presentations</a></p></div>`;
    return;
  }
  mount.innerHTML = `<div class="deck-frame"><iframe title="${esc(deck.title)}" allow="fullscreen" allowfullscreen></iframe></div>`;
  const frame = mount.querySelector("iframe");
  const embedded = window.__WS_DECKS?.[slug];
  if (typeof embedded === "string") frame.srcdoc = embedded;
  else frame.src = deck.path;
  frame.addEventListener("load", () => frame.focus());
}

// A deck's "back" link posts { type: "<anything>:deck-back" } to its parent frame.
window.addEventListener("message", (event) => {
  const type = event.data?.type;
  if (typeof type === "string" && type.endsWith(":deck-back")) window.location.hash = "#/presentations";
});
