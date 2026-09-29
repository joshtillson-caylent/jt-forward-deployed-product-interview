import { getUser } from "./evo.js";
import { renderSidebar } from "./nav.js";
import { registerRoute, startRouter } from "./router.js";
import { renderHome } from "./views/home.js";
import { renderPlaceholder } from "./views/placeholder.js";
import { renderDeliverables } from "./views/deliverables.js";
import { renderPresentations } from "./views/presentations.js";

async function boot() {
  const user = await getUser();

  renderSidebar(document.getElementById("sidebar"), user);

  registerRoute("/home", (mount) => renderHome(mount, user));

  registerRoute("/case-file", (mount) =>
    renderPlaceholder(mount, {
      eyebrow: "Case File",
      title: "Who they are, what happened",
      description: "Facts as given — the client context walked in with, not yet enriched by discovery.",
      note: "The scenario brief, company profile, and stakeholder map will appear here once this section is wired up.",
    }),
  );

  registerRoute("/discovery", (mount) =>
    renderPlaceholder(mount, {
      eyebrow: "Discovery",
      title: "How the pain gets surfaced",
      description: "The motion to find more — pain points, discovery questions, and the value charter.",
      note: "Discovery notes and the session design will appear here once this section is wired up.",
    }),
  );

  registerRoute("/deliverables", renderDeliverables);
  registerRoute("/presentations", renderPresentations);

  registerRoute("/meeting-notes", (mount) =>
    renderPlaceholder(mount, {
      eyebrow: "Meeting Notes",
      title: "Call recaps and discovery interviews",
      description: "Structured notes from every session on this engagement.",
      note: "Notes will appear here as meetings happen and get summarized.",
    }),
  );

  registerRoute("/status-updates", (mount) =>
    renderPlaceholder(mount, {
      eyebrow: "Status Updates",
      title: "What shipped, what's next",
      description: "Weekly progress — what's in flight, what's at risk, what's coming.",
      note: "The first status update will appear here once the engagement is underway.",
    }),
  );

  startRouter(document.getElementById("main-content"));
}

boot();
