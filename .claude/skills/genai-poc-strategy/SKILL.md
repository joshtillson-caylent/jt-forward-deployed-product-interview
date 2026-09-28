---
name: genai-poc-strategy
description: Produce a first-draft Caylent PXE (Product & Design) GenAI Proof-of-Concept engagement package for a target customer. Drives the Align → Assess → Design lifecycle — client intake and discovery, a long list of AI use cases narrowed to a defensible top-3 recommendation with a scoring matrix and build sequence, then personas, journeys, use-case deep dives, and a value-measurement framework. Grounds every claim in evidence from connected systems and local files, and checks in with the consultant at each phase. Use to kick off or re-baseline a GenAI POC engagement, or to build any single phase (align / assess / design) standalone.
---

# GenAI POC Engagement (PXE)

Produces the **first-draft engagement package** for a Caylent **PXE (Product & Design)** GenAI Proof-of-Concept. PXE work is primarily Product and Design — personas, journeys, use-case design, value measurement — with the supporting strategy artifacts (value charter, scoring, top-3 recommendation) the team produces alongside.

It orchestrates three phases that mirror how the PXE team actually runs these engagements:

1. **Align** — client intake, pain-point capture, discovery questions, value charter
2. **Assess** — use-case long list → feature decomposition → scoring → tiering → build sequence → top-3
3. **Design** — personas, user journeys, use-case deep dives, value-measurement framework

Phase 3 (Design) is where most of the PXE craft lives; Align and Assess set the lens those design artifacts are built against. The deliverable is never a finished plan — it's a defensible, evidence-grounded **first pass** the consultant edits and brings into the customer conversation.

## Start here — check in before you generate

This is a consulting engagement, not a form-fill. Open by understanding how the consultant wants to use the skill, then gather what's needed. Ask only what you can't already infer from the prompt, local files, or connectors.

1. **Goal & scope of this run.** *"Are we running the full Align → Assess → Design lifecycle, re-baselining after new discovery landed, or building just one phase? And who's the audience for the output — an internal working draft, or something headed toward the customer?"*
2. **Customer & context.** Get (or confirm) the essentials, and *ask for what's missing rather than inventing it*:
   - Customer name (required) and industry / vertical
   - Primary contacts on the customer side and their roles
   - Known pain points, business goals, or the reason they engaged Caylent
   - Any funding/timeline context (investor demo dates, POC window, competitive pressure)
   If the consultant only has a name, say what you have and what you'll need to fill in, then proceed with what the connectors surface.
