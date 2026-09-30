# Source Artifacts

What to ask for, how to read each kind of document, and what to pull out of it. Onboarding is only as good as its sources, so ask for the strong ones explicitly.

## The ladder

| Tier | Artifact | Why it matters | If it's missing |
|---|---|---|---|
| **1: Contract of record** | **SOW** (signed, or the final draft), plus any **change orders** | Scope, deliverables, dates, acceptance, and client dependencies: what Caylent is accountable for | **Prompt for it** (intake Round 0). Offer the EVO / Salesforce / Drive sweep. If the user proceeds without it, every scope line is `hypothesis — validate` and "obtain the SOW" is open question #1. |
| 1 | **Proposal / pitch deck** | Intent, positioning, and the problem as sold. Use it when the SOW isn't signed yet. | Fine if the SOW exists. If there's neither, see above. |
| 2: Account context | Salesforce opportunity, pre-sales handoff notes, AE / SA emails | Who sold it, what was promised verbally, stage, products, dates | Offer the connector sweep. Record the gap in the ledger. |
| 2 | Pre-sales / discovery call transcripts (Gong, Zoom) | The client's own words: stated goals, named people, systems, objections | Offer the sweep. These are the best source for `discovery/align/pain-points.md`. |
| 3: Client materials | Org charts, process docs, current-state artifacts, data dictionaries, sample outputs | How the work is actually done today | Ask for them in the discovery questions, not now |
| 3 | The client's AI acceptable-use policy and security requirements | Hard constraints on what Claude can touch | If data or compliance answers suggest they exist, add "request the AI use policy" to the discovery questions |
| 3 | Existing Claude usage analytics (P1) | The adoption baseline | Record it as a baseline gap in `enablement/adoption-baseline.md` |

When sources conflict, **the SOW wins on scope, deliverables, and dates.** The proposal and calls explain intent. Record every conflict in `case-file/sow-summary.md` under "Conflicts across sources", with both citations.

## Reading each format

| Format | How |
|---|---|
| PDF | `Read` with `pages` (at most 20 per call, and `pages` is required above 10 pages). Read the whole document, not just the first pages. SOW exhibits and appendices often hold the deliverables table. |
| DOCX | `textutil -convert txt -stdout <file>` on macOS, or the `anthropic-skills:docx` skill for tracked changes and tables |
| PPTX | the `anthropic-skills:pptx` skill (text plus speaker notes) |
| XLSX / CSV | the `anthropic-skills:xlsx` skill. Pricing sheets: record the commercial model only (see below). |
| Google Doc / Sheet / Slides link | the Google Drive connector's read tools, or EVO's `google_docs_read` / `google_sheets_read` / `google_slides_read` |
| Notion / Confluence link | the matching connector's fetch tool |
| Pasted text | Save it verbatim to `case-file/source/<date>-<slug>.md` first, then extract from that file so there's something to cite |
| Salesforce URL | EVO tools only (`gcm_chat` or `salesforce_*`). Never `WebFetch` a `*.lightning.force.com` URL. |

Copy every file-based original into `case-file/source/` with a readable name (`sow-2026-09-15-signed.pdf`, `proposal-v3.pdf`) and register it in `case-file/source-index.md` *before* extracting, so citations point at a stable path.

## SOW extraction schema

Pull every field that exists. Cite each one to its section, page, or exhibit (`[Source: SOW §4.2]`, `[Source: SOW Exhibit A, row D3]`). Leave a missing field out rather than guessing it, and list it as a gap.

| Field | Notes |
|---|---|
| Parties & dates | Legal names, effective date, term / end date, SOW number, parent MSA |
| Engagement name & level | As the SOW words it. Map it to a level on the P1–P3 ladder (or a span, or `other`) per `engagement-levels.md`, and cite the words that drove the mapping. |
| Background & objectives | Quote the client's stated problem where the SOW includes it |
| In scope | One bullet per scope item, in SOW order |
| Out of scope / exclusions | Verbatim where possible. These prevent scope creep later. |
| Deliverables | ID, name, description, format, due date or milestone, acceptance criteria. Goes into the tracker in `deliverables/README.md`. |
| Milestones & timeline | Phases, weeks, dates, dependencies between milestones |
| Roles & responsibilities | Caylent roles, client roles, named individuals |
| Client dependencies & assumptions | Access, SMEs, data, licenses, decision turnaround. These are the most common reasons engagements slip. |
| Success criteria / KPIs | With baseline and target if given |
| Acceptance process | Who accepts, how long they have, what happens by default |
| Governance & cadence | Steering committee, status reporting, escalation path |
| Change control | How scope changes happen |
| Data, security, IP terms | Data handling, residency, confidentiality, who owns the deliverables |
| Commercial model | **Type only** (fixed fee / T&M / milestone-based / partner-funded) and the total if the user wants it. **Don't copy rate cards, hourly rates, or discounts** into Markdown unless the user explicitly asks. They stay in the original. |

## Proposal / deck extraction

The problem as sold · proposed approach and phases · value claims and numbers (cite them, and flag any not carried into the SOW) · named client stakeholders · the Caylent team as pitched · case studies referenced · anything promised that the SOW doesn't contain (flag it: expectation risk).

## Transcript extraction

Stated goals and pains, with **speaker attribution** · named people and their roles · systems and tools mentioned · objections and concerns · anything promised verbally. Each pain goes into `discovery/align/pain-points.md` as `[Source: Gong "<call title>" <date>, <speaker>]`.
