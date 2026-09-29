# Product Task Planning Checklist

This checklist is the single source of detailed planning requirements for product management tasks.
Use `{.ai,.claude,.codex}/skills/task-planning/CONTEXT_TEMPLATE.md`, `{.ai,.claude,.codex}/skills/task-planning/STEPS_GUIDE_TEMPLATE.md`, and `{.ai,.claude,.codex}/skills/task-planning/STEPS_TEMPLATE.md` for structure only, and avoid duplicating these requirements elsewhere.

## 0) How to use this checklist and the templates

- The output documents are the contents of the fenced ```md blocks in the templates. Everything outside the fences is instruction.
- Remove placeholder bullets you do not fill in; do not leave empty sections.
- If a section is not relevant, omit it entirely instead of writing "N/A" or "None".
- Do not include conditional labels like "optional" or "if applicable" in outputs; omit the section or item instead.
- If a section is omitted, remove any dependent checklist items that only apply when that section exists.

### Context doc construction

- Optional sections:
  - 9) Data and metrics: omit any irrelevant subsection
  - 10) Stakeholder impact: omit stakeholder groups with no impact
  - 13) Communication plan
  - 14) Research and references
  - 15) Open questions

### Steps doc construction

- Optional sections:
  - References
  - Deliverable snippets
  - Completion Notes
- Reviews live only in the Step checklist; do not add a standalone Reviews section.

### Steps guide construction

- The steps guide is the single place for coordination rules, dependency rules, and the step index table.
- Every step in the plan must be listed in the index, including the final validation step.

## 1) Intake and scope

- [ ] Capture the objective, success criteria, and why this matters
- [ ] Define scope boundaries and explicit non-goals
- [ ] List constraints (time, budget, policy, stakeholder, compliance)
- [ ] Identify stakeholders and user personas
- [ ] Search `.ai/tasks/` for similar or related plans
- [ ] Define explicit acceptance criteria (what must be true for the task to be considered complete)
- [ ] List out-of-scope items to avoid scope creep

## 2) Foundational context

- [ ] Review existing product documentation relevant to this task
- [ ] Review any relevant research, analytics, or user feedback
- [ ] Review competitive landscape if relevant
- [ ] Note any product or business rules that must be preserved

## 3) Research

- [ ] Research user needs and pain points relevant to this task
- [ ] Review existing solutions, patterns, or precedents
- [ ] Identify current workflows and touchpoints
- [ ] Note existing artifacts or templates to reuse

## 4) Stakeholder and user context

- [ ] Identify all affected user segments
- [ ] Identify all internal stakeholders and their concerns
- [ ] Map dependencies on other teams or initiatives
- [ ] Document any commitments or timelines already communicated

## 5) Requirements and success metrics

- [ ] Define functional requirements (what must be true)
- [ ] Define non-functional requirements (quality, timing, format)
- [ ] Define success metrics with data sources
- [ ] Define leading and lagging indicators
- [ ] Identify how and when metrics will be measured

## 6) External research and best practices

- [ ] Research best practices for the domain
- [ ] Review how similar companies or products handle this
- [ ] Note relevant industry standards or compliance requirements
- [ ] Summarize findings and implications
- [ ] Resolve researchable questions; do not defer them to open questions

## 7) Decisions and trade-offs

- [ ] Document key decisions and rationale
- [ ] Document alternatives considered and why they were rejected
- [ ] Identify trade-offs explicitly (scope vs. time, depth vs. breadth, etc.)
- [ ] Capture assumptions and constraints

## 8) Risk and rollout

- [ ] Identify risks and mitigations
- [ ] Identify communication needs (internal and external)
- [ ] Define rollout or delivery approach

## 9) Validation

- [ ] Define how completeness will be verified
- [ ] Identify required reviews or approvals
- [ ] Define documentation or handoff requirements

## 10) Dependency ordering and step design

**Critical:** Each step must be completable by one person in one session.

- [ ] Map dependencies and ordering constraints
- [ ] Break work into small-to-medium steps (prefer medium when possible)
- [ ] Do not optimize for fewer steps; use as many steps as needed to fully cover the task
- [ ] Split steps into multiple steps docs with a maximum of 5 steps per doc
- [ ] Ensure each step includes a checklist, clear "Done When" criteria, and any information needed to execute
- [ ] Add a final step that verifies end-to-end completeness
- [ ] Explicitly declare dependencies for each step:
  - If a step depends on other steps, list them in **Prereqs** (e.g., `1, 2`)
  - If a step has no dependencies, use `None`
- [ ] Order steps logically:
  - Steps with dependencies must come after their prerequisites
  - Independent steps should be placed where they make most sense given the overall flow

## 11) Final review

- [ ] Context doc is complete, specific, and non-placeholder
- [ ] Steps guide doc is complete, accurate, and matches the steps docs
- [ ] Steps docs are ordered, dependency-correct, and executable
- [ ] Open questions pass the "researchable" filter (see below)

### [STRICT] Open Questions Filter

**Before listing any open question, you MUST attempt to answer it yourself.**

A question is **NOT** an open question if it can be answered by:
- Reading existing product documentation
- Reviewing analytics or data
- Searching the web for best practices or industry standards
- Reviewing competitive products
- Any other research you can do without human input

**Open questions are ONLY for:**
- True decisions requiring stakeholder judgment
- Business rules or product decisions not documented anywhere
- Conflicting information that can't be reconciled
- Trade-offs where multiple valid approaches exist and preference is unclear
- Ambiguous requirements that remain ambiguous after research

**If you can answer a question by doing research, it's not an open question—it's research you haven't done yet. Do the research.**