3. **Connectors (offer, don't assume).** *"I can ground this in real customer evidence if you want — Gong/Zoom call transcripts, the Salesforce account, Notion/Confluence playbooks and prior POC writeups, internal engagement memory (EVO), Slack account-channel signal, Google Drive files, and prior engagement folders on disk. Which of those are connected, and want me to sweep them before I write anything?"* Never block on a connector — note the gap and continue with what's available. See [`connector-playbook.md`](connector-playbook.md).

Confirm scope + customer + which connectors you'll use in one line, then start Phase 0.

## Check-ins throughout

Between every phase, **pause and confirm** before moving on — each phase's output is the input to the next, so a wrong turn compounds. At minimum, check in:
- After the **evidence sweep** — "here's what I found and where the gaps are; good to proceed on this basis?"
- After the **value charter** (end of Align) — this becomes the scoring lens; confirm it before scoring anything.
- After the **top-3 recommendation** (end of Assess) — confirm the three before deep-diving them in Design.
- Whenever evidence is thin enough that you'd be guessing — surface it as a question, don't paper over it.

## Inputs

**Required:** customer name.
**Strongly preferred:** industry/vertical · customer-side contact(s) · known pains/goals · phase to run (`align` | `assess` | `design` | `all`, default `all`) · connector hints (specific Slack channels, call titles, Notion pages, account IDs).

## Required outputs

Write everything under a customer-scoped engagement folder:

```
.ai/engagements/<customer-slug>/YYYY-MM-DD/
├── 00-engagement-brief.md          # customer, scope, evidence ledger, status
├── align/
│   ├── pain-points.md
│   ├── discovery-notes.md
│   ├── discovery-questions.md      # targeted questions for the next client session
│   └── value-charter.md
├── assess/
│   ├── use-case-inventory.md       # the long laundry list (15–30 candidates)
│   ├── feature-decomposition.md
│   ├── scoring.md
│   ├── data-gated-features.md
│   ├── tier-summary.md
│   └── build-sequence.md
├── design/
│   ├── personas.md
│   ├── user-journeys.md
│   ├── use-case-deep-dives.md      # one section per top-3 use case
│   └── value-measurement.md
└── top-3-recommendation.md         # executive summary of the top 3
```

When a phase is skipped, omit its folder — don't create empty stubs.

## Phase guides (authoritative specs)

Each phase has a self-contained guide with its stages, output structure, and guardrails. Follow the guide for the phase you're running:

- **Phase 0 + evidence sweep:** [`connector-playbook.md`](connector-playbook.md)
- **Phase 1 — Align:** [`1-align-guide.md`](1-align-guide.md)
- **Phase 2 — Assess:** [`2-assess-guide.md`](2-assess-guide.md) (scores use [`2-assess-scoring-framework.md`](2-assess-scoring-framework.md) — the single rubric)
- **Phase 3 — Design:** [`3-design-guide.md`](3-design-guide.md)

## Workflow

### Phase 0 — Scope & evidence sweep (always run)
1. Resolve `customer-slug` (lowercase, hyphenated — e.g. `pampered-chef`).
2. Create the engagement folder under `.ai/engagements/<customer-slug>/YYYY-MM-DD/`.
3. Run the connector sweep per [`connector-playbook.md`](connector-playbook.md) for whatever the consultant opted into. Record found / searched-but-empty / unavailable for each source.
4. Write `00-engagement-brief.md` — customer, industry, contacts, known goals/pains, phases to run, and the evidence ledger.
5. **Check in** with the consultant on what surfaced before generating content.

### Phase 1 — Align → [`1-align-guide.md`](1-align-guide.md)
Client intake, pain-point inventory, discovery-question generation, and the value charter. The **value charter becomes the scoring lens for Assess** — every later prioritization must ladder back to it. Confirm the charter before proceeding.

### Phase 2 — Assess → [`2-assess-guide.md`](2-assess-guide.md)
Long list of use cases → feature decomposition → scoring with the single rubric → data-gated flags → tier summary → build sequence → `top-3-recommendation.md`. **If internal engagement memory (EVO) is connected,** pull adjacent same-industry engagements before building the long list — the fastest way to seed a credible 15–30 candidate list. Confirm the top-3 before Design.

### Phase 3 — Design → [`3-design-guide.md`](3-design-guide.md)
Personas → user journeys → use-case deep dives (one per top-3) → value-measurement framework. **If Notion/Confluence is connected,** search for prior PXE persona libraries or POC writeups for this vertical before starting from a blank page.

### Phase 4 — Wrap-up (always run)
1. Update `00-engagement-brief.md` with a "Status & next steps" section.
2. List open questions for the consultant to take to the customer — only items that need human judgment, not items more research could answer.
3. **Slideware suggestions** — at the end of each phase, suggest (don't build) the decks the consultant may want, with the key content each should cover (e.g. Discovery Recap, Prioritization Overview, Executive Readout). The guides list the common ones per phase.
4. Report where deliverables live, what evidence was used, and what gaps remain.

## Guardrails
- **Problem first, not tech first.** Anchor every use case to a customer pain and a value lever, never "here's a cool model." Most GenAI pilots fail from starting with the technology.
- **Run the "when NOT to use GenAI" gate.** If a candidate is better served by rules, classic ML, or plain software — or demands exactness GenAI can't guarantee — say so. Recommending GenAI where it doesn't fit erodes trust. (See the Assess guide.)
- **Cite your sources.** Inline citations for any quote, statistic, or specific claim: `[Source: Gong call "Discovery 2026-04-12"]`, `[Source: Salesforce opp #006…]`. Keep a hard line between cited evidence and consultant hypothesis.
- **No fabricated evidence.** If a connector returned nothing, write "no prior evidence found — hypothesis-driven," never invented content.
- **Score with the framework, not vibes.** [`2-assess-scoring-framework.md`](2-assess-scoring-framework.md) is the single rubric. If it feels wrong, update the rubric — don't invent ad-hoc weights per engagement.
- **Top-3 must be traceable.** Each recommendation traces to (a) a pain in `align/pain-points.md`, (b) a score in `assess/scoring.md`, (c) a value lever in `align/value-charter.md`.
- **Customer-first language.** Plain business English, the customer's own terminology — not Caylent-internal jargon, not model names in customer-facing artifacts.
- **Scores are starting points, not verdicts.** The matrix structures the client discussion; the consultant makes the call. Document any override.
- **The AI drafts; the consultant owns it.** This is a first pass to edit and bring to the customer — not a finished deliverable.
