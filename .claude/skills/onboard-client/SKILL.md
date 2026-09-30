---
name: onboard-client
description: Fit a freshly initialized engagement workspace to a specific client. Takes the SOW, proposal, and any client context (files, links, transcripts), prompting for the SOW if it's missing and offering an EVO / Salesforce / Drive sweep. Extracts cited facts, runs a structured intake interview (engagement level on the P1-P3 complexity ladder, industry, the client's Claude foundations, people, data and compliance, success criteria), then writes the persistent client context every other skill reads - engagement profile, team, case file, SOW deliverables tracker, discovery seeds, level overlay folders, the CLAUDE.md / README blocks - and customizes the site dashboard for the client before handing off to /publish. Re-run it for a change order, a new SOW, or significant new context. Use after /initialize, in the new workspace. Do NOT use to scaffold a repo (that is initialize) or for ongoing discovery (that is genai-poc-strategy / discovery).
argument-hint: "[paths or links to the SOW, proposal, and other client docs]"
---

# Onboard a Client

Step two of two. `/initialize` produced a client-agnostic workspace. This skill turns it into *this client's* workspace: it reads what was sold, asks the consultant what the engagement is actually about, writes the durable client context that every later session and skill starts from, and dresses the dashboard in the client's identity.

The output isn't a report. It's **state**: files the repo keeps and reuses for the life of the engagement, each fact cited to its source.

## What it writes

| File | Content |
|---|---|
| `context/engagement-profile.md` | The canonical record: level, industry, scope, deliverables, timeline, success criteria, risks, constraints, systems, sources, change log (frontmatter `status: onboarded`) |
| `context/engagement-team.md` | Mission, both teams, stakeholders, ways of working, glossary, key links |
| `case-file/source/` + `source-index.md` | Originals, verbatim, and the index citations point to |
| `case-file/sow-summary.md` | The SOW extracted field by field, cited to section, with conflicts and gaps |
| `case-file/company-profile.md`, `stakeholders.md`, `00-engagement-brief.md` | Who the client is, who's who, and the `genai-poc-strategy` Phase 0 brief with its evidence ledger |
| `deliverables/README.md` (tracker block) | One row per SOW deliverable |
| `discovery/align/pain-points.md`, `discovery-questions.md` | Cited pains and hypotheses; questions ranked by what they unblock |
| `enablement/` (P1), `build/` (P2), `build/` + `service/` (P3) | Level overlay folders, seeded from the SOW and intake |
| `CLAUDE.md`, `README.md` (marker blocks) | Engagement summary, overlay directories, guardrails, git policy, status |
| `site/workspace.config.js` (`site-identity` block) + `site/content-index.js` | The dashboard's client identity (brand, home copy, at-a-glance chips, about text) and a fresh document index |

## References

Read these when you reach the phase that uses them. Don't paraphrase them from memory.

- [`references/source-artifacts.md`](references/source-artifacts.md): the artifact ladder, how to read each format, and the SOW extraction schema
- [`references/connector-sweep.md`](references/connector-sweep.md): finding the SOW and account context in EVO, Salesforce, Drive, Gong, and Slack
- [`references/intake-questions.md`](references/intake-questions.md): the interview, round by round
- [`references/engagement-levels.md`](references/engagement-levels.md): the P1–P3 ladder, overlays per level, guardrails, next skills
- [`references/industry-overlays.md`](references/industry-overlays.md): data classes, commonly relevant regimes, guardrail lines, systems
- [`references/marker-contract.md`](references/marker-contract.md): which block holds what, and the fill rules
- `templates/`: output skeletons. `templates/overlays/p1|p2|p3/`: the level folders
- `scripts/blocks.py`: list, show, and fill marker blocks (Markdown and the site config)
- [`CHECKLIST.md`](CHECKLIST.md): final review

`${CLAUDE_SKILL_DIR}` is this skill's folder. Run scripts as `python3 "${CLAUDE_SKILL_DIR}/scripts/blocks.py" ...` from the workspace root.

## Inputs

`$ARGUMENTS`: paths (files or folders), links (Drive, Notion, Salesforce), or just a client name. Also check the user's message for attached or pasted material. Everything is optional, because the skill prompts for what's missing.

## Workflow

### Phase 0: Preflight and mode

