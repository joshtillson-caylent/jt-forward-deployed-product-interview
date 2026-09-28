---
name: week-ahead
description: Pull the upcoming week (or N days) from Google Calendar, group meetings by type, flag prep gaps, and produce a Monday-morning prep plan grounded in team context and prior meeting notes.
---

# Week Ahead

Monday-morning ritual. Pull the upcoming calendar window from the Google Calendar MCP, group meetings by type, flag the ones that need prep, and produce a prioritized prep plan that's grounded in `context/`, `status-updates/`, and `meeting-notes/`.

The goal is not to surface every meeting — it's to call out the ~5 things that need real preparation and the ~3 that should be rescheduled, declined, or made async.

## Prerequisites

1. **Google Calendar MCP connected** — `google_calendar_*` tools must be available. If not, see `docs/mcp-setup.md` and stop. (Optional but useful: Google Drive MCP for opening linked agenda docs, Atlassian MCP for cross-referencing Jira links inside invites.)
2. **Time window** — default is the next 5 business days. The user can ask for a 1-day, 3-day, or 2-week window.
3. **User identity** — the user's calendar email (defaults to the authenticated identity).

> **Context Management:** Calendar API responses can be huge. Fetch only the fields you need (title, start, end, attendees count, has-description, has-linked-doc). Do **not** dump full attendee lists or descriptions into the conversation unless they're load-bearing — describe them in summary.

## Workflow

### Phase 1: Scope

Confirm with the user:

- Window (default: today through end-of-week-Friday)
- Whether to include cancelled / tentative events (default: no)
- Whether to include all-day events (default: no, unless they're holidays / OOO)
- Calendars to scan (default: primary; ask if the user has secondary calendars like "Team" or a delegated exec calendar)

### Phase 2: Pull and classify

Fetch the window from the Calendar MCP. Classify each event into one bucket:

| Bucket | What it is | Default prep stance |
|---|---|---|
| **Sprint ceremony** | Planning, refinement, review, retro | Needs prior status + sprint scope |
| **1:1** | Recurring two-person | Needs running doc + last action items |
| **Stakeholder review** | Exec / cross-functional update | Needs latest status update + key metrics |
| **Customer / discovery** | External user call, sales-led | Needs interview guide, prior notes on same customer |
| **Design / spec review** | PRD / mock walk-through | Needs the doc pre-read |
| **Working session** | Build / write together | Needs concrete pre-work surfaced |
| **Decision meeting** | RFC review, go/no-go | Needs the proposal + dissenting view |
| **Async-able** | Status, info-only, no agenda | Candidate to decline or convert |
| **Personal / OOO / blocked** | Lunch, focus time, OOO | Surface as a constraint, not as prep |

Use the title, attendee count, recurring pattern, and any linked docs to classify. When ambiguous, flag the meeting and ask.

### Phase 3: Cross-reference team context

For each meeting that needs prep, pull what's already on disk:

- `context/team.md` — who is the attendee in our ways-of-working (engineering lead, exec sponsor, customer success owner)?
- `status-updates/<latest>.md` — is there an unresolved risk or ask that comes up here?
- `meeting-notes/` — is there a prior file with the same slug / topic / attendees? If yes, surface the open action items.
- (If Atlassian MCP connected) — for sprint ceremonies, the current sprint's open Jira issues; for 1:1s with engineering leads, recently changed tickets.

This is the part that beats just reading the calendar — the model is reconciling **calendar reality** with **team memory**.

### Phase 4: Flag prep gaps

For each meeting, score these signals:

- **No agenda** — description field is empty or just a Zoom link
- **No linked doc** — agenda references a doc that isn't attached / linked
- **No clear outcome** — title is vague ("sync", "check-in", "discussion")
- **Conflict / overlap** — back-to-back without buffer; double-booked
- **Marathon stretch** — 3+ consecutive hours without a break
- **Unfamiliar attendee** — someone not in `context/team.md` and not previously in `meeting-notes/`
- **Stale recurring** — same recurring slot that hasn't produced action items in the last N occurrences

Don't lecture the user — call these out only when actionable.

### Phase 5: Produce the prep plan

Output structure (concise — this is a checklist, not a report):

```markdown
# Week of YYYY-MM-DD

## At a glance
- N meetings | M hours in meetings | K focus blocks
- Heaviest day: Wed (6 mtgs / 5h)
- Lightest day: Fri (1 mtg / 30m)

## Top prep (do today)
1. **Wed 10am — Roadmap review with $execSponsor** — needs Q3 metrics slide + revised dates; prior note flagged 2 open asks. → 60m prep, today.
2. **Tue 2pm — Customer call: $CustomerCode** — second call; prior note has 3 unresolved questions. → 30m review.
3. **Thu 1pm — Sprint planning** — sprint scope still has 4 unsized items in Jira. → 45m refinement.

## Should change before the meeting
- **Tue 11am — "Catch up"** — no agenda, vague outcome. Propose: convert to async update or cancel.
- **Wed 3pm — 4 back-to-backs** — no buffer. Move the 4pm "sync" later in week.

## Light prep / routine
- Daily standup ×5
- 1:1 with $manager — pull running doc, last action items
- Design review (Thu) — read the PRD linked in invite

## OOO / context
- $teammate OOO Wed–Fri
- Exec offsite blocks Thu morning
```

### Phase 6: Offer routing

After presenting the plan, offer (do not act without confirmation):

- "Draft a decline / async-convert note for the flagged meetings" → `inbox-triage` or one-shot draft
- "Pull each meeting's pre-read into a single brief" → batch `meeting-prep`
- "Refresh the status update referenced in the exec review" → `status-update`
- "Open the linked PRDs in Drive" → list URLs (don't open without ask)

## Guardrails

- **Don't quote meeting descriptions or attendee names broadly.** Summary form only. If a meeting title is `[Confidential] M&A update`, treat it as opaque — title only, no content surfacing.
- **Don't expose other people's calendars** beyond what's already visible in the user's view. If a meeting is a 1:1 with $person, don't fetch $person's calendar.
- **Don't move or cancel events.** This skill is read-only on the calendar. Suggest changes; let the user act.
- **Cap the window.** If the user asks for 4+ weeks, push back — the signal-to-noise drops fast past 2 weeks.

## Output

- Week summary at-a-glance (counts only)
- Top prep list (3–5 items, with concrete prep action + time)
- "Should change" list (decline / convert / reschedule candidates)
- Light / routine list
- OOO and context constraints
- Routing suggestions for follow-on skills
