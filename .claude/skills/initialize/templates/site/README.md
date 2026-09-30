# site/

The workspace dashboard behind the root `index.html`: a small hash-routed, vanilla HTML/CSS/JS site in the pxe-hub layout (left sidebar, signed-in Evo user, time-of-day greeting). No npm and no bundler for local use. Publishing to Evo is one script, which `/publish` runs.

**It renders entirely from configuration.** A new client needs a config change, not a code change.

| File | Owned by | What it is |
|---|---|---|
| `workspace.config.js` | `/onboard-client` (IDENTITY block), `/publish` (EVO), you (the rest) | Who the client is, the home copy, the sidebar sections, the nav highlight, the deck nudge |
| `content-index.js` | generated | Every document and deck the site lists. Built by `node scripts/build-site-index.mjs` from the section folders and `presentations/registry.md`. Never edit it by hand. |
| `app.js`, `router.js`, `nav.js`, `sections.js` | template | Boot, hash routing, sidebar, section visibility |
| `views/` | template | `home`, `library` (a section's docs), `doc` (the in-app Markdown reader), `presentations`, `deck` (full-screen iframe) |
| `help.js` | template | The Workspace guide modal. Its skill list mirrors `.claude/skills/`. |
| `evo.js`, `util.js`, `icons.js`, `widget.js`, `styles.css`, `assets/` | template | Evo identity, helpers, icons, the mascot nudge, design tokens |

## Common changes

- **A new document shows up** after `node scripts/build-site-index.mjs`. Its card takes the title from the doc's first `# ` heading and the description from its first plain paragraph, so write those well.
- **A new deck:** add a row to `presentations/registry.md` and put the deck at `presentations/<slug>/index.html`. The deck's back button should `postMessage({ type: "workspace:deck-back" }, "*")` to its parent.
- **Section copy or order:** edit `SECTIONS` in `workspace.config.js`.
- **Point people at something:** set `NAV_HIGHLIGHT` (a sidebar badge) or `NUDGE` (the floating mascot).
- **Engagement-level folders** (`enablement/`, `build/`, `service/`) appear in the sidebar automatically once `/onboard-client` creates them.

## Viewing locally

Serve the repo over HTTP so the doc reader can fetch Markdown: `python3 -m http.server` from the repo root, then open `http://localhost:8000`. Opening `index.html` straight from disk works for everything except documents.

## Publishing to Evo

Run `/publish`. It commits, pushes, rebuilds, and publishes, after one confirmation. By hand:

1. `node scripts/build-evo.mjs` writes `dist/evo/index.html` (gitignored). It inlines the styles and every module, embeds the indexed Markdown and every registered deck, and turns relative `.png`/`.jpg` references into data URIs. Evo's CSP blocks separate script files, and Evo doesn't serve nested asset paths, so everything has to be self-contained.
2. `caylent_apps_publish` with the slug in `workspace.config.js` (`EVO.slug`), listing only `index.html` (`text/html`).
3. `curl -X PUT -H "Content-Type: text/html" --upload-file dist/evo/index.html "<upload url>"`.
