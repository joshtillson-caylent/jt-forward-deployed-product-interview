<!-- onboard-client:begin readme-header -->
<!-- onboard-client:default -->
# {{REPO_NAME}}

Caylent forward-deployed engagement workspace, not yet fitted to a client. Run `/onboard-client` with the SOW or proposal attached to turn it into the engagement's working repo.
<!-- onboard-client:end readme-header -->

## Quick links

- [Engagement profile](context/engagement-profile.md): what this engagement is, in one place
- [Case File](case-file/README.md): the facts as given (SOW, proposal, company, stakeholders)
- [Discovery](discovery/README.md): how we find what the documents don't say
- [Research](research/README.md): the point of view behind the decks
- [Deliverables](deliverables/README.md): the SOW deliverables tracker and final artifacts
- [Presentations](presentations/README.md): the decks

## Getting started

1. Open the repo in Claude Code.
2. Run `/onboard-client` and attach the SOW, proposal, and any client context you have.
3. Follow the next steps it recommends for the engagement level (typically `/genai-poc-strategy` for Align, `/meeting-prep` for the kickoff, `/presentation-builder` for the kickoff deck).
4. Run `/publish` whenever you want the team to see the latest: it commits, pushes, and republishes the dashboard to Evo.

## The dashboard

`index.html` is the workspace dashboard. It lists every document and deck and opens them in-app, and it's published to Evo as a Caylent App by `/publish`. To view it locally, run `python3 -m http.server` from the repo root and open `http://localhost:8000`. It renders from `site/workspace.config.js`, so nothing in the page code is client-specific. See `site/README.md`.

## Repo layout

```
.claude/skills/      Claude Code skills, auto-discovered, each invocable as /<name>
.ai/tasks/           Task-planning documents for multi-step initiatives
context/             Engagement profile, team, and role context Claude reads every session
prompts/, rules/     Supporting prompt library and quality checklist
case-file/           Facts as given (SOW, proposal, company, stakeholders)
discovery/           The motion to find more
research/            The point of view (the decks' source material)
deliverables/        SOW deliverables tracker + final engagement artifacts
presentations/       One folder per deck
meeting-notes/       Session notes (populated as the engagement runs)
status-updates/      Status updates (populated as the engagement runs)
site/, index.html    The dashboard (config-driven; published to Evo by /publish)
scripts/             Site index and Evo bundle builders
```
<!-- onboard-client:begin readme-layout-extras -->
<!-- onboard-client:end readme-layout-extras -->

## Status

<!-- onboard-client:begin readme-status -->
<!-- onboard-client:default -->
Initialized {{DATE}} from `{{TEMPLATE_REPO}}` @ `{{TEMPLATE_COMMIT}}`. Not onboarded.
<!-- onboard-client:end readme-status -->
