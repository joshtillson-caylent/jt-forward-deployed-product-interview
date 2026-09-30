---
status: initialized
workspace: {{REPO_NAME}}
initialized: {{DATE}}
template: {{TEMPLATE_REPO}} @ {{TEMPLATE_COMMIT}}
onboarded:
client:
industry:
engagement_level:
offering:
claude_surfaces:
start_date:
end_date:
source_docs_in_git:
evo_slug:
evo_url:
---

# Engagement Profile

The canonical record of what this engagement is. Every skill reads it first. `/onboard-client` writes it from the SOW, proposal, connector sweep, and intake interview, and re-running `/onboard-client` updates it in place.

Frontmatter fields: `status` is `initialized` or `onboarded`. `engagement_level` is `P1`, `P2`, or `P3` (the complexity ladder; a span like `P1-P2` when the SOW covers two levels), or `other`. `source_docs_in_git` is `true` or `false`.

<!-- onboard-client:begin profile -->
<!-- onboard-client:default -->
_Not onboarded yet. Run `/onboard-client` and attach the SOW or proposal._
<!-- onboard-client:end profile -->

## Change log

| Date | Change | Source |
|------|--------|--------|
| {{DATE}} | Workspace initialized from template @ `{{TEMPLATE_COMMIT}}` | `/initialize` |
