# Meeting Notes

AI-generated meeting summaries and structured notes — discovery interviews, customer calls, planning sessions, design reviews, executive updates. Drop a transcript here and let the `meeting-summary` skill produce a clean version, or save AI summaries from your meeting tool (Otter, Zoom AI, Granola, Claude desktop, etc.) directly.

## Naming

`YYYY-MM-DD-short-slug.md`, e.g. `2026-05-08-discovery-acme-corp.md`.

Optional subfolders for recurring meetings: `discovery/`, `1-1s/`, `planning/`, `exec/`.

## Suggested structure

```markdown
# Meeting Title — YYYY-MM-DD

**Attendees:** …
**Type:** discovery / planning / 1:1 / customer / exec
**Recording / transcript:** _link_

## Decisions
- Decision — owner — date

## Action items
- [ ] _item_ — owner — due

## Customer / discussion notes
- Quote, signal, or topic with bullet summary

## Open questions
- …

## Links
- Tickets, PRDs, Confluence pages, dashboards
```

## How skills use this folder

- `meeting-summary` writes summaries here from a transcript or rough notes.
- `meeting-prep` reads prior meetings on the same topic to surface unresolved threads and prior decisions.
- `discovery` and `interview-guide` reference past customer interviews to avoid asking the same questions twice.
- `prd-review` and `requirements-validation` can pull supporting evidence from interview notes.
- Action items here are durable — AI assistants will pick them up when asked "what's outstanding from last week's planning?"

## Hygiene

- Watch out for customer PII — redact names or use customer codes if appropriate.
- Recordings and full transcripts often live in your meeting tool; link to them rather than inlining.
- Tag long-running threads with the same slug to make them easier to follow.
