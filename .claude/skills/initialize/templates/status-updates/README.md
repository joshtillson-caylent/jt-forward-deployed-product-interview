# Status Updates

Engagement status updates: what landed, what's in flight, what's at risk, what's next. `/status-update` writes new ones here and reads prior ones so the narrative stays consistent. `/stakeholder-digest` tunes the same signal for a specific audience (sponsor, steerco, account team).

## Naming

`YYYY-Www.md` for ISO weeks (e.g. `2026-W40.md`). Use `YYYY-MM-DD.md` for ad-hoc updates.

## Suggested structure

```markdown
# Engagement Update — Week of YYYY-MM-DD

## TL;DR
- One-sentence headline

## Landed
- Deliverable or milestone, with a link (see deliverables/README.md tracker)

## In flight
- Workstream — owner — eta — % complete

## Metrics
- Success-criteria metrics from context/engagement-profile.md, deltas vs last update

## Risks / asks
- Risk — what would help — who we need it from

## Next week
- Top 3 priorities
```

## How skills use this folder

- `status-update` writes new updates here, pulling from `context/engagement-profile.md`, `context/engagement-team.md`, the deliverables tracker, and recent `meeting-notes/`.
- `stakeholder-digest` and `meeting-prep` scan recent updates to anchor what they write.
- Older updates are the engagement's memory. When someone asks "what did we land in week 2?", Claude reads from here.
