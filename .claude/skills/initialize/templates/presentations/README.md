# Presentations

The compressed artifact, one folder per deck. No build pipeline: a hand-maintained registry and plain HTML per deck.

## Pattern

- One folder per deck: `presentations/<slug>/`
- Each deck folder has a `README.md` (purpose, presenter, audience, status), an `outline.md` (the narrative arc, one key message per slide, produced by `/presentation-builder`), and an `index.html` (the slides: plain HTML/CSS, keyboard-navigable, print-to-PDF friendly)
- Add a row to `registry.md` for every deck

## Building a deck

1. Run `/presentation-builder` to lock the narrative arc (hook → context → 3-5 core messages → evidence → ask) into the deck's `outline.md`.
2. Write the slide markup into `index.html`, one section per outline entry.
3. Run `/stop-slop` over the slide copy before it goes in front of the client.

(`pxe-hub-toolkit:build-presentation-deck` doesn't work here. It's hard-wired to pxe-hub's own React components and PR flow.)
