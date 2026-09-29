# site/

The front-end behind the root `index.html` — a small hash-routed, vanilla HTML/CSS/JS dashboard styled to match [pxe-hub](https://app.evo.caylent.com/apps/pxe-hub)'s layout: a left sidebar with nav + a signed-in user badge, and a time-of-day greeting on Home. No npm, no bundler, no build step — same convention as `presentations/`.

## Files

- `styles.css` — design tokens (colors, radii, shadows) and layout, copied from pxe-hub's own token values for visual parity.
- `app.js` — entry point: fetches the signed-in user from Evo, renders the sidebar, registers routes, starts the router.
- `router.js` — a ~20-line hash router (`#/path` -> render function).
- `nav.js` — sidebar markup: nav items, brand mark, user badge.
- `evo.js` — thin wrapper over `window.evo` (the Evo SDK script tag in `index.html`) for reading the signed-in user's identity, which Evo resolves against Active Directory on its end. Falls back to a generic "Guest" state when the SDK isn't present, e.g. opening `index.html` outside an Evo session.
- `icons.js` — small inline-SVG icon set (lucide-style) so the nav doesn't need an icon library.
- `util.js` — shared helpers (HTML escaping, initials, time-of-day greeting).
- `views/` — one render function per route. `home.js` and `placeholder.js` are generic; `deliverables.js` and `presentations.js` are the two sections with real content today (see root `index.html` for why).

## Adding a page

1. Add the nav entry to `NAV_ITEMS` in `nav.js` (path, label, icon key from `icons.js`).
2. Add a `views/<name>.js` render function, or reuse `renderPlaceholder` for an empty stub.
3. Register the route in `app.js`.

## Content policy

Per the repo's `stop-slop` skill (see root `CLAUDE.md`), run any substantial new prose written for this site — headlines, empty-state copy, card descriptions — through `/stop-slop` before publishing it.
