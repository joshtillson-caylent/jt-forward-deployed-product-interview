# jt-forward-deployed-product-interview

Josh Tillson's working repo for the final-round Caylent interview to move from Product Manager into the **Forward-Deployed Product Manager** practice. It simulates an AI-enablement engagement with **Meridian Capital Services** (the scenario brief's own example) and is meant to be opened every session — it holds the case file, the discovery work, the deliverables, the deck, and the live "AI setup" used in the interview's 8-minute demo.

## Quick links

- [Case File](case-file/README.md) — who they are, what happened, who I'm meeting
- [Discovery](discovery/README.md) — how I surface the pain they can't see
- [Research](research/README.md) — the point of view behind the deck
- [Deliverables](deliverables/README.md) — final engagement artifacts (empty for now)
- [Presentations](presentations/README.md) — the deck and the demo

## Open the landing page

```
open index.html
```

## Starting a new engagement from this repo

This repo is also the template for future engagement workspaces. Meridian is the worked example.

1. `/initialize ~/Documents/GitHub/<new-engagement>` scaffolds a new, client-agnostic workspace: the folder tree, README, CLAUDE.md, `.gitignore`, `.kanon`, the skill library, and a config-driven dashboard. It then offers to create the private GitHub repo and publish the dashboard to Evo. It works from any directory, because it's linked into `~/.claude/skills/`.
2. Open Claude Code in the new repo and run `/onboard-client` with the SOW, proposal, and any client context attached. It fits the repo and the dashboard to the client.
3. From then on, `/publish` commits, pushes, and republishes the dashboard.

What new workspaces get is controlled in `.claude/skills/initialize/`. See its `MANIFEST.md`.

## Repo layout

```
.claude/skills/      Claude Code skills — auto-discovered, each invocable as /<name>
.ai/tasks/            Task-planning documents for this repo's own build-out
context/              Role + engagement context Claude reads every session
prompts/, rules/      Supporting prompt library and quality checklist
case-file/            Facts as given (the brief)
discovery/            The motion to find more
research/             The point of view (the deck's source material)
deliverables/         Final engagement artifacts — intentionally empty for now
presentations/        The compressed artifact
meeting-notes/         Working folder for session notes (populated on demand)
status-updates/       Working folder for status updates (populated on demand)
site/                 Vanilla HTML/CSS/JS behind index.html (sidebar nav, dashboard)
index.html            The Evo landing page — opens to Home, not straight to a deck
```

## Where the brief lives

`case-file/scenario-brief.pdf`

## Status

Workspace scaffolded; discovery and deliverables drafted pre-kickoff (labeled `hypothesis — validate` where not yet confirmed); deck is a skeleton pending `/presentation-builder`.
