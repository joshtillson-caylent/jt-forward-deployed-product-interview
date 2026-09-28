# Presentation Builder

Create structured presentation outlines and content for product presentations.

## Optional MCP integrations

- **`status-updates/` + `meeting-notes/`** (always on disk) — pull recent wins, risks, and decisions to ground the narrative; reuse exact phrasing the team has already aligned on.
- **Atlassian** — pull the metrics from epic / sprint queries (closed scope, slipped commits) when slide content needs them.
- **Google Drive** — if the user wants the outline saved as a Google Doc (for editing in Slides via add-ons), create one and return the URL. Confirm destination folder before writing.
- **Lucid** — if a slide calls for a flow / sequence / org diagram, hand off to `lucid-chart` and embed the PNG export.

Gracefully degrade: if no MCPs are connected, produce the outline as a markdown artifact.

## Workflow

### Phase 1: Context
- What is the presentation for? (stakeholder update, product review, pitch, demo, team all-hands, customer presentation, board update)
- Who is the audience? What do they care about?
- What is the key message or takeaway?
- How long is the presentation?
- What format? (slides, document, talking points)

### Phase 2: Narrative Structure
Build the story arc:
1. **Hook:** Why should the audience care? Open with the problem, opportunity, or key insight.
2. **Context:** What's the current state? What background does the audience need?
3. **Core content:** What are the key points? (limit to 3-5 main messages)
4. **Evidence:** What data, demos, or examples support each point?
5. **Ask or conclusion:** What do you want the audience to do, decide, or remember?

### Phase 3: Slide/Section Outline
For each slide or section:
- Title (clear and specific, not generic)
- Key message (one sentence the audience should take away)
- Supporting content (bullets, data points, visuals)
- Speaker notes (what to say that isn't on the slide)
- Transition to next slide

### Phase 4: Data and Visuals
- Identify metrics, charts, or data needed for each section
- Recommend visualization types (bar chart, line graph, table, screenshot, diagram)
- Note where demos or live examples would be more effective than slides
- Flag any data that needs to be gathered or updated

### Phase 5: Anticipated Questions
- What questions will the audience likely ask?
- Prepare concise answers for each
- Identify topics to "take offline" vs. address in the room

### Phase 6: Output

**Presentation package containing:**
1. Narrative outline with story arc
2. Slide-by-slide breakdown (title, key message, content, speaker notes)
3. Data and visual requirements
4. Appendix slides for anticipated questions
5. Pre-presentation checklist (data to gather, demos to prepare, stakeholders to align with)
