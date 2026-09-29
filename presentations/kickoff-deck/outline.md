# Kickoff Deck — Outline

**Status:** narrative locked via `/presentation-builder` (first pass, 2026-09-28). Slide HTML in `index.html` follows this outline 1:1. Revised after planning: a current-state slide was added, the David slide merged with the asks, and Tier 2 is the close. Revised again after a detailed slide-by-slide pass (2026-09-29): fixed the "today" vs. "tomorrow" inconsistency on slide 2 (kickoff is today), replaced vague "no slack" labels with specific language, retitled slide 3 so it no longer implies the analysts personally judged Claude via a demo, spelled out the NBIM/AIG acronyms on slide 4, added "define AI-enabled finance" to David's asks on slide 5, dropped hard-coded October dates and fixed the day-30 chip's vertical alignment on slide 7, and rebuilt slide 8 as a plain-language two-panel Tier 1/Tier 2 comparison. Revised again (2026-09-29): added a personal-intro slide as the new slide 2 (Josh's bio, recolored from a template he used for a prior role), pushing the old slides 2–8 to 3–9. Revised again (2026-09-29): slide 4 no longer claims to know "the team's read on Claude" — the only fact in hand is that David spent an hour and got a mixed result — and reframes the problem as time plus an assumption about AI that's outgrown by current models. Reordered slides 6–8: First 30 Days now runs before Discovery and the (renamed) team-lead slide, so the plan lands before the asks. The team-lead slide is retitled "Immediate Next Steps," drops David's name, drops the "Validation" give, and reframes "what we give David" as "what we're going to do." Tier 1/Tier 2 renamed P1/P2 throughout (Anthropic's own terminology), and the closing band ties P2 to the "AI-enabled finance" threshold question.

## Context

- **For:** the FDPM interview panel. Framed as the point of view Josh brings into tomorrow's kickoff with David Okafor and two analysts.
- **Length:** ~15 min presented, then Q&A, then the 8-min live AI walkthrough (separate).
- **Key takeaway:** the team formed its view from a generic demo, and their own work is a good fit for a first pass. We lead by listening, work around their calendar, find one high-ROI first pass inside their own workflow, and make the team its owners.
- **Engagement type:** P1, Claude Activation (one of three Anthropic-partner engagement types, using Anthropic's own P1/P2/P3 labels). P2 (agentic workflows and automation) is the follow-on, not the pitch.

## Story arc

1. **Hook:** all we actually know is one hour and a mixed result — not a team verdict on Claude. Underneath that is a real time constraint and a stale assumption about what AI can do.
2. **Context:** peer finance teams, including Anthropic's own, already use Claude for the first pass on exactly this work, with a human signing off.
3. **Core messages:**
   - The plan is built around Q3 close and board prep, not on top of them — shown before we ask anyone for anything.
   - Discovery runs on their real tasks, not on questions about pain.
   - The team needs proof and someone else carrying the legwork, not a menu of options. The asks are the handful of decisions only they can make.
4. **Evidence:** Anthropic finance team (10–20 hrs/week), NBIM (~20% productivity, AI Ambassador network), AIG (>5x faster review). Anthropic's own deployment guidance: pilot on standard-shape work that already gets reviewed.
5. **Close:** the asks sit on the Immediate Next Steps slide, team-framed, no David name. The deck ends on P2, which is where this goes next.

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

### 4. The problem: "No time to set Claude up, and no proof it would pay off"
- **Redesigned (2026-09-29):** replaced the "No time / Not anymore" columns and the "assumption AI has outgrown" title. The problem is two blockers: the team has no time for the setup work, and nobody has shown them the payoff that would justify it. Lede ties both to the one hard outcome: adoption near zero six months after rollout. Plain language only (budget vs. actuals spelled out, no "BvA"), no em dashes, run through `/stop-slop`.
- **Layout:** two warm blocker cards on top, a green pivot line ("Bringing in Caylent removes both blockers"), then two green answer cards, each sitting under the blocker it answers.
- **Blocker 1, no time to set it up:** close, budget vs. actuals, reporting, and board prep run back to back; setup means picking the task, writing prompts, and testing on real numbers; the one-hour orientation covered Claude in general.
- **Blocker 2, no proof it pays off:** David's mixed results from a few prompts (the only first-hand data point); the team's own "numbers-based and requires judgment" quote; setup hours on a tool with no track record in their work is a hard trade.
- **Answers:** we carry the setup (interviews, prompts, first build; about 30 minutes per analyst in week 1); we prove the payoff first (each analyst judges a draft of their own recent work in week 2, built from peer finance patterns).
- **Notes:** the judgment point moves to speaker notes as a bridge into slide 5's evidence.

### 5. Evidence: "Finance teams already use Claude for the first pass"
- **Content:** Meridian's five workflows each mapped to a first pass (hypothesis, flagged as such in a caption). Three stat tiles: Anthropic finance team 10–20 hrs/week, NBIM (spelled out: Norway's sovereign wealth fund) ~20%, AIG (spelled out: global insurer) >5x. Pattern bar: Claude drafts → analyst verifies → David signs off.

