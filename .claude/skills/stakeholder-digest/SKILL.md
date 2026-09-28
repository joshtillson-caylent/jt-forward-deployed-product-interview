---
name: stakeholder-digest
description: Prepare any stakeholder communication — weekly status, monthly exec digest, board update, launch announcement, QBR, incident update, decision memo, or the material for an upcoming meeting — tuned to a specific audience and moment. Figures out what communication is being prepared and for whom, pulls real signal from status updates, meeting notes, Jira, analytics, CRM, and calendar, leads with the bottom line, and drafts to Gmail, Confluence, Slack, or a doc. Never sends without explicit confirmation. Use when a PM needs to write up, brief, announce, or report to stakeholders.
---

# Stakeholder Communications

Prepare a stakeholder communication that lands — tuned to the **audience** (exec, board, eng, sales, customer, org-wide) and the **moment** (a weekly report, a board meeting, a launch, an incident, a decision that needs sign-off). This skill's job is to translate what the team actually did into what a *specific reader* needs to hear, in the format that fits the occasion.

It is not a status log. A raw status update records what happened; this skill curates and reframes it for one reader — the same week's work can produce three different communications for three audiences, and each should land differently.

## Start here — understand the communication first

Before drafting anything, get a clear read on **what** is being prepared and **for whom**. Ask only what isn't already obvious.

1. **What communication, and what's the moment?** Offer the common types so the PM can point: *weekly status · monthly exec digest · board update · launch/GA announcement · QBR · incident update · decision memo (needs a sign-off) · prep for a specific meeting · other.* If they say "just an update," pin down the occasion — a Friday all-hands note and a board pre-read are not the same artifact.
2. **Audience & altitude.** Who reads it, by name or role? Execs want impact, risk, and decisions — not sprint mechanics. A board wants strategy, metrics-vs-target, and where they can help. Eng wants context and the what/why. Sales wants what/when and how to sell it. Customers want the benefit and timing.
3. **Tone & the ask.** Is this an FYI, a status, or an ask? Is there a real decision you need from this audience — or genuinely none? (Don't manufacture an ask.)
4. **Window & channel.** What period does it cover, and where does it go — email, Confluence/Notion, Slack, a slide, a doc?
5. **Connectors (offer, don't assume).** *"I can pull real signal — Jira epics closed/slipped, product metrics from PostHog, calendar milestones, CRM account status for a customer update, and the last thing you sent this audience so I don't repeat it. Want me to sweep those, or work from what you give me?"*

Confirm the type + audience + channel in one line, then draft.

## Gather signal (Phase 0 — before drafting)

A communication that misses a major milestone, or surfaces a risk the reader already knows, loses credibility fast. Read local sources first, then sweep whatever the PM opted into. Reference connectors by capability; use whatever the environment exposes.

Local: `status-updates/` (primary), `meeting-notes/` (decisions, launches, blockers), `context/okrs.md` (anchor wins/risks to the metrics this audience tracks), `context/team.md` (stakeholder profiles).

| Source | What to pull | Best for |
|---|---|---|
| **Issue tracker (Jira)** | Epics closed/slipped in the window, top blockers, key shipped tickets | status, digest, board |
| **Product analytics (PostHog etc.)** | Adoption, activation, funnel movement, launch metrics | digest, board, launch, QBR |
| **Calendar** | Launches, demos, exec reviews, milestone meetings in the window | all |
| **CRM (Salesforce)** | Account health, deal stage, open cases | customer updates, QBR |
| **Notion / Confluence / Drive** | Prior comms to this audience, PRDs, product principles | continuity, board pre-reads |
| **Slack** | Organic wins, decision threads, customer-channel signal | status, digest |
| **Gmail** | The *last* thing sent to this audience — avoid repeating it | all recurring comms |

Scope every query to the team's project or the relevant account — never pull broadly.

## Curate — from raw signal to what this reader needs

- **Bottom line up front (BLUF).** Lead with the single most important point — the sentence this reader would repeat tomorrow. If you can't write it, the comm isn't ready. Never open with background or "I've been thinking about…".
- **Filter by audience, hard.** A board member doesn't want sprint velocity; a sales VP doesn't want an infra refactor. Cut ruthlessly to what this reader can act on.
- **Outcomes over activity.** Report impact, not a task list. Cap metrics at the 3–5 this audience actually tracks; no vanity metrics.
- **Surface risk as a decision.** Don't bury bad news and don't hedge it into mush — state it and, where possible, frame it as "here's what we need to decide."

## Format by communication type

Pick the structure that fits the moment. These are starting shapes — adapt to the team's house style.

- **Weekly status** — Headline · Shipped · In progress · Next · Early warnings. ≤2-min read.
- **Monthly exec digest** — Hook (quantified impact) → Problem/opportunity → Progress & impact → Risks → **The ask**. 1–3 short sections.
- **Board update** — Big picture / strategy → metrics vs. target (incl. an honest "what's *not* going well") → 3–5 priorities → asks / where the board can help. Send materials ahead of the meeting.
- **Launch / GA announcement** — What's launching · who it's for · the benefit · availability/timing · what each audience should do (sales enablement, CS notice, exec FYI). Tier the message by audience.
- **QBR** — Results vs. goals → wins & misses → learnings → next-quarter plan → **decisions/asks**, each with an owner and due date.
- **Incident update** — Status (Investigating / Identified / Monitoring / Resolved) · impact · what we're doing · next update time. Keep a steady heartbeat even when "nothing new."
- **Decision memo** — Recommendation up front → context → options with trade-offs → the decision needed, by whom, by when.
- **Meeting prep / other** — clarify the goal of the meeting and build to the decision or takeaway the PM wants to leave with.

Draft in the target channel's form (email with subject; Confluence/Notion long-form with linked epics; Slack blocks with clear headers). For a Confluence/Notion write, hand off to the page-writing skill.

## Confirm before anything goes out
Show the PM:
- The draft(s) per channel
- The **source list** — every artifact the comm drew from, so they can spot an omission
- Recipients (email) or destination (Confluence/Slack)
- Anything deliberately left out, one line each (e.g., "sprint velocity — this audience doesn't track it")
- Any risk being surfaced to this audience **for the first time** — flag it explicitly and confirm before including

**Pause for explicit go-ahead before any send or publish.** The PM can edit inline; re-show after edits.

## Execute (after confirmation only)
- **Gmail** — create a *draft* by default; only send on an explicit "send it."
- **Confluence/Notion** — hand off to the page-writing skill (version-safe write path).
- **Slack** — produce blocks-formatted text for the PM to post, unless Slack is connected and authorized for this purpose.
- Never auto-send to a list of stakeholders. One communication, one audience — re-run for another audience.

Then report channel status + links, source count, anything skipped, and offer to archive the comm to `status-updates/digests/YYYY-Wxx-<audience>.md` for continuity.

## Guardrails
- **Never fabricate a metric.** If a number isn't in the source artifacts, don't invent it — insert `[METRIC NEEDED: source]` and flag it. "Strong quarter" is fine; "revenue grew 23%" with no source is not.
- **Never manufacture an ask.** If the team needs nothing from this audience, say so — omit the section.
- **No quiet escalation.** A risk new to this reader gets flagged and confirmed before it goes in.
- **Customer / PII discipline.** Don't name specific customers in a broad-audience comm without consent; aggregate ("3 enterprise customers reported…").
- **No bulk-send, no auto-send.** Explicit confirmation before every send or publish.
- **The AI drafts; the human owns the send.** The PM's name is on it — they approve every word before it leaves.
