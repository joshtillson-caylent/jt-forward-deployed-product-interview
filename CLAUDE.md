# CLAUDE.md

This repo is a simulated client engagement workspace, not a product codebase. It's Josh Tillson's prep for a Caylent internal interview (Product Manager → Forward-Deployed Product Manager) and doubles as the live "AI setup" used in that interview's demo. Treat every session as continuing work on the same engagement below.

## The scenario, in brief

**Meridian Capital Services** — PE-backed investment management firm, $195M revenue, 380 employees, acquired 11 months ago under a board-level "AI-enabled operations" mandate. FP&A team of 8 analysts bought Claude enterprise licenses 6 months ago; adoption since has been near zero. The team isn't resistant, just uncertain where a chat tool fits "numbers-based" work that "requires judgment." **David Okafor**, Director of FP&A, hired Caylent because he doesn't have the bandwidth to figure this out alone; there's a kickoff call with him and two analysts. Full detail: `case-file/`.

## Directory map — what belongs where

- `case-file/` — facts as given (the brief). Don't add speculation here; that goes in `discovery/`.
- `discovery/` — the motion to find more: pain points, discovery questions, the value charter, and the session design. Everything not cited to `case-file/scenario-brief.pdf` is labeled `hypothesis — validate` until a real conversation confirms it — keep that labeling discipline when adding to these files.
- `research/` — the point of view: full-prose strategy documents and supporting evidence that back the deck. This is where the thinking happens.
- `deliverables/` — final, major engagement artifacts (a new toolkit, a prompt ROI analysis, etc.), as distinct from the research prep behind them. Intentionally empty until the engagement produces one.
- `presentations/` — the compressed artifact. One folder per deck (`registry.md` lists them), plain HTML, no build step.
- `.claude/skills/`, `context/`, `prompts/`, `rules/` — the tooling (below).
- `.ai/tasks/` — task-planning documents for this repo's own build-out (see "Task planning" below).
- `meeting-notes/`, `status-updates/` — working folders, populated on demand as the engagement progresses.
- `site/` — the vanilla HTML/CSS/JS behind the root `index.html` landing page/dashboard (sidebar nav, Evo-identity greeting, section pages). No build step, styled to match pxe-hub's layout. See `site/README.md`.

## Tooling

Skills under `.claude/skills/` are auto-discovered by Claude Code and each is directly invocable as `/<name>` — there's no separate command-file layer. Reach for:

- `genai-poc-strategy` — the engagement lifecycle orchestrator (Align → Assess → Design). **Redirect its output**: it defaults to writing `.ai/engagements/<customer-slug>/...`; for this repo, write Align outputs into `discovery/align/`, Assess/Design outputs into `research/`, and the Phase 0 brief into `case-file/00-engagement-brief.md` instead. Reserve `deliverables/` for final, major artifacts only — not this lifecycle's working drafts.
- `discovery` — for any specific problem/solution decision that needs its own go/no-go. It also defaults to `.ai/engagements/...` or `context/discovery/...` — redirect the same way, into `discovery/`.
- `presentation-builder` — to lock a deck's narrative arc into its `outline.md` before writing slide HTML.
- `interview-guide`, `stakeholder-digest`, `meeting-prep`, `meeting-summary`, `meeting-followup`, `research-synthesis`, `status-update`, `week-ahead` — used as-is, no redirection needed.
- `task-planning-and-execution/{task-planning, step-execution, step-loop}` — available for any future multi-step initiative in this repo. **Do not use `step-execution`/`step-loop` to drive the repo's own build-out** — that was done as a single direct pass (see "Task planning" below).
- The already-installed `cce-capabilities:*` plugin skills (stakeholder-map, discovery-question-generator, value-charter-workshop-design, etc.) — use as sharper point-tools for individual artifacts inside the `genai-poc-strategy` lifecycle, not as a replacement for it.
- `pxe-hub-toolkit:build-presentation-deck` is **not usable in this repo** — it's hard-wired to pxe-hub's own React app and PR flow.
- `stop-slop` (vendored from [hardikpandya/stop-slop](https://github.com/hardikpandya/stop-slop), MIT) — strips AI writing tells (filler phrases, formulaic contrasts, passive voice). Run `/stop-slop` over any substantial new prose written for the site (`index.html` / `site/` — headlines, empty-state copy, card descriptions) before publishing it. Not needed for terse UI labels or internal working notes.

## Task planning

`.ai/tasks/2026-09-28/engagement-workspace-init/` documents this repo's own initial build-out, using the `task-planning` skill's template shapes, for reference. They are a record, not a mechanism — don't re-invoke `step-execution`/`step-loop` against them; if picking this work back up, just execute directly against the plan and update step statuses as completed.

## Kanon

A `.kanon` manifest at repo root points at a Caylent-published `product-skills` package, but that package is a **stale, older cut** of several skills already ported locally into `.claude/skills/` — confirmed by diff. This repo's local `.claude/skills/` is the source of truth, not the Kanon install. **Do not run `kanon install`** without asking first — it mutates global `~/.claude/settings.json`, and the catalog path in `.kanon` currently only resolves on an unmerged branch, not `main`.

## Git conventions

**Do not add `Co-Authored-By: Claude` or any AI attribution line to commits in this repo** — this overrides the default Claude Code attribution behavior specifically for this repo, matching Josh's convention in `pxe-hub`.

## What not to do automatically

- Don't run `kanon install` (see above) or `caylent_apps_publish` (publishing the landing page to Evo) without explicit go-ahead — both have effects outside this repo.
