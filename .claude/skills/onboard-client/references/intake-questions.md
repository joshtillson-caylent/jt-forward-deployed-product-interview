# Intake Questions

The interview `/onboard-client` runs **every time**, whether or not the SOW is attached. Documents say what was sold. The consultant knows what the engagement is actually about, and the repo has to fit the second.

## How to ask

- Use `AskUserQuestion`: up to 4 questions per call, 2–4 options per question, with "Other" added automatically. Keep headers to 12 characters or fewer.
- **Pre-fill from the documents.** When the SOW, proposal, or sweep already answers a question, make that answer the first option and label it with its source, e.g. `P1: Claude Activation (SOW §1)`. The user confirms with one click instead of retyping, and a wrong extraction gets caught.
- **Never offer an answer the evidence doesn't support.** With no evidence, give neutral options in a sensible order and mark none of them as recommended.
- **Tailor the options** to what's already known. An industry question for a client whose SOW mentions claims processing should lead with insurance, not a generic list.
- Free-text facts (names, dates, repo URLs) don't fit multiple choice. Ask for them in one plain chat message after the structured rounds, listing only what's still missing.
- Skip a question only if the documents answer it unambiguously **and** the answer shows up in the readback (Round R), so the user can still correct it. Rounds 0, 1, 3, the level rounds, and R are never skipped.

## Round 0: Source documents (only when no SOW or proposal is attached)

Ask this first. Say why: the SOW is the contract of record for scope, deliverables, dates, and acceptance, and without it every scope statement in the repo is a hypothesis.

| Header | Question | Options |
|---|---|---|
| `Source docs` | "There's no SOW or proposal attached. It's the contract of record for scope, deliverables, and dates, and without it everything I write about scope is a hypothesis. How do you want to proceed?" | **I'll attach it now:** wait for paths or pastes · **Search EVO & Salesforce:** sweep for the SOW or opportunity by client name · **Search Google Drive:** sweep Drive by client name · **Proceed without it:** hypothesis mode. Scope is marked unconfirmed, and getting the SOW becomes open question #1. |

## Round 1: Engagement shape (always)

| Header | Question | Options (pre-fill first from docs) |
|---|---|---|
| `Level` | "What level is this engagement? (P1–P3 is the complexity ladder; see engagement-levels.md)" | `P1: Claude Activation` (prompts, Projects, skills in the Claude UI) · `P2: Workflow automation` (Claude connected and automating workflows) · `P3: AI-enabled service` (a governed, monitored service the client runs) · `Spans levels` (e.g. P1 → P2; ask which, in chat) |
| `Industry` | "Which industry is the client in?" | The documents' answer first, then the 2–3 most plausible neighbors from `industry-overlays.md` |
| `Foundations` | "Where is the client's team with Claude today?" | `Using it day to day` · `Licensed, low adoption` · `Pilot group only` · `Not licensed yet`. For P2 or P3, anything but the first means a P1 foundations gap (see engagement-levels.md). |
| `Funding` | "How is the engagement funded?" | `Anthropic partner funded` · `Client funded` · `Mixed` · `Not sure yet` |

## Round 2: People and audience

| Header | Question | Options |
|---|---|---|
| `Sponsor` | "Who's the executive sponsor?" | Names or titles found in the documents, one per option · `Not named yet` |
| `Day-to-day` | "Who's your day-to-day contact?" | Names found in the documents · `Same as sponsor` · `Not named yet` |
| `Caylent team` | "Who's on the Caylent side? (select all)" *(multiSelect)* | `Just me (FDPM)` · `Solutions architect / engineer` · `Engagement / delivery manager` · `Account executive` |
| `Audience` | "Who reads what this repo produces?" | `Internal working drafts` · `Client-facing, curated` · `Both` |

Afterwards, in chat: the names, titles, and emails still missing for the team table.

## Round 3: Data, compliance, and repo hygiene (always)

| Header | Question | Options |
|---|---|---|
| `Data` | "What sensitive data could this work touch? (select all)" *(multiSelect)* | Tailor to the industry overlay. Default: `PII` · `Financial / MNPI` · `Health (PHI)` · `Internal only` |
| `Review gates` | "Which approvals gate the work?" *(multiSelect)* | `Security review before connecting systems` · `Legal / compliance sign-off on use cases` · `Client AI acceptable-use policy` · `None known` |
| `Systems` | "Which client systems are in play? (select all)" *(multiSelect)* | The four most likely given the industry and documents, e.g. `Microsoft 365 / SharePoint` · `Google Workspace` · `Salesforce` · `Slack`. Data warehouses and ERPs go under Other. |
| `Doc policy` | "The SOW and client documents carry commercial and legal terms. Track the originals in git?" | `Keep local-only` (gitignored; cited summaries are still committed) · `Track in git` (the repo is private and access-controlled) |

