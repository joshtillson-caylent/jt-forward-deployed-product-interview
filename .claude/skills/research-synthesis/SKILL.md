---
name: research-synthesis
description: Turn a corpus of qualitative research — customer interviews, call transcripts, survey verbatims, support tickets — into a trustworthy synthesis document where every theme is backed by verbatim quotes and citations. Uses thematic analysis (open coding to themes), reports prevalence as counts, surfaces counter-evidence, and rates confidence. Use when a PM has raw research to make sense of. Do NOT use to decide whether to build something (that is discovery) — synthesis produces cited themes and stops before the build decision.
---

# Research Synthesis

Take a corpus of qualitative research and produce a **synthesis document**: clustered themes, each backed by direct citations and verbatim quotes, with counter-evidence surfaced and confidence rated honestly. The output is only as useful as it is trustworthy — **if it can't be cited, it isn't claimed.**

This follows Braun & Clarke thematic analysis: familiarize → code → build themes → review → name → write up. A *theme* has a central organizing concept ("users abandon onboarding because early steps demand decisions they can't yet make"), not a topic label ("onboarding"). If you could have written the "theme" before reading the data, it's a topic summary, not a theme.

## Start here — check in before generating

Ask only what you can't infer; if the prompt already answers it, state your read and proceed.

1. **The question.** "What are you trying to learn from this corpus?" A synthesis without a question produces a wash. Push back if the PM can only say "synthesize the interviews" — get to "what are users' biggest onboarding friction points?" or a pair of competing hypotheses.
2. **The corpus & scope.** Which sources, what date range, which segment? Any inclusion/exclusion rules (e.g., exclude internal sales notes, only mid-market)?
3. **Audience & citation density.** Who reads this (eng+design / exec / sales) — affects how technical it reads. Strict citation (every claim sourced) vs. theme-level?
4. **Connectors (offer, don't assume).** *"I can pull the corpus from Google Drive, Gong/Zoom transcripts, Notion, Slack, your issue tracker, or a local folder — where does the material live, and should I fetch it, or are you pasting it in?"*

## Research-synthesis vs. discovery — know the boundary

Synthesis is **backward-looking and evidence-first**: it turns a raw corpus into cited themes and makes **no build decision**. Discovery is **forward-looking and decisional**: it consumes a synthesis, adds solution ideation and assumption tests, and ends in a go/no-go. Synthesis populates the opportunity space; discovery decides what to do about it. If the ask is "theme this corpus" → you're in the right place. If it's "should we build this?" → hand off to `discovery` when you're done.

## Connectors (optional, capability-based)

Works from pasted text or local files with no integrations. Reference connectors by capability and use whatever tools the current environment exposes.

| Source | What to look for |
|---|---|
| **Google Drive / local disk** | Interview transcripts, survey exports, research reports, Otter/Rev exports, `meeting-notes/` |
| **Gong / Zoom** | Sales & discovery call transcripts — search by account or feature keyword |
| **Notion / Confluence** | Prior research writeups, interview notes, discovery pages |
| **Slack** | Customer/product-feedback channels — informal signal |
| **Issue tracker (Jira, etc.)** | Support tickets, bug reports, feature requests as *quantitative* recurrence signal |

**Graceful degradation:** Drive → Gong/Zoom → Notion → local disk → ask. Never block on one connector; note the gap and proceed. Record what was found in a source ledger at the top of the synthesis.

> **Context discipline:** don't load the whole corpus at once. List files first, sample 2–3 to confirm relevance, then process in batches of 5–10. Keep every quote tied to its source file.

## Workflow

Process in passes and **report progress at each batch** rather than going dark until the end.

### Phase 1 — Frame & inventory
Confirm the question and scope. List files in scope with metadata only (name, owner, date, type). Drop obvious non-transcripts and duplicates. Show the inventory and confirm before processing. Cap ~30 files per pass; batch if more.

### Phase 2 — Sample for relevance
Read 2–3 files in full to confirm the corpus matches expectations (search is noisy). Report file structure, whether participants are identifiable, and any red flags (empty files, sales-draft emails). Adjust the corpus before committing.

### Phase 3 — Code (first pass)
For each file, extract short **codes** (`onboarding-step-3-confusion`, `wants-bulk-import`) and pair each with 1–3 **verbatim** quotes plus a participant ID (anonymized) and location (line/timestamp). Report at batch level: `Batch 2/5 — 14 codes from 8 files; top codes so far: …`.

### Phase 4 — Cluster into themes
A theme requires: a central-organizing-concept statement (not a topic label); **≥3 codes from ≥2 different sources**; 2–4 supporting verbatim quotes with citations; a **count** of supporting sources; and any **counter-evidence** in the corpus (actively look for it — don't flatten dissent). Codes that don't cluster go in a **Weak signals** section, not elevated to themes.

### Phase 5 — Draft the synthesis

```markdown
# <Question> — Synthesis as of YYYY-MM-DD
**Corpus:** N files from <sources>, dated <range>, segment <filter>
**Method:** Open coding → thematic clustering (≥3 codes / ≥2 sources per theme)

## Headline
<One-sentence answer — confidence: High / Medium / Low / Mixed>

## Themes
### 1. <Theme statement> (7 of 18 participants; corroborated by 12 of 60 tickets)
- Observation: <what the data shows>
- Interpretation: <what it likely means — labeled as interpretation>
- Supporting quotes:
  - "<verbatim>" — P4, 2026-04-12 ([source](link))
  - "<verbatim>" — P9, 2026-04-18 ([source](link))
- Counter-evidence: <none / one note from P12>
- Confidence: High / Moderate / Low
- Recommendation: <build / research more / discuss / monitor — labeled as recommendation>

## Weak signals (too few sources to call a theme)
- <code> — single source: P7

## What this synthesis is NOT
- Not statistically representative (qualitative sample of N)
- Doesn't cover: <segments / regions excluded>

## Suggested next steps & open questions the corpus can't answer
```

**Check-in:** show the theme list and headline before finalizing so the PM can spot a missing or over-claimed theme.

### Phase 6 — Save & report
Save to `meeting-notes/YYYY-MM-DD-synthesis-<slug>.md` (or publish to Confluence/Notion). Report theme count, weak-signal count, sources processed vs. excluded, and follow-ups.

## Routing after synthesis
| Outcome | Route to |
|---|---|
| Themes point to a build opportunity | `discovery` (validate & decide) |
| Themes should feed a customer AI engagement | `genai-poc-strategy` (as Align evidence) |
| Themes are ready to become backlog items | `story-refinement` |
| Synthesis should go up to stakeholders | `stakeholder-digest` |

## Guardrails
- **Cite or skip.** No claim without a source. Tempted to generalize with no quote? It's an "open question the corpus can't answer," not a theme.
- **Never fabricate a quote.** A verbatim quote is copied exactly; a paraphrase is labeled as such and never wrapped in quotation marks. This is the single most important rule.
- **Counts, not fake percentages.** "7 of 18 participants," not "39%." A single source is an outlier, not a theme.
- **Surface dissent.** Counter-evidence belongs *in* the theme. Reporting only the dominant view produces bad product decisions.
- **Honest sample size.** Always state N. Four interviews can be useful; they are not a survey. (The "5 users" rule is for usability testing, not interview saturation.)
- **Separate observation / interpretation / recommendation.** Keep the three tiers distinct so readers can see where evidence ends and judgment begins.
- **Read-only on sources.** Never move, edit, or delete source files.
- **Stop at cited themes.** Synthesis doesn't make the build call — hand off to `discovery` for that.
