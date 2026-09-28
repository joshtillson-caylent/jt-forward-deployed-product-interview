# Phase 1 — Align

The Align phase is **discovery**. It establishes the "why" of the engagement — who the customer is, what hurts, and what success looks like — and produces the **value charter** that becomes the scoring lens for every later prioritization decision. Consultants typically spend 1–2 weeks after this phase going back to the customer for demos, interviews, and follow-ups before moving to Assess.

**Work the stages in order. Produce each deliverable, then get the consultant's confirmation before proceeding.** If transcripts or notes are available from the sweep, analyze them first and pre-populate as much as you can before asking the consultant to fill gaps — this saves significant time.

## Deliverables
1. `align/pain-points.md` — pain inventory with source citations
2. `align/discovery-notes.md` — 3–5 synthesized themes
3. `align/discovery-questions.md` — targeted questions for the next client session
4. `align/value-charter.md` — the engagement's guiding constitution

---

## Stage 1 — Client intake

Gather structured context about the customer. If transcripts are available, extract what you can and present it for validation; otherwise walk the questionnaire interactively. **Ask for what's missing — don't invent it.**

| Category | What to capture |
|---|---|
| Company | Name, stage (startup/growth/enterprise), founding context, HQ, target market |
| Leadership | Key stakeholders, domain expertise, decision-making roles |
| Product | Current product, user-base size, active platforms (mobile/web/both) |
| Tech stack | Frontend, backend, hosting, data stores, current AI usage (if any) |
| Team | Size, roles, AI/ML expertise, capacity constraints |
| Revenue model | How they make money today, where AI fits into revenue |
| Business objectives | Why this engagement, what success looks like, funding context |
| Market context | Competitors, market size, positioning, differentiators |

Write the digestible version to `00-engagement-brief.md` (already created in Phase 0) and keep the detail for the value charter. State facts; don't editorialize or pad.

---

## Stage 2 — Pain-point inventory

For each pain surfaced in the sweep, capture in `align/pain-points.md`:

| # | Pain (in the customer's words) | Business function | Frequency / severity | Tried before? | Source |
|---|---|---|---|---|---|

- Write the pain in the customer's own words where possible, and **cite the source**.
- Tag by function (operations, sales, marketing, service, supply chain…).
- If you have no citation, label the pain `hypothesis` so the consultant knows to validate it.
- **Target ≥10 pain points** unless evidence is genuinely thin — quantity here drives the breadth of the Assess long list.

---

## Stage 3 — Discovery-notes synthesis

Synthesize the evidence into **3–5 themes** in `align/discovery-notes.md`. A theme is a cluster of related pains plus the business context around them. For each:
- **Theme name** — short, memorable
- **The pattern** — the pains, statements, and behaviors that point to it
- **What it implies** — the kinds of AI capabilities it opens up
- **Stakeholders** — who owns or feels this most acutely

---

## Stage 4 — Discovery questions

Generate targeted questions to guide the next round of client sessions, written to `align/discovery-questions.md`. The goal is to surface pain-point depth, unstated assumptions, and AI opportunities the current materials don't fully cover.

1. Identify **what's known** — claims and workflows already documented.
2. Identify **what's thin** — where materials are vague, contradict, or skip detail. Common gaps: how decisions are *actually* made vs. how stakeholders describe them; where manual work hides; what's been tried and failed; what "success" means to different stakeholders.
3. Generate questions that close those gaps.

| Category | What to probe | Example |
|---|---|---|
| Pain-point depth | Beyond "what hurts" to cost, who bears it, what's been tried | "Triage takes 14 hours — where does the time actually go?" |
| Workflow reality | How it works vs. how it's described | "Walk me through the last request you handled, step by step." |
| Failed attempts | What they tried and why it didn't stick | "You tried ChatGPT for summaries — what worked, what didn't?" |
| Data reality | Whether the data for a use case actually exists and is usable | "You have 280K records — how many have usable photos? How consistent is the labeling?" |
| Decision-making | Who decides what, and how — surfaces org friction | "When a PM disagrees with the recommendation, who has the final call?" |
| Success definition | Different stakeholders define it differently | "If this delivers exactly what you need, what does that look like to *you* vs. your board?" |
| Edge cases | Where the happy path breaks | "What % of cases don't fit a category, and what happens to them?" |

Group by stakeholder/session. Each question is one sentence, specific to something found (or missing) in the material, with a one-line **why** (what gap it closes). Flag must-ask vs. nice-to-ask. **Keep it to 15–25 questions** — enough to fill gaps without turning discovery into an interrogation.

---

## Stage 5 — Value charter

The value charter is the engagement's **guiding constitution** — short on purpose, usually one page. Write to `align/value-charter.md`:

- **Engagement intent** — why this customer is engaging Caylent (2–3 sentences)
- **Business outcomes** — the 3–5 outcomes they want to drive (revenue, cost, experience, risk, capability), in the customer's business language
- **Value levers** — the categories of value the POC will be measured against
- **Operating principles** — how Caylent and the customer will work together
- **Success criteria** — what makes this POC a success

The **value levers become the dimensions the Assess scoring ladders back to.** Treat them as load-bearing. **Confirm the charter with the consultant before moving to Assess.**

---

## Slideware suggestions (end of Align)
Suggest — don't build — the decks the consultant may want:
- **Discovery Recap** — what we heard, what we understand, what we still need to learn; presented back to the customer for validation.
- **Engagement Roadmap** — where we are (intake done), what's next (deeper discovery), when deliverables land.

## Guardrails
- **Pains are customer-stated, not Caylent-inferred.** No citation → label it `hypothesis`.
- **The charter is the customer's, not Caylent's.** Frame outcomes in business language ("reduce time-to-quote"), not technology ("deploy a RAG pipeline").
- **Resist solutioning.** Align deliberately avoids picking use cases — that's Assess.
- **Write brief and direct.** Tables over prose; no section summaries; every sentence earns its place.
