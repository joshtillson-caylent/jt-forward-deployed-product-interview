---
name: status-update
description: Generate a weekly product status update grounded in team context, sprint/epic progress, and meeting notes. Saves to status-updates/.
---

# Status Update (Product)

Produce a clean weekly product status update and save it to `status-updates/`. Pulls from the local "second brain" so the user doesn't have to retype context that's already on disk.

## Inputs the skill should pull from

Before drafting, gather context in this order — only ask the user for things not already available.

1. **`context/team.md`** — team mission, stakeholders, ways of working
2. **`context/okrs.md`** (if present) — current quarter's goals and metrics
3. **Last status update in `status-updates/`** — for narrative continuity
4. **Latest `sprint-summary` or `epic-summary` output** — progress, risks, scope changes
5. **`meeting-notes/`** — new files since the last update for decisions and customer signal
6. **User input** — metric deltas, exec asks, customer signals not yet captured

## Workflow

### Phase 1: Confirm scope

- Confirm the week, audience (team-internal vs exec vs all-company), and length target.
- Identify the previous update file by name; skip the continuity section if none exists.

### Phase 2: Draft

Use this structure (drop sections that are empty rather than padding):

```markdown
# Product Update — Week of YYYY-MM-DD

## TL;DR
One sentence.

## Shipped
- Item — link

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

### Phase 3: Review and save

1. Show the draft.
2. After confirmation, save to `status-updates/YYYY-Www.md` (ISO week).
3. Return the path and a brief summary of what was written.

## Guardrails

- Don't fabricate metrics. If a number isn't in inputs, ask or omit.
- Don't restate items already marked as shipped in the previous update.
- Match tone to audience — exec updates are tighter; team-internal can be more casual.
- Don't post to Slack / Confluence unless the user explicitly asks.

## Output

- New file at `status-updates/YYYY-Www.md`
- Brief summary of what was pulled in and what was inferred vs confirmed