1. Work from the workspace root (`git rev-parse --show-toplevel`, or the cwd).
2. **Is this an initialized workspace?** It needs `context/engagement-profile.md` with a `status:` frontmatter field.
   - If that file is missing and `.claude/skills/initialize/` exists here, this is the **template repo**. Stop. New clients get their own workspace: `/initialize <new-path>`, then run `/onboard-client` there.
   - If it's missing otherwise, stop and tell the user to run `/initialize` first (it's installed at the user level, so it runs from anywhere).
3. Read the profile's `status`:
   - `initialized` → **full onboarding** (Phases 1–6).
   - `onboarded` → ask which mode: **Add context** (a new document or transcript), **Re-baseline** (a change order or new SOW), or **Full re-onboard**. See "Re-running" below.
4. Run `python3 "${CLAUDE_SKILL_DIR}/scripts/blocks.py" list .` and note which blocks are unfilled.
5. Collaboration check (per the workspace CLAUDE.md): `git fetch` and `git status -sb`. If the branch is behind and the tree is clean, pull with rebase first. Otherwise tell the user before going further.

### Phase 1: Gather sources

1. Collect everything from the inputs. For a folder, read every document in it. Classify each item on the ladder in `source-artifacts.md`: SOW / change order, proposal, account context, transcript, client material.
2. **No SOW and no proposal → ask intake Round 0 now**, before anything else. Say plainly why the SOW matters: it's the contract of record for scope, deliverables, dates, and acceptance, and without it every scope line is a hypothesis. Then act on the answer: wait for the attachment, run the sweep, or continue in hypothesis mode.
3. **Offer the connector sweep once** (`connector-sweep.md`), even when the SOW is attached. Account context, contacts, and pre-sales calls rarely live in the SOW. Start a long EVO `gcm_chat` query early and let it run in the background while you read.
4. Copy every file-based original into `case-file/source/` under a readable name, save pasted text verbatim as `case-file/source/<date>-<slug>.md`, and write `case-file/source-index.md` from `templates/source-index.md`. Citations need stable paths before extraction starts.

### Phase 2: Read and extract

1. **Read every source in full.** SOW exhibits and appendices often hold the deliverables table and acceptance terms, so page through the whole PDF.
2. Extract the SOW with the schema in `source-artifacts.md`, and write `case-file/sow-summary.md` from `templates/sow-summary.md`. Cite every line. Record the commercial model by **type only**. Omit sections the SOW doesn't cover, and list each one under **Gaps**. Record every cross-source disagreement under **Conflicts across sources**. On scope, deliverables, and dates, the SOW governs.
3. Extract the proposal and transcripts too: intent, promises, named people, pains with speaker attribution.
4. **Place the engagement on the ladder** (`engagement-levels.md`): P1 (activation in the Claude UI), P2 (workflow automation), P3 (AI-enabled service), a span, or other. Cite the SOW language that drove it. This is the pre-filled first option for the `Level` question.
5. Draft (in your working notes, not the repo) the candidate answer to every other intake question the sources address, with its citation.
6. Build the **gap list**: every field nobody answered. Each gap becomes either an intake question (if the consultant would know it) or a discovery question (if only the client would know it).

The only repo writes allowed before the readback are `case-file/source/`, `source-index.md`, and `sow-summary.md`. They're facts as given and don't depend on anyone's interpretation.

### Phase 3: Intake interview

Run `intake-questions.md` as written, **even when the SOW is complete**: Rounds 1–4, the level rounds that apply (P1 / P2 / P3, per the `Level` and `Foundations` answers), then a single chat message for the free-text facts still missing.

- Pre-fill the first option from the documents, with its source in the label. The user confirms rather than retypes.
- Tailor the industry-dependent options (data classes, systems) from `industry-overlays.md`.
- For a **span**, ask in chat which levels it covers and in what order. For **other**, ask what the unit of value is and what the deliverables look like.
- **Foundations gap:** for P2 or P3, if `Foundations` is anything but "Using it day to day", ask whether the SOW covers closing it. If it does, include the P1 round and overlay. If not, record the gap as a risk.
- In hypothesis mode (no SOW), ask the scope questions the SOW would have answered: in scope, out of scope, deliverables, dates. Record the answers as `consultant-stated — not yet in a signed SOW`.

### Phase 4: Readback

