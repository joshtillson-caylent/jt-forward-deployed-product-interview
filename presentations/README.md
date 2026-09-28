# Presentations

The compressed artifact — one folder per deck. Lightweight by design: this engagement needs one 5-8 slide deck, not a growing multi-deck catalog, so there's no build pipeline here, just a hand-maintained registry and plain HTML per deck (consistent with the landing page's own no-build-step approach).

## Pattern

- One folder per deck: `presentations/<slug>/`
- Each deck folder has a `README.md` (purpose, presenter, audience, status), an `outline.md` (the narrative arc — key message per slide, produced by the `presentation-builder` skill), and an `index.html` (the actual slides — plain HTML/CSS, keyboard-navigable, print-to-PDF friendly)
- Add a row to `registry.md` for every deck

## Filling in a deck's real content

1. Run `/presentation-builder` to lock the narrative arc (hook → context → 3-5 core messages → evidence → ask) into that deck's `outline.md`.
2. Write the actual slide markup into `index.html` by hand/Claude, styled against this repo's shared design tokens (see `index.html` at the repo root for the palette).

(`pxe-hub-toolkit:build-presentation-deck` is not usable here — it's hard-wired to pxe-hub's own React components and PR flow.)
