# Engagement Context

Persistent context Claude Code reads when running the skills under `.claude/skills/`. There are two kinds:

1. **Engagement context:** facts about *this* engagement that don't change often. `/onboard-client` writes these, and re-running it updates them.
2. **Role context:** how Claude should think when acting as the forward-deployed PM. This is generic and ships with every workspace.

## Files

| File | What it is | Written by |
|------|-----------|------------|
| `engagement-profile.md` | The canonical record: engagement level (P1–P3), industry, scope, deliverables, timeline, constraints, success criteria, sources, and a change log. Read it first. | `/initialize` (stub), then `/onboard-client` |
| `engagement-team.md` | Mission, people on both sides, stakeholders, ways of working, glossary, key links | `/initialize` (stub), then `/onboard-client` |
| `product-manager.md` | Role context: strategy, prioritization, stakeholder alignment | `/initialize` (generic) |

## How skills use these files

- Every engagement skill reads `engagement-profile.md` for scope and guardrails instead of re-asking.
- `discovery`, `interview-guide`: read `engagement-team.md` for who's involved and what's already known.
- `meeting-prep`, `presentation-builder`, `stakeholder-digest`: read `engagement-team.md` plus recent `meeting-notes/` and `status-updates/`.
- `status-update`, `meeting-summary`: write new entries grounded in this context.
- `genai-poc-strategy`: reads both files alongside `case-file/` for customer and contact essentials.

## Conventions

- Keep each file under ~300 lines. Use bullets and tables, not prose: Claude reads these, people rarely skim them.
- Update when reality changes, such as after the kickoff or a change order. Stale context is worse than none.
- Log every material change in the profile's change log with its source.
- No secrets, credentials, or rate cards here.
