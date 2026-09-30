// Workspace site configuration. The dashboard (index.html + site/) renders entirely from this file
// and the generated site/content-index.js, so there's no page code to edit for a new client.
//
// Ownership:
//   IDENTITY  - owned by /onboard-client (it fills the marker block, and re-fills it on re-runs).
//               Change it through /onboard-client so the engagement profile's change log stays right.
//   EVO       - written by /publish on the first publish.
//   the rest  - yours: section copy and order, the nav highlight, the deck nudge.
//
// After adding or renaming documents, run `node scripts/build-site-index.mjs`. /publish runs it for you.

// onboard-client:begin site-identity
// onboard-client:default
export const IDENTITY = {
  status: "initialized", // "initialized" | "onboarded"
  title: "{{REPO_NAME}}",
  brand: { mark: "EW", name: "Workspace", sub: "Not onboarded" },
  client: "",
  engagement: "",
  home: {
    headline: "where should we pick up?",
    description:
      "A Caylent engagement workspace, not yet fitted to a client. Run /onboard-client in Claude Code with the SOW or proposal attached.",
  },
  // Chips under the home headline, e.g. { label: "Level", value: "P1 · Claude Activation" }.
  glance: [],
  // Paragraphs for "About this workspace" in the Workspace guide.
  about: [
    "This is a Caylent forward-deployed engagement workspace, scaffolded by /initialize. It isn't fitted to a client yet.",
    "Once /onboard-client runs, this site shows the client, the engagement, and everything the team writes as the work goes on.",
  ],
};
// onboard-client:end site-identity

// Set by /publish on the first publish to Evo.
export const EVO = { slug: "", url: "" };

// One entry per sidebar section, in order. `folder` sections list every Markdown file in that folder
// (README.md excluded unless it's in `pinned`). `optional` sections appear only once their folder
// exists: the engagement-level overlays that /onboard-client adds. `sort: "newest"` lists
// date-named files newest first.
export const SECTIONS = [
  {
    id: "case-file", label: "Case File", icon: "folder", folder: "case-file",
    title: "The facts as given",
    description: "The SOW, the proposal, the company, and the people, before discovery adds anything.",
    tile: "Who they are, what was sold, who's in the room.",
    empty: "Empty until /onboard-client reads the SOW and proposal.",
  },
  {
    id: "discovery", label: "Discovery", icon: "compass", folder: "discovery",
    title: "Finding what the documents don't say",
    description: "Pain points, discovery questions, and the value charter. Anything unconfirmed is labeled hypothesis.",
    tile: "Pain points, questions, the value charter.",
    empty: "Seeded by /onboard-client, then built out with /genai-poc-strategy.",
  },
  {
    id: "research", label: "Research", icon: "file-text", folder: "research",
    title: "The point of view",
    description: "Full-prose strategy documents and the evidence behind the decks.",
    tile: "The thinking behind the decks.",
    empty: "No research documents yet.",
  },
  {
    id: "enablement", label: "Enablement", icon: "users", folder: "enablement", optional: true,
    title: "Getting the team using Claude",
    description: "Use cases, sessions, champions, and the adoption baseline.",
    tile: "Use cases, sessions, champions, adoption.",
    empty: "Nothing in enablement yet.",
  },
  {
    id: "build", label: "Build", icon: "wrench", folder: "build", optional: true,
    title: "The workflows we're automating",
    description: "Workflow specs, integrations, decisions, and evals. The code lives in its own repo.",
    tile: "Workflows, integrations, decisions, evals.",
    empty: "Nothing in build yet.",
  },
  {
    id: "service", label: "Service", icon: "activity", folder: "service", optional: true,
    title: "Running it as a service",
    description: "The service blueprint, operating model, governance, and how it's run and monitored.",
    tile: "Blueprint, operating model, governance, run.",
    empty: "Nothing in service yet.",
  },
  {
    id: "deliverables", label: "Deliverables", icon: "briefcase", folder: "deliverables",
    pinned: ["deliverables/README.md"],
    title: "What we hand over",
    description: "The SOW deliverables tracker, and each final artifact as it lands.",
    tile: "The SOW tracker and final artifacts.",
    empty: "No deliverables yet.",
  },
  {
    id: "presentations", label: "Presentations", icon: "monitor", kind: "decks",
    title: "The decks",
    description: "Plain HTML decks. Arrow keys move between slides, and every deck prints to PDF.",
    tile: "Every deck, full screen.",
    empty: "No decks yet. Run /presentation-builder to outline the first one.",
  },
  {
    id: "meeting-notes", label: "Meeting Notes", icon: "calendar", folder: "meeting-notes", sort: "newest",
    title: "Every conversation, written up",
    description: "Kickoffs, discovery sessions, working sessions, and steering committees.",
    tile: "Call recaps and working sessions.",
    empty: "Notes appear here after each meeting (/meeting-summary).",
  },
  {
    id: "status-updates", label: "Status Updates", icon: "list", folder: "status-updates", sort: "newest",
    title: "What landed, what's next",
    description: "Progress, risks, and asks, one update per reporting period.",
    tile: "Progress, risks, and asks.",
    empty: "The first status update lands after kickoff (/status-update).",
  },
];

// Highlight one sidebar item with a badge, e.g. { section: "presentations", badge: "Today" }.
export const NAV_HIGHLIGHT = null;

// Floating mascot nudge, e.g. { href: "#/deck/kickoff-deck", text: "Let me take you to the presentation" }.
export const NUDGE = null;