### 6. First 30 days: "Planned around their close calendar" (moved up from old slide 8, 2026-09-29)
- **Why moved:** the plan now lands before Discovery and before the asks — show the team what's already been thought through, then walk them through how discovery works, then close with what we need from them.
- **Timeline:** Day 0 Kick off · Wk 1 Listen (during Q3 close) · Wk 2 Discover (after close wraps) · Wk 3 Build (the following week) · Wk 4 Adopt (final week). No hard calendar dates on the slide — kickoff being "today" stands, but the specific October dates were cut so the plan doesn't look locked before David confirms his calendar.
- **Team-time line per card:** 60 min · 30 min per person · 90-min workshop · 2 × 20-min demos · 30-min readout.
- **Bottom:** build → demo → feedback → iterate. Day-30 measures: draft keep-rate, hours saved per cycle, unprompted use.
- **Note:** close and board dates are `hypothesis — validate`; footnote says "we'll confirm them with David today," matching kickoff being today.

### 7. Discovery: "Discovery starts with a task they did last week" (unchanged content, moved to follow the 30-day plan)
- **Flow:** walk through a task → mark each step as judgment or assembly → draft a first pass live → analysts review it → choose a workflow.
- **Columns:** what we need to learn; how we pick the first workflow (frequent, standard shape, already reviewed, low blast radius).
- **Band:** goal for the session: each analyst sees a draft of their own recent work and decides what's wrong with it.

### 8. Immediate next steps: "Immediate next steps for the FP&A team" (renamed and reworked from "What David needs," 2026-09-29)
- **Why reworked:** the old slide was framed entirely around David — what we give him, what we ask him. Pulled David's name out; this is now team-framed, and it now sits after the plan and discovery slides instead of before them.
- **What we're going to do** (renamed from "What we give David"; dropped the "Validation" row — presenting it as validating David's problem read poorly): proof from peers, we carry the legwork, draft-then-verify stated up front (added to rebalance the panel after dropping validation), one quick high-ROI win, language for reporting up.
- **What we ask of the FP&A team at kickoff** (renamed from "at kickoff" for David): champions, defining "AI-enabled finance" (and who else — leadership, the PE team — needs to weigh in on ROI), interviews (including teams already using Claude well), who's in the discovery session, timing around close and board, ways of working and access combined into one row.
- **Band:** the team leaves with a one-page 30-day plan, named champions, and the next meetings booked. No use-case menu, no name attached.

### 9. Beyond activation: "P1 → P2: from prompts to agentic workflows" (closing slide)
- **Terminology (2026-09-29):** Tier 1/Tier 2 renamed to P1/P2 throughout the deck, matching Anthropic's own language. (CSS class names `tier-label`, `t1`, `t2` are internal hooks only and weren't renamed — no visible text uses "Tier" anymore.)
- **P framing:** P1 and P2 are two of the three engagement types Caylent runs as an Anthropic partner. This engagement is P1 (Claude Activation). P2 is agentic workflows and automation. P3 stays off the slide.
- **Layout:** a plain-language two-panel comparison (reusing the give/ask panel style from slide 8). Left panel: P1, "Equip the team" — skills, a shared Project, ways of working, analysts still doing the pasting and reviewing themselves. Right panel: P2, "Automate the workflow" — Claude connected and scheduled, drafting on its own, analyst still reviews before it ships; Anthropic's Month-end closer agent and Campfire folded in as a single proof line (close 3 days faster, reconciliation −90%).
- **Band:** for the sponsor, "AI-enabled finance" gets a threshold: the team owns a workflow (P1), then we automate it (P2) — ties the P2 pitch directly to the undefined "AI-enabled finance" question raised on slides 3 and 8, rather than leaving it as a separate roadmap tease.

## Visuals

- Slide 2: five-photo strip.
- Slide 3: four-node timeline.
- Slide 5: workflow → first-pass mapping plus three stat tiles.
- Slide 6: week-by-week cards with close/board bands shaded.
- Slide 7: five-step horizontal flow.
- Slide 9: two-panel comparison under P1 / P2 labels.
- Live demo (separate) replaces any screenshots.

## Anticipated questions

| Question | Short answer |
|---|---|
| What if discovery finds no good first use case? | That's a real signal. We'd revisit scope with David rather than push the pitch harder. |
| Why not start with the board narrative? It's the most visible. | High stakes, quarterly, and David's name is on it. Start with frequent, reviewed work, then carry that trust into the board draft. |
| How do you handle data sensitivity? | Confirm at kickoff what data can go into Claude Enterprise; begin with the templates and prior-period artifacts the team already shares internally. |
| What if the analysts don't have time even for this? | Week 1 asks for ~30 min per person. We carry the synthesis and build. |
| How do you know adoption stuck? | Keep-rate and unprompted use by day 30, not license logins. |
| Is P2 the real goal? | No. P2 only makes sense once a workflow is proven and owned by the team. |

## Pre-presentation checklist

- [ ] Rehearse the slide-6 timing story (Q3 close lands in week 1) and the slide-4/discovery/immediate-next-steps sequencing (plan first, then discovery, then the asks).
- [ ] Prep the live demo on a synthetic variance pack (separate from the deck).

**Resolved (2026-09-29):** P1/P2 is Anthropic's own terminology — settled, no longer an open confirm item.
