import { getUser } from "./evo.js";
import { renderSidebar } from "./nav.js";
import { registerRoute, startRouter } from "./router.js";
import { renderHome } from "./views/home.js";
import { renderPlaceholder } from "./views/placeholder.js";
import { renderLibrary, CASE_FILE_DOCS, DISCOVERY_DOCS } from "./views/library.js";
import { renderResearch } from "./views/research.js";
import { renderPresentations } from "./views/presentations.js";
import { renderDoc } from "./views/doc.js";
import { renderDeck } from "./views/deck.js";

// Render right away as a guest, then fill in the Evo user when (if) it arrives. Waiting on
// evo.init() before the first render left a blank page whenever the SDK was slow or blocked.
function boot() {
  const sidebar = document.getElementById("sidebar");
  let user = null;

  renderSidebar(sidebar, user);

  registerRoute("/home", (mount) => renderHome(mount, user));

  registerRoute("/case-file", (mount) =>
    renderLibrary(mount, {
      eyebrow: "Case File",
      title: "Who they are, what happened",
      description: "The facts as the brief gave them, before discovery adds to them.",
      docs: CASE_FILE_DOCS,
    }),
  );

  registerRoute("/discovery", (mount) =>
    renderLibrary(mount, {
      eyebrow: "Discovery",
      title: "Surfacing the pain the team can't see",
      description: "Pain points, discovery questions, the value charter, and the session design.",
      docs: DISCOVERY_DOCS,
    }),
  );

  registerRoute("/research", renderResearch);

  registerRoute("/deliverables", (mount) =>
    renderPlaceholder(mount, {
      eyebrow: "Deliverables",
      title: "Final engagement artifacts",
      description: "The things actually handed to Meridian — a toolkit, an ROI analysis, a shipped workflow.",
      note: "Nothing has reached that stage yet. The research and prep behind the deck live under Research.",
    }),
  );

  registerRoute("/presentations", renderPresentations);
  registerRoute("/doc/", renderDoc);
  registerRoute("/deck", renderDeck);

  registerRoute("/meeting-notes", (mount) =>
    renderPlaceholder(mount, {
      eyebrow: "Meeting Notes",
      title: "Call recaps and discovery interviews",
      description: "Structured notes from each session on this engagement.",
      note: "We'll post notes here after each meeting.",
    }),
  );

  registerRoute("/status-updates", (mount) =>
    renderPlaceholder(mount, {
      eyebrow: "Status Updates",
      title: "What shipped, what's next",
      description: "Weekly progress: what's in flight, at risk, and coming next.",
      note: "We'll post the first status update after kickoff.",
    }),
  );

  const rerender = startRouter(document.getElementById("main-content"));

  getUser().then((evoUser) => {
    if (!evoUser) return;
    user = evoUser;
    renderSidebar(sidebar, user);
    rerender();
  });
}

boot();
