---
name: discovery
description: Run structured product discovery to decide whether and what to build. Validates the problem with evidence, maps the opportunity space, explores at least three solution options, tests the riskiest assumptions, and ends with an explicit go / no-go recommendation. Use when a PM is scoping a new problem, pressure-testing a feature idea, or deciding whether something is worth building. Do NOT use to theme a raw research corpus (that is research-synthesis) or to polish an already-decided backlog item (that is story-refinement).
---

# Product Discovery

Structured product discovery that ends in a **decision**: is this problem worth solving, and if so, what should we build? The deliverable is a **discovery brief** — an evidence-backed document that closes with a go / no-go recommendation and a plan to test the riskiest assumptions before committing engineering time.

This is a *first pass the PM edits and takes into the team conversation*, not finished strategy. It follows continuous-discovery practice (Teresa Torres): opportunities come from real customer evidence, every target opportunity gets more than one candidate solution, and the biggest unknowns get tested cheaply before build.

## Start here — check in before generating

Before producing anything, confirm three things with the PM. Ask only what you can't already infer from the prompt or the connectors; if it's already clear, state your assumption and move on rather than interrogating.

1. **Goal & decision.** "What decision will this discovery inform, and by when?" (e.g., "should we build bulk-import this quarter?", "is onboarding churn a product problem or a marketing one?"). Discovery without a decision on the other end drifts.
2. **Context & customer.** Who has this problem, which product/customer/segment, and what outcome metric would move if you solved it? If this is a named customer engagement, get the customer name and any account context. If context is thin, that's fine — flag which parts are hypothesis.
3. **Connectors (offer, don't assume).** Tell the PM what you *could* pull from and ask if they want you to — e.g. *"I can ground this in your PostHog behavioral data, Gong/Zoom call transcripts, Jira tickets, Notion research, and Google Drive files if those are connected — want me to sweep them first, or work from what you've given me?"* Never block on a connector; note the gap and proceed.

Then confirm scope in one line and start.

## Discovery vs. research-synthesis — know the boundary

| | **research-synthesis** | **discovery (this skill)** |
|---|---|---|
| Direction | Backward-looking | Forward-looking |
| Input | A raw corpus (interviews, tickets, surveys) | A problem/idea + evidence (often a synthesis) |
| Job | Turn evidence into cited themes | Decide whether/what to build |
| Output | Themes with citations — **no build decision** | Solutions, assumption tests, **go/no-go** |

If the PM hands you a pile of transcripts and asks "what are the themes?", that's synthesis — route there first, then consume its output here. If they ask "should we build X?", that's discovery. When a large un-synthesized corpus exists, run `research-synthesis` first and use its themes as the evidence base for Phase 2 rather than re-processing raw transcripts.

## Connectors (optional, capability-based)

This skill works from the conversation and local files alone and produces honest hypothesis-driven output when nothing is connected. When connectors are available it grounds claims in real evidence. Reference connectors by capability — discover the actual tools available in the current environment rather than assuming a specific vendor.

| Signal you want | Where it usually lives |
|---|---|
| **Behavioral evidence** (where users actually drop off, how often) | Product analytics — PostHog, Amplitude, Mixpanel |
| **Voice of customer** (why, in their words) | Gong / Zoom call transcripts, meeting notes on disk |
| **Recurrence & cost** (how often this bites) | Jira / issue tracker, support tickets |
| **Prior work** | Notion, Confluence, Google Drive, local `meeting-notes/`, prior discovery folders |
| **Account context** (customer engagements) | Salesforce / CRM, internal engagement memory |

Do a quick sweep of whatever the PM opted into, then keep a short evidence ledger (source · found/empty/n/a · what it gave you) at the top of the brief so every downstream claim is traceable.

## Workflow

Work the phases in order. **Produce the artifact for each phase, then pause for a check-in before the next** — discovery is a series of small decisions, not one big dump.

### Phase 1 — Frame the problem
Anchor every answer to evidence or label it `hypothesis — validate`.
- What problem, for whom, how often, how severely? (cite sources)
- What's the desired **outcome** (the metric that would move)? Is this the right problem to solve *now* vs. the team's current goals?
- What happens if we don't solve it?

**Check-in:** confirm the problem framing before mapping opportunities. A wrong problem statement wastes everything downstream.

### Phase 2 — Map the opportunity space
Build a lightweight **opportunity solution tree**: the desired outcome at the root, then the customer needs / pains / desires that ladder to it — phrased *in the customer's language*, sourced from real evidence (not invented). Good opportunity test: "is there more than one way to address this?" If it names a solution ("add a bulk-import button"), it's a solution, not an opportunity — move it down.

Pick **one target opportunity** to pursue and say why (reach × severity × fit with the outcome).

### Phase 3 — Explore solutions (≥3)
Generate **at least three genuinely distinct** approaches for the target opportunity before evaluating any. For each: how well it solves the opportunity, rough effort (S/M/L/XL), key unknowns. Single-option discovery is not discovery — it's a decision looking for justification.

### Phase 4 — Map assumptions & risks
For the leading solution(s), surface the assumptions it depends on across **Cagan's four big risks**: value (will they use/buy it?), usability (can they figure it out?), feasibility (can we build it?), business viability (does it work for the business?). Plot each on **importance × evidence** — the top-right (important, no evidence) are your leap-of-faith assumptions.

### Phase 5 — Plan the riskiest-assumption tests
For the biggest leap-of-faith assumptions, write a **test card** each: hypothesis · the cheapest test that could disprove it · the metric · the pass/fail threshold **committed in advance**. The goal is the smallest experiment that reduces the largest uncertainty — not "build an MVP."

### Phase 6 — Write the discovery brief
Save to `.ai/engagements/<customer-slug>/discovery/YYYY-MM-DD-discovery.md` (customer engagement) or `context/discovery/YYYY-MM-DD-<problem-slug>.md` (internal). Structure:
1. Evidence ledger
2. Problem statement (evidence-backed; hypotheses labeled) + desired outcome
3. Opportunity space (target opportunity called out)
4. Solution options table (pros/cons/effort)
5. Recommended approach + rationale
6. Key assumptions & the tests that will de-risk them (test cards)
7. Open questions
8. **Go / No-Go recommendation** — with a confidence level (High/Med/Low) and the evidence it rests on

**Check-in:** walk the PM through the recommendation and confidence before finalizing.

## Routing after discovery
| Outcome | Route to |
|---|---|
| Go — customer GenAI engagement | `genai-poc-strategy` |
| Go — internal feature ready to break down | `story-refinement` (as an epic or feature) |
| Need to synthesize a research corpus first | `research-synthesis` |
| Decision to communicate up | `stakeholder-digest` (decision memo) |

## Guardrails
- **Cite or label.** Every factual claim cites a source or is marked `hypothesis — validate`. Keep a hard line between *cited evidence* and *model inference*.
- **Never fabricate evidence.** No invented quotes, users, metrics, or personas. "Hypothesis-driven, unvalidated" is an honest and acceptable state; fabricated validation is not.
- **Behavioral > stated > opinion.** Weight what users *do* (analytics) above what they *say* they'd do above general opinion.
- **Three options minimum.** Skip the exploration step and you've skipped discovery.
- **Don't solutionize in Phase 1.** Keep problem framing and solution exploration separate.
- **The AI recommends; the human decides.** Give a clear go/no-go with rationale — the PM owns the call.
