import { IDENTITY } from "./workspace.config.js";
import { getUser } from "./evo.js";
import { renderSidebar } from "./nav.js";
import { registerRoute, startRouter } from "./router.js";
import { visibleSections } from "./sections.js";
import { renderHome } from "./views/home.js";
import { renderLibrary } from "./views/library.js";
import { renderPresentations } from "./views/presentations.js";
import { renderDoc } from "./views/doc.js";
import { renderDeck } from "./views/deck.js";
import { mountNudge } from "./widget.js";

// Every route comes from site/workspace.config.js and the generated site/content-index.js, so a
// new client needs a config change, not a code change. Render right away as a guest, then fill in
// the Evo user when (if) it arrives. Waiting on evo.init() first left a blank page whenever the SDK
// was slow or blocked.
function boot() {
  document.title = IDENTITY.title || "Engagement Workspace";
  const sidebar = document.getElementById("sidebar");
  let user = null;

  renderSidebar(sidebar, user);
  registerRoute("/home", (mount) => renderHome(mount, user));
  for (const section of visibleSections()) {
    registerRoute(`/${section.id}`, (mount) =>
      section.kind === "decks" ? renderPresentations(mount, section) : renderLibrary(mount, section),
    );
  }
  registerRoute("/doc/", renderDoc);
  registerRoute("/deck/", renderDeck);

  const rerender = startRouter(document.getElementById("main-content"));
  mountNudge();

  getUser().then((evoUser) => {
    if (!evoUser) return;
    user = evoUser;
    renderSidebar(sidebar, user);
    rerender();
  });
}

boot();
