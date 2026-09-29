# Evidence: Claude in Finance and FP&A

Backs slides 3 and 7 of the kickoff deck. Researched 2026-09-28. Every item was checked against its source URL unless marked **unverified**.

## Anthropic's own finance team (closest FP&A analog)

- Alice Fong (corporate finance and strategy) says Claude frees 10–20 hours a week. She uses it for variance analysis against forecast in monthly reviews, checking the board deck narrative for consistency, model diagnostics across tabs, and first-pass commentary in the team's voice.
- Quotes: "I edit from there." Claude "holds the integrity layer underneath the work, so my time goes to the narrative on top."
- https://claude.com/blog/how-anthropics-finance-team-uses-claude-to-shape-the-narrative-behind-the-numbers
- **Unverified:** "~150 shared finance Skills" (appears only in secondary coverage).

## Named customers

| Customer | Metric | Source |
|---|---|---|
| NBIM (Norges Bank Investment Management) | ~20% productivity gain (~213,000 hours); 600+ active users in 2 months; 50-person AI Ambassador network | https://claude.com/customers/nbim · https://finovate.com/anthropic-launches-claude-for-financial-services/ |
| AIG | Underwriting review timeline compressed >5x; data accuracy 75% → 90%+ | https://www.anthropic.com/news/claude-for-financial-services |
| Campfire (accounting platform) | Monthly close 3 days faster; bank reconciliation time −90%; reporting time −50% | https://claude.com/customers/campfire |
| Brex | 75% of expense transactions automated | https://claude.com/customers/brex |
| IG Group | Analytics saves 70 hrs/week; full ROI in 3 months | Anthropic deployment guide (below) |
| Moody's | Credit memo prep 40 hours → 2 minutes | Anthropic deployment guide (below) |

## Anthropic's recommended pattern (human in the loop)

- "Users stay firmly in the loop—reviewing, iterating on, and approving Claude's work before it goes to a client, gets filed, or is acted on." (https://www.anthropic.com/news/finance-agents)
- *Claude for the financial industry: A practical deployment guide* (May 2026), p.15: good first work "follows a standard shape, and gets reviewed by a senior person before it ships." "Avoid piloting Claude on novel or high-stakes work." Pilot metric: "how often a user keeps Claude's draft without a meaningful rewrite." Adoption phases: **Foundation → Pilot → Scale**. (https://www-cdn.anthropic.com/files/4zrzovbb/website/34783bca828d7fa331f515ced26f1c9232151b2c.pdf)
- Claude for Excel docs: not recommended for "final client deliverables without human review" or "audit-critical calculations without verification." (https://claude.com/docs/office-agents/excel)

## Anthropic product terms used in the deck

- **Claude for Financial Services** (July 15, 2025): MCP connectors (FactSet, S&P Global, PitchBook, Snowflake, Databricks, and others).
- **Claude for Excel**: cell-level citations; edits values without breaking formulas. Now GA.
- **Agent Skills** (Oct 16, 2025). Financial-services skills include comps, DCF, due diligence packs, and earnings analyses.
- **Finance agent templates** (May 5, 2026), including **Month-end closer** ("runs the close checklist, prepares journal entries, and produces close reports") and **General ledger reconciler**. (https://www.anthropic.com/news/finance-agents)
- **"Building effective agents"**: *workflows* follow predefined code paths, while *agents* direct their own tool use. Advice: "find the simplest solution possible." (https://www.anthropic.com/engineering/building-effective-agents)
- Customization building blocks from the deployment guide: **connectors**, **skills**, **plugins**. Surfaces: Chat, Cowork, Code, Claude Managed Agents.

## Anthropic partner engagement tiers

- Caylent gets three types of engagement from Anthropic as a partner. They're engagement types, not phases of how Caylent runs an engagement.
- **Tier 1: Claude Activation.** This engagement. Getting a team using Claude on its real work: Projects, Skills, prompt kits, champions.
- **Tier 2: agentic workflows and automation.** Going beyond prompting and skills to connected, automated pipelines (connectors/MCP, Claude Agent SDK). Slide 8 positions this as the follow-on.
- Tier 3 isn't used in the deck.
- **To do:** confirm Anthropic's official names and definitions for the tiers. The EVO lookup hit a Notion auth wall on 2026-09-28, so the current wording is Josh's.

## Caylent references (from EVO, internal; confirm before quoting)

- **Claude Activation Catalyst** is Caylent's packaged activation offer: 4 weeks, Assess → Enable → Handoff. Required sessions are Champions & Use Cases and Measurement, ROI & Scaling. Useful as a sanity check on the 30-day shape.
- **Agentic Workflow Transformation** is listed in the catalog as an agentic rebuild of one business workflow (finance included).
- **Finance references:** no completed Caylent FP&A case study exists yet. The closest is a scoped (not delivered) FP&A forecasting agent plus variance-analysis specs for a large media/data company's finance org. If mentioned, describe it as scoped work, not as a result.