Don't mark `Keep local-only` as recommended unless the user has no stated preference and the repo's visibility is unknown. If they don't know, local-only is the safer default and can be reversed later.

## Round 4: Success and cadence

| Header | Question | Options |
|---|---|---|
| `Success` | "Are success criteria defined?" | `Yes, in the SOW` (confirm them in the readback) · `Partially` · `Not yet` (defining them with the sponsor becomes an early deliverable) |
| `Cadence` | "What's the status reporting cadence?" | `Weekly` · `Biweekly` · `At milestones` · `Not set` |
| `Kickoff` | "Where are we in the timeline?" | `Kickoff not scheduled` · `Kickoff scheduled` (ask for the date) · `Already kicked off` · `Mid-engagement` (backfilling this repo) |
| `Doc home` | "Where do client-facing deliverables live?" | `Google Workspace` · `Microsoft 365` · `Confluence / Notion` · `This repo` (HTML / Markdown) |

## Level round: P1 (when the level is P1, a span that includes P1, or a P2 / P3 with the foundations gap in scope)

| Header | Question | Options |
|---|---|---|
| `Surfaces` | "Which Claude surfaces are the team licensed for? (select all)" *(multiSelect)* | `Claude Enterprise / Team` (claude.ai, Projects, Cowork) · `Claude Code` · `Claude API / Bedrock` · `Not licensed yet` |
| `Baseline` | "What adoption data can we get?" | `Admin console analytics` · `Client survey / self-report` · `Both` · `None yet` |
| `Champions` | "Are champions identified?" | `Yes, named` · `Sponsor will nominate` · `We recruit them` · `Not part of scope` |
| `Format` | "Which enablement formats does the SOW commit to? (select all)" *(multiSelect)* | `Live workshops` · `Office hours` · `Self-serve kit (Skills / Projects / prompts)` · `Train-the-trainer` |

## Level round: P2 (when the level is P2 or P3, or a span that includes either)

| Header | Question | Options |
|---|---|---|
| `Workflow` | "Is the target workflow chosen?" | `Yes, named in the SOW` · `Shortlist, needs selection` · `Not yet` (Assess comes first) |
| `Build on` | "What will it be built on? (select all)" *(multiSelect)* | `Claude Agent SDK` · `Claude Code (headless / scheduled)` · `Claude API on Bedrock` · `Connectors / MCP into Claude Enterprise` |
| `Code home` | "Where will the code live?" | `Client's repo` · `Caylent repo` · `This repo, under build/` · `Not decided` |
| `Access` | "What's the environment access status?" | `Ready` · `Requested, pending` · `Not requested` · `Unknown` |

Afterwards, in chat: repo URLs, AWS account aliases, and the name of the person who owns the human review step.

## Level round: P3 (when the level is P3, or a span that includes it; asked after the P2 round)

| Header | Question | Options |
|---|---|---|
| `Service` | "Is the service being AI-enabled defined?" | `Yes, named in the SOW` · `Shortlist, needs selection` · `Not yet` |
| `Run owner` | "Who runs the service after handoff?" | `Client team, named` · `Client team, not named yet` · `Caylent managed service` · `Not decided` |
| `Governance` | "What AI governance exists today?" | `Established body and policies` · `Policies, no body` · `Needs to be set up (in scope)` · `Unknown` |
| `Observability` | "What will production monitoring run on?" | `Client's existing stack` · `We build it (in scope)` · `Not decided` · `Unknown` |

Afterwards, in chat: the names of the service owner and the governance approver.

## Round R: Readback (always, last)

Before writing anything, show a compact readback of the engagement profile: at-a-glance fields (with the level), scope in and out, deliverable count with the next one due, success criteria, data and compliance constraints, the overlays you'll apply and why, how the site will present the client (brand name, headline description), and the top 3 unknowns. Then ask:

| Header | Question | Options |
|---|---|---|
| `Readback` | "Does this match the engagement? I'll write the workspace from it." | `Looks right, write it` · `Fix something first` (then ask what, correct it, and re-show only the changed lines) |

Nothing gets written to the repo before this is answered, apart from copying originals into `case-file/source/`.
