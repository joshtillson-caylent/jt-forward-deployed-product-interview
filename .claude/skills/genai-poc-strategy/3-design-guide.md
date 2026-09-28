# Phase 3 — Design

The Design phase deep-dives the **top-3 use cases** from Assess. It moves the engagement from "what to build" to "how to build it well" — the people who use it, the journeys it changes, how the AI behaves, and how value gets measured. This is a **product owner's deliverable**: who the users are, what gets built and why, how users experience it, and how success is measured.

**Prerequisites:** Align's `value-charter.md`, and Assess's `use-case-inventory.md`, `scoring.md`, `tier-summary.md`, and `top-3-recommendation.md`. If missing, run the prior phases first. **Work the stages in order; confirm each before proceeding.**

## Deliverables
1. `design/personas.md` — personas materially affected by the top-3
2. `design/user-journeys.md` — current-state and AI-augmented journeys
3. `design/use-case-deep-dives.md` — one deep-dive per top-3 use case
4. `design/value-measurement.md` — leading/lagging/guardrail metrics, baselines, realization scenarios

---

## Stage 1 — Persona mapping

Create personas for the customer's primary user types (max ~5). A persona earns a section only if **materially affected** by one of the top-3 — these are *workflow* personas, not broad demographics. Ground them in transcripts, not invented backstory; keep each under half a page.

| Field | Guidance |
|---|---|
| Name / role | Realistic, specific enough to inform needs |
| Context | Their situation relevant to the product |
| Goals | 2–3 bullets — what they're trying to accomplish |
| Pains | 2–3 bullets — link back to Align pains |
| Tools today | What they use now |
| **AI readiness** | Comfort with AI tools; where they'll want control vs. automation |
| **Oversight role** | Where this persona reviews/approves AI output (human-in-the-loop) |
| AI touchpoints | Table mapping each touchpoint to a use case |

---

## Stage 2 — User journey mapping

For each top-3 use case, map two journeys in `design/user-journeys.md`:
1. **Current-state** — the workflow today, step by step, with pain points called out.
2. **Proposed AI-augmented** — the same workflow with the POC capability, calling out exactly where AI inserts, what hand-offs change, and what stays the same.

For AI journeys, cover the moments generic journeys miss: onboarding/first use, building confidence, **explainability** (how the user knows why the AI did what it did), **the human-in-the-loop review step**, and the **failure / fallback / escalation** path when the AI is unsure or wrong. Note the AI capability (maps to use case/feature) and the data needed at each step. A markdown-table journey is fine for the first draft; the consultant can convert to Lucid later.

---

## Stage 3 — Use-case deep dives

One section per top-3 use case in `design/use-case-deep-dives.md`. **Tier depth by Assess tier** — Tier 1 gets full treatment; a Tier 2 that made the top-3 gets problem/personas/happy-paths/risks/metrics; skip nothing critical but don't pad.

For each:
- **Problem framing** — the pain, the persona, the moment in the journey (2–3 sentences); the current alternative; why AI is the right approach here (and confirm it passed the Assess fitness gate).
- **Target personas** — table: Persona | How they use this | Primary benefit
- **Happy-path scenarios** — 2–3 concrete scenarios that read like product demos: a context line, a numbered walk-through (6–8 steps max) showing **what the AI does at each step**, ending with a one-sentence **AI Value** summary.
- **Functional requirements** — what the POC must do.
- **Non-functional requirements** — latency, accuracy targets, content quality, accessibility — with measurable targets.
- **Data requirements** — table: Data source | What it provides | Exists today? | Gap. Plus what data the feature *generates* (feeds the flywheel).
- **Integration surface** — where the AI is exposed (Slack bot, web app, CRM widget, email).
- **Model strategy** — frontier model / RAG / agent / fine-tune / hybrid, with the rationale; prefer the simplest approach that works (prompt → RAG → agentic → fine-tune).
- **Evaluation plan** — how POC quality is judged: a golden set of ~20–50 real cases (including known failures), the mix of automated checks / LLM-as-judge / human review, and what "good enough" means numerically. Evals get harder to build the longer you wait — define them here, not after.
- **Risk register** — top 3–5 risks with mitigations (name the actual risk, not a generic category).
- **POC scope cuts** — what's explicitly out of scope for the POC.

---

## Stage 4 — Value-measurement framework

For each top-3 use case, in `design/value-measurement.md`, define three metric layers plus baselines and scenarios:

- **Leading indicators** (observable during the POC) — adoption (activation rate, repeat use, time-to-first-use), engagement (task-completion rate, turns-to-completion, satisfaction), and eval pass-rate / groundedness.
- **Lagging indicators** (take time) — the business outcomes the use case is meant to move (conversion, revenue attribution, retention impact).
- **Guardrail metrics** — hallucination rate, PII/safety, cost per interaction, latency. **If a guardrail moves the wrong way, pause even if the primary metric looks great.**
- **Baseline** — the current value of each metric, or the plan to capture it *before* build ("we will baseline X by [method]").
- **Measurement plan** — how, by whom, on what cadence.
- **Go / no-go criteria** — what must be met to advance to the next phase, what constitutes a red flag, and the minimum data threshold for any data-gated feature.
- **Value-realization scenarios** — pessimistic / expected / optimistic models. These are what the customer takes to their executive sponsor — treat them as the most important artifact of the phase.

Distinguish leading vs. lagging explicitly so the team knows what to watch at launch vs. three months out.

---

## Executive summary (write last)

If producing the full report, write `.../01-executive-summary.md` last. It stands alone: opening (what they're building, why the engagement) → engagement scope (what Caylent delivered) → use-cases table (Phase | Use case | What it delivers | Est. duration) → 3–5 key recommendations → prerequisites → next steps.

---

## Slideware suggestions (end of Design)
Suggest — don't build:
- **Executive Readout** — engagement summary, use-cases table, recommendations, next steps. Board-ready; stands alone.
- **Use-Case Walkthrough** — one happy-path per Tier 1 use case as a visual demo flow.
- **Roadmap Visual** — phased timeline with tangible outcomes and go/no-go gates.
- **Value-Measurement Dashboard Mockup** — what the customer tracks at launch vs. 3 vs. 6 months.
- **Decision Deck** — any open questions or strategic tensions needing customer input before build.

## Guardrails
- **Top-3 only.** Tier 2/3 use cases get a placeholder in `value-measurement.md` (tracked, no deep-dive).
- **Product language, not jargon.** "Users photograph their furnace and get a lifespan estimate," not "vision API extracts make/model from S3 presigned URLs."
- **The journey owns the AI insertion point.** If a deep dive proposes an AI capability not anchored in a journey step, reconcile the two.
- **Every metric has a baseline plan.** "We will measure X" is incomplete without "we will baseline X by [method]."
- **Personas are grounded, not invented.** No transcript backing → say so.
- **Happy paths read like demos** — specific, concrete, walkable; 6–8 steps.