Run intake Round R: a compact profile readback, including the overlays you'll apply and how the site will present the client, followed by "Does this match? I'll write the workspace from it." Correct and re-show only what changed until the user confirms. **Nothing else is written until they do.**

### Phase 5: Tailor the workspace

Write in this order. Later files cite earlier ones. For every file built from `templates/`, replace every `<placeholder>` and strip the HTML guidance comments. Treat template sections as a menu: omit a section with nothing to say. The exceptions are the engagement profile, which keeps every heading so other skills can rely on its shape (write "Not in sources: see Unknowns #n"), and **Gaps** / **Unknowns**, which are never dropped.

1. **Engagement profile.** Fill the `profile` block from `templates/engagement-profile.md`. Set the frontmatter (`status: onboarded`, `onboarded`, `client`, `industry`, `engagement_level`, `offering`, `claude_surfaces`, `start_date`, `end_date`, `source_docs_in_git`; leave `evo_*` to `/publish`). Add a change-log row: `| <date> | Onboarded: <level>, overlays <list> | /onboard-client (<sources>), <your name> |`.
2. **Engagement team.** Fill the `team` block: mission, both teams, stakeholders, ways of working (cadence, doc home, decision-making), glossary (the client's own terms of art from the documents), key links (including the Evo app URL, if one exists).
3. **Case file.** Write `company-profile.md`, `stakeholders.md`, and `00-engagement-brief.md` from their templates. Finish `sow-summary.md`. Fill the `case-file-index` block with the files actually written.
4. **Deliverables tracker.** Fill `deliverables-tracker`: one row per SOW deliverable, the SOW's IDs, and status `not started` unless the user said otherwise. In hypothesis mode, prefix each row's ID with `H-` and note that there's no signed SOW.
5. **Discovery seeds.** Write `discovery/align/pain-points.md` (cited pains, plus hypotheses labeled `hypothesis — validate`, including industry use-case areas) and `discovery/align/discovery-questions.md` (every client-side gap, ranked by what it unblocks, grouped by who can answer; getting the SOW is #1 in hypothesis mode). Leave `value-charter.md` and `discovery-notes.md` to `/genai-poc-strategy`.
6. **Overlays.** Per the table in `engagement-levels.md`, run `cp -Rn "${CLAUDE_SKILL_DIR}/templates/overlays/<p1|p2|p3>/." .` for each one that applies. P3 means both `p2` and `p3`. Then seed the files from the SOW and intake:
   - P1: SOW sessions → `session-plan.md`; scope-derived use cases (labeled) → `use-case-backlog.md`
   - P2: SOW workflows → `workflow-inventory.md`; dependencies and systems → `integrations.md`; SOW-fixed choices → `decisions.md`; acceptance criteria → `evals.md`
   - P3: the SOW's service description → `service-blueprint.md`; roles → `operating-model.md`; review gates and risks → `governance.md`; success criteria → `run-and-monitor.md`; Foundations and rollout answers → `maturity-roadmap.md`

   Leave a file as its template when there's nothing to seed.
7. **CLAUDE.md.** Fill `claude-summary` (12 lines or fewer, including the level), `claude-directories` (one bullet per overlay folder), `claude-guardrails` (level lines for every applied overlay, then industry lines, then engagement-specific rules; restate any default that still applies), and `claude-git`. Confirm CLAUDE.md is still under ~200 lines.
8. **README.md.** Fill `readme-header`, `readme-layout-extras`, and `readme-status`.
9. **.gitignore.** If the user chose to track source documents, delete the `case-file/source/` line and its comment block. Either way, make sure `source_docs_in_git` in the profile matches.
10. **Site.** Fill `site-identity` in `site/workspace.config.js` per the marker contract: status, title, brand, home description, at-a-glance chips, about paragraphs. **The site is published to Evo**, so nothing sensitive goes in: no MNPI, no rates, no personal contact details. Apply the `stop-slop` rules to the prose. Then check that the config parses (`node --check --input-type=module < site/workspace.config.js`), run `node scripts/build-site-index.mjs` (the new overlay folders appear in the sidebar automatically), and `node scripts/build-evo.mjs` to prove the bundle builds.

Fill every block with `blocks.py fill <file> <key> -` (content on stdin) or from a scratch file. Never hand-edit across a marker.

Don't create decks, meeting notes, or research documents here. Recommend them (Phase 6).

### Phase 6: Verify and hand off

1. `python3 "${CLAUDE_SKILL_DIR}/scripts/blocks.py" list .` must exit 0: no `UNFILLED` blocks, including `site-identity`.
2. If `~/.claude/skills/initialize/scripts/verify.sh` exists, run it against the workspace. It should report 0 FAIL.
3. Check the files you wrote for leftover template tokens: `grep -rnE '<Client>|<Engagement name>|<placeholder>|YYYY-MM-DD → YYYY' --include='*.md' . --exclude-dir=.claude`.
4. Walk [`CHECKLIST.md`](CHECKLIST.md).
5. **Report** briefly: level and overlays applied · files written (grouped) · evidence ledger (one line per source) · the top 5 open questions · anything in hypothesis mode.
6. **Next steps**, from `engagement-levels.md` for this level, concrete and in order (e.g. "`/genai-poc-strategy align` → `/meeting-prep` for the <date> kickoff → `/presentation-builder` for the kickoff deck"). If transcripts were among the sources, offer `/meeting-summary` to file them in `meeting-notes/`.
7. **Hand off to `/publish`.** Offer to run it now, so the commit, the push, and the client-dressed Evo app go out together. The suggested commit message is `Onboard <Client>: <engagement name> (<level>)`. Follow `.claude/skills/publish/SKILL.md`. Its single plan confirmation covers commit, push, and publish. Its preflight blocks client originals from being committed while `case-file/source/` is local-only.

## Re-running

The profile is `onboarded`, and the user picked a mode in Phase 0.

- **Add context** (a transcript, a new client document, a Salesforce update): Phase 1 for the new source only → extract → show a per-file list of what would change → confirm → update the affected files and blocks → change-log row. Re-ask only the intake questions the new source changes.
- **Re-baseline** (a change order or replacement SOW): register it in `source-index.md` → re-extract → show a **diff table** against the current profile (scope, deliverables, dates, success criteria, roles, level), with old and new values and citations → confirm → update `sow-summary.md` (keep a "Change orders" section), the profile, the tracker, and the site's at-a-glance chips. In the tracker, keep existing rows' status, add new rows, and mark removed rows `descoped (CO-n)` rather than deleting them. Change-log row per material change. Per the workspace's collaboration rules, a re-baseline goes on a branch and through a PR (`/publish` handles the push and the PR).
- **Full re-onboard:** run Phases 1–6 with the current profile's answers pre-filled as first options. Never delete `discovery/`, `research/`, `meeting-notes/`, or overlay content that's been worked on. Overlays only add (`cp -n`). **Level changes** (the engagement climbs from P1 to P2): add the new level's overlays, update the profile, CLAUDE.md, and the site chips, and leave the earlier overlay in place. It's still true history.

## Guardrails

- **Cite or label everything.** A fact without `[Source: …]` is either an intake answer (cite `[Source: intake <date>]`) or `hypothesis — validate`. `case-file/` holds no hypotheses. They go in `discovery/`.
- **Never fabricate.** An unknown stays unknown and becomes a question. A plausible guess is worse than a gap.
- **The SOW governs** scope, deliverables, and dates. Keep conflicts visible with both citations.
- **Commercial terms by type only.** No rate cards, rates, discounts, or opportunity amounts in Markdown unless the user asks, and never on the site.
- **Respect the data answers.** If intake flags PHI, MNPI, CUI, student records, or anything similar, none of it goes in repo Markdown or the site config. Describe it, don't copy it.
- **Readback before writing.** Apart from source copies and the SOW summary, nothing is written until the user confirms the profile.
- **Markers are the interface.** Fill blocks with `blocks.py`, keep the markers, and log changes in the profile's change log.
- **Read-only sweeps.** No emails, Slack posts, doc sharing, CRM edits, or Kanon installs from this skill. Commit, push, and Evo go through `/publish` only.
- **Client language** in anything client-facing. Caylent-internal labels (P1 / P2 / P3, offering names) belong in internal files like the profile, CLAUDE.md, and the site's at-a-glance chips.
- **Ask with `AskUserQuestion`**, up to 4 questions per call. Don't dribble questions one at a time, and don't ask what the documents already answered unless you're confirming it.
