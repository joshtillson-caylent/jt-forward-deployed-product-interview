# Meeting Prep

Prepare structured, actionable meeting preparation documents for product meetings.

## Optional MCP integrations

If the corresponding MCP is connected, **prefer pulling source-of-truth over re-asking the user**:

- **Google Calendar** — given a Calendar event ID / URL, pull title, time, attendees, description, and any linked agenda doc instead of asking the user to retype them.
- **Google Drive** — when the invite references an agenda or PRD URL, read the doc content (metadata + body) directly to ground the prep.
- **Atlassian** — for sprint ceremonies, pull the current sprint scope; for stakeholder reviews, pull the relevant epic.
- **`meeting-notes/`** (always on disk) — search for prior files on the same topic / attendees to surface open action items.

Gracefully degrade: if the MCP isn't connected, fall back to asking the user. Don't refuse to run.

## Workflow

### Phase 1: Meeting Context

- What type of meeting? (sprint planning, stakeholder review, discovery session, roadmap review, retro, 1:1, customer call, design review)
- Who are the attendees and what are their roles/perspectives?
- What is the meeting's stated goal or desired outcome?
- How long is the meeting?

### Phase 2: Background Research

- What context do attendees need to be effective?
- What happened in the previous meeting on this topic?
- What has changed since then? (new data, decisions, blockers, progress)
- Are there any open items or action items to follow up on?

### Phase 3: Agenda Construction

- Build a time-boxed agenda with:
  - Topic name
  - Time allocation
  - Owner/presenter
  - Desired outcome (inform, discuss, decide)
- Front-load decisions; push informational items to async when possible
- Include buffer time for discussion

### Phase 4: Discussion Preparation

For each agenda item:

- Key points to raise
- Data or evidence to reference
- Anticipated questions or pushback
- Recommended position or proposal (if seeking a decision)
- Fallback position if primary proposal is rejected

### Phase 5: Pre-reads and Materials

- List any documents, dashboards, or artifacts attendees should review beforehand
- Prepare any slides, data visualizations, or demos needed
- Draft any decision frameworks or options to present

### Phase 6: Output

**Meeting prep document containing:**

1. Meeting metadata (date, time, attendees, goal)
2. Time-boxed agenda
3. Background context summary
4. Per-item talking points and preparation notes
5. Pre-read materials list
6. Desired outcomes and decisions to make
7. Post-meeting: action items template

