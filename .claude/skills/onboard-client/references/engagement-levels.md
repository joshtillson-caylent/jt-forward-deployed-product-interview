# Engagement Levels (P1–P3) and Repo Overlays

How `/onboard-client` fits the workspace to the engagement's level. Each level has a definition, the intake questions that only matter at that level (see `intake-questions.md`), an **overlay** (extra folders and seed files copied from `templates/overlays/`), guardrail lines for CLAUDE.md, and the recommended next skills.

## The ladder

P1–P3 describe **the complexity of the work**. Each level builds on the one before it, and the client's Claude implementation matures as it climbs. (Definition from Josh Tillson, 2026-09-30. It's consistent with how Anthropic-partner funding refers to "P1 activations" and "P2 agentic workflow builds" in EVO. Confirm with Alliances before quoting the labels to a client.)

| Level | What the work is | The client ends up with | Typical surfaces |
|---|---|---|---|
| **P1: Claude Activation** | Getting people using Claude on their real work, in the Claude UI: prompts, Projects, skills, champions, ways of working. Caylent's packaged version is **Claude Activation Catalyst** (4 weeks, Assess → Enable → Handoff). | A team that uses Claude on recurring workflows and owns that use itself | Claude Enterprise / Team (claude.ai, Projects, Skills, Cowork) |
| **P2: Workflow automation** | Going further: Claude connected to the client's systems and automating parts of a workflow, triggered or scheduled, with a person reviewing the output. Caylent's catalog analog is **Agentic Workflow Transformation**. | One or more workflows that run with Claude in the loop, measured against the manual baseline | Connectors / MCP, Claude Code (headless or scheduled), Claude Agent SDK, Claude API on Bedrock |
| **P3: AI-enabled service** | The most mature level: Claude embedded in how a business service is delivered. Several connected workflows and agents, run in production, governed, monitored, and owned by the client's operating model. | A service the client runs and improves themselves, with the governance, monitoring, and ownership that production requires | Everything in P2, plus production infrastructure, observability, evals in production, and governance |

**Spans.** An SOW can cover more than one level, usually as a sequence (activate the team, then automate a workflow they trust). Record it as `P1-P2` or `P2-P3`, and apply the overlays for every level in the span.

**Foundations.** Levels build on each other. A P2 or P3 engagement for a client whose team doesn't use Claude day to day yet has a gap at P1. Ask about it (intake level round, `Foundations`). If the gap is real and the SOW covers it, add the P1 overlay. If the SOW doesn't cover it, add "P1 foundations missing" to the profile's risks and to the discovery questions.

When the SOW names the level or offering, use its wording and cite it. When the SOW and these definitions disagree, the SOW wins for this engagement. Note the disagreement in the profile, because it's a sign these definitions need updating.

## Overlays by level

| Level | Overlays applied |
|---|---|
| P1 | `enablement/` |
| P2 | `build/`, plus `enablement/` if the SOW includes enablement or the foundations gap is in scope |
| P3 | `build/` + `service/`, plus `enablement/` on the same condition as P2 |
| Span | The union of the levels in the span |
| Other | None by default (see below) |

Copy each overlay with `cp -Rn "${CLAUDE_SKILL_DIR}/templates/overlays/<p1|p2|p3>/." .`. The `-n` never overwrites. The site's sidebar shows the new folders automatically after `node scripts/build-site-index.mjs`.

## P1: Claude Activation → `enablement/`

| File | Purpose | Seeded from |
|---|---|---|
| `enablement/README.md` | What lives here and how it flows to `deliverables/` | Template |
| `enablement/use-case-backlog.md` | Candidate use cases by team and persona, with status (candidate → piloting → adopted → retired) | SOW scope, proposal, pain points. Each one is `hypothesis — validate` until a user confirms it. |
| `enablement/session-plan.md` | Every workshop, office hours, and training the SOW commits to | SOW deliverables and milestones |
| `enablement/champions.md` | Champion roster | Intake. Usually empty at onboarding. |
| `enablement/adoption-baseline.md` | Seats, active users, usage by team, and the time-saved method, captured *before* enablement starts | Intake and admin-analytics access |
| `enablement/kit/` | Working Skills, Project instructions, prompt kits. Final versions graduate to `deliverables/`. | Empty |

