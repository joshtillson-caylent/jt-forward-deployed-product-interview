---
name: meeting-summary
description: Turn a meeting transcript or rough notes into a structured summary saved to meeting-notes/. Captures decisions, action items, and customer signal.
---

# Meeting Summary

Take a transcript, recording, or rough notes from a product meeting (discovery interview, customer call, planning session, design review, exec sync) and produce a clean, structured summary saved to `meeting-notes/`.

## Inputs

- A transcript, raw notes, or AI-generated rough summary (Otter, Zoom AI, Granola, Claude desktop, etc.)
- Meeting title, date, type (discovery / planning / 1:1 / customer / exec / design review)
- Attendees (if not in the transcript)
- Optional: link to recording, related tickets, PRDs, customer codes

If a transcript is long, summarize in passes — first decisions, then action items, then discussion — rather than one mega-pass.

## Optional MCP integrations

- **Google Drive** — if the user provides a Drive URL (transcript, notes doc), read it directly instead of asking them to paste content. Pull the body in batches if it's long.
- **Google Calendar** — if the user references a Calendar event, pull title / date / attendees / linked doc instead of asking.
- **Atlassian** — for routing (Phase 4), check that referenced Jira keys actually exist before suggesting comment / update; surface broken links rather than letting them sit in the saved note.

Gracefully degrade: if no MCPs are connected, run as today — user pastes content.

## Workflow

### Phase 1: Confirm metadata

- Title, date (default today), type, attendees, recording link.
- Pick a slug for the filename: `YYYY-MM-DD-<short-slug>.md`.
- Check `meeting-notes/` for prior files on the same topic — link them in "Related".

### Phase 2: Extract

- **Decisions** — what, by whom, when. One line each.
- **Action items** — checkbox format, owner, due date.
- **Customer / discussion notes** — grouped by topic, bullet summaries, no transcript verbatim. For customer calls, capture quotes and signals (jobs-to-be-done language, friction points, willingness-to-pay).
- **Open questions** — anything raised but unresolved.
- **Links** — tickets, PRDs, dashboards.

### Phase 3: Draft

```markdown
# <Title> — YYYY-MM-DD

**Attendees:** …
**Type:** …
**Recording / transcript:** _link or n/a_

## Decisions
- …

## Action items
- [ ] _item_ — owner — due

## Customer / discussion notes
- Topic — bullets, quotes for customer calls

## Open questions
- …

## Links
- …

## Related
- prior meeting note(s) on the same topic
```

### Phase 4: Review and save

1. Show the draft.
2. After confirmation, save to `meeting-notes/YYYY-MM-DD-<slug>.md`.
3. If action items map to existing skills, offer routing (do not act without confirmation):
   - "Create Jira stories for these" → `jira-story-creation`
   - "Update existing tickets" → `ticket-update`
   - "Add comments to these issues" → `ticket-comment`
   - "Publish a write-up" → `confluence-page`

## Guardrails

- Don't include verbatim transcript content. Paraphrase tightly.
- For customer calls, anonymize where appropriate (use customer codes vs names).
- Redact obviously sensitive content (PII, comp, contracts) and flag the redaction.
- Don't fabricate attendees, decisions, or owners. If unclear, mark as unknown.
- Don't push to Confluence / Slack — this skill writes to disk only.

## Output

- New file at `meeting-notes/YYYY-MM-DD-<slug>.md`
- A one-line summary of decisions and action items
- Optional follow-up suggestions (route action items to other skills)
