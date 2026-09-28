# Engagement Context

Persistent context that Claude Code reads when running the skills under `.claude/skills/`. Two flavors live here:

1. **Role context** — how Claude should think when acting as the forward-deployed PM on this engagement.
2. **Engagement context** — facts about *this* engagement that don't change often.

## Files

| File | What it is |
|------|-----------|
| `product-manager.md` | Role context: strategy, prioritization, stakeholder alignment, roadmap ownership — carried over from Josh's personal AI Toolset as-is |
| `engagement-team.md` | Engagement context: the Meridian Capital Services mission, people, stakeholders, and ways of working |

## How skills consume this

Skills look here for ground truth they shouldn't try to infer:

- `discovery`, `interview-guide` — read `engagement-team.md` for who's involved and what's already known
- `meeting-prep`, `presentation-builder`, `stakeholder-digest` — read `engagement-team.md` and recent files in `meeting-notes/` and `status-updates/`
- `status-update`, `meeting-summary` — write new entries grounded in this context
- `genai-poc-strategy` — reads `engagement-team.md` alongside `case-file/` for customer/contact essentials, instead of asking for them fresh each run

## Conventions

- Keep each file under ~300 lines.
- Bullets and tables over prose — these files are read by Claude, not skim-read by humans.
- Update when reality changes (e.g. after the real kickoff call). Stale context is worse than none.
- No secrets. This is simulated scenario content, not real client data.
