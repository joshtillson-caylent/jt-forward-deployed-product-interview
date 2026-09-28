# Scoring Framework (Assess)

The single, canonical rubric for the Assess phase. Every candidate use case is scored on the same axes with the same weights. Each axis is scored **1–5** (low → high); definitions are concrete so two consultants would score alike.

### 1. Business value — weight 30%
How material is the impact on the customer's business outcomes? Tied directly to the value charter.
- **5** — Top-3 strategic priority; company-defining impact. **4** — Clear, measurable impact on a named outcome. **3** — Plausible but wide range. **2** — Marginal, quality-of-life. **1** — Speculative or symbolic.

### 2. Feasibility within the POC timeframe — weight 20%
Can this reach "credible demo" quality in a typical PXE POC (6–12 weeks)?
- **5** — Off-the-shelf patterns, demo-ready in weeks. **4** — Known pattern, moderate customization. **3** — Doable but real engineering within the window. **2** — Stretch; needs scope compromises. **1** — Not realistic in POC; production-grade ambition.

### 3. Data readiness — weight 20%
Is the needed data available, accessible, and usable?
- **5** — Exists, accessible, clean, governance-cleared. **4** — Exists, minor cleaning/permissioning. **3** — Exists but meaningful work to be usable. **2** — Significant gaps or governance friction. **1** — Core data absent or inaccessible in the POC window (data-gated → `data-gated-features.md`).

### 4. Risk — weight 15% — *inverse axis (higher score = lower risk)*
Considers brand, compliance, model-failure-mode, change-management, operational risk.
- **5** — Internal/low-stakes; failures easy to contain. **4** — Customer-facing but human-in-the-loop / low blast radius. **3** — Customer-facing; some mitigations. **2** — High-stakes/regulated; significant mitigations. **1** — Compliance/legal/brand risk the POC can't absorb.

### 5. Strategic differentiation — weight 15%
Does it create a capability hard to replicate, or that compounds over time?
- **5** — Durable capability (data flywheel, proprietary workflow). **4** — Strong differentiation if executed well. **3** — Modest. **2** — Table stakes. **1** — Nothing differentiating.

## Total
`Total = Business Value×0.30 + Feasibility×0.20 + Data Readiness×0.20 + Risk×0.15 + Strategic Differentiation×0.15` — max 5.0.

Default tier thresholds (adjust per engagement, and document the adjustment in `tier-summary.md`):
- **Tier 1** ≥ 3.8 — POC build candidates
- **Tier 2** 3.0–3.79 — strong next-phase backlog
- **Tier 3** < 3.0 — park for later

## Scoring discipline
- Score **every** candidate on the long list, not just the favorites — dropouts surface useful patterns.
- Two rationale sentences per axis is plenty; if you need more, the candidate needs decomposition first.
- Don't inflate Strategic Differentiation to rescue a favored idea — it's the smallest weight precisely because it's the easiest axis to fudge.
- A score is not a verdict. Tier placement is informed by score, but the consultant makes the final call — document any override.

## Tie-breakers (candidates within 0.1)
1. Prefer the one pulling a value lever the customer named as a top priority.
2. Prefer the one whose shared features lift other candidates.
3. Prefer the one with the faster path to a measurable result.
