# Initialize the Meridian Engagement Workspace

Date: 2026-09-28
Task slug: engagement-workspace-init
Status: Approved

## 0) Summary

- **Objective:** Stand up `jt-forward-deployed-product-interview` as Josh Tillson's working repo for the Caylent Forward-Deployed PM interview — the case file, discovery, deliverables, and a deck skeleton for the Meridian Capital Services scenario, plus a real, usable Claude Code tooling setup.
- **Why now:** Final-round interview requires a 5-8 slide deck and an 8-minute live AI demo of Josh's actual workflow; this repo is both the prep environment and the literal "AI setup" opened live in the demo.
- **Primary outcomes:** a scaffolded repo with case-file/discovery/deliverables/presentations content, a ported and reachable AI-toolkit skill set under `.claude/skills/`, a Caylent-styled Evo landing page, and a single well-organized initial commit.

---

## 1) Success criteria

- Repo tree matches the approved plan (`/Users/jtillson/.claude/plans/pasted-content-id-96a8-let-s-initialize-inherited-llama.md`)
- `.claude/skills/` skills are byte-identical to their AI Toolset source and auto-discoverable by Claude Code
- `index.html` renders standalone in a browser with working relative links
- CLAUDE.md is under ~200 lines and contains the no-AI-attribution rule
- Single initial commit, no `Co-Authored-By` trailer

**Acceptance criteria (definition of done):**
- Every path in the approved plan's directory tree exists with real (non-placeholder) content, except the deck's actual slide copy and the kanon/Evo-publish actions, which are explicitly out of scope (see below)

---

## 2) Scope and non-goals

**In scope:**
- Full repo scaffold: `.gitignore`, `.kanon`, `README.md`, `CLAUDE.md`, `index.html`, `.claude/skills/`, `.ai/tasks/`, `context/`, `prompts/`, `rules/`, `case-file/`, `discovery/`, `deliverables/`, `presentations/`, `meeting-notes/`, `status-updates/`
- Porting the relevant subset of Josh's personal AI Toolset (`~/Desktop/Pnmac/AI Toolset/product/`) into `.claude/skills/`, `context/`, `prompts/`, `rules/`
- Drafting case-file/discovery/deliverables content for the Meridian scenario, labeled `hypothesis — validate` where not confirmed by the brief
- A skeleton (not final content) for the kickoff deck
- A single initial git commit with no AI attribution

**Out of scope:**
- Actually running `kanon install` (mutates global `~/.claude/settings.json`; the catalog entry is also unconfirmed on `main`)
- Publishing `index.html` via `caylent_apps_publish` (external/shared side effect)
- Writing the kickoff deck's final slide content (depends on running `/presentation-builder` as a separate working session)
- Running `step-execution`/`step-loop` against this task's own steps — executed directly in one pass instead, per Josh's explicit instruction

---

## 3) Background and motivation

Josh is moving from Product Manager to Forward-Deployed Product Manager at Caylent (an Anthropic-facing internal consulting practice) and must complete a final-round interview: a 5-8 slide structured point of view plus a live 8-minute AI demo, evaluated on thinking and communication, not tool proficiency. He chose to build a real working repo — mirroring how he'd actually start a client engagement — rather than a static deliverable, using the brief's own example scenario (Meridian Capital Services) so the content is fully worked rather than invented.

---

## 4) Current state and gaps

### Current state
- Repo existed with only `.git` and a configured remote — zero commits, zero files
- Josh has a mature personal AI Toolset (`~/Desktop/Pnmac/AI Toolset/product/`) already in daily use, not yet adapted for this engagement
- A prior sibling repo, `pxe-hub`, exists as a structural and visual-styling reference (Caylent-built, Evo-published)

### Gaps
- No case file, discovery, or deliverable content existed for the Meridian scenario before this task
- Josh's AI Toolset command files had drifted from their own SKILL.md sources (duplicated content, stale sub-paths) — not worth porting as-is
- The Kanon-published `product-skills` package was found to be stale and its catalog entry unconfirmed on `main`

---

## 5) Changes and considerations

**Key deliverables:**
- `.claude/skills/` — 12 ported skills (discovery, genai-poc-strategy, interview-guide, presentation-builder, stakeholder-digest, meeting-prep, meeting-summary, meeting-followup, research-synthesis, status-update, week-ahead, task-planning-and-execution) — this is what makes the repo a genuine "AI setup," not a decorative folder structure
- `case-file/`, `discovery/`, `deliverables/` — the actual worked content backing the deck's four required topics
- `index.html` — the Evo-publishable landing page, styled to Caylent's actual internal-app conventions (via `pxe-hub`), not Josh's personal-site branding
- This task-planning doc set — a reference record of how the repo was built, per Josh's explicit request

