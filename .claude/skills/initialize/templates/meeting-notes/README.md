# Meeting Notes

Structured notes from every engagement conversation: kickoffs, discovery interviews, working sessions, steering committees, internal account-team syncs. Drop a transcript here and let `/meeting-summary` produce the clean version, or save summaries from your meeting tool (Gong, Zoom AI, Granola, Claude desktop) directly.

## Naming

`YYYY-MM-DD-short-slug.md`, e.g. `2026-10-02-kickoff.md`.

Subfolders for recurring meetings are fine: `discovery/`, `steerco/`, `internal/`.

## Suggested structure

```markdown
# Meeting Title — YYYY-MM-DD

**Attendees:** …
**Type:** kickoff / discovery / working session / steerco / internal
**Recording / transcript:** _link_

## Decisions
- Decision — owner — date

## Action items
- [ ] _item_ — owner — due

## Client signal
- Quote (attributed), pain, or topic with a bullet summary

## Open questions
- …

## Links
- Tickets, docs, dashboards
```

## How skills use this folder

- `meeting-summary` writes summaries here from a transcript or rough notes.
- `meeting-prep` reads prior meetings on the same topic to surface unresolved threads and earlier decisions.
- `meeting-followup` extracts decisions and action items for the follow-up email and tickets.
- `discovery`, `interview-guide`, and `research-synthesis` read past client conversations so nobody asks the same question twice.
- After a meeting confirms or kills a `hypothesis — validate` item in `discovery/`, update that file and cite the meeting note.

## Hygiene

- Watch for client PII. Redact or use role names where appropriate.
- Link to full recordings and transcripts in the meeting tool rather than inlining them.
- Reuse the same slug for long-running threads so they're easy to follow.
