# Phase 2 — Assess

The Assess phase moves from "what hurts" to "what to build." It produces the **long laundry list** of candidate AI use cases, decomposes the promising ones into features, scores them all with a single rubric, flags data-gated work, and recommends a build sequence — culminating in a defensible **top-3 recommendation**. This is the key decision-making artifact of the engagement.

**Prerequisites:** the Align outputs (`pain-points.md`, `value-charter.md`) plus any enriched discovery gathered since. If the value charter doesn't exist, run Align first — scoring has no lens without it.

**Work the stages in order; confirm each deliverable before proceeding.**

## Deliverables (in order)
1. `assess/use-case-inventory.md` — the long list (15–30 candidates)
2. `assess/feature-decomposition.md` — features for the promising candidates
3. `assess/scoring.md` — every candidate scored with the single rubric
4. `assess/data-gated-features.md` — features blocked by missing/locked data
5. `assess/tier-summary.md` — Tier 1 / 2 / 3 with rationale
6. `assess/build-sequence.md` — recommended POC build sequence
7. `../top-3-recommendation.md` — executive summary of the top 3

---

## Stage 1 — Use-case inventory (long list)

**Aim for 15–30 candidates.** This is deliberately broad — give the customer a panoramic view of the possible before narrowing. For each, in `assess/use-case-inventory.md`:

| # | Title | One-sentence description (what the AI does, for whom) | Pain link | Value lever | Class |
|---|---|---|---|---|---|

`Class` = generation · summarization · retrieval/RAG · classification · extraction · prediction · agentic workflow.

Sources of inspiration: the Align pain inventory (primary), industry/vertical patterns, adjacent EVO engagements, and common GenAI archetypes (knowledge assistant, content generation, customer chatbot, internal copilot, document understanding, agentic automation, personalization, anomaly detection). **Resist filtering here** — even unlikely use cases belong on the list. Filtering happens via scoring, not gut.

---

## Stage 2 — The "when NOT to use GenAI" gate

Before decomposing, run each promising candidate through a quick fitness gate. Flag — don't silently drop — any where GenAI is the wrong tool:
- The output must be **exact/deterministic** every time (calculations, compliance thresholds) → rules or classic software.
- It's fundamentally **forecasting or optimization** on structured data → classic ML / OR, not a language model.
- **Error tolerance is near-zero** and there's no human in the loop to catch mistakes.
- A **simpler technique already solves it** well enough.

Recommending GenAI where it doesn't fit is the fastest way to lose customer trust. Note the better-fit approach in the inventory and let it score accordingly (feasibility/risk will reflect it).

---

## Stage 3 — Feature decomposition

For the top ~8–10 candidates (a gut-pick subset before formal scoring), break each into the features that make up a minimum-credible POC, in `assess/feature-decomposition.md`. This matters because many use cases share features (RAG over the same corpus), some features are themselves data-gated, and "a chatbot" is too coarse to score honestly.

A feature has: a name · a one-line description · a primary data dependency · a delivery surface (chat, email, dashboard, API) · current state (exists / partial / not at all).

---

## Stage 4 — Score every candidate

Use [`2-assess-scoring-framework.md`](2-assess-scoring-framework.md) — **the single rubric; do not invent ad-hoc weights.** Score every candidate on the long list, not just the decomposed ones. Each gets a row with per-axis scores, a weighted total, and a **one-line rationale per axis** (mandatory — a score without rationale is useless in a client conversation). Sort descending. This table is the primary artifact.

---

## Stage 5 — Data-gated features

A **data-gated feature** can't proceed without specific data that doesn't exist in usable form, or exists but is locked behind permissions/quality/compliance. For each, in `assess/data-gated-features.md`:

| Feature | Gating data asset | Current state (exists/partial/missing/locked) | Action to unblock | Est. effort to unblock |
|---|---|---|---|---|

A data-gated feature isn't a bad feature — it's a *later* feature. The build sequence should position prerequisite work (event logging, data collection) early so these become feasible in later phases. This list is one of the most valuable artifacts of the whole engagement: it converts "AI is hard" into specific, actionable data decisions.

---

## Stage 6 — Tier summary

In `assess/tier-summary.md`, place each candidate:
- **Tier 1** — POC build candidates: high value, achievable in the POC window, data-feasible. **The top-3 lives here.**
- **Tier 2** — strong but lower-value or with addressable data gaps; the next-phase backlog.
- **Tier 3** — interesting but premature: speculative, data-gated, or low-value for now.

Score informs tier; the consultant makes the final call. Document any override and why.

---

## Stage 7 — Build sequence

In `assess/build-sequence.md`, group the top candidates into phases. Consider, in priority order:
1. **Dependencies** — X blocks Y → X first, regardless of score.
2. **Platform setup cost** — the first phase is the most expensive (it stands up the AI platform); group features that share infrastructure.
3. **Data flywheel** — features that generate data for later features come earlier.
4. **Demo appeal** — if investor demos/funding milestones matter, favor compelling demos early.
5. **Revenue timeline** — if the customer needs revenue fast, favor direct-revenue features.

Pick a **"lighthouse" first use case** — cleanest value story, fewest dependencies — to build customer confidence early. For each phase: which features, a 2–3 sentence rationale for its position, and a numbered build order with one-line justifications. Call out parallelizable workstreams when the customer has capacity.

---

## Stage 8 — Strategic direction (surface close calls)

When scoring reveals close calls (candidates within ~0.2 of each other, or two competing paths that both score well), surface the tension **as a decision for the customer**: present both options with scores and rationale, distinguish **strategic ceiling** (long-term upside) from **launch readiness** (how fast it delivers value), and don't make the call — frame the trade-off clearly so the customer decides with full context.

---

## Stage 9 — Top-3 recommendation

Write `../top-3-recommendation.md` — a 1–2 page executive summary. For each of the three:
- **Use case** — name + one-sentence description
- **Why this one** — the pain it solves, the value lever it pulls, its score, its feasibility
- **What the POC would build** — feature list, surface, scope
- **Headline value hypothesis** — the directional outcome the POC will measure
- **Top risks** — 1–3 (data, change management, model quality)
- **What we'd measure** — leading and lagging metrics (expanded in Design)

**Confirm the top-3 with the consultant before starting Design.**

---

## Slideware suggestions (end of Assess)
Suggest — don't build:
- **Prioritization Overview** — the tier table, weights, and what tiers mean. The single most important slide of the engagement.
- **Build Sequence** — phased visual with one-line rationale per phase.
- **Strategic Tensions** — any close calls as Option A vs. B with implications.
- **Data-Gated Features** — what's needed and when each becomes viable.

## Guardrails
- **Breadth before depth.** Don't narrow until scoring is done.
- **One rubric.** All scoring uses the framework file. If it feels wrong, update it — don't work around it.
- **Rationale is mandatory** — one line per axis, punchy and specific. If it needs more, the candidate needs decomposition first.
- **Trace every top-3 pick** to its pain, value lever, and score.
- **Data honesty.** An exciting but data-gated use case goes in Tier 2 unless the unblock is genuinely cheap.