**Impact and considerations:**
- Single stakeholder (Josh) — no cross-team rollout or communication plan needed
- Every AI Toolset skill folder ported must remain byte-identical to its source so future updates to Josh's real toolkit can be diffed/synced later if he chooses to

---

## 6) Constraints, assumptions, dependencies

**Constraints:**
- CLAUDE.md must stay under ~200 lines per Anthropic's own documented guidance
- No AI co-author attribution in any commit in this repo (Josh's explicit instruction, matching his `pxe-hub` convention)

**Assumptions:**
- The brief's example scenario (Meridian Capital Services) is the scenario Josh will actually present, not a placeholder to be swapped later
- Claude Code's current skill-discovery mechanism (auto-discovery from `.claude/skills/`, no marketplace/plugin needed) is accurately documented at `code.claude.com/docs/en/skills.md` as of this session

**Dependencies (ordered):**
- Repo skeleton must exist before any content is written into it
- AI Toolset skills must be ported before CLAUDE.md can correctly describe them
- `case-file/` and `discovery/` content must exist before `deliverables/` can cite it
- `deliverables/` and `discovery/discovery-session-design.md` must exist before the presentation skeleton can reference them meaningfully

---

## 7) Requirements

**Functional requirements:**
- Every skill folder under `.claude/skills/` must be a faithful, complete copy of its AI Toolset source (all supporting files, not just SKILL.md)
- `index.html` must render correctly opened directly from disk (`file://`), with no build step and no broken relative links
- `.kanon` must be syntactically valid per the KEY=VALUE convention already confirmed working elsewhere on this machine

**Non-functional requirements:**
- All content must clearly distinguish cited fact (`[Source: scenario-brief.pdf]`) from inference (`hypothesis — validate`)
- Visual styling of `index.html` and the deck skeleton must match `pxe-hub`'s actual Caylent design tokens, not an invented or personal palette

---

## 8) Proposed approach

- Scaffold directories and `.gitignore` first
- Port the AI Toolset skill/context/prompt/rule subset verbatim via direct file copy (preserves fidelity better than re-authoring)
- Write `.kanon` with the confirmed-safe repo-scoped values, flagging the branch caveat in CLAUDE.md rather than resolving it silently
- Draft case-file → discovery → deliverables → presentations in that dependency order, so each stage can cite the one before it
- Build `index.html` last among the content (after the folders it links to exist) using tokens read directly from `pxe-hub`'s `tailwind.config.ts` / `src/index.css` / a card component
- Write README.md and CLAUDE.md once the real structure exists, so they describe what's actually there rather than what's planned
- Produce this task-planning doc set and commit everything in one pass

---

## 10) Stakeholder impact

### Leadership
- The interview panel is the ultimate audience for the deck and demo this repo supports, but has no direct stakeholder role in this scaffolding task itself.

---

## 11) Edge cases and risks

- **Kanon catalog entry unresolved on `main`:** documented in CLAUDE.md and the plan itself; `.kanon` is written but `kanon install` is explicitly not run.
- **AI Toolset drift (command files vs. SKILL.md):** resolved by not porting the command files at all — Claude Code's current skill mechanism makes them redundant.
- **`pxe-hub-toolkit:build-presentation-deck` looked like the obvious tool for the deck skeleton but is hard-wired to pxe-hub's own repo/PR flow:** confirmed by reading its SKILL.md directly; used `presentation-builder` (from the AI Toolset) as the actual narrative-planning tool instead, with the HTML skeleton hand-built.

---

## 13) Research and references

- `code.claude.com/docs/en/skills.md`, `.../memory.md`, `.../best-practices.md`, `.../large-codebases.md` — Anthropic's official Claude Code documentation, confirming the merged skills/commands mechanism and the ~200-line CLAUDE.md guidance
- `pxe-hub` repo (`tailwind.config.ts`, `src/index.css`, `CatchMeUpCard.tsx`) — Caylent's actual internal-app visual design tokens
- `~/Desktop/Pnmac/AI Toolset/product/` — Josh's personal AI Toolset, the source for all ported skills/context/prompts/rules
- `case-file/scenario-brief.pdf` — the interview's scenario brief, the source of all Meridian Capital Services facts

---

## 14) Open questions

- Should Josh later confirm a "Claude Activation Catalyst" (or similarly named) formal Caylent offering exists for this engagement shape, CLAUDE.md and the deck's framing may be worth revisiting against that material — this is a genuine open question because the EVO/GCM research thread that could have resolved it was intentionally stopped before reaching a conclusion, not because the research wasn't attempted.
