# Initialize the Meridian Engagement Workspace - Steps 1-5

## Step 1 - Scaffold repo skeleton and .gitignore

### Metadata
**Status:** Complete
**Prereqs:** None
**Size:** small
**Owner:** Josh Tillson (via Claude Code)
**Completed At:** 2026-09-28
**Completion Notes:**
- Created `.claude/skills/`, `.ai/tasks/2026-09-28/engagement-workspace-init/`, `context/`, `prompts/roles/`, `rules/`, `case-file/`, `discovery/align/`, `deliverables/`, `presentations/kickoff-deck/`, `meeting-notes/`, `status-updates/`
- Wrote `.gitignore` (`.DS_Store`, `.vscode/`, `.idea/`, `.claude/settings.local.json`)

### Context

**Objective:** A clean directory tree to populate, with nothing machine-specific or noisy tracked by git.
**Done When:**
- Every top-level directory in the approved plan's tree exists
- `.gitignore` excludes the local Claude Code permission file and OS/editor cruft

**References:**
- Plan file: `/Users/jtillson/.claude/plans/pasted-content-id-96a8-let-s-initialize-inherited-llama.md`

### Plan
- Create the full directory skeleton in one pass with `mkdir -p`
- Write `.gitignore`

### Step checklist
- [x] Step-specific tasks complete
- [x] Deliverable reviewed for quality and completeness
- [x] Step metadata updated in the steps doc and the steps guide index

---

## Step 2 - Port AI Toolset skills + context/prompts/rules

### Metadata
**Status:** Complete
**Prereqs:** 1
**Size:** medium
**Owner:** Josh Tillson (via Claude Code)
**Completed At:** 2026-09-28
**Completion Notes:**
- Copied 11 individual skill folders plus the `task-planning-and-execution` group (task-planning, step-execution, step-loop) from `~/Desktop/Pnmac/AI Toolset/product/skills/` into `.claude/skills/`, verbatim
- Removed stray `.DS_Store` files picked up by the copy
- Copied `context/product-manager.md`, `rules/quality.md`, `meeting-notes/README.md`, `status-updates/README.md`, and `prompts/roles/product_manager_role.md` (renamed `product-manager.md`) verbatim
- Wrote `context/README.md` (adapted — dropped product-owner/product-analyst/okrs references not relevant to this repo)
- Wrote `context/engagement-team.md` (adapted from the `team.md` template, filled in with Meridian's actual people and situation)

### Context

**Objective:** Make the AI Toolset's relevant skills and context genuinely usable in this repo — auto-discovered by Claude Code, not just present as files.
**Done When:**
- `.claude/skills/<name>/SKILL.md` exists and is byte-identical to its AI Toolset source for every ported skill
- `context/`, `prompts/roles/`, `rules/` contain the verbatim or adapted files per the plan

**References:**
- Plan section "AI Toolset → repo mapping"
- `~/Desktop/Pnmac/AI Toolset/product/skills/`, `context/`, `prompts/roles/`, `rules/`

### Plan
- [x] Copy each of the 11 individual skills and the task-planning-and-execution group with `cp -R`
    - Detail:
      > `discovery, genai-poc-strategy (whole folder), interview-guide, presentation-builder, stakeholder-digest, meeting-prep, meeting-summary, meeting-followup, research-synthesis, status-update, week-ahead, task-planning-and-execution/{task-planning, step-execution, step-loop}`
- [x] Copy verbatim context/rules/working-folder files
- [x] Author adapted `context/README.md` and `context/engagement-team.md`

### Step checklist
- [x] Step-specific tasks complete
- [x] Deliverable reviewed for quality and completeness
- [x] Step metadata updated in the steps doc and the steps guide index

---

## Step 3 - Write the .kanon manifest

### Metadata
**Status:** Complete
**Prereqs:** 1
**Size:** small
**Owner:** Josh Tillson (via Claude Code)
**Completed At:** 2026-09-28
**Completion Notes:**
- Wrote `.kanon` with the confirmed-safe repo-scoped values
- Did **not** run `kanon add`/`kanon install` — deferred per the plan (global side effects; unmerged catalog branch)

### Context

**Objective:** Make Kanon "available" in the workspace per Josh's request, without silently relying on a stale/unmerged package.
**Done When:**
- `.kanon` exists with a syntactically valid manifest
- CLAUDE.md documents the staleness/branch caveat so `kanon install` isn't run unprompted

**References:**
- Plan section "`.kanon` manifest"

### Plan
- [x] Write `.kanon` at repo root with `CLAUDE_MARKETPLACES_DIR` and the `KANON_SOURCE_product_skills_*` keys

### Step checklist
- [x] Step-specific tasks complete
- [x] Deliverable reviewed for quality and completeness
- [x] Step metadata updated in the steps doc and the steps guide index

---

## Step 4 - Build case-file/

### Metadata
**Status:** Complete
**Prereqs:** 1
**Size:** medium
**Owner:** Josh Tillson (via Claude Code)
**Completed At:** 2026-09-28
**Completion Notes:**
- Copied the source brief PDF to `case-file/scenario-brief.pdf`
- Wrote `README.md`, `company-profile.md`, `stakeholders.md`, `00-engagement-brief.md`

### Context

**Objective:** Capture the facts as given, cleanly separated from discovery/hypothesis.
**Done When:**
- All four case-file documents exist and every claim is either cited to the brief or explicitly this-is-what-the-brief-says framing

**References:**
- `case-file/scenario-brief.pdf`
- `.claude/skills/genai-poc-strategy/SKILL.md` (Phase 0 output shape, for `00-engagement-brief.md`)

### Plan
- [x] Copy the PDF verbatim
- [x] Write company profile, stakeholders table, and Phase-0-shaped engagement brief

### Step checklist
- [x] Step-specific tasks complete
- [x] Deliverable reviewed for quality and completeness
- [x] Step metadata updated in the steps doc and the steps guide index

---

## Step 5 - Build discovery/

### Metadata
**Status:** Complete
**Prereqs:** 4
**Size:** medium
**Owner:** Josh Tillson (via Claude Code)
**Completed At:** 2026-09-28
**Completion Notes:**
- Wrote `README.md`, `align/pain-points.md`, `align/discovery-notes.md`, `align/discovery-questions.md`, `align/value-charter.md`, `discovery-session-design.md`
- Every claim not cited to `scenario-brief.pdf` labeled `hypothesis — validate`

### Context

**Objective:** Answer the brief's discovery-motion requirement directly, and produce a real question bank for the (simulated) kickoff call.
**Done When:**
- `discovery-session-design.md` explicitly answers "how do you surface pain the team can't see" and "how do you design a session that creates a relevance moment"
- `align/*` mirrors `genai-poc-strategy`'s Align-phase shape

**References:**
- `case-file/company-profile.md`, `case-file/stakeholders.md`
- `.claude/skills/genai-poc-strategy/1-align-guide.md`
- `.claude/skills/interview-guide/SKILL.md`

### Plan
- [x] Write the pain-point inventory, citing the brief and labeling hypotheses
- [x] Synthesize discovery notes into named themes
- [x] Write the kickoff-call question bank
- [x] Write the value charter
- [x] Write the discovery-session-design document

### Step checklist
- [x] Step-specific tasks complete
- [x] Deliverable reviewed for quality and completeness
- [x] Step metadata updated in the steps doc and the steps guide index