**Guardrails (to `claude-guardrails`):**
- Build enablement assets against the client's real workflows. Use sanitized examples unless the client has approved real data in prompts.
- Measure adoption against `enablement/adoption-baseline.md`. A session without a baseline can't show movement.
- A use case counts as adopted when the team runs it without Caylent in the room, not when a demo lands.

**Next skills:** `/genai-poc-strategy` (Align) → `/interview-guide` for workflow walkthroughs → `/meeting-prep` for the kickoff → `/presentation-builder` for the kickoff deck → `cce-capabilities:value-measurement-framework` for adoption metrics.

## P2: Workflow automation → `build/`

| File | Purpose | Seeded from |
|---|---|---|
| `build/README.md` | What lives here, and where the code lives (usually not this repo) | Template plus the intake answer on code location |
| `build/workflow-inventory.md` | Each target workflow: current steps, volume, owner, pain, target state, human-review checkpoints | SOW scope, proposal |
| `build/integrations.md` | Systems and connectors, access status, environments | SOW client dependencies, intake answers |
| `build/decisions.md` | Decision log | Choices the SOW already fixes (e.g. "hosted on Bedrock") |
| `build/evals.md` | Success metrics, test sets, thresholds to ship, sign-off owner | SOW acceptance criteria and success metrics |

**Guardrails:**
- No credentials, keys, tokens, or connection strings in this repo, ever. Reference where secrets live.
- Client data samples only in the form the client approved (sanitized, synthetic, or explicitly cleared). Record the approval in `build/decisions.md`.
- Every automated workflow has a named human review step before its output reaches a customer, a ledger, or a system of record. Design it in; don't bolt it on.
- Code lives in `<repo named in the profile>`. This workspace holds the product thinking: specs, decisions, evals, status.

**Next skills:** `/discovery` on the target workflow (a go / no-go on automating it) → `/task-planning` for the build plan → `/genai-poc-strategy` (Assess) if the workflow isn't chosen yet → `cce-capabilities:data-readiness-evaluation`, `cce-capabilities:use-case-deep-dive`.

## P3: AI-enabled service → `build/` + `service/`

Everything in P2, plus the layer that turns workflows into a service the client runs.

| File | Purpose | Seeded from |
|---|---|---|
| `service/README.md` | What lives here, and how it relates to `build/` | Template |
| `service/service-blueprint.md` | The service end to end: who it serves, the channels, what Claude does at each step, where people stay in the loop, and the service levels | SOW scope, proposal |
| `service/operating-model.md` | Who owns and runs it after handoff: RACI, support tiers, the change process for prompts and agents, cost ownership | SOW roles and responsibilities, intake |
| `service/governance.md` | Policies, approval gates, model and prompt change control, risk register, audit and logging, incident response | Intake review gates, industry overlay, SOW security terms |
| `service/run-and-monitor.md` | Production metrics, evals in production (drift), alerting, dashboards, cost tracking, runbook index | SOW success criteria, `build/evals.md` |
| `service/maturity-roadmap.md` | Where the client sits on P1 → P3 today, and the steps to the next level | Intake (`Foundations`, rollout), SOW |

**Guardrails (in addition to P2's):**
- Nothing reaches production except through the client's change process. Record each approval in `service/governance.md`.
- Every agent or workflow in the service has a named owner, an eval suite, monitoring, and a rollback path before it goes live.
- Design for handoff from day one. If only Caylent can run it, it isn't an AI-enabled service yet.

**Next skills:** `/task-planning` for the service build-out (multi-phase) → `/discovery` on the service's riskiest assumption → `cce-capabilities:implementation-roadmap`, `cce-capabilities:gap-analysis` for the maturity roadmap → `/genai-poc-strategy` (Design) for personas and journeys of the people the service serves.

## Other

Advisory, assessment-only, platform or data work, or anything that isn't on the ladder. No overlay by default. Fit the workspace with the core files only, and propose at most one extra folder if the SOW's deliverables clearly need one (e.g. `assessment/`). Confirm it with the user before creating it, and add a matching `SECTIONS` entry (`optional: true`) to `site/workspace.config.js` so it shows up on the site.
