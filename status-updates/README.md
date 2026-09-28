# Status Updates

Weekly product updates — what shipped, what's in flight, what's at risk, what's next. The AI can read prior updates to keep narratives consistent and write new ones via the `status-update` skill.

## Naming

`YYYY-Www.md` for ISO weeks (e.g. `2026-W19.md`). Use `YYYY-MM-DD.md` for ad-hoc updates.

## Suggested structure

```markdown
# Product Update — Week of YYYY-MM-DD

## TL;DR
- One-sentence headline

## Shipped
- Item, link to Jira / PRD / launch notes

## In flight
- Initiative — owner — eta — % complete

## Metrics
- North-star + supporting metrics, deltas vs last week

## Risks / asks
- Risk — what would help

## Next week
- Top 3 priorities

## Links
- Roadmap, dashboards, key tickets
```

## How skills use this folder

- `status-update` writes new updates here, pulling from `context/team.md`, `context/okrs.md`, recent `sprint-summary` / `epic-summary` outputs, and any new files in `meeting-notes/`.
- `roadmap-review` and `impact-analysis` may scan recent updates to anchor their analysis.
- Older updates form your team's institutional memory — when an AI is asked "what did we ship last quarter?", it reads from here.
