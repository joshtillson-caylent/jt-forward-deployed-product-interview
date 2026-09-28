---
name: meeting-followup
description: After a meeting, pull the Calendar event + linked notes/transcripts, extract decisions and action items, then draft the follow-up email and Jira tickets. Confirms everything before sending or creating.
---

# Meeting Followup

The meeting just ended. Pull the Calendar event, any meeting notes already on disk (`meeting-notes/`), and the transcript / agenda doc (Drive), then produce three artifacts:

1. A **follow-up email** to attendees with decisions + action items
2. **Jira tickets** (or ticket comments) for each action item that needs tracking
3. An optional **Confluence / `meeting-notes/` update** if the decisions deserve durable capture

Each artifact is drafted and confirmed before any external write. This skill is allowed to send, file, and update — that's the whole point — but it never does so without explicit user sign-off on the diff.

## Prerequisites

1. **Google Calendar MCP** — to fetch event details, attendees, linked docs.
2. **Google Drive MCP** (optional but common) — to read the linked agenda / transcript.
3. **Gmail MCP** (required if sending the follow-up email) — to draft and send.
4. **Atlassian MCP** (required if creating Jira tickets) — see `jira-story-creation`, `ticket-comment`.

The skill should run even when some of these aren't connected — gracefully skip the artifacts that depend on missing MCPs and tell the user what was skipped.

5. **Meeting identifier** — Calendar event URL/ID, or a `meeting-notes/` filename, or a date + title.

> **Context Management:** Don't pull the full transcript into the conversation. Pull it into the skill's own working memory, extract the structured signals (decisions, actions, open questions), and discard the verbatim content.

## Workflow

### Phase 1: Locate the meeting

Given the user's reference, resolve:

- Calendar event (start time, attendees, organizer, linked docs, recording URL)
- Any `meeting-notes/YYYY-MM-DD-<slug>.md` already saved (often from `meeting-summary`)
- Any agenda or transcript doc in Drive (look at the event's attachments + the description's links)

If multiple plausible matches, list them and ask which one. If nothing found, ask the user for the title + date and try again.

### Phase 2: Extract

From whatever sources are available, extract:

- **Decisions** — what was decided, by whom, scope (which sprint / release / launch)
- **Action items** — owner, action, due date, blocked-by
- **Open questions** — things raised but not resolved
- **Risks / asks** — anything the team needs from outside the room
- **Customer signal** (if discovery / customer call) — pain points, quotes, willingness-to-pay

If `meeting-notes/` already has a structured summary, use it directly. If only the transcript exists, extract these — but cap the extraction batch (e.g., 30 minutes of transcript per pass).

### Phase 3: Draft the follow-up email

Default structure (terse — exec time is expensive):

```markdown
Subject: <Meeting title> — decisions + next steps (YYYY-MM-DD)

Hi all,

Quick recap from <meeting title> on <date>:

**Decisions**
- <decision 1>
- <decision 2>

**Action items**
- @<owner> — <action> — by <date>
- @<owner> — <action> — by <date>

**Open questions** (we'll close async)
- <question> — owner: @<name>

Recording: <link if exists>
Notes: <link to meeting-notes file or Confluence>

Reply with corrections by <EOD tomorrow>; otherwise we'll treat the above as agreed.

Thanks,
<sender>
```

Adjust tone (more / less formal) based on attendees and meeting type. For customer-facing emails, drop internal jargon and check that nothing internal-only sneaks in.

### Phase 4: Draft the Jira tickets

For each action item that warrants a ticket (not every action — only ones with non-trivial scope or owned by someone who tracks work in Jira):

- Decide: new story / task vs. comment on an existing ticket
- For **new**: use the `jira-story-creation` patterns — summary, description (with the meeting + decision as context), owner, sprint, labels
- For **existing**: use `ticket-comment` to add the decision / new action; or `ticket-update` if it changes scope or status

Present a **table** of proposed tickets so the user can approve or trim before any write:

| # | Action | Owner | Type | Target | Notes |
|---|---|---|---|---|---|
| 1 | Investigate auth latency | @pat | Bug → new | PROJ | from decision: "we'll spike on auth before sprint planning" |
| 2 | Update PRD with revised scope | @sam | Comment | PROJ-1234 | append decision |

### Phase 5: Confirm

Show:

- Email draft (full body, recipients, subject)
- Jira table with each row marked create / comment / update
- Optional: a `meeting-notes/` update diff or Confluence page draft

Pause for explicit go-ahead. The user can edit inline; re-show after edits.

### Phase 6: Execute

Only after confirmation:

1. **Gmail** — send the email (use the draft tool first if the user prefers to send themselves) and report the message ID + thread URL
2. **Jira** — create / comment in the order shown in the table, report each result inline; if a write fails, stop and surface the error rather than continuing blindly
3. **`meeting-notes/` or Confluence** — only update / create when explicitly approved

### Phase 7: Verify and report

Return:

- Email status (sent / drafted / skipped) + thread URL
- Each Jira ticket key + URL + create-or-comment status
- File updates (`meeting-notes/` path, Confluence URL)
- Anything that was skipped because the MCP wasn't connected

## Guardrails

- **Never send the email without explicit "send it" confirmation.** A "looks good" on the draft is approval to send only if the user already said they want it sent — otherwise leave it as a Gmail draft.
- **Recipient sanity check.** If the recipient list contains external domains and the meeting had any `[Confidential]` / `[Internal]` markers, flag and confirm.
- **No bulk Jira creation past 10 tickets without re-confirmation.** Long lists are usually a sign that the meeting extraction over-fired.
- **Don't fabricate owners or dates.** If "Sam takes the next step" is in the notes but Sam wasn't tagged with an action, mark it as `owner: TBD` and ask.
- **Customer signal stays inside.** For discovery / customer calls, don't forward verbatim quotes externally without confirmation; paraphrase or anonymize per `meeting-summary` conventions.

## Output

- Email status + thread URL
- Jira ticket table with keys + URLs
- File / page updates
- Skipped artifacts (with reason)
- One-line suggestion for the next follow-up step (e.g., "the customer quote in this meeting belongs in `research-synthesis`")
