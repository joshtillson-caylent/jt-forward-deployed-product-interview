# site/

The front-end behind the root `index.html` — a small hash-routed, vanilla HTML/CSS/JS dashboard styled to match [pxe-hub](https://app.evo.caylent.com/apps/pxe-hub)'s layout: a left sidebar with nav + a signed-in user badge, and a time-of-day greeting on Home. No npm and no bundler for local use, the same convention as `presentations/`. Publishing to Evo runs one script (below).

## Files

- `styles.css` — design tokens (colors, radii, shadows) and layout, copied from pxe-hub's own token values for visual parity.
- `app.js` — entry point: renders the sidebar and routes as a guest right away, then re-renders once Evo returns the signed-in user.
- `router.js` — a small hash router (`#/path` -> render function; prefix routes like `#/doc/<path>`).
- `nav.js` — sidebar markup: nav items, brand mark, user badge.
- `evo.js` — thin wrapper over `window.evo` (the Evo SDK script tag in `index.html`) for reading the signed-in user's identity, which Evo resolves against Active Directory on its end. Falls back to a generic "Guest" state when the SDK isn't present, e.g. opening `index.html` outside an Evo session.
- `icons.js` — small inline-SVG icon set (lucide-style) so the nav doesn't need an icon library.
- `util.js` — shared helpers (HTML escaping, initials, time-of-day greeting).
- `views/` — one render function per route. `library.js` lists a section's docs (Case File, Discovery), `deliverables.js` and `presentations.js` list theirs, `doc.js` renders any repo Markdown file in-app (`#/doc/<path>`), and `deck.js` opens the kickoff deck full-screen (`#/deck`). `placeholder.js` covers the empty sections.

## Adding a page

1. Add the nav entry to `NAV_ITEMS` in `nav.js` (path, label, icon key from `icons.js`).
2. Add a `views/<name>.js` render function, or reuse `renderPlaceholder` for an empty stub.
3. Register the route in `app.js`.

## Content policy

Per the repo's `stop-slop` skill (see root `CLAUDE.md`), run any substantial new prose written for this site — headlines, empty-state copy, card descriptions — through `/stop-slop` before publishing it.

## Publishing to Evo

Evo's CSP only allows scripts from `https://app.evo.caylent.com/sdk/` plus inline scripts. If you publish `site/*.js` as separate files, Evo blocks them and the page loads blank. Publish the single-file bundle instead:

1. `node scripts/build-evo.mjs` writes `dist/evo/index.html` (gitignored). It inlines `styles.css` and every module, and embeds the case-file, discovery, and deliverables Markdown plus the kickoff deck.
2. `caylent_apps_publish` with slug `meridian-engagement-workspace`, listing only `index.html` (`text/html`), then `curl -X PUT` the file to the returned URL.
3. Get Josh's go-ahead first (root `CLAUDE.md`).

Locally, serve the repo over HTTP (`python3 -m http.server`) so the doc reader can fetch Markdown. Opening `index.html` from disk works for everything except in-app docs.
