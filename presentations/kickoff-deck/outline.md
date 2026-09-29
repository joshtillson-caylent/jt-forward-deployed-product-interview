# Kickoff Deck — Outline

**Status:** narrative locked via `/presentation-builder` (first pass, 2026-09-28). Slide HTML in `index.html` follows this outline 1:1. Revised after planning: a current-state slide was added, the David slide merged with the asks, and Tier 2 is the close. Revised again after a detailed slide-by-slide pass (2026-09-29): fixed the "today" vs. "tomorrow" inconsistency on slide 2 (kickoff is today), replaced vague "no slack" labels with specific language, retitled slide 3 so it no longer implies the analysts personally judged Claude via a demo, spelled out the NBIM/AIG acronyms on slide 4, added "define AI-enabled finance" to David's asks on slide 5, dropped hard-coded October dates and fixed the day-30 chip's vertical alignment on slide 7, and rebuilt slide 8 as a plain-language two-panel Tier 1/Tier 2 comparison. Revised again (2026-09-29): added a personal-intro slide as the new slide 2 (Josh's bio, recolored from a template he used for a prior role), pushing the old slides 2–8 to 3–9.

## Context

- **For:** the FDPM interview panel. Framed as the point of view Josh brings into tomorrow's kickoff with David Okafor and two analysts.
- **Length:** ~15 min presented, then Q&A, then the 8-min live AI walkthrough (separate).
- **Key takeaway:** the team formed its view from a generic demo, and their own work is a good fit for a first pass. We lead by listening, work around their calendar, find one high-ROI first pass inside their own workflow, and make the team its owners.
- **Engagement type:** Tier 1, Claude Activation (one of three Anthropic-partner engagement types). Tier 2 (agentic workflows and automation) is the follow-on, not the pitch.

## Story arc

1. **Hook:** six months and near-zero adoption. The team's explanation is reasonable, but it's a conclusion about generic chat, not about their work.
2. **Context:** peer finance teams, including Anthropic's own, already use Claude for the first pass on exactly this work, with a human signing off.
3. **Core messages:**
   - David needs validation, proof, and someone else carrying the legwork. He doesn't need a menu of options.
   - Discovery runs on their real tasks, not on questions about pain.
   - The 30 days are built around Q3 close and board prep, not on top of them.
4. **Evidence:** Anthropic finance team (10–20 hrs/week), NBIM (~20% productivity, AI Ambassador network), AIG (>5x faster review). Anthropic's own deployment guidance: pilot on standard-shape work that already gets reviewed.
5. **Close:** the six asks sit on the David slide. The deck ends on Tier 2, which is where this goes next.

## Slide-by-slide

### 1. Cover: "Meridian FP&A"
- **Message:** a listening-first Tier 1 Claude Activation engagement.
- **Content:** title, one-line subtitle, presenter. No facts. Those live on slide 3.

### 2. About me: "But before we get started, let me introduce myself . . ." (added at Josh's request)
- **Message:** be a person before being a point of view.
- **Content:** name, current role, and a facts row (Current Role, Education, Hometown), a five-photo strip (not individually tied to those facts — just a spread of Josh outside work), then a two-column Intro / Fun Facts bullet list. Adapted from a slide Josh built for a prior role's interview, recolored to this deck's green/ink palette in place of the original's purple/red.
- **Band:** none — this slide is a warm-up, not a point.

### 3. Current state: "Where Meridian is today" (added at Josh's request)
- **Message:** ground the room before the point of view.
- **Content:** a timeline running PE acquisition (11 months ago) → Claude Enterprise plus a 1-hour orientation (6 months ago) → near-zero FP&A adoption (ever since) → kickoff (today — this is the room we're in). Company size ($195M, 380 employees) is folded into the opening lede, not pinned to any one timeline node. The FP&A cadence shown as chips, headed "8 analysts, back-to-back deliverables" (not "no slack"). Three stakeholder rows: PE sponsor, David, analysts.
- **Band:** don't know yet: FP&A-only or org-wide? What did the orientation give them? What does the PE sponsor mean by "AI-enabled finance"?

### 4. The actual problem: "The team's read on Claude started with one generic hour"
- **Legitimate:** no time to adopt (back-to-back cycles, no room to experiment); one generic hour, org-wide; David's early results were mixed (not attributed to the analysts); a human stays in the loop on every output.
- **The jump** (renamed from "Misread"): peer finance teams already do this work with Claude, with measurable ROI; much of the time goes to assembly, which is what AI already handles; untested beyond David's own attempts — what the analysts have tried is still unknown.
- **Band:** discovery starts from their real tasks, and an analyst reviews every draft.

### 5. Evidence: "Finance teams already use Claude for the first pass"
- **Content:** Meridian's five workflows each mapped to a first pass (hypothesis, flagged as such in a caption). Three stat tiles: Anthropic finance team 10–20 hrs/week, NBIM (spelled out: Norway's sovereign wealth fund) ~20%, AIG (spelled out: global insurer) >5x. Pattern bar: Claude drafts → analyst verifies → David signs off.

### 6. Team lead: "What David needs in the first two weeks" (merged with the asks)
- **What we give David:** validation, proof from peers, we carry the legwork, one quick high-ROI win, board-ready language.
- **What we ask of David at kickoff:** champions, defining "AI-enabled finance" (and who else — leadership, the PE team — needs to weigh in on ROI), interviews (including teams already using Claude well), who's in the discovery session, timing around close and board, ways of working and access combined into one row (cadence/channel/decision-maker plus artifacts and Claude Enterprise usage data) so the added "define AI-enabled finance" ask didn't push the panel past the slide's height.
- **Band:** David leaves with a one-page 30-day plan, named champions, and the next meetings booked. No use-case menu.

### 7. Discovery: "Discovery starts with a task they did last week"
- **Flow:** walk through a task → mark each step as judgment or assembly → draft a first pass live → analysts review it → choose a workflow.
- **Columns:** what we need to learn; how we pick the first workflow (frequent, standard shape, already reviewed, low blast radius).
- **Band:** goal for the session: each analyst sees a draft of their own recent work and decides what's wrong with it.

### 8. First 30 days: "Planned around their close calendar"
- **Timeline:** Day 0 Kick off · Wk 1 Listen (during Q3 close) · Wk 2 Discover (after close wraps) · Wk 3 Build (the following week) · Wk 4 Adopt (final week). No hard calendar dates on the slide — kickoff being "today" stands, but the specific October dates were cut so the plan doesn't look locked before David confirms his calendar.
- **Team-time line per card:** 60 min · 30 min per person · 90-min workshop · 2 × 20-min demos · 30-min readout.
- **Bottom:** build → demo → feedback → iterate. Day-30 measures: draft keep-rate, hours saved per cycle, unprompted use. (Fixed: the Day-30 chip wasn't vertically centered against the other pills in that row — `.measures` was missing `align-items: center`.)
- **Note:** close and board dates are `hypothesis — validate`; footnote now says "we'll confirm them with David today," matching kickoff being today.

### 9. Beyond activation: "Tier 1 → Tier 2: from prompts to agentic workflows" (closing slide)
- **Tier framing:** Tier 1 and Tier 2 are two of the three engagement types Caylent runs as an Anthropic partner. This engagement is Tier 1 (Claude Activation). Tier 2 is agentic workflows and automation. Tier 3 stays off the slide.
- **Layout (simplified):** a plain-language two-panel comparison (reusing the give/ask panel style from slide 6) instead of the three-rung ladder plus a two-card grid — that combination read as dense without clarifying where the engagement goes next. Left panel: Tier 1, "Equip the team" — skills, a shared Project, ways of working, analysts still doing the pasting and reviewing themselves. Right panel: Tier 2, "Automate the workflow" — Claude connected and scheduled, drafting on its own, analyst still reviews before it ships; Anthropic's Month-end closer agent and Campfire folded in as a single proof line (close 3 days faster, reconciliation −90%).
- **Band:** for the sponsor, "AI-enabled finance" becomes a sequence: the team owns a workflow, then we automate it.

## Visuals

- Slide 2: five-photo strip.
- Slide 3: four-node timeline.
- Slide 5: workflow → first-pass mapping plus three stat tiles.
- Slide 7: five-step horizontal flow.
- Slide 8: week-by-week cards with close/board bands shaded.
- Slide 9: three-step ladder under Tier 1 / Tier 2 labels.
- Live demo (separate) replaces any screenshots.

## Anticipated questions

| Question | Short answer |
|---|---|
| What if discovery finds no good first use case? | That's a real signal. We'd revisit scope with David rather than push the pitch harder. |
| Why not start with the board narrative? It's the most visible. | High stakes, quarterly, and David's name is on it. Start with frequent, reviewed work, then carry that trust into the board draft. |
| How do you handle data sensitivity? | Confirm at kickoff what data can go into Claude Enterprise; begin with the templates and prior-period artifacts the team already shares internally. |
| What if the analysts don't have time even for this? | Week 1 asks for ~30 min per person. We carry the synthesis and build. |
| How do you know adoption stuck? | Keep-rate and unprompted use by day 30, not license logins. |
| Is Tier 2 the real goal? | No. Tier 2 only makes sense once a workflow is proven and owned by the team. |

## Pre-presentation checklist

- [ ] Confirm Anthropic's official Tier 1/Tier 2 wording before the panel (EVO lookup was blocked; current labels are Josh's).
- [ ] Rehearse the slide-7 timing story (Q3 close lands in week 1).
- [ ] Prep the live demo on a synthetic variance pack (separate from the deck).
